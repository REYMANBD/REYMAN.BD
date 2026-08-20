
// ========================================
// REYMAN.BD
// SUPABASE + PRODUCT + CART SYSTEM
// ========================================


// ========================================
// SUPABASE CONNECTION
// ========================================

const SUPABASE_URL =
    "https://yrrhcxhjqttyjwdelkyb.supabase.co";

const SUPABASE_KEY =
    
"sb_publishable_7VPqTiccK6qEycDOMSprvA_AZ2ncp8k"

const supabaseClient =
    supabase.createClient(
        SUPABASE_URL,
        SUPABASE_KEY
    );


// ========================================
// CART
// ========================================

let cart =
    JSON.parse(
        localStorage.getItem("reymanCart")
    ) || [];


// ========================================
// LOAD PRODUCTS
// ========================================

async function loadProducts() {

    const container =
        document.getElementById(
            "productContainer"
        );

    const loading =
        document.getElementById(
            "productLoading"
        );


    if (!container) {
        return;
    }


    const { data, error } =
        await supabaseClient
            .from("products")
            .select("*")
            .order("created_at", {
                ascending: false
            });


    if (error) {

        console.error(
            "Product loading error:",
            error
        );

        loading.innerText =
            "Unable to load products.";

        return;
    }


    loading.innerText = "";


    if (!data || data.length === 0) {

        loading.innerText =
            "No products available.";

        return;
    }


    container.innerHTML = "";


    data.forEach(function(product) {

        const card =
            document.createElement("div");

        card.className =
            "product-card";


        let imageHTML = "";


        if (product.image_path) {

            imageHTML = `
                <img
                    src="${product.image_path}"
                    alt="${escapeHTML(product.name)}"
                    class="product-image"
                >
            `;

        } else {

            imageHTML = `
                <div class="product-image">
                    🛍️
                </div>
            `;

        }


        let oldPriceHTML = "";


        if (product.Old_price) {

            oldPriceHTML = `
                <del>
                    ৳ ${product.Old_price}
                </del>
            `;

        }


        card.innerHTML = `

            ${imageHTML}

            <h3>
                ${escapeHTML(product.name)}
            </h3>

            <p>
                ${escapeHTML(
                    product.description || ""
                )}
            </p>

            <div>

                ${oldPriceHTML}

                <strong>
                    ৳ ${product.price}
                </strong>

            </div>

            <button
                onclick="addProductToCart(
                    '${product.id}'
                )"
            >
                Add to Cart
            </button>

        `;


        container.appendChild(card);

    });

}


// ========================================
// ADD PRODUCT TO CART
// ========================================

function addProductToCart(productId) {

    const productIdNumber =
        Number(productId);


    getProductAndAddToCart(
        productIdNumber
    );

}


async function getProductAndAddToCart(productId) {

    const { data: product, error } =
        await supabaseClient
            .from("products")
            .select("*")
            .eq("id", productId)
            .single();


    if (error) {

        console.error(
            "Cart product error:",
            error
        );

        alert(
            "Could not add product to cart."
        );

        return;
    }


    const cartProduct = {

        id: product.id,

        name: product.name,

        price: Number(product.price),

        old_price:
            product.Old_price
                ? Number(product.Old_price)
                : null,

        category: product.category,

        description: product.description,

        image_path: product.image_path,

        stock:
            product.stock ?? 0

    };


    cart.push(cartProduct);


    localStorage.setItem(
        "reymanCart",
        JSON.stringify(cart)
    );


    alert(
        product.name +
        " added to cart!"
    );

}


// ========================================
// OLD addToCart FUNCTION
// ========================================

function addToCart(name, price) {

    const product = {

        name: name,

        price: Number(price)

    };


    cart.push(product);


    localStorage.setItem(
        "reymanCart",
        JSON.stringify(cart)
    );


    alert(
        name +
        " added to cart!"
    );

}


// ========================================
// CONTACT
// ========================================

function contactUs() {

    alert(
        "Thank you for contacting REYMAN.BD!"
    );

}


// ========================================
// BASIC HTML ESCAPE
// ========================================

function escapeHTML(value) {

    const div =
        document.createElement("div");

    div.textContent =
        value == null
            ? ""
            : String(value);

    return div.innerHTML;

}


// ========================================
// START
// ========================================

loadProducts();
