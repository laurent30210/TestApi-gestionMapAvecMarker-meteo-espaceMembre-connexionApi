require('dotenv').config();

const express = require('express');
const router  = require('./app/router');
const session = require('express-session');

const app = express();

/** réglages du moteur de vues */
app.set('view engine', 'ejs');
app.set('views', './app/views');

app.use(express.static('./public'));


/** on rajoute le middleware pour la gestion des données POST */
app.use( express.urlencoded({extended: true}) );

/** On rajoute aussi le middleware pour la gestion des sessions */
app.use(session({
    //mot de passe servant à crypter les infos
    secret: 'mysupersecretpassphrase',
    //va sauvegarder une nouvelle session même si elle n'est pas modifiée
    saveUninitialized: true,
    //resauvegarde une session à chaque requête même sans modif (pas de date d'expiration)
    resave: true
}));


app.use(router);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`listening on ${PORT}`);
});
