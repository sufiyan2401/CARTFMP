// cart
let cartIcon = document.querySelector("#cart-icon")
let cart = document.querySelector(".cart")
let closeCart = document.querySelector("#close-cart");


cartIcon.onclick = () => {
    cart.classList.add("super");
};
closeCart.onclick = () => {
    cart.classList.remove("active");
};


// CART WORKIn
if (document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded',ready)
}else{
    ready();
}

// MAKING FUNCTION
function ready(){
    // remove item from cart
    
    var removeCartButtons = document.getElementsByClassName('cart-remove')
    console.log(removeCartButtons)
    for(var i=0; i < removeCartButtons.length; i++){
        var button = removeCartButtons[i]
        button.addEventListener('click', removeCartItem) 
    }
    //QUANTITY  CHANGES
    var quantityInput = document.getElementsByClassName('cart-quantity')
    for(var i=0; i < quantityInput.length; i++){
        var input = quantityInput[i]
        input.addEventListener('change', quantityChanged)
    }
    // DD TO CART
    var addCart = document.getElementsByClassName('add-cart')
    for(var i=0; i < addCart.length; i++){
        var button = addCart[i]
        button.addEventListener('click' , addCartClicked)
    }
    // Buy Button
    document.getElementsByClassName('btn-buy')[0].addEventListener('click',buyButtonClicked)
}
// buy button
function buyButtonClicked(){
    alert('Your Order is placed')
    var cartContent = document.getElementsByClassName('cart-content')[0]
    while(cartContent.hasChildNodes()){
        cartContent.removeChild(cartContent.firstChild)
    }
    updatetotal();
}




// remove item from cart
function removeCartItem(event){
    var buttonClicked = event.target
    buttonClicked.parentElement.remove()
    updatetotal();
    updatetotal();
}
//QUANTITY CHNGS
function quantityChanged(event){
    var input = event.target
    if(isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
      updatetotal();
}
// add to cart
function addCartClicked(event){
    var button = event.target
    var shopProducts = button.parentElement
    var title = shopProducts.getElementsByClassName("product-tittle")[0].innerText;
    var price = shopProducts.getElementsByClassName("price")[0].innerText;
    var productImg = shopProducts.getElementsByClassName("product-img")[0].src;
    addProductToCart(title,price,productImg)
    updatetotal();
}
function addProductToCart(title,price,productImg){
      var cartShopBox = document.createElement("div")
      cartShopBox.classList.add("cart-box");
    var CartItems = document.getElementsByClassName('cart-content')[0]
    var CartItemsNames = CartItems.getElementsByClassName('cart-product-tittle')
    for(var i=0; i < CartItemsNames.length; i++){
    if(CartItemsNames[i].innerText == title){     
        alert('You Hav alredy add this item to cart')
        return;

    }    
    }



var cartBoxContent = `
<img ${productImg}alt=""class="cart-img">
<div class="detail-box">
    <div class="cart-product-tittle">
 ${title}
    </div>
<div class="cart-price">${price}</div>
<input type="number" value="1" class="cart-quantity">
</div>
<!-- Remove cart -->
<span class="material-symbols-outlined cart-remove">
    delete
    </span>`;
    
cartShopBox.innerHTMl = cartBoxContent;
CartItems.append(cartShopBox);
cartShopBox
.getElementsByClassName('cart-remove')[0].addEventListener('click', removeCartItem)
cartShopBox
.getElementsByClassName('cart-quantity')[0].addEventListener('change', quantityChanged);
};


// update total
function updatetotal(){
    var cartContent =document.getElementsByClassName('cart-content')[0]
    var cartBoxes = cartContent.getElementsByClassName('cart-box')
    var total = 0;
    for(var i=0; i < cartBoxes.length; i++){
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName('cart-price')[0];
        var quantityElement = cartBox.getElementsByClassName('cart-quantity')[0];

        var price = parseFloat(priceElement.innerText.replace("$", ""));

        var quantity = quantityElement.value;
        total = total + (price * quantity);
    }
         // if price conatain some cents value

         total = Math.ceil(total*100) / 100 ;

        document.getElementsByClassName('total-price')[0].innerText = '$' + total;


}
