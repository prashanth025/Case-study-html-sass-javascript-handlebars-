
import banners from '../../server/banners/index.get.json'
import bannersTemplate from "./bannerHelper.hbs";

(function () {
    'use strict'
    const bannerContainer = document.getElementById("carousel-banner");
    const bannerObject = {
        banners: banners
    };
    let slideIndex = 1;

    const createBannerHTML = () => {
       if(bannerContainer){
        bannerContainer.innerHTML = bannersTemplate(bannerObject);
       }
    }


    const currentSlide = (n) => {
        showSlides(slideIndex = n);
    }

    const showSlides = (n) => {
        let i;
        let slides = document.getElementsByClassName("mySlides");
        let dots = document.getElementsByClassName("dot");
        if (n > slides.length) { slideIndex = 1 }
        if (n < 1) { slideIndex = slides.length }
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }
        slides[slideIndex - 1].style.display = "block";
        dots[slideIndex - 1].className += " active";
    }

    function init() {
        if (banners.length && bannerContainer) {
            createBannerHTML();
            showSlides(slideIndex);
            let dots = document.querySelectorAll('.dot');
            for (let i = 0; i < dots.length; i++) {
                dots[i].addEventListener('click', function (e) {
                    currentSlide(this.getAttribute('data-index'))
                })
            }
        }

    }

    init();

})()
