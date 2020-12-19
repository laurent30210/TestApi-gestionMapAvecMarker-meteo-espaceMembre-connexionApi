
const bcrypt = require('bcrypt');
const emailValidator = require('email-validator');
const { User } = require('../models');

const authController = {


    login: (_, response) => {      
            response.render('login'); 
    },
    sendLoginForm: async (request, response) => {

        //On lance une recherche dans la bdd si le mail existe bien
        const user = await User.findOne({where: {email: request.body.email}});
        // Si le résultat n'est pas bon on renvoie un message d'erreur et on retransmet les valeurs 
        if(!user) {
            return response.render('login', {error: 'Oups, veuillez vérifier vos données', fields: request.body});
        }
        // Si tout va bien, on check le mdp
        //console.log(request.body.password)
        //onsole.log(user.password)
        const goodPassword = bcrypt.compareSync(request.body.password, user.password);
        //console.log(goodPassword)
        // Si le résultat n'est pas bon on renvoie un message d'erreur et on retransmet les valeurs 
        if(!goodPassword) {
            return response.render('login', {error: 'Oups, veuillez vérifier vos données', fields: request.body});
        }    
        // On enregistre l'utilisateur dans la session     
        request.session.user = user;
        //console.log(request.session);
        // Si la case "se souvenir de moi" est cochée alors on ajoute une date de validation au cookie de session
        if(request.body.rememberMe) {
            // validation de la session pendant 1h
            request.session.cookie.expires = new Date(Date.now() + 3600000);
        }
        // On est tout bon on envoit sur la page de recherche
        response.redirect('/'); 

    },
    subscribe: (_,response) => {

        response.render('subscribe', {
            sendMsgForScript : true
        }); 
    },
    sendSubscribeForm: async (request, response) => {   

        try {
            // On stock les infos du corp de la requête
            const requestUserInfos = {
                lastname: request.body.lastname,
                firstname:request.body.firstname,
                email:    request.body.email,
                password: request.body.password,
                confirmPassword: request.body.confirmPassword
            };

            // On crée un tableau d'erreur pour rappratrier chacune des erreurs trouvées
            const errors = [];

            // En premier on Check l'email 
            if(!emailValidator.validate(requestUserInfos.email)) {
                //console.log('email')
                errors.push("Erreur sur l'email !");
            }
            // Check nom 
            if(!requestUserInfos.lastname || requestUserInfos.lastname.length < 1 ) {
                //console.log('last')
                errors.push('Erreur sur le nom');
            }
            // Check prénom 
            if(!requestUserInfos.firstname || requestUserInfos.firstname.length < 1 ) {
                //console.log('first')
                errors.push('Erreur sur le prénom');
            }
            
            // Check password
            if(!requestUserInfos.password || requestUserInfos.password.length < 8 ) {
                //console.log('mdp');
                errors.push('Votre mot de passe est trop court');
            }
                // test sur les majuscules
            if(!/[A-Z]/.test(requestUserInfos.password )){
                errors.push('Votre mot de passe ne contient pas de Majuscule');
            }
                // test sur les chiffres              
            if(!/[0-9]/.test(requestUserInfos.password)){
                errors.push('Votre mot de passe ne contient pas de chiffre');
            }    
                // test sur les caractères spéciaux
            if(!/[^A-Za-z0-9]/.test(requestUserInfos.password )){
                errors.push('Votre mot de passe ne contient pas de caractères spéciaux');
            }
            // Check confirm password
            if(requestUserInfos.password != requestUserInfos.confirmPassword) {
                //console.log('confirm');
                errors.push('Les mots de passe ne sont pas identiques');
            }         

            if(errors.length > 0 ) { 
                //console.log(errors.length)               
                // si le tableau comporte une erreur dans ce cas là on envoie la page avec les erreurs 
                response.render('subscribe', {
                    errors,
                    requestUserInfos
                });
            } else {
                
                //console.log('je passe ici ?', requestUserInfos);

                // Si aucune erreur est générée on va vérifier que le mail de l'utilisateur n'est pas déjà renseigné
                const goodUser = await User.findOne( {
                    where: {
                        email: requestUserInfos.email
                    }
                });
                // Si l'utilisateur existe on va indiquer qu'une erreur est présente
                    if(goodUser) {
                        //console.log('puis ici');
                        response.render('subscribe', {
                            errors: ['Une erreur c\'est produite à l\'enregistrement']
                        })
                    } else {
                    // console.log(requestUserInfos);
                        // Si aucun utilisateur n'est trouvé on passe au traitement 
                        //  CRYPTAGE du password 
                        const passwordEncrypted = bcrypt.hashSync(requestUserInfos.password, 10);

                        // On crée le nouvel utilisateur
                        const newUser = new User({
                            firstname: requestUserInfos.firstname,
                            lastname:  requestUserInfos.lastname,
                            email:     requestUserInfos.email,
                            password:  passwordEncrypted
                        })
                        // On sauvegarde le nouvel utilisateur
                        await newUser.save()
                        // si tout est ok dans ce cas là, on affiche la page "login"
                        response.redirect('login');

                    }

            }            
        } catch (error) {
            response.status(500);
        }   
    },
    
    profil: async (request,response) => {
        // Pour la connexion au profil on récupère l'ID du USER qui à la session en cours
        const userId = request.session.user.id;        
        //console.log(userId)
        // ON fait une recherche en base donnée
        const user = await User.findByPk(userId);
        // si l'utilisateur n'est pas trouvé on renvoie une erreur
        if(!user) {
            response.status(505);
        } else {
            // sinon on transmet ses infos à la page profil
            response.render('profil', {user});
        }
        
    }
}

module.exports = authController;