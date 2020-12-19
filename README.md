# But du REPO

Ce REPO a pour but premier de tester les différentes API dont on pourrait avoir besoin pour l'apothéose et de remettre en pratique tout ce que l'on a vu en cours

## MISE EN PLACE DU SITE

1- Une fois le repo cloné, il vous faut créer le .env en copiant collant le .env.example

2- Lancer npm install afin de déployer les packages

3- Créer la BDD dans Postgres 

## SECTION REMARQUES

        ### fichier json des centres dans le dossier data
        ### Attention maintenant la recherche des villes est uniquement en france (adresse reliée à l'API .gouv)

### Problème actuel  =>  //

### Prochaine étape

- Afficher des options pour show/Hide des items (items à chercher..)
- Essayer d'extraire les données du fichier JSON
- Rajouter une surcouche lors de la vérification du mdp
- Insérer photo de profil
- Ouvrir une popup lorsqu'on souhaite regarder un résultat (marker) de plus près

# Maj 6.1 
    * Amélioration de la saisie et vérification du mot de passe lors de la souscription 
        - Check majuscule, Number, Taille, caractère spécial

# Maj 6

    * BDD Inscription et connexion OK - page profil ok ! 

# Maj 5.4

    * Mise en place de la db + sequelize et models User (BDD sur la VM)

# Maj 5.3

    * Préparation du controller de connexion (reprise avec l'aide du cours...car c'est loiiiiiiiiiin tout ça...);

# Maj 5.2

    * Ajout pages connexion/inscription
    * installation ejs / bcrypt / express-session / email-validator

# Maj 5.1

    * Ajout header pour connexion/inscription + checkbox

# Maj 5

    * Ajout des markers lors sur chaque recherche, affichage en live
    * test d'affichage en boucle via une réponse FETCH testé et validé ! 

# Maj 4.2

    * Si une même recherche est lancé une alert s'affiche et la ville ne se rajoute plus
    * Suppression de la map de géolocalisation par IP (méthodes toujours présentes au cas où (et il faut juste rajouter la div adéquate dans index.html))

# Maj 4.1

    * Refacto de l'alert afin que celle-ci fonctionne avec la géolocalisation et le formulaire (voir sur la branche "laurent")

# Maj 4

    // Affichage de la météo via la ville indiquée dans la recherche
    // Travail sur l'affichage des marker : 
            Dans activeMap il y a deux manières :
                    - à la mano
                    - avec une boucle qui récupère les valeurs d'un objet
    J'ai essayé d'ajouter un marker dès qu'on cherche une ville mais pas moyen... (besoin d'un refresh car la map est déjà initialisé)...
    Pas mal de temps à chercher ça...mais ca doit certainement exister  :persevere: ! 
    // affichage d'une alert si une recherche n'est pas bonne 

# Maj 3

    // problème du formulaire réglé, la récéption des données est maintenant ok.
    // J'en ai profité pour effacer la demande de l'utilisateur qui était toujours affiché par la suite.  
    // Alerte géolocalisation s'efface au bout de 4s
    // affichage d'une div indiquant le résultat de la recherche (prochaine partie à travailler)
    // affichage de la météo en direct de votre ville/village
    // affichage de la ville via la météo avec la reprise des données GPS du navigateur 

# Maj 2

  Affichage d'une seconde map

- Cette deuxieme map indique la géolocalisation via l'ip afin de différencier celle faite via le navigeur
- rajout du pointeur gps pour cibler exactement l'endroit.

# Maj 1

   Version IP  

- Actuellement dès connection au site, l'ip utilisateur est connu et affiche les infos récoltées.
   La APIKEY est indiquée tout en haut de la page script.js
 **On peut apercevoir qu'il y a une incohérence au niveau du résultat via l'IP**
   Les données collectées par le navigateur sont pour le moment le plus fiables.

# version de base

- Actuellement une demande de géolocalisation est demandée dès que le site est lancé.
- Si refus pas de message et la map ne s'affiche pas.
#   T e s t A p i - g e s t i o n M a p A v e c M a r k e r - m e t e o - e s p a c e M e m b r e - c o n n e x i o n A p i  
 