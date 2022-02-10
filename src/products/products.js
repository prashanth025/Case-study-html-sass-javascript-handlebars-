import apiUrls from '../constants';
import categories from '../../server/categories/index.get.json';
import products from '../../server/products/index.get.json';
import asideTemplate from './asideHelper.hbs';
import productsTemplate from './productsHelper.hbs';

(function () {
    'use strict'

    const sideNav = document.getElementById('sideNav');
    const productsContainer = document.getElementById('productsCards');
    const templateObj = {
        categories: categories,
        products: products
    }

    function createSidebarHTML() {
        sideNav.innerHTML = asideTemplate(templateObj);
        const allCategories = sideNav.querySelectorAll("ul li");

        for (let i = 0; i < allCategories.length; i++) {
            allCategories[i].addEventListener('click', function () {

                let itemId = this.getAttribute('data-item');
                categories.find(function (item, index) {
                    if (item.id === itemId) {
                        history.pushState(item, item.key, "?page=" + item.key);
                        history.pushState(item, item.key, "?page=" + item.key);
                        history.back();
                    }
                })
            })
        }
    }

    window.addEventListener("popstate", function (e) {
        setProducts(e.state);
    });

    function setProducts(state) {
        let fiterdProducts = products.filter(product => product.category == state.id)
        templateObj.products = fiterdProducts;
        createProductsContainerHtml(templateObj.products)
    }


    function createProductsContainerHtml() {
        productsContainer.innerHTML = productsTemplate(templateObj);
        productsContainer.querySelectorAll('.product_footer .button').forEach( element=>{
            element.addEventListener('click', function(){
                let productId =  this.getAttribute('data-item');
                let cartItems = JSON.parse(localStorage.getItem("products") || "[]");
                cartItems.push(productId);
                localStorage.setItem('products', JSON.stringify(cartItems));


            })
        })
    }

    function init() {
        if (sideNav) {
            createSidebarHTML();
        }
        if (productsContainer) {
            let locatioSearch = window.location.search;
            let urlParam = new URLSearchParams(locatioSearch);
            let pathParam = urlParam.get('page');
            if (pathParam) {
                let categorieID = categories.find((item, index) => item.key == pathParam );
                templateObj.products = products.filter(product => product.category == categorieID.id);
            }

            createProductsContainerHtml();

        }
    }

    init();

})()