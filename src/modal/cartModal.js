import cartListHelper from './cartListHelper.hbs'

(function () {
    'use strict'


    const createCartlistModalHtml = () => {
        let cartsContainer = document.getElementById('cart-items-modal');
        let cartBtn = document.querySelectorAll('.cart-Items');
        
        if (cartsContainer) {
            let modal, cloaseBtn, res;
            cartBtn.forEach(element => {
                element.addEventListener('click', function () {
                    const cartListItems = [];
                    console.log("this", this);
                    let cartListObject = {
                        cartListItems: cartListItems
                    };
                    let productIDs = JSON.parse(localStorage.getItem("products") || "[]");
                    import('../../server/products/index.get.json')
                        .then((response) => {
                            for (let i = 0; i < productIDs.length; i++) {
                                Array.from(response).find((item) => {
                                    if (item.id == productIDs[i]) {
                                        cartListItems.push(item)
                                    }

                                });
                            }
                            cartListObject.cartListItems = cartListItems;
                            cartsContainer.innerHTML = cartListHelper(cartListObject);
                            modal = document.getElementById("modal");
                            modal.style.display = "block";
                            cartsContainer.querySelectorAll('.counter').forEach(function(element){
                                console.log("this", this)
                                element.addEventListener('click', counter);
                            });
                            cloaseBtn = modal.querySelector(".close");
                            cloaseBtn.addEventListener('click', cloaseModal)

                        });

                })
            });
            const cloaseModal = () => {
                console.log(this);

                modal.style.display = "none";
            }
            const counter = (e) => {
                console.log(e);
            }
        }
    }

    function init() {
        createCartlistModalHtml();
    }

    init();

})()