import myTemplate from "./signInHelper.hbs";



(function () {
    'use strict'
    const petsContainer = document.getElementById("cmp-signIn");
    const createSignInHTML = () => {
        if (petsContainer) {
            petsContainer.innerHTML = myTemplate();
        }
    }


    function init() {
        if (petsContainer) {
            createSignInHTML();
        }
    }

    init();

})()
