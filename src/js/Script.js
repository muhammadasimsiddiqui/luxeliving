// Initialize Dummy Users for Testing (run once)
function initializeDummyUsers() {
  if (!localStorage.getItem("users")) {
    const dummyUsers = [
      {
        username: "testuser",
        mobile: "1234567890",
        email: "test@example.com",
        password: "password123",
      },
      {
        username: "anotheruser",
        mobile: "0987654321",
        email: "another@example.com",
        password: "password456",
      },
    ];
    localStorage.setItem("users", JSON.stringify(dummyUsers));
  }
}
initializeDummyUsers();

// Load Header Component and Update Login Text
function loadHeader() {
  fetch("components/header.html")
    .then((response) => response.text())
    .then((html) => {
      document.getElementById("luxeHeader").innerHTML = html;
      attachScrollListener();
      headerNavhover();
      updateLoginText();

      updateWishlistBadge();
      updateCartBadge();
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

// Add scroll listener to header
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

// Update active class on navigation links
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

// Update login/logout text based on login state
function updateLoginText() {
  const logTextElements = document.querySelectorAll("#logtext, #logtext2");
  const isLoggedIn = sessionStorage.getItem("isLogin") === "true";

  logTextElements.forEach((el) => {
    el.textContent = isLoggedIn ? "Logout" : "Login";
  });
}

// Unified Authentication Handler
function handleAuth() {
  const isLoggedIn = sessionStorage.getItem("isLogin") === "true";
  const email = document.getElementById("email")
    ? document.getElementById("email").value
    : "";
  const password = document.getElementById("password")
    ? document.getElementById("password").value
    : "";

  if (isLoggedIn) {
    // Logout
    sessionStorage.clear();
    updateLoginText();
    console.log("User logged out. Button text updated to: Login");
    window.location.href = "index.html"; // Redirect to homepage or any relevant page
  } else {
    // Login
    if (!email || !password) {
      Swal.fire({
        icon: "error",
        title: "Incomplete Form",
        text: "Please fill out both fields.",
      });
      return;
    }

    const usersArray = JSON.parse(localStorage.getItem("users")) || [];
    const user = usersArray.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      Swal.fire({
        icon: "success",
        title: "Login Successful",
        text: "You have logged in successfully!",
      }).then(() => {
        sessionStorage.setItem("isLogin", "true");
        updateLoginText();
        console.log("User logged in. Button text updated to: Logout");
        window.location.href = "cart.html";
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: "Invalid email or password. Please try again.",
      }).then(() => {
        if (document.getElementById("email")) {
          document.getElementById("email").value = "";
          document.getElementById("password").value = "";
        }
      });
    }
  }
}

// SignUp Function
function SignUp() {
  const username = document.getElementById("name").value;
  const mobile = document.getElementById("mobile").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (!username || !mobile || !email || !password) {
    Swal.fire({
      icon: "error",
      title: "Incomplete Form",
      text: "Please fill out all fields.",
    });
    return;
  }

  const newUser = { username, mobile, email, password };
  let usersArray = JSON.parse(localStorage.getItem("users")) || [];

  if (usersArray.some((user) => user.email === email)) {
    Swal.fire({
      icon: "error",
      title: "User Exists",
      text: "An account with this email already exists.",
    });
    return;
  }

  usersArray.push(newUser);
  localStorage.setItem("users", JSON.stringify(usersArray));

  sessionStorage.setItem("isLogin", "true");
  updateLoginText();

  Swal.fire({
    icon: "success",
    title: "Sign Up Successful",
    text: "You have signed up successfully!",
  }).then(() => {
    window.location.href = "cart.html";
  });
}

// Checkout Button
function handleCheckout() {
  if (!sessionStorage.getItem("isLogin")) {
    Swal.fire({
      icon: "warning",
      title: "Please Signup/Login",
      text: "You need to signup or login to proceed with the checkout.",
    }).then(() => {
      window.location.href = "signup.html";
    });
  } else {
    localStorage.removeItem("cart");
    Swal.fire({
      icon: "success",
      title: "Order Processed",
      text: "Your order has been processed successfully!",
    }).then(() => {
      window.location.href = "index.html";
    });
  }
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

// Initialize Page Content
document.addEventListener("DOMContentLoaded", function () {
  loadHeader(); // Load header and update login text
  loadFooter(); // Load footer
  initializeSearchBar(); // Initialize search bar

  // Add event listener for login/logout button
  const logTextElements = document.querySelectorAll("#logtext, #logtext2");
  logTextElements.forEach((el) => {
    el.addEventListener("click", handleAuth); // Add click event handler for login/logout
  });

  // Add event listener for checkout button
  const checkoutButton = document.getElementById("btnCheckout");
  if (checkoutButton) {
    checkoutButton.addEventListener("click", handleCheckout);
  }
});
