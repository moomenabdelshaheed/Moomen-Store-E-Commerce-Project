var count = 0;
var TotalPrice = 0;

let buy_all_btn = document.getElementById("buy-all-btn");
const empty_message = document.getElementById("empty-message");
let total = document.getElementById("totalprice");
let loading_animation = document.getElementById("loading-animation");

function loadCarts() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length > 0) {
    empty_message.style.display = "none";
    buy_all_btn.style.display = "block";
    total.style.display = "block";
    loading_animation.style.display = "none";
    
  } else {
    buy_all_btn.style.display = "none";
      total.style.display = "none";
    setTimeout(() => {
      empty_message.style.display = "block";
      loading_animation.style.display = "block";
      
    } , 100);
  }

  let container = document.getElementById("main-section");
  container.innerHTML = "";

  cart.forEach((product) => {
    TotalPrice += product.price * product.count;

    let container2 = document.createElement("div");
    container2.classList.add("d-flex");
    container.appendChild(container2);

    let card = document.createElement("div");
    card.classList.add(
      "card",
      "w-100",
      "d-flex",
      "flex-column",
      "justify-content-center"
    );
    card.style.width = "100%";
    container2.appendChild(card);

    let img = document.createElement("img");
    img.src = product.image;
    img.classList.add("card-img-top");
    img.alt = product.name;
    img.style.height = "200px";
    img.style.objectFit = "contain";
    card.appendChild(img);

    let cardbody = document.createElement("div");
    cardbody.classList.add("card-body", "d-flex", "flex-column", "mx-4");
    card.appendChild(cardbody);

    let productname = document.createElement("h2");
    productname.classList.add("card-title", "fw-bold", "text-center");
    productname.innerText = product.name;
    cardbody.appendChild(productname);

    let description = document.createElement("p");
    description.classList.add("card-text", "flex-grow-1");
    description.innerText = product.description;
    cardbody.appendChild(description);

    let priceandbtn = document.createElement("div");
    priceandbtn.classList.add("d-flex", "justify-content-between", "mb-4");
    cardbody.appendChild(priceandbtn);

    let price = document.createElement("p");
    price.classList.add("text-primary", "fw-semibold");
    price.innerText = `Price: ${product.price} EGP`;
    priceandbtn.appendChild(price);

    let btndiv = document.createElement("div");
    btndiv.classList.add("d-flex", "gap-3", "align-items-center");
    priceandbtn.appendChild(btndiv);

    total.innerText = `Total Price: ${TotalPrice} EGP`;

    let aminus = document.createElement("a");
    aminus.classList.add("mx-2");
    btndiv.appendChild(aminus);

    let iicon = document.createElement("i");
    iicon.classList.add("bi", "bi-cart-dash-fill");

    iicon.onclick = () => {
      let existingProduct = cart.find((item) => item.id == product.id);

      if (product.count > 1) {
        TotalPrice -= product.price;
        span.innerText = `${--product.count}`;
        total.innerText = `Total Price: ${TotalPrice} EGP`;
        localStorage.setItem("cart", JSON.stringify(cart));
      } else {
        cart = cart.filter((item) => item.id != product.id);
        localStorage.setItem("cart", JSON.stringify(cart));
        loadCarts();
      }
    };

    aminus.appendChild(iicon);

    let span = document.createElement("span");
    span.innerText = `${product.count}`;
    btndiv.appendChild(span);

    let aplus = document.createElement("a");
    aplus.classList.add("mx-2");
    btndiv.appendChild(aplus);

    let iicon2 = document.createElement("i");
    iicon2.classList.add("bi", "bi-cart-plus-fill");

    iicon2.onclick = () => {
      span.innerText = `${++product.count}`;
      TotalPrice += product.price;
      total.innerText = `Total Price: ${TotalPrice.toFixed(2)} EGP`;
      localStorage.setItem("cart", JSON.stringify(cart));
    };

    aplus.appendChild(iicon2);

    let link = document.createElement("a");
    link.classList.add("btn", "card1", "mt-auto");
    link.innerText = "Buy Now";
    link.onclick = () => {
      cart = cart.filter((item) => item.id != product.id);
      localStorage.setItem("cart", JSON.stringify(cart));
      // alert("Your request has been sent");
      loadCarts();
      location.href = "shipped.html";
    };

    cardbody.appendChild(link);
    let link2Home = document.createElement("a");
    link2Home.classList.add(
      "card1",
      "mt-2",
      "my-2",
      "text-center",
      "fs-5",
      "text-decoration-none"
    );
    link2Home.href = "#";
    link2Home.innerText = "Need to Buy Something else ? 🛒";
    link2Home.onclick = () => {
      location.href = "home.html#moo";
      window.scrollTo(0, 0);

    };
    cardbody.appendChild(link2Home);
  });
}

loadCarts();

function shipAll() {
  if (TotalPrice == 0) {
    alert("Please add items to your cart before proceeding to checkout.");
    return;
  }

  localStorage.removeItem("cart");
  location.href = "shipped.html";
}
