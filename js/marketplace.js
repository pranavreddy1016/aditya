// Comprehensive Flipkart-Inspired Agricultural Database (Vegetables, Fruits, Crops)
const agriculturalProductsDatabase = [
    // === 1. VEGETABLES CATEGORY ===
    { id: "v1", category: "vegetables", title: "Fresh Potato (Alloo)", price: 28, oldPrice: 38, discount: "26% OFF", unit: "1 kg", icon: "bi-circle-fill" },
    { id: "v2", category: "vegetables", title: "Hybrid Capsicum (Shimla Mirch)", price: 49, oldPrice: 70, discount: "30% OFF", unit: "500 g", icon: "bi-capslock-fill" },
    { id: "v3", category: "vegetables", title: "Local Red Onion (Pyaaz)", price: 35, oldPrice: 45, discount: "22% OFF", unit: "1 kg", icon: "bi-record-circle" },
    { id: "v4", category: "vegetables", title: "Organic Desi Tomato", price: 32, oldPrice: 50, discount: "36% OFF", unit: "1 kg", icon: "bi-heart-fill" },
    { id: "v5", category: "vegetables", title: "Fresh Cauliflower (Gobhi)", price: 40, oldPrice: 60, discount: "33% OFF", unit: "1 Piece", icon: "bi-cloud-sun-fill" },
    { id: "v6", category: "vegetables", title: "Green Chilli (Hari Mirch)", price: 15, oldPrice: 25, discount: "40% OFF", unit: "200 g", icon: "bi-lightning-fill" },

    // === 2. ORCHARD FRUITS CATEGORY ===
    { id: "f1", category: "fruits", title: "Kashmiri Apple (Royal Delicious)", price: 140, oldPrice: 199, discount: "29% OFF", unit: "1 kg", icon: "bi-apple" },
    { id: "f2", category: "fruits", title: "Premium Robusta Banana", price: 45, oldPrice: 60, discount: "25% OFF", unit: "1 Dozen", icon: "bi-calendar-range" },
    { id: "f3", category: "fruits", title: "Nagpur Sweet Orange (Santra)", price: 79, oldPrice: 110, discount: "28% OFF", unit: "1 kg", icon: "bi-brightness-high-fill" },
    { id: "f4", category: "fruits", title: "Pomegranate (Anar)", price: 180, oldPrice: 240, discount: "25% OFF", unit: "1 kg", icon: "bi-gem" },
    { id: "f5", category: "fruits", title: "Green Seedless Grapes", price: 90, oldPrice: 130, discount: "30% OFF", unit: "500 g", icon: "bi-grid-3x3-gap-fill" },

    // === 3. STAPLES & CASH CROPS CATEGORY ===
    { id: "c1", category: "crops", title: "Premium Basmati Rice (Rozana Yield)", price: 95, oldPrice: 135, discount: "29% OFF", unit: "1 kg", icon: "bi-moisture" },
    { id: "c2", category: "crops", title: "Organic Unpolished Toor Dal", price: 155, oldPrice: 190, discount: "18% OFF", unit: "1 kg", icon: "bi-grain" },
    { id: "c3", category: "crops", title: "Sharbati Whole Wheat Flour (Atta)", price: 48, oldPrice: 60, discount: "20% OFF", unit: "1 kg", icon: "bi-database-fill" },
    { id: "c4", category: "crops", title: "Pure Mustard Oil (Kachi Ghani)", price: 165, oldPrice: 195, discount: "15% OFF", unit: "1 Litre", icon: "bi-droplet-fill" },
    { id: "c5", category: "crops", title: "Desi Chickpeas (Kala Chana)", price: 85, oldPrice: 110, discount: "22% OFF", unit: "1 kg", icon: "bi-suit-club-fill" }
];

// Persistent state management matrix 
let shoppingBasketMemory = [];

// RENDER PRODUCTS DIRECTLY TO USER WORKSPACE CONTAINER
function renderCatalogGrid(itemsArray) {
    const $grid = $('#marketCatalogGrid');
    $grid.empty();

    if (itemsArray.length === 0) {
        $grid.html('<div class="empty-state-msg" style="grid-column: 1/-1;">No farm produce matching your criteria found.</div>');
        return;
    }

    itemsArray.forEach(product => {
        const itemHtmlCardTemplate = `
            <div class="product-card" data-category="${product.category}">
                <div>
                    <div class="product-image-box">
                        <span class="badge-tag">Farm Fresh</span>
                        <i class="bi ${product.icon}" style="font-size: 2.5rem; color: #4caf50;"></i>
                    </div>
                    <h4 class="product-title">${product.title}</h4>
                    <p class="product-unit">Pack Volume: ${product.unit}</p>
                </div>
                <div>
                    <div class="product-pricing">
                        <span class="current-price">₹${product.price}</span>
                        <span class="original-price">₹${product.oldPrice}</span>
                        <span class="discount-pct">${product.discount}</span>
                    </div>
                    <button class="add-to-cart-btn" onclick="addItemToBasketPipeline('${product.id}')">
                        <i class="bi bi-cart-plus"></i> Add Item
                    </button>
                </div>
            </div>
        `;
        $grid.append(itemHtmlCardTemplate);
    });
}

// ARITHMETIC CART SYSTEM MODULATION
function calculateCartTotals() {
    const totalItemsCount = shoppingBasketMemory.length;
    $('#globalCartCount').text(totalItemsCount);

    const $cartBody = $('#cartItemsListContainer');
    $cartBody.empty();

    if (totalItemsCount === 0) {
        $cartBody.html('<div class="empty-state-msg">Your shopping basket is empty. Add farm produce to get started!</div>');
        $('#cartSubtotalAmount').text('₹0.00');
        $('#cartFinalPayableAmount').text('₹0.00');
        return;
    }

    let aggregatedSubtotalAmount = 0;

    shoppingBasketMemory.forEach((basketItem, itemIndex) => {
        aggregatedSubtotalAmount += basketItem.price;

        const rowItemHtmlTemplate = `
            <div class="cart-row-item">
                <div class="cart-item-details">
                    <h4>${basketItem.title}</h4>
                    <p>₹${basketItem.price} | Volume: ${basketItem.unit}</p>
                </div>
                <button class="remove-item-btn" onclick="removeItemFromBasketByIndex(${itemIndex})">
                    <i class="bi bi-trash3"></i>
                </button>
            </div>
        `;
        $cartBody.append(rowItemHtmlTemplate);
    });

    const flatDeliveryChargeDiscount = totalItemsCount > 0 ? 30 : 0;
    const computedFinalPayable = Math.max(0, aggregatedSubtotalAmount - flatDeliveryChargeDiscount);

    $('#cartSubtotalAmount').text(`₹${aggregatedSubtotalAmount}.00`);
    $('#cartFinalPayableAmount').text(`₹${computedFinalPayable}.00`);
}

function addItemToBasketPipeline(productIdString) {
    const targetedProductRecord = agriculturalProductsDatabase.find(p => p.id === productIdString);
    if (targetedProductRecord) {
        shoppingBasketMemory.push(targetedProductRecord);
        calculateCartTotals();
    }
}

function removeItemFromBasketByIndex(targetIndexPosition) {
    shoppingBasketMemory.splice(targetIndexPosition, 1);
    calculateCartTotals();
}

function triggerOrderPlacement() {
    if (shoppingBasketMemory.length === 0) {
        alert("Your cart is empty!");
        return;
    }
    alert("Order Transmitted Directly to Farmers! Logistics network has been pinged for batch collection.");
    shoppingBasketMemory = [];
    calculateCartTotals();
    $('#shoppingCartDrawer').removeClass('drawer-open');
}

// JQUERY RUNTIME INTERACTION HANDLERS
$(document).ready(function() {
    // Primary startup execution
    renderCatalogGrid(agriculturalProductsDatabase);

    // Sidebar Category Filter Logic
    $('#categoryFilterContainer .filter-item').on('click', function() {
        $('#categoryFilterContainer .filter-item').removeClass('active-link');
        $(this).addClass('active-link');

        const pickedCategoryCode = $(this).data('category');
        $('#catalogViewHeading').text($(this).text());

        if (pickedCategoryCode === 'all') {
            renderCatalogGrid(agriculturalProductsDatabase);
        } else {
            const filteredResults = agriculturalProductsDatabase.filter(p => p.category === pickedCategoryCode);
            renderCatalogGrid(filteredResults);
        }
    });

    // Real-Time Search Bar Parsing Engine 
    $('#catalogSearchInput').on('input', function() {
        const textSearchQueryString = $(this).val().toLowerCase().trim();
        const filteredSearchQueryMatches = agriculturalProductsDatabase.filter(product => {
            return product.title.toLowerCase().includes(textSearchQueryString) || 
                   product.category.toLowerCase().includes(textSearchQueryString);
        });
        renderCatalogGrid(filteredSearchQueryMatches);
    });

    // Toggle Modal Drawer Actions
    $('#cartToggleBtn').on('click', function() {
        $('#shoppingCartDrawer').addClass('drawer-open');
    });

    $('#closeCartBtn').on('click', function() {
        $('#shoppingCartDrawer').removeClass('removeClass', 'drawer-open').removeClass('drawer-open');
    });
});

