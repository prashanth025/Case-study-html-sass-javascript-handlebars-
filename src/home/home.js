
import categories from '../../server/categories/index.get.json'
import categoriesTemplate from "./homeHelper.hbs";


(function () {
    'use strict'

    const templateObject = {
        categories: categories
    }

    const createCategoriesHTML = () => {
        let categories = document.getElementById('product-categories');
        if(categories) {
        categories.innerHTML = categoriesTemplate(templateObject);
        }
    }


    function init() {
        createCategoriesHTML();
        let exploreButton = document.querySelectorAll('.product-categories-btn');
        exploreButton.forEach(function (categorie, index) {
            categorie.addEventListener('click', function (e) {
                window.location.href = "products.html?page=" + this.getAttribute('data-key');;
            })
        })
    }

    init();

})()
