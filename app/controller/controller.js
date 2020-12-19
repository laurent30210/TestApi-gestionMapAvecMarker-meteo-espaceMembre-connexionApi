
const controller = {


    homePage: (request, response) => {      
            //response.sendFile(path.join(__dirname, '/public', 'index.html'));  
            //console.log(request.session)           
            response.render('index');    
    },
    // affichage de la page des recherches tant que la connexion n'est pas encore créée
    searchPage: (_,response) => {
        response.render('searchPage');    

    }
}

module.exports = controller;