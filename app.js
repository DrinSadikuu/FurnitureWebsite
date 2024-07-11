let openlogInBtn = document.getElementById("logIn-Btn"); //nav bar btn
let modal = document.getElementById("modalLogin"); // modal log in
let logInBtnModalClose = document.getElementById("logInBtnModal"); // l
let signUpModal = document.getElementById("signUpModal");
let openSignUpModal = document.getElementById("sign-upBtn");
let closeLoginModal = document.getElementById("closeLoginModal");
let closeSignUpModal = document.getElementById("closeSignUpModal");
let closemodalSignUpByLogin = document.getElementById(
  "closemodalSignUpByLogin"
);

openlogInBtn.addEventListener("click", function () {
  modal.showModal();
});

let logInSignUp = false;
logInBtnModalClose.addEventListener("click", function () {
  let inputLogIn = document.getElementById("loginEmail");
  let inputPasswordLogin = document.getElementById("loginPassword");
  if (inputLogIn.value === "" || inputPasswordLogin.value === "") {
    alert("Please fill out the fields");
  } else if (
    !inputLogIn.value.includes("@") ||
    inputPasswordLogin.value.length <= 6
  ) {
    alert("Your Email must conatin @ password should be longer than 6");
  } else {
    logInSignUp = true;
    modal.close();
  }
});

openSignUpModal.addEventListener("click", function () {
  modal.close();
  signUpModal.showModal();
});

closeLoginModal.addEventListener("click", function () {
  modal.close();
});

closeSignUpModal.addEventListener("click", function () {
  signUpModal.close();
});

closemodalSignUpByLogin.addEventListener("click", function () {
  let inputname = document.getElementById("inputName");
  let inputSurname = document.getElementById("inputSurname");
  let inputUsername = document.getElementById("inputUsername");
  let inputEmail = document.getElementById("inputEmail");
  let inputPassword = document.getElementById("inputPassword");
  if (
    inputname.value === "" ||
    inputSurname.value === "" ||
    inputUsername.value === "" ||
    inputEmail.value === "" ||
    inputPassword.value === ""
  ) {
    alert("Please fill the fields");
  } else if (
    !inputEmail.value.includes("@") ||
    inputPassword.value.length <= 6
  ) {
    alert("Your Email must conatin @ password should be longer than 6");
  } else {
    logInSignUp = true;
    signUpModal.close();
  }
});

// shopping cart
let cartIcon = document.querySelector(".shoppingCartDisplay");
let cart = document.querySelector(".cart");
let closeCart = document.querySelector("#closeCart");

cartIcon.addEventListener("click", function () {
  cart.classList.add("active");
});

closeCart.addEventListener("click", function () {
  cart.classList.remove("active");
});

// cart functions

const removeCartBtn = document.getElementsByClassName("cart-remove"); // trash bin icon
for (let i = 0; i < removeCartBtn.length; i++) {
  let button = removeCartBtn[i];
  button.addEventListener("click", removeCartItem);
}

// remov cart item

function removeCartItem(event) {
  let buttonClicked = event.target;
  buttonClicked.parentElement.remove();
  updateTotal();
}

// quantity change
let quantityInput = document.getElementsByClassName("cart-quantity");
for (let i = 0; i < quantityInput.length; i++) {
  let input = quantityInput[i];
  input.addEventListener("change", quantityChanged);
}

// quantity Change
function quantityChanged(event) {
  let input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateTotal();
}

// update total
function updateTotal() {
  let cartContent = document.getElementsByClassName("cartContent")[0]; // Get the first element in the HTMLCollection
  let cartBoxes = cartContent.getElementsByClassName("cart-box");
  let total = 0;
  for (let i = 0; i < cartBoxes.length; i++) {
    let cartBox = cartBoxes[i];
    let priceElement = cartBox.getElementsByClassName("cart-price")[0];
    let quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
    let price = parseInt(priceElement.innerText.replace("$", ""));
    let quantity = quantityElement.value;
    total += price * quantity;
  }
  let totalPrice = document.getElementsByClassName("total-price")[0];
  totalPrice.innerText = "$" + total;
}

// add to cart
let addCart = document.getElementsByClassName("addToCartBtn");

for (let i = 0; i < addCart.length; i++) {
  let button = addCart[i];
  button.addEventListener("click", addCartClicked);
}

// add cart function

function addCartClicked(event) {
  let button = event.target;
  let shopProducts = button.parentElement;
  let tittle = shopProducts.getElementsByClassName("prouctTitle")[0].innerText;
  let price = shopProducts.getElementsByClassName("price")[0].innerText;
  let productImg = shopProducts.getElementsByClassName("product-img")[0].src;
  addProductToCart(tittle, price, productImg);
  updateTotal();
}

function addProductToCart(title, price, productImg) {
  let cartShopBox = document.createElement("div");
  cartShopBox.classList.add("cart-box");
  // controle to not add the same card twice
  let cartItem = document.getElementsByClassName("cartContent")[0];
  let cartItemNames = cartItem.getElementsByClassName("cart-product-title");
  for (let i = 0; i < cartItemNames.length; i++) {
    if (cartItemNames[i].innerText === title) {
      alert("You have already added this product to cart");
      return;
    }
  }
  alert("Your product is in the cart");
  let cartBoxContect = `            
            <img
              src="${productImg}"
              alt=""
              class="cart-img"
            />
            <div class="details-box">
              <div class="cart-product-title">${title}</div>
              <div class="cart-price">${price}</div>
              <input
                type="number"
                name=""
                id=""
                value="1"
                class="cart-quantity"
              />
            </div>
            <i class="fa-solid fa-trash cart-remove"></i>`;
  cartShopBox.innerHTML = cartBoxContect;
  cartItem.append(cartShopBox);
  cartShopBox
    .getElementsByClassName("cart-remove")[0]
    .addEventListener("click", removeCartItem);
  cartShopBox
    .getElementsByClassName("cart-quantity")[0]
    .addEventListener("change", quantityChanged);
  saveCartItemsToLocalStorage();
}

let inpSearch = document.getElementById("inpSearch");
inpSearch.addEventListener("keyup", displayCards);

function displayCards() {
  let searchTerm = inpSearch.value.toLowerCase();
  let productCards = document.querySelectorAll(".productCard");

  for (let i = 0; i < productCards.length; i++) {
    let card = productCards[i];
    let productTitle = card
      .querySelector(".prouctTitle")
      .textContent.toLowerCase();
    if (productTitle.includes(searchTerm)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  }
}
