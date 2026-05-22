
// ----------------------------
// ELEMENTS
// ----------------------------

const addProductBtn = document.getElementById("addProductBtn");

const modal = document.getElementById("modal");

const saveProduct = document.getElementById("saveProduct");

const productList = document.getElementById("productList");

const totalProducts = document.getElementById("totalProducts");

const lowStock = document.getElementById("lowStock");

const inventoryValue = document.getElementById("inventoryValue");

const productName = document.getElementById("productName");

const productPrice = document.getElementById("productPrice");

const productStock = document.getElementById("productStock");

// ----------------------------
// PRODUCTS ARRAY
// ----------------------------

let products = JSON.parse(localStorage.getItem("products")) || [];

// ----------------------------
// OPEN MODAL
// ----------------------------

addProductBtn.addEventListener("click", () => {

  modal.classList.remove("hidden");

});

// ----------------------------
// CLOSE MODAL
// ----------------------------

modal.addEventListener("click", (e) => {

  if (e.target === modal) {

    modal.classList.add("hidden");

  }

});

// ----------------------------
// SAVE PRODUCT
// ----------------------------

saveProduct.addEventListener("click", () => {

  const name = productName.value.trim();

  const price = Number(productPrice.value);

  const stock = Number(productStock.value);

  if (!name || !price || !stock) {

    alert("Please complete all fields.");

    return;

  }

  const product = {
    id: Date.now(),
    name,
    price,
    stock
  };

  products.push(product);

  localStorage.setItem(
    "products",
    JSON.stringify(products)
  );

  renderProducts();

  productName.value = "";
  productPrice.value = "";
  productStock.value = "";

  modal.classList.add("hidden");

});

// ----------------------------
// DELETE PRODUCT
// ----------------------------

function deleteProduct(id){

  products = products.filter(
    product => product.id !== id
  );

  localStorage.setItem(
    "products",
    JSON.stringify(products)
  );

  renderProducts();

}

// ----------------------------
// RENDER PRODUCTS
// ----------------------------

function renderProducts(){

  productList.innerHTML = "";

  let total = 0;

  let low = 0;

  let inventoryTotal = 0;

  products.forEach(product => {

    total++;

    if(product.stock <= 5){
      low++;
    }

    inventoryTotal += product.price * product.stock;

    const card = document.createElement("div");

    card.classList.add("product-card");

    card.innerHTML = `
    
      <div class="product-info">

        <h4>${product.name}</h4>

        <p>
          Price: $${product.price}
          •
          Stock: ${product.stock}
        </p>

      </div>

      <button
        class="delete-btn"
        onclick="deleteProduct(${product.id})"
      >
        Delete
      </button>

    `;

    productList.appendChild(card);

  });

  totalProducts.textContent = total;

  lowStock.textContent = low;

  inventoryValue.textContent =
    "$" + inventoryTotal;

}

// ----------------------------
// INITIAL LOAD
// ----------------------------

renderProducts();
