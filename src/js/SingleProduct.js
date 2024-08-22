var url = window.location.href;
var params = url.split("=");
viewProduct(params[1]);

function changeImage(src) {
  document.getElementById("mainImage").src = src;
  document.getElementById("mainImageLink").href = src;
}
function updatePrice(selectElement) {
  const selectedOption = selectElement.options[selectElement.selectedIndex];
  const newPrice = selectedOption.getAttribute("data-price");
  document.getElementById("productPrice").innerText = `Pkr ${newPrice}`;
}

function viewProduct(productId) {
  let new_id = parseInt(productId);
  const product = products.find((product) => product.id === new_id);
  const productDetail = document.getElementById("product-detail");

  productDetail.style.display = "block";

  const sizeOptions = product.variations
    .map(
      (variation) =>
        `<option value="${variation.size}" data-price="${variation.price}">${variation.size}</option>`
    )
    .join("");

  const imageOptions = product.images
    .map(
      (image) =>
        `<div class="swiper-slide"><img src="${image}" alt="" onclick="changeImage('${image}')"></div>`
    )
    .join("");

  const detailsSections = product.details
    .map(
      (detail) =>
        `<br><br><h4>${detail.heading}</h4>
        <ul>${detail.des
          .map((desc) => `<li><p>${desc}</p></li>`)
          .join("")}</ul>`
    )
    .join("");

  productDetail.innerHTML = `
    <div class="single-product-page">
      <div class="container"  id="exportContent">
        <div class="row">
          <div class="col-lg-6">
            <div class="right-box">
              <div class="main-img-box">
                <a href="${
                  product.images[0]
                }" id="mainImageLink" data-lightbox="models">
                  <img src="${product.images[0]}" alt="${
    product.name
  }" id="mainImage" class="main-img img-fluid" />
                </a>
              </div>
              <div class="swiper pro-small-images">
                <div class="swiper-wrapper">
                    ${imageOptions}
                </div> 
                ${
                  product.images.length > 4
                    ? `
                  <div class="swiper-button-next"></div>
                  <div class="swiper-button-prev"></div>
                  `
                    : ""
                }   
              </div>
            </div>
          </div>
          <div class="col-lg-6">
            <div class="px-lg-5">
              <h2 class="m-0 pt-md-5 pt-lg-0">${product.name}</h2>
              <p class="d-none d-lg-block pro-des">${product.description}</p>
              <br>
              <table cellspacing="0" class="inputs">
                <tr><td><p><b>Brand:</b> ${product.brand}</p></td></tr>
                <tr><td><p><b>Category:</b> ${product.category}</p></td></tr>
                <tr><td><p><b>Sku:</b> ${product.sku}</p></td></tr>
                <tr>
                  <td><p><b>Size:</b></p></td>
                  <td align="right">
                    <select name="size" id="size" class="h-30" onchange="updatePrice(this)">
                      ${sizeOptions}
                    </select>
                  </td>
                </tr>
              </table>
              <br>
              <h2 id="productPrice">Pkr&nbsp;${product.variations[0].price}</h2>
              <br>
              <button 
              onclick="addToCart(${product.id})"
                class="main-btn" 
                data-bs-target="#">
                Add to Cart&nbsp;&nbsp; <i class="fa-solid fa-basket-shopping"></i>
              </button>              
              &nbsp;&nbsp;&nbsp;&nbsp;
              <button 
              onclick="addToWishlist(${product.id})"
                class="main-btn" 
                data-bs-target="#">
                Add to Wishlist&nbsp;&nbsp; <i class="fa-regular fa-heart"></i>
              </button>
              &nbsp;&nbsp;&nbsp;&nbsp;
            </div>
          </div>
        </div>
        <div class="pt-5 mt-5 des">
 <div class="des-title d-flex justify-content-between align-items-center">
  <h4 class="px-2">Product Details</h4>
  <button title="Downlaod Product Details" class="border-0 bg-transparent" onclick="Export2Word('exportContent', '${
    product.name
  }');">  <i class="fa-solid fa-download fa-2x px-3"></i>
</button>
</div>

          <br><br>
          <h4>Description:</h4>
          <p>${product.description}</p>
                ${detailsSections}
        </div>
      </div>
    </div>
  `;

  // Initialize Swiper
  var swiper = new Swiper(".pro-small-images", {
    spaceBetween: 30,
    speed: 1500,
    loop: true,
    breakpoints: {
      320: {
        slidesPerView: 2,
      },
      768: {
        slidesPerView: 3,
      },
      1200: {
        slidesPerView: 4,
      },
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    autoplay: {
      delay: 1500,
      disableOnInteraction: false,
    },
    mousewheel: false,
    keyboard: true,
  });
}

function Export2Word(element, filename = "") {
  var preHtml = `<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML To Doc</title><style>
    img { width: 400px; height: auto; max-width: 100%; } /* Fixed width, maintain aspect ratio */
    body { font-family: Arial, sans-serif; }
  </style></head><body>`;
  var siteinformation = `
  <div> 
    <h2 class="text-center">LuxeLivings</h2>
    <p>URL:&nbsp;&nbsp; ${window.location.href}</p>
  </div>
  `;
  var postHtml = "</body></html>";
  var html = preHtml + siteinformation + document.getElementById(element).innerHTML + postHtml;
  var tempDiv = document.createElement("div");
  tempDiv.innerHTML = html;
  var images = tempDiv.querySelectorAll("img");
  images.forEach(function (img) {
    var canvas = document.createElement("canvas");
    var ctx = canvas.getContext("2d");
    var imgElement = new Image();
    imgElement.src = img.src;
    imgElement.onload = function () {
      canvas.width = 400; 
      canvas.height = (imgElement.height / imgElement.width) * 400; 
      ctx.drawImage(imgElement, 0, 0, canvas.width, canvas.height);
      var dataURL = canvas.toDataURL("image/png");
      img.setAttribute("src", dataURL);
      img.setAttribute("width", "400px");
      img.setAttribute("height", canvas.height + "px");
    };
  });
  setTimeout(function () {
    var finalHtml = preHtml + tempDiv.innerHTML + postHtml;
    var blob = new Blob(["\ufeff", finalHtml], {
      type: "application/msword"
    });
    var downloadLink = document.createElement("a");
    document.body.appendChild(downloadLink);
    if (navigator.msSaveOrOpenBlob) {
      navigator.msSaveOrOpenBlob(blob, filename);
    } else {
      var url = URL.createObjectURL(blob);
      downloadLink.href = url;
      downloadLink.download = filename ? filename + ".doc" : "document.doc";
      downloadLink.click();
    }
    document.body.removeChild(downloadLink);
  }, 1000); 
}
