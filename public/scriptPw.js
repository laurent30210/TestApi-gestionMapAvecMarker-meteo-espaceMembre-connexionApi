const app = {
    
    init: function () {         
        app.checkPassword();
       
    },
    
    checkPassword: () => {

        const password = document.querySelector('#password');

        password.addEventListener('focus', () => {
            document.querySelector('.container__password').style.height = "100px";
        })
        password.addEventListener('blur', () => {
            document.querySelector('.container__password').style.height = "0px";
        })

        password.addEventListener("keyup", () => {
                // test sur les chiffres              
            if(/[0-9]/.test(password.value)){
                document.querySelector('.pw__number').classList.add('active');
            } else {
                document.querySelector('.pw__number').classList.remove('active');
            }
                // test sur les MAJ
            if(/[A-Z]/.test(password.value)){
                document.querySelector('.pw__uppercase').classList.add('active')
            } else {
                document.querySelector('.pw__uppercase').classList.remove('active')
            }  
                // Test sur les caractères spéciaux
            if(/[^A-Za-z0-9]/.test(password.value)){
                document.querySelector('.pw__special').classList.add('active')
            } else {
                document.querySelector('.pw__special').classList.remove('active')
            } 
            // Test sur la longueur du mdp
            if(password.value.length > 7){
                document.querySelector('.pw__length').classList.add('active')
            } else {
                document.querySelector('.pw__length').classList.remove('active')
            } 
               
        })

    },


};

document.addEventListener('DOMContentLoaded', app.init);