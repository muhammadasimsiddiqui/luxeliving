// Initialize Dummy Users for Testing (run once)
function initializeDummyUsers() {
  if (!localStorage.getItem("users")) {
    fetch("src/json/customer-account.json")
      .then((response) => response.json())
      .then((dummyUsers) => {
        const usersArray = dummyUsers.map(
          ({ name, email, phone_number, password }) => ({
            username: name,
            mobile: phone_number,
            email: email,
            password: password,
          })
        );
        localStorage.setItem("users", JSON.stringify(usersArray));
      });
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

// Update login/logout text based on login state
function updateLoginText() {
  const authTextElements = document.querySelectorAll("#authText");
  const isLoggedIn = sessionStorage.getItem("isLogin") === "true";

  authTextElements.forEach((el) => {
    el.textContent = isLoggedIn ? "Logout" : "Sign Up";
  });
}

// Unified Authentication Handler (for login)
function handleAuth(event) {
  event.preventDefault(); // Prevent default form submission

  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  const usersArray = JSON.parse(localStorage.getItem("users")) || [];
  const user = usersArray.find(
    (user) => user.email === email && user.password === password
  );

  if (user) {
    sessionStorage.setItem("isLogin", "true");
    updateLoginText(); // Update text immediately after login
    Swal.fire({
      icon: "success",
      title: "Login Successful",
      text: "You have logged in successfully!",
    }).then(() => {
      window.location.href = "cart.html"; // Redirect to cart
    });
  } else {
    Swal.fire({
      icon: "error",
      title: "Login Failed",
      text: "Invalid email or password.",
    });
  }
}

// Sign Up Functionality
function signUp(event) {
  event.preventDefault(); // Prevent default form submission

  const name = document.getElementById("signupName").value;
  const mobile = document.getElementById("signupPhone").value;
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;

  const usersArray = JSON.parse(localStorage.getItem("users")) || [];

  // Check if the email already exists
  const existingUser = usersArray.find(user => user.email === email);
  if (existingUser) {
    Swal.fire({
      icon: "error",
      title: "Sign Up Failed",
      text: "Email already exists. Please use a different email.",
    });
    return;
  }

  // Create new user
  const newUser = {
    username: name,
    mobile: mobile,
    email: email,
    password: password,
  };
  
  // Save new user to local storage
  usersArray.push(newUser);
  localStorage.setItem("users", JSON.stringify(usersArray));

  Swal.fire({
    icon: "success",
    title: "Sign Up Successful",
    text: "You have signed up successfully! You can now log in.",
  }).then(() => {
    window.location.href = "login.html"; // Redirect to login page
  });
}

// Logout or Redirect to Signup
function headerBtn() {
  const isLoggedIn = sessionStorage.getItem("isLogin") === "true";

  if (isLoggedIn) {
    // Logout
    sessionStorage.clear();
    updateLoginText(); // Update text immediately after logout
    Swal.fire({
      icon: "success",
      title: "Logout Successful",
      text: "You have logged out successfully!",
    }).then(() => {
      window.location.href = "login.html"; // Redirect to login page
    });
  } else {
    // Redirect to signup page
    window.location.href = "signup.html";
  }
}

// Initialize Page Content
document.addEventListener("DOMContentLoaded", function () {
  loadHeader(); // Load header and update login text
  loadFooter(); // Load footer
  initializeSearchBar(); // Initialize search bar

  // Add event listener for login/logout button
  const logTextElements = document.querySelectorAll("#authText");
  logTextElements.forEach((el) => {
    el.addEventListener("click", headerBtn); // Add click event handler
  });

  // Add event listener for checkout button
  const checkoutButton = document.getElementById("btnCheckout");
  if (checkoutButton) {
    checkoutButton.addEventListener("click", handleCheckout);
  }
});
