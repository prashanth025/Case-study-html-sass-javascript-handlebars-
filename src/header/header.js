import myTemplate from "./headerHelper.hbs";
import logo from '../images/logo.png';
import cartIcon from '../images/cart.svg';


(function(){
  'use strict'
  
  const headerObject = {
    headerLogo:logo,
    title:"This is header",
    cartIcon: cartIcon,
    menuItems:[
      {
        title:"Home",
        link:"index.html"
      },
      {
        title:"Products",
        link:"/products.html"
      }
    ],
    itemsCount:4
  }

  function createHeaderHTML() {
    var petsContainer = document.getElementById("cmp-header");
    petsContainer.innerHTML = myTemplate(headerObject);
  }

  function init(){
    createHeaderHTML();
  }

  init();

})()
