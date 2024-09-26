function updateWishlistBadge() {
  const wishlistBadges = document.querySelectorAll(
    "[data-wishlist-badge='true']"
  );
  let wishlistData = JSON.parse(localStorage.getItem("wishlist")) || [];
  console.log("Wishlist Data on updateBadge:", wishlistData);

  wishlistBadges.forEach((badge) => {
    badge.innerHTML = wishlistData.length;
  });
}

function addToWishlist(productId) {
  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  const product = products.find((p) => p.id === productId);

  if (!product) {
    console.error(`Product with ID ${productId} not found`);
    return;
  }

  const existingProduct = wishlist.find((p) => p.id === productId);

  if (!existingProduct) {
    wishlist.push({ ...product });
    Swal.fire({
      icon: "success",
      title: "Added to Wishlist!",
      text: "The product has been successfully added to your wishlist.",
      confirmButtonText: "Continue Browsing",
    });
  } else {
    console.log(`Product with ID ${productId} is already in the wishlist`);
    Swal.fire({
      icon: "info",
      title: "Already in Wishlist",
      text: "This product is already in your wishlist.",
      confirmButtonText: "OK",
    });
  }

  localStorage.setItem("wishlist", JSON.stringify(wishlist));
  console.log("Wishlist Data after adding:", wishlist);
  updateWishlistBadge();
}

function displayWishlist() {
  const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  console.log("Wishlist Data on display:", wishlist);
  const wishlistTable = document.getElementById("wishlistTable");

  if (!wishlistTable) {
    console.error("Wishlist table element not found");
    return;
  }

  wishlistTable.innerHTML = "";

  if (wishlist.length === 0) {
    wishlistTable.innerHTML = `<tr><td colspan="4">No items in the wishlist</td></tr>`;
    return;
  }

  wishlist.forEach((item, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>
        <a href="productDetail.html?id=${item.id}">
          <img src="${item.images[0]}" alt="${
      item.name
    }" class="img img-fluid img-thumbnail p-0 me-3">
          ${item.name}
        </a>
      </td>
      <td>Pkr ${item.variations[0].price}</td>
      <td>
        <button class="btn" onclick="removeFromWishlist(${item.id})">
          <i class="fa-solid fa-trash fa-2x"></i>
        </button>
      </td>
    `;
    wishlistTable.appendChild(row);
  });
}

function removeFromWishlist(productId) {
  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  wishlist = wishlist.filter((p) => p.id !== productId);
  localStorage.setItem("wishlist", JSON.stringify(wishlist));
  console.log("Wishlist Data after removing:", wishlist);
  displayWishlist();
  updateWishlistBadge();
}
