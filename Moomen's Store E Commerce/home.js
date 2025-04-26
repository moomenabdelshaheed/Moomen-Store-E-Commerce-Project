document.addEventListener("DOMContentLoaded", function () {
  const toggleBtn = document.querySelector('.navbar-toggler');
  const navbarMenu = document.getElementById('navbarNavAltMarkup');

  toggleBtn.addEventListener('click', function () {
    navbarMenu.classList.toggle('show');
  });
});
var slideIndex = 0;
let home_slider = document.querySelectorAll(".slider");

function prevSlide() {
  home_slider[slideIndex].style.opacity = "0";
  setTimeout(() => {
    home_slider[slideIndex].style.display = "none";
    if (slideIndex == 0) {
      slideIndex = 2;
    } else {
      slideIndex--;
    }
    home_slider[slideIndex].style.display = "block";
    home_slider[slideIndex].style.opacity = "0";
    setTimeout(() => {
      home_slider[slideIndex].style.opacity = "1";
    }, 200);
  }, 200);
}

function nextSlide() {
  home_slider[slideIndex].style.opacity = "0";
  setTimeout(() => {
    home_slider[slideIndex].style.display = "none";
    if (slideIndex == 2) {
      slideIndex = 0;
    } else {
      slideIndex++;
    }
    home_slider[slideIndex].style.display = "block";
    home_slider[slideIndex].style.opacity = "0";
    setTimeout(() => {
      home_slider[slideIndex].style.opacity = "1";
    }, 200);
  }, 200);
}

let notification_badge =
  document.getElementsByClassName("notification-badge")[0];
let cart = JSON.parse(localStorage.getItem("cart")) || [];
notification_badge.style.display = "block";
notification_badge.innerText = `${cart.length}`;

function logout() {
  window.location.href = "index.html";
}

var chosenCategory = "products";

function category(category) {
  let select_category = document.getElementById("category-select");
  if (category) {
    chosenCategory = category;
  } else {
    chosenCategory = select_category.value;
  }
  getJsonData();
}

async function getJsonData() {
  let response = await fetch("New.json");
  let data = await response.json();
  data = data["products"];

  let container = document.getElementById("main-section");
  container.innerHTML = "";

  let h2 = document.createElement("h2");
  h2.innerText = `${chosenCategory}'s Wear `;
  if (chosenCategory == "products") {
    h2.innerHTML = "All Products";
  } else if (chosenCategory == "Accessories") {
    h2.innerHTML = "Accessories";
  }

  h2.classList.add("mt-4", "mb-5", "fw-bold");
  container.appendChild(h2);

  let row = document.createElement("div");
  row.classList.add("row", "g-4");
  container.appendChild(row);

  let filter = data.filter(
    (item) =>
      chosenCategory === "products" ||
      (item.category === "Unisex" &&
        (chosenCategory === "Men" || chosenCategory === "Women")) ||
      item.category === chosenCategory
  );

  filter.forEach((product) => {
    let min = document.getElementById("minprice");
    let max = document.getElementById("maxprice");
    if (
      (!min.value || product.price > min.value) &&
      (!max.value || product.price < max.value)
    ) {
      let col = document.createElement("div");
      col.classList.add("col-12", "col-sm-6", "col-md-4", "d-flex");

      let card = document.createElement("div");
      card.classList.add("card", "h-100", "d-flex", "flex-column");
      card.style.width = "100%";

      let image = document.createElement("img");
      image.src = product.image;
      image.classList.add("card-img-top");
      image.alt = product.name;
      image.style.height = "200px";
      image.style.objectFit = "contain";
      card.appendChild(image);

      let cardBody = document.createElement("div");
      cardBody.classList.add("card-body", "d-flex", "flex-column");

      let title = document.createElement("h5");
      title.classList.add("card-title", "fw-bold");
      title.innerText = product.name;

      let paragraph = document.createElement("p");
      paragraph.classList.add("card-text", "flex-grow-1");
      paragraph.innerText = product.description;

      let divdetails = document.createElement("div");
      divdetails.classList.add(
        "d-flex",
        "justify-content-between",
        "gap-3",
        "mb-3"
      );

      let price = document.createElement("p");
      price.classList.add("text-primary", "fw-semibold");
      price.innerText = `Price: ${product.price} EGP`;
      divdetails.appendChild(price);

      let iicon = document.createElement("i");
      iicon.classList.add("bi", "bi-eye-fill");
      iicon.onclick = () => {
        location.href = "details.html?id=" + product.id;
      };

      let link = document.createElement("a");
      link.classList.add("btn", "card1", "mt-auto");
      link.innerText = "Add to Cart";
      link.onclick = () => {
        notification_badge.style.display = "block";
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        let existingProduct = cart.find((item) => item.id == product.id);
        let pro = {
          id: product.id,
          name: product.name,
          description: product.description,
          price: product.price,
          image: product.image,
        };

        if (existingProduct) {
          existingProduct.count += 1;
        } else {
          pro.count = 1;
          cart.push(pro);
        }
        localStorage.setItem("cart", JSON.stringify(cart));
        location.href = "cart.html";
      };

      cardBody.appendChild(title);
      cardBody.appendChild(paragraph);
      cardBody.appendChild(divdetails);

      divdetails.appendChild(iicon);
      cardBody.appendChild(link);

      card.appendChild(cardBody);
      col.appendChild(card);
      row.appendChild(col);
    }
  });
}

getJsonData();

const scroll_to_top = document.getElementById("scroll-to-top");
window.onscroll = function () {
  if (scrollY > 200) {
    scroll_to_top.style.display = "block";
  } else {
    scroll_to_top.style.display = "none";
  }
};

scroll_to_top.addEventListener("click", scrollTop);

function scrollTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}
window.onload = function () {
  window.scrollTo({
    top: 0,
    behavior: "auto",
  });
};

function ContactUs() {
  console.log("Contact Us clicked");
  window.scrollTo({
    top: document.body.scrollHeight,  
    behavior: "smooth",
  });
}
