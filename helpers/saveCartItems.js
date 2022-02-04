const saveCartItems = (param) => {
  localStorage.setItem('cartItems', JSON.stringify(param.innerHTML));
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
