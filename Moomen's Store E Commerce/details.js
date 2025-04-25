const eventindex = location.href.split("=")[1];
let count = 1;

async function getdatafetch() {
  try {
    const response = await fetch("New.json");
    const jsonData = await response.json();
    const data = jsonData["products"];

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let existingProduct = cart.find(item => item.id == eventindex);

    if (existingProduct) {
      count = existingProduct.count;
    }

    const product = data.find(p => p.id == eventindex);
    if (!product) return;

    // DOM Elements
    const img = document.getElementById("image");
    const productname = document.getElementById("h2");
    const description = document.getElementById("description");
    const price = document.getElementById("price");
    const span = document.getElementById("span");
    const plus = document.getElementById("plus");
    const minus = document.getElementById("minus");
    const buynow = document.getElementById("buynow");

    // Fill content
    img.src = product.image;
    productname.innerText = product.name;
    description.innerText = product.description;
    price.innerText = `${product.price} EGP 50% SALE...`;
    span.innerText = count;

    // Handlers
    plus.onclick = (e) => {
      e.preventDefault();
      count += 1;
      span.innerText = count;
    };

    minus.onclick = (e) => {
      e.preventDefault();
      if (count > 1) {
        count -= 1;
        span.innerText = count;
      }
    };

    buynow.onclick = (e) => {
      e.preventDefault();
      const pro = {
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        image: product.image,
        count: count,
      };

      if (existingProduct) {
        existingProduct.count = count;
      } else {
        cart.push(pro);
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      location.href = "cart.html";
    };

    console.log("Product loaded:", product.id);
  } catch (error) {
    console.error("Error fetching product data:", error);
  }
}

getdatafetch();
