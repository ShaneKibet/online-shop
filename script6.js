
const product = [
    { id: 0, image: 'gallery/floral with Tee.jpg', title: 'Dodger LA', price: 120 },
    { id: 1, image: 'gallery/dull floral tee.jpg', title: 'Floral Tee', price: 110 },
    { id: 2, image: 'gallery/green cotton tee.jpg', title: 'Beach Tee', price: 124 },
    { id: 3, image: 'gallery/should flower print.jpg', title: 'Miami Wear', price: 130 },
    { id: 4, image: 'gallery/LA Dodger Design.jpg', title: 'LA Dodger Design', price: 130 },
    { id: 5, image: 'gallery/atlan original T shirt.jpg', title: 'LA Dodger Design', price: 130 }
];

const categories = [...new Set(product.map(item => item))];

document.getElementById('root').innerHTML = categories.map((item, index) => {
    const { image, title, price } = item;
    return `
        <div class='box'>
            <div class='img-box'>
                <img class='images' src='${image}' alt='${title}'>
            </div>
            <div class='bottom'>
                <p>${title}</p>
                <h2>$${price}.00</h2>
                <button onclick='addToCart(${index})'>Add to cart</button>
            </div>
        </div>
    `;
}).join('');

let cart = [];

function addToCart(index) {
    const itemToAdd = categories[index];
    cart.push({ ...itemToAdd });
    displayCart();
    updateCartCount();
    updateTotal();
}

function displayCart() {
    if (cart.length === 0) {
        document.querySelector('.cartItem').innerHTML = "Your cart is empty";
    } else {
        document.querySelector('.cartItem').innerHTML = cart.map((item, j) => {
            const { image, title, price } = item;
            return `
                <div class='cart-item'>
                    <div class='row-img'>
                        <img class='rowimg' src='${image}' alt='${title}'>
                    </div>
                    <p style='font-size:12px;'>${title}</p>
                    <h2 style='font-size:15px;'>$${price}.00</h2>
                    <i class='fa fa-trash' onclick='delElement(${j})'></i>
                </div>
            `;
        }).join('');
    }
}

function delElement(index) {
    cart.splice(index, 1);
    displayCart();
    updateCartCount();
    updateTotal();
}

function updateCartCount() {
    const countElement = document.getElementById('count');
    if (countElement) {
        countElement.innerText = cart.length;
    }
}

function updateTotal() {
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    document.getElementById('total').innerText = `$${total}.00`;
}
