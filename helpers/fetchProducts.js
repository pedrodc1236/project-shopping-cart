const fetchProducts = async (param) => {
  try {
    const URL = `https://api.mercadolibre.com/sites/MLB/search?q=${param}`;

    const response = await fetch(URL);
    const data = await response.json();
    return data.results;
  } catch (error) { 
    return error;
  }
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
