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

function formSubmission() {
  // Get input values
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const message = document.getElementById("message").value;

  // Create an object to store the form data
  const formData = {
    name: name,
    email: email,
    message: message,
  };

  // Retrieve existing data from session storage
  let submissions = JSON.parse(sessionStorage.getItem("submissions")) || [];
  submissions.push(formData); // Add new data to the array

  // Save updated array back to session storage
  sessionStorage.setItem("submissions", JSON.stringify(submissions));

  // Show Thank You message using SweetAlert
  Swal.fire({
    title: "Thank You!",
    text: "Your message has been sent successfully!",
    icon: "success",
    confirmButtonText: "OK",
  }).then(() => {
    // Clear all fields after the alert is confirmed
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("message").value = "";
  });

  return false; // Prevent default form submission
}

function formSubmissionHome() {
  // Get input values
  const name = document.getElementById("home-name").value; // Ensure unique IDs
  const subject = document.getElementById("home-subject").value;
  const email = document.getElementById("home-email").value; // Ensure unique IDs
  const message = document.getElementById("home-message").value; // Ensure unique IDs

  // Create an object to store the form data
  const formData = {
    name: name,
    subject: subject,
    email: email,
    message: message,
  };

  // Retrieve existing data from session storage
  let submissionsHome =
    JSON.parse(sessionStorage.getItem("submissionsHome")) || [];
  submissionsHome.push(formData); // Add new data to the array

  // Save updated array back to session storage
  sessionStorage.setItem("submissionsHome", JSON.stringify(submissionsHome));

  // Show Thank You message using SweetAlert
  Swal.fire({
    title: "Thank You!",
    text: "Your message has been submitted successfully!",
    icon: "success",
    confirmButtonText: "OK",
  }).then(() => {
    // Clear all fields after the alert is confirmed
    document.getElementById("home-name").value = "";
    document.getElementById("home-subject").value = "";
    document.getElementById("home-email").value = "";
    document.getElementById("home-message").value = "";
  });

  return false; // Prevent default form submission
}
