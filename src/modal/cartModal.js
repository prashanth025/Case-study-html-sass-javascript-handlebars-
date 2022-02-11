import cartListHelper from './cartListHelper.hbs';


(function () {
    'use strict'


    const createCartlistModalHtml = () => {
        let cartsContainer = document.getElementById('cart-items-modal');
        let cartBtn = document.querySelectorAll('.cart-Items');

        if (cartsContainer) {
            let modal, cloaseBtn;
            cartBtn.forEach(element => {
                element.addEventListener('click', function () {
                    const cartListItems = [];
                    let cartListObject = {
                        cartListItems: cartListItems,
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
                            cartListObject.totalAmount = getTotalAmount(cartListItems);
                            cartsContainer.innerHTML = cartListHelper(cartListObject);
                            modal = document.getElementById("modal");
                            modal.style.display = "block";
                            let elmt = cartsContainer.querySelectorAll('.counter');
                            for (let i = 0; i < elmt.length; i++) {
                                elmt[i].addEventListener('click', counter.bind(elmt[i]));
                            }
                            cloaseBtn = modal.querySelector(".close");
                            cloaseBtn.addEventListener('click', cloaseModal)

                        });

                })
            });
            const cloaseModal = () => {
                modal.style.display = "none";
            }
            const getTotalAmount = (cartItems) => {
                let initialValue = 0;
                let sumAmount = cartItems.reduce(
                    (previousValue, currentValue) => previousValue + currentValue.price
                    , initialValue
                )
                return sumAmount;
            }

            let itemCount = 1;
            function counter() {

                let cartItemElement = this.closest('.cart-item');
                let clickedEvent = this.getAttribute('data-event');
                if (clickedEvent == 'sub') {
                    (itemCount == 1) ? (itemCount = 1) : itemCount--;
                } else {
                    itemCount++
                }
                let itemAmt = itemCount * Number(this.getAttribute('data-item-price'));
                cartItemElement.querySelector('.cart-item-amt').innerHTML = 'Rs.' + ((itemAmt < 0) ? 0 : itemAmt);

            }
        }
    }

    function init() {
        createCartlistModalHtml();
    }

    init();

})()