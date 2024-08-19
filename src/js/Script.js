// Header Scroll
let nav = document.querySelector("header");
window.onscroll = function () {
  if (document.documentElement.scrollTop > 50) {
    nav.classList.add("navbar-shadow");
  } else {
    nav.classList.remove("navbar-shadow");
  }
};

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
// 
document.addEventListener('DOMContentLoaded', function() {
  const navLinks = document.querySelectorAll('.nav-link'); // Select all navigation links
  const currentUrl = window.location.href; // Get the current URL

  navLinks.forEach(link => {
      if (link.href === currentUrl) {
          link.classList.add('active'); // Add 'active' class if current URL matches the link
      } else {
          link.classList.remove('active'); // Remove 'active' class if it does not match
      }
  });
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
