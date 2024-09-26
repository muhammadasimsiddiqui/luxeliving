// Scrolling Effect and Fixed Header Or scroll listener to header
function attachScrollListener() {
  const nav = document.getElementById("luxeHeader");
  window.addEventListener("scroll", function () {
    if (document.documentElement.scrollTop > 50) {
      nav.classList.add("navbar-shadow", "sticky-top");
    } else {
      nav.classList.remove("navbar-shadow");
    }
  });
}

// Active Class Navigations
function headerNavhover() {
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
}

// SearchBar Initialization
function initializeSearchBar() {
  fetch("src/json/product.json")
    .then((response) => response.json())
    .then((data) => {
      const searchBarproducts = data;
      const searchBarProductlist = document.getElementById("searchbarprolist");

      searchBarproducts.forEach((product) => {
        const option = document.createElement("option");
        option.value = product.name;
        option.dataset.id = product.id;
        searchBarProductlist.appendChild(option);
      });

      document
        .getElementById("searchbar")
        .addEventListener("change", function (e) {
          const selectedOption = [...searchBarProductlist.options].find(
            (option) => option.value === e.target.value
          );
          if (selectedOption) {
            const productId = selectedOption.dataset.id;
            window.location.href = `productDetail.html?id=${productId}`;
          }
        });
    });
}

// Load Footer Component
function loadFooter() {
  fetch("components/footer.html")
    .then((response) => response.text())
    .then((html) => {
      document.getElementById("luxefooter").innerHTML = html;
      initializeFooter();
    });
}

// Handle Checkout
function handleCheckout() {
  if (!sessionStorage.getItem("isLogin")) {
    Swal.fire({
      icon: "warning",
      title: "Please Signup/Login",
      text: "You need to signup or login to proceed with the checkout.",
    }).then(() => {
      window.location.href = "login.html"; // Redirect to login page
    });
  } else {
    localStorage.removeItem("cart");
    Swal.fire({
      icon: "success",
      title: "Order Processed",
      text: "Your order has been processed successfully!",
    }).then(() => {
      window.location.href = "index.html"; // Redirect to homepage
    });
  }
}
