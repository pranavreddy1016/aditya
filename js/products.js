let cart = JSON.parse(localStorage.getItem("reddyCart")) || [];

const cartModal =
    new bootstrap.Modal(
        document.getElementById("cartModal")
    );

const checkoutModal =
    new bootstrap.Modal(
        document.getElementById("checkoutModal")
    );

const successModal =
    new bootstrap.Modal(
        document.getElementById("successModal")
    );


const cartCount =
    document.getElementById("cartCount");

const cartItems =
    document.getElementById("cartItems");

const emptyCart =
    document.getElementById("emptyCart");

const subtotalElement =
    document.getElementById("subtotal");

const deliveryElement =
    document.getElementById("delivery");

const totalElement =
    document.getElementById("total");

const checkoutTotal =
    document.getElementById("checkoutTotal");



let DELIVERY_CHARGE = 20;



function saveCart() {

    localStorage.setItem(
        "reddyCart",
        JSON.stringify(cart)
    );

}
function calculateSubtotal() {

    let subtotal = 0;

    cart.forEach(function (product) {

        subtotal +=
            product.price * product.quantity;
    });
    
    return subtotal;
    
}

function calculateItems() {
    let items = 0;
    cart.forEach(function (product) {
        items += product.quantity;
    });
    return items;
}

function calculateTotal() {
    const subtotal =
        calculateSubtotal();
    if (subtotal === 0) {
        return 0;
    }
    if(subtotal>1000){
        DELIVERY_CHARGE=0;

    }
    else{
        DELIVERY_CHARGE=20;
    }
    return subtotal + DELIVERY_CHARGE;
}


function updateCartCount() {

    cartCount.textContent =
        calculateItems();

}

function displayCart() {

    cartItems.innerHTML = "";


    if (cart.length === 0) {

        emptyCart.style.display = "block";

    }
    else {

        emptyCart.style.display = "none";


        cart.forEach(function (product, index) {

            const item =
                document.createElement("div");

            item.className = "cart-product";


            item.innerHTML = `

                <img src="${product.image}"
                     alt="${product.name}">


                <div class="cart-product-info">

                    <h6>
                        ${product.name}
                    </h6>

                    <strong class="text-success">
                        ₹${product.price}
                    </strong>


                    <div class="quantity-box mt-2">

                        <button
                            onclick="decreaseQuantity(${index})">

                            −

                        </button>


                        <span>
                            ${product.quantity}
                        </span>


                        <button
                            onclick="increaseQuantity(${index})">

                            +

                        </button>

                    </div>

                </div>


                <button
                    class="remove-product"
                    onclick="removeProduct(${index})">

                    <i class="bi bi-trash"></i>

                </button>

            `;


            cartItems.appendChild(item);

        });

    }


    updateSummary();

}


function updateSummary() {

    const subtotal =
        calculateSubtotal();

    const total =
        calculateTotal();


    subtotalElement.textContent =
        "₹" + subtotal;

    if (subtotal === 0) {

        deliveryElement.textContent =
            "₹0";

    }
    else {

        deliveryElement.textContent =
            "₹" + DELIVERY_CHARGE;

    }


    totalElement.textContent =
        "₹" + total;


    checkoutTotal.textContent =
        "₹" + total;


    updateCartCount();

}

document.querySelectorAll(".add-btn")
    .forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const name =
                    button.dataset.name;

                const price =
                    Number(button.dataset.price);

                const image =
                    button.dataset.image;

                const existingProduct =
                    cart.find(function (product) {

                        return product.name === name;

                    });


                if (existingProduct) {

                    existingProduct.quantity++;

                }
                else {

                    cart.push({

                        name: name,

                        price: price,

                        image: image,

                        quantity: 1

                    });

                }
                saveCart();
                displayCart();

                const oldText =
                    button.innerHTML;


                button.innerHTML =
                    '<i class="bi bi-check"></i> Added';


                setTimeout(function () {

                    button.innerHTML =
                        oldText;

                }, 800);

            }
        );

    });


function increaseQuantity(index) {

    cart[index].quantity++;

    saveCart();

    displayCart();

}


function decreaseQuantity(index) {

    cart[index].quantity--;


    if (cart[index].quantity <= 0) {

        cart.splice(index, 1);

    }


    saveCart();

    displayCart();

}

function removeProduct(index) {

    cart.splice(index, 1);

    saveCart();

    displayCart();

}

document.getElementById("openCart")
    .addEventListener("click", function () {

        displayCart();

        cartModal.show();

    });


document.getElementById("checkoutBtn")
    .addEventListener("click", function () {

        if (cart.length === 0) {

            alert(
                "Your cart is empty. Please add products first."
            );

            return;

        }


        checkoutTotal.textContent =
            "₹" + calculateTotal();


        cartModal.hide();

        checkoutModal.show();

    });

document.getElementById("checkoutForm")
    .addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            const name =
                document.getElementById(
                    "customerName"
                ).value.trim();


            const phone =
                document.getElementById(
                    "customerPhone"
                ).value.trim();


            const address =
                document.getElementById(
                    "customerAddress"
                ).value.trim();


            const paymentMethod =
                document.querySelector(
                    'input[name="paymentMethod"]:checked'
                );


            if (name === "") {

                alert("Please enter your name.");

                return;

            }


            if (!/^[0-9]{10}$/.test(phone)) {

                alert(
                    "Please enter a valid 10-digit mobile number."
                );

                return;

            }

            if (address === "") {

                alert(
                    "Please enter your delivery address."
                );

                return;

            }


            if (!paymentMethod) {

                alert(
                    "Please select a payment method."
                );
                return;

            }

            if (paymentMethod.value === "cod") {

                placeCODOrder(
                    name,
                    phone,
                    address
                );

            }

            if (paymentMethod.value === "online") {

                startOnlinePayment(
                    name,
                    phone,
                    address
                );

            }

        }
    );



function placeCODOrder(
    name,
    phone,
    address
) {

    const orderId =
        "ORD" +
        Date.now();
    const amount =
        calculateTotal();
    checkoutModal.hide();



    document.getElementById(
        "successText"
    ).innerHTML = `

        Thank you,
        <strong>${name}</strong>!

        <br><br>

        Your order has been placed.

        <br>

        <strong>Order ID:</strong>
        ${orderId}

        <br>

        <strong>Amount:</strong>
        ₹${amount}

        <br>

        <strong>Payment:</strong>
        Cash on Delivery

    `;


    successModal.show();
    cart = [];

    saveCart();

    displayCart();

}


function startOnlinePayment(
    name,
    phone,
    address
) {

    const amount =
        calculateTotal();

    const options = {

        key: "rzp_test_YOUR_KEY_ID",

        amount: amount * 100,

        currency: "INR",

        name: "Reddy Store",

        description: "Product Purchase",

        image: "/images/logo.png",


        handler: function (response) {

            onlinePaymentSuccess(
                name,
                phone,
                address,
                response
            );

        },


        prefill: {

            name: name,

            contact: phone

        },


        notes: {

            address: address

        },


        theme: {

            color: "#198754"

        }

    };


    const razorpay =
        new Razorpay(options);


    razorpay.open();

}



function onlinePaymentSuccess(
    name,
    phone,
    address,
    paymentResponse
) {

    const orderId =
        "ORD" +
        Date.now();


    const amount =
        calculateTotal();


    checkoutModal.hide();


    document.getElementById(
        "successText"
    ).innerHTML = `

        Thank you,
        <strong>${name}</strong>!

        <br><br>

        Your online payment was completed.

        <br>

        <strong>Order ID:</strong>
        ${orderId}

        <br>

        <strong>Amount:</strong>
        ₹${amount}

        <br>

        <strong>Payment ID:</strong>
        ${paymentResponse.razorpay_payment_id}

    `;


    successModal.show();

    cart = [];

    saveCart();

    displayCart();

}


document.getElementById("searchInput")
    .addEventListener(
        "input",
        function () {

            const search =
                this.value.toLowerCase();


            document.querySelectorAll(
                ".product-wrapper"
            ).forEach(function (product) {

                const name =
                    product.dataset.name
                        .toLowerCase();


                if (
                    name.includes(search)
                ) {

                    product.style.display =
                        "";
                }
                else {

                    product.style.display =
                        "none";

                }

            });

        }
    );

document.querySelectorAll(".category-btn")
    .forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const category =
                    button.dataset.category;


                /* Button design */

                document.querySelectorAll(
                    ".category-btn"
                ).forEach(function (btn) {

                    btn.classList.remove(
                        "btn-success"
                    );

                    btn.classList.add(
                        "btn-outline-success"
                    );

                });


                button.classList.remove(
                    "btn-outline-success"
                );

                button.classList.add(
                    "btn-success"
                );


                /* Filter */

                document.querySelectorAll(
                    ".product-wrapper"
                ).forEach(function (product) {

                    if (
                        category === "all" ||
                        product.dataset.category ===
                        category
                    ) {

                        product.style.display =
                            "";

                    }
                    else {

                        product.style.display =
                            "none";

                    }

                });

            }
        );

    });



displayCart();
