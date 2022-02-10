import myTemplate from "./footer.hbs";



(function(){
  'use strict'
  


  function createFooterHTML() {
    const footerContainer = document.getElementById("cmp-footer");
    footerContainer.innerHTML = myTemplate();
  }

  function init(){
    createFooterHTML();
  }

  init();

})()
