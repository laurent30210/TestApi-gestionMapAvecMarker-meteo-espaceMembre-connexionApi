const API_KEY = "at_arFUaFY2DqOYRPJXhskALzKfUgtNn";
const API_KEY_WEATHER = "ffe5f1ec3fc89d7f62bb1b80bb651349";
const arrayCity = [];
const mymap = L.map('mapid');

const app = {
    
    init: function () {         
        app.addListenerToAction();
        app.initNavigatorGeolocation();
        app.findIpUser();  /** méthode geolocalisation par IP */     
       
    },

    initNavigatorGeolocation: function() {
        navigator.geolocation.getCurrentPosition(function(position) {
            //console.log('console log de navigator : ', navigator);
            //console.log('console log de geolocation : ', navigator.geolocation);
            if("geolocation" in navigator) {
                //console.log(position)
                //console.log(navigator);
                   app.alertForGeolocalisation(position);
                   app.activeMap(position);
                } else {
                const h2 = document.createElement('h2');
                h2.textContent ='test';
                const mapContainer = document.querySelector('#mapid');
                mapContainer.appendChild(h2);
               
               // si refus il faudra :
               // - récéptionner le retour de l'objet qui indique une erreur 
               // - paramétrer un message d'erreur visuel pour l'utilisateur
            }
          });
    },
    addListenerToAction: () => {
        const form = document.querySelector('form');
        form.addEventListener('submit', app.stopRefresh);

        /*const password = document.querySelector('#password');
        password.addEventListener("focus", () => {
            console.log('here');
            const containerPw = document.querySelector('.container__password');
            containerPw.style.height = "100px";
        })*/

    },

    findIpUser: async function() {
        // On envoi une requête à l'API pour connaitre l'ip de l'utilisateur
        try {
            const result = await fetch(`https://geo.ipify.org/api/v1?apiKey=${API_KEY}`);
            const json = await result.json();
            if(!result.ok) {
                // si il y a une erreur 
                console.log('erreur sur la réponse JSON');
            } else {
                // Si on recoit les données on actualise les infos 
                // console.log(json)
                const spanIP = document.querySelector('#spanIP');
                spanIP.textContent = `${json.ip} celle-ci vous localise à ${json.location.city} dans la région ${json.location.region} (lat: ${json.location.lat}, long: ${json.location.lng})`;
                
               // app.activeMapByIP(json.location);
            }

        } catch (error) {
            console.error(error);
        }
    },

    createMarkers: async function(city) {

        console.log(city)
        try {
            const result = await fetch(`https://geo.api.gouv.fr/communes?nom=${city}&fields=code,centre,population`);
            
            const json = await result.json();

            console.log(json);
           
            json.forEach(arrayCity => {               
                const cityName = arrayCity.nom;                
                cityNameTxt = (cityName.charAt(0).toLowerCase() + cityName.substring(1).toLowerCase());
                if(cityName === city || cityNameTxt === city) {
                    console.log('trouvé');
                    console.log(arrayCity);
                    const coordsGps = {
                        "lon" : arrayCity.centre.coordinates[0],
                        "lat" : arrayCity.centre.coordinates[1]
                    }
                    const citymaker = L.marker(coordsGps)
                        .bindPopup(`code postal:${arrayCity.code} population:${arrayCity.population}`)
                        .openPopup();

                    L.layerGroup([citymaker]).addTo(mymap);      
                }
                
            })
           

            
        } catch (error) {
            console.error(error)
        }
    },
    addLayerForLeaflet: () => {
        // url pour l'affichage de la map
        const osmUrl = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png';
        const osmLayer = L.tileLayer(osmUrl, { 
                    attribution: '© OpenStreetMap contributors',
                    maxZoom: 19
                });
        return osmLayer;
    },

    // modifier activeMap pour l'initialiser avec plusieurs composants (style position, marker, layer etc..) 
    activeMap: async function(position) {
        
        try {   
            // Si des coordoonées arrivent on active la carte.   
            console.log('envoi des Coords GPS à Leaflet');
            // initialisation de la map avec les données GPS de l'utilisateur     
            mymap.setView([`${position.coords.latitude}`, `${position.coords.longitude}`], 5);
            // On ajoute le layer sur la map
            mymap.addLayer(app.addLayerForLeaflet());
            // On ajoute le marker où se situe l'utilisateur
            L.marker([`${position.coords.latitude}`, `${position.coords.longitude}`], {
                //draggable: true, // si true l'utilisateur peut déplacer le curseur (false par défaut)
                opacity: 0.7
            })            
                .addTo(mymap)
                .bindPopup("Vous êtes ici")
                .openPopup();
           
                       
        } catch (error) {
            console.error(error);
        }

    },
    /*activeMapByIP: async function(position) {
        
        try {   
            // Si des coordoonées arrivent on active la carte.   
           const mymap = L.map('mapid2').setView([`${position.lat}`, `${position.lng}`], 10);
           const osmLayer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', { // LIGNE 20
                attribution: '© OpenStreetMap contributors',
                maxZoom: 19
           });
           const marker = L.marker([`${position.lat}`, `${position.lng}`]).addTo(mymap);
           marker.bindPopup("Slt toi ! Tu es censé être ici !")
   
           mymap.addLayer(osmLayer);

        } catch (error) {
            console.error(error);
        }

    },*/
    alertForGeolocalisation: async function(positionGPS) {
        try {
        // Si l'utilisateur a accepté la localisation on affiche un message  
        app.createPopup(null, true, "La localisation est active" )
           //alert('Test ok',);
           // On envoi les coords pour actualisé la localisation
           await app.addContentWithPosition(positionGPS);

        } catch (error) {
            console.error(error);
        }
    },
    addContentWithPosition: async function(ObjetGPS) {
        // Une fois les coords GPS récéptionnées on crée la div 
        const divCoords = document.createElement('div');
        // On insère le texte et les infos
        divCoords.textContent = `Vos données GPS : lat ${ObjetGPS.coords.latitude}, long ${ObjetGPS.coords.longitude} `;
        // On sélectionne le container et on ajoute la div 
        const containerForInsertCoords = document.querySelector('#containerInfosCoords');
        containerForInsertCoords.appendChild(divCoords);
        await app.getWeather(ObjetGPS.coords.latitude, ObjetGPS.coords.longitude);
    },
    stopRefresh: async function(event) {
        // On annule le rechargement de la page
        event.preventDefault();         
        // On envoi l'evênement dans la méthode city
        app.getCityValue(event);
    },    
    getCityValue: function(event) {        
        // On envoi l'evênement dans la méthode city
        // On réceptionne les infos du formulaire
        const formData = new FormData(event.target);                  
        //console.log(Array.from(formData))
        for(const city of formData) {
            // on récup la ville qui recoit les coords et on transfère à la méthode
            // Oui c'est pas un json mais un tableau de tableau...
           // app.sendFormDataAtContainerInfosCoords(city[1]);
          
           app.createMarkers(city[1]);
           app.findCoordsGpsWithCity(city[1]);
        }
        // On efface le champ indiqué par l'utilisateur
        document.querySelector('.form-control').value = "";
        
    },
    createPopup: function(error, success, message) {

        const alertText = document.createElement('span');
        
        if(error){
            // on ajoute les class bootstrap
            alertText.classList.add('alert', 'alert-danger');
            alertText.setAttribute('role', 'alert');
        } else if(success) {
            alertText.classList.add('alert', 'alert-success');
            alertText.setAttribute('role', 'alert');
            // timer pour enlever la popup            
            setTimeout(() => {
                alertText.style.opacity = '0';
                container.removeChild(alertText);
            }, 3000);
        }
        // On affiche le message en fonction de l'alert
        alertText.textContent = message;  
        // on ajoute l'alert au container
        const container = document.querySelector('form');
        container.appendChild(alertText);       
    },
    alertPopup: function () {

        // Vérification d'une popup présente
        const popup = document.querySelector('.alert-danger');
        // Si true alors on enlève
        if(popup !== null){
            const container = document.querySelector('form');
            container.removeChild(popup);  
        }
                
    },
    findCoordsGpsWithCity: async function(element) {
         // On appelle l'api qui va chercher les infos GPS  via la ville 
        try {
            const result = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${element}&appid=${API_KEY_WEATHER}&lang=fr&units=metric`);
            const json = await result.json();

            if(!result.ok) {
                //console.log('il y a un problème dans la récupération des données')    
                app.alertPopup();            
                app.createPopup(true, null, "Il y a un problème dans votre choix");  
            } else {      
                //Si c'est ok on envoi les renseignements  
                app.findResultSearch(json);
            }

        } catch (error) {
            console.error(error);
        }
    },
    findResultSearch: function(getCity) {
        //Méthode pour vérifier que la ville n'est pas une deuxième et même demande.
        const result = arrayCity.find(city => city === getCity.name);

        if(!result) {
            arrayCity.push(getCity.name);
            app.sendFormDataAtContainerInfosCoords(getCity)
        } else {
            app.createPopup(true, null, "Vous avez déjà effectué cette recherche");
        }

    },
    sendFormDataAtContainerInfosCoords:  function(city) {
        // console.log(city)
        // On récupère la ville afin de réactualiser la page et ses informations
        // si une alerte est enbcore présente on efface celle-ci.
        //On appelle la méthode qui check les popups et fait le nécessaire si besoin
        app.alertPopup();        
          
        // On crée le container qui va recueillir les infos
        const div = document.createElement('div');
        div.id = 'containerResultSearch'
        // class bottstrap
        div.classList.add('container', 'content', 'd-flex', 'flex-column', 'text-center', 'shadow-sm', 'p-3','m-2', 'bg-light', 'rounded');
        // ajout du résultat de recherche
        div.textContent = 'Voici le résultat pour ' + '<' + city.name + '>';
        // Infos lié à la demande
        const infoSearch = document.createElement('span');
        infoSearch.textContent = `Sur ${city.name} la température est de ${city.main.temp}° `;
        // On ajoute les éléments aux parents
        document.querySelector('#containerInfosCoords').appendChild(div);
        div.appendChild(infoSearch);
    },
    getWeather: async function(latitude, longitude) {

        try {
            const result = await fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY_WEATHER}&lang=fr&units=metric`);
            const json = await result.json();

            if(!result.ok) {
                ('il y a un problème dans la récupération des données');
            } else {
                // On a les renseignements nécessaires. On affiche les infos
                // température
                const spanTemp = document.querySelector('#spanTemp');
                spanTemp.textContent = json.main.temp;
                // info du ciel 
                const spanWeatherDesc = document.querySelector('.weatherDesc');
                spanWeatherDesc.textContent = json.weather[0].description;
                // Coordonnée de la ville 
                const spanCity = document.querySelector('#spanCity');
                spanCity.textContent = json.name;
            }
            
        } catch (error) {
            console.error(error);
        }
    }

};

document.addEventListener('DOMContentLoaded', app.init);
