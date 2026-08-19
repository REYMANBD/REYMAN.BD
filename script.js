
// REYMAN.BD Cart System

let cart = JSON.parse(localStorage.getItem("reymanCart")) || [];


// Add product to cart
function addToCart(name, price) {

    const product = {
        name: name,
        price: price
    };

    cart.push(product);

    localStorage.setItem("reymanCart", JSON.stringify(cart));

    alert(name + " added to cart!");
}


// Contact button
function contactUs() {

    alert("Thank you for contacting REYMAN.BD!");

}
