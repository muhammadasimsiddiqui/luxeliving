function updateCartBadge() {
  const cartBadges = document.querySelectorAll("[data-cart-badge='true']");
  let cartData = JSON.parse(localStorage.getItem("cart")) || [];

  cartBadges.forEach((badge) => {
    badge.innerHTML = cartData.length;
  });

  totalAmout();
}

function totalAmout() {
  let total = 0;
  let priceElements = document.querySelectorAll(".totalAmout");

  priceElements.forEach((element) => {
    const value = parseFloat(element.value);
    total += value;
  });
  console.log(total);
  let showTotal = document.getElementById("showTotal");
  let showTotal2 = document.getElementById("showTotal2");
  showTotal.textContent = `${total.toFixed(2)}`;
  showTotal2.textContent = total.toLocaleString();
}

function addToCart(productId) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const product = products.find((p) => p.id === productId);

  const existingProduct = cart.find((p) => p.id === productId);

  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartBadge();
  totalAmout();
}

function displayCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const prodTable = document.getElementById("prodTable");

  const CartItems = document.getElementById("itemsCount");
  let cartData = JSON.parse(localStorage.getItem("cart"));
  CartItems.innerHTML = "(" + cartData.length + " Items)";

  prodTable.innerHTML = ""; // Clear existing rows

  cart.forEach((item, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>
          ${index + 1}
        </td>
        <td>
          
          <a href="productDetail.html?id=${item.id}">
            <img src="${item.images[0]}" alt="${
      item.name
    }" class="img img-fluid img-thumbnail p-0 me-3">
            ${item.name}
          </a>
        </td>
        <td>
          Pkr ${item.variations[0].price}
        </td>
        <td>
          <div class="d-flex justify-content-center align-items-center">
            <button class="btn btn-light" onclick="updateQuantity(${
              item.id
            }, -1)">
              <i class="fa-solid fa-minus"></i>
            </button>
            <span class="mx-2">${item.quantity}</span>
            <button class="btn btn-light" onclick="updateQuantity(${
              item.id
            }, 1)">
              <i class="fa-solid fa-plus"></i>
            </button>
          </div>
        </td>
        <td>
          Pkr ${item.variations[0].price * item.quantity} /=
          <input type="text" hidden class="totalAmout" value="${
            item.variations[0].price * item.quantity
          }"/>
        </td>
        <td>
          <button class="btn" onclick="removeFromCart(${item.id})">
            <i class="fa-solid fa-trash fa-2x"></i>
          </button>
        </td>

    `;
    prodTable.appendChild(row);
  });
}

// Function to update quantity
function updateQuantity(productId, change) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const product = cart.find((p) => p.id === productId);

  if (product) {
    product.quantity += change;
    if (product.quantity <= 0) {
      cart = cart.filter((p) => p.id !== productId);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
    totalAmout();
    // updateCartBadge();
  }
}

// Function to remove an item from the cart
function removeFromCart(productId) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.filter((p) => p.id !== productId);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
  updateCartBadge();
  totalAmout();
}
updateCartBadge();
totalAmout();
