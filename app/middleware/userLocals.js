const userToLocals = (req, res, next) => {
    if (req.session.user) {
        // si on a un user dans la session, c'est qu'il s'est correctement connecté
        // pour le rendre plus facilement accessible dans nos views, on l'inscrit dans res.locals
        res.locals.user = req.session.user;
    }

    // c'est bon, on a checké, on passe à la suite !
    next();
};

module.exports = userToLocals;