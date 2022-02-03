const saveCartItems = () => {
  const array = [];
  localStorage.setItem('cartItems');
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
