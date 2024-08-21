function updateWishlistBadge() {
  const wishlistbadge = document.getElementById("wishlist-badge");
  let wishData = JSON.parse(localStorage.getItem("wishlist")) || [];
  wishlistbadge.setAttribute("wishitem-count", wishData.length);
  wishlistbadge.innerHTML = wishData.length; 
}

function addTowishlist(productId) {
  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  const product = products.find((p) => p.id === productId);

  const existingProduct = wishlist.find((p) => p.id === productId);

  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    wishlist.push({ ...product, quantity: 1 });
  }

  localStorage.setItem("wishlist", JSON.stringify(wishlist));
  updateWishlistBadge();
}

function displaywishlist() {
  const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  const prodTable = document.getElementById("prodTable");
  prodTable.innerHTML = ""; 
  console.log(wishlist);

  wishlist.forEach((item, index) => {
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
          </td>
          <td>
            <button class="btn" onclick="removeFromwishlist(${item.id})">
              <i class="fa-solid fa-trash fa-2x"></i>
            </button>
          </td>
  
      `;
    prodTable.appendChild(row);
  });
}

// Function to update quantity
function updateQuantity(productId, change) {
  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  const product = wishlist.find((p) => p.id === productId);

  if (product) {
    product.quantity += change;
    if (product.quantity <= 0) {
      wishlist = wishlist.filter((p) => p.id !== productId);
    }
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    displaywishlist();
    // updateWishlistBadge();
  }
}

// Function to remove an item from the wishlist
function removeFromwishlist(productId) {
  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  wishlist = wishlist.filter((p) => p.id !== productId);
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
  displaywishlist();
  updateWishlistBadge();
}
updateWishlistBadge();
