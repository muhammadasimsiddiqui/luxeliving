// Header Scroll
let nav = document.querySelector("header");
window.onscroll = function () {
  if (document.documentElement.scrollTop > 50) {
    nav.classList.add("navbar-shadow");
  } else {
    nav.classList.remove("navbar-shadow");
  }
};

//NavBar Add And Remove Active Classes

document.addEventListener("DOMContentLoaded", function () {
  const currentPage = window.location.pathname.toLowerCase();
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    const linkPathname = new URL(link.href).pathname.toLowerCase();
    const hasDropdown =
      link.nextElementSibling &&
      link.nextElementSibling.classList.contains("dropdown-menu");
    if (currentPage === linkPathname && !hasDropdown) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
});

//
fetch("src/json/product.json")
  .then((response) => response.json())
  .then((data) => {
    const products = data; // Assign the fetched data to the products array
    const productList = document.getElementById("productList"); // Get the datalist element

    products.forEach((product) => {
      const option = document.createElement("option");
      option.value = product.name;
      option.dataset.id = product.id; // Store the product ID in a data attribute
      productList.appendChild(option);
    });

    // Redirect to the product detail page when a product is selected
    document.getElementById("input").addEventListener("change", function (e) {
      const selectedOption = [...productList.options].find(
        (option) => option.value === e.target.value
      );

      if (selectedOption) {
        const productId = selectedOption.dataset.id;
        window.location.href = `productDetail.html?id=${productId}`;
      }
    });
  })
  .catch((error) => {
    console.error("Error fetching the product data:", error);
  });

// Counter
let targetElements = document.querySelectorAll(".digit-box");
let animationtimming = 0.0001;

targetElements.forEach((targetElement) => {
  let ValueOne = 0;
  let ValueTwo = parseInt(targetElement.getAttribute("data-value"));
  let timing = Math.floor(animationtimming / ValueTwo);
  let Counter = setInterval(function () {
    ValueOne += 1;
    targetElement.textContent = ValueOne;
    if (ValueOne == ValueTwo) {
      clearInterval(Counter);
    }
  }, timing);
});

// Change Page Shop
function shop() {
  window.location.href = "shop.html";
}
function about() {
  window.location.href = "about.html";
}

// Contact Form
function formsubmition() {
  window.location.href = "mailto:info.muhammadasimsiddiqui@gmail.com";
  document.getElementById("myForm").reset();
  return false;
}

function addtocartform() {
  // Show SweetAlert dialog
  Swal.fire({
    title:
      "<p>Order Has Been Successfully Placed.</p> <h4>Thanks For Choosing Us!</h4>",
    text: "",
    icon: "success",
    confirmButtonText: "Continue Shopping",
    customClass: {
      confirmButton: "main-btn",
    },
  }).then((result) => {
    result.isconfirmed((window.location.href = "shop.html"));
  });

  return false;
}
