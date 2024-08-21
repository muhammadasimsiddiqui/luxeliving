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

// SearchBar
fetch("src/json/product.json")
  .then((response) => response.json())
  .then((data) => {
    const searchBarproducts = data; // Assign the fetched data to the searchBarproducts array
    const searchBarProductlist = document.getElementById("searchbarprolist"); // Get the datalist element

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

// Change Page to signup
function changeSignUp() {
  window.location.href = "signup.html";
}

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

if (sessionStorage.getItem("isLogin")) {
  $("#logtext").html("Logout");
  $("#logtext2").html("Logout");
}

function SignUp() {
  username = $("#name").val();
  mobile = $("#mobile").val();
  email = $("#email").val();
  password = $("#password").val();

  if (username == "" || mobile == "" || email == "" || password == "") {
    alert("Please fill all fields");
  } else {
    sessionStorage.setItem("name", username);
    sessionStorage.setItem("mobile", mobile);
    sessionStorage.setItem("email", email);
    sessionStorage.setItem("password", password);
    sessionStorage.setItem("isLogin", true);
    $("#logtext").html("Logout");
    $("#logtext2").html("Logout");
    alert("Sign Up Successfully");
    window.location.href = "cart.html";
  
    // sessionStorage.clear();
  }
}

$("#btnCheckout").click(function () {
  if (!sessionStorage.getItem("isLogin")) {
    alert("Please Signup/Login to checkout");
    window.location.href = "signup.html";
  } else {
    localStorage.removeItem('cart');
    alert("Your order has been processed.");
    window.location.href = "index.html";
  }
});

$("#logtext").click(function () {
  if ($("#logtext").html() == "Logout") {
    $("#logtext").html("Sign Up");

    window.location.reload();
    sessionStorage.clear();
  } else {
    window.location.href = "signup.html";
  }
});
