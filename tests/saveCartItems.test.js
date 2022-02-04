const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('setItem');

describe('4 - Teste a função saveCartItems', () => {
  it('Teste se, ao executar saveCartItems com o argumento <ol><li>Item</li></ol>, o método localStorage.setItem é chamado', async () => {
    expect.assertions(1);
    const func = await saveCartItems('<ol><li>Item</li></ol>');
    expect(func).toEqual(localStorage.setItem());
  });
  it('Teste se, ao executar saveCartItems com o argumento <ol><li>Item</li></ol>, o método localStorage.setItem é chamado com dois parâmetros, sendo o primeiro "cartItems" e o segundo sendo o valor passado como argumento para saveCartItems', async () => {
    expect.assertions(1);
    const func = await saveCartItems('<ol><li>Item</li></ol>');
    expect(func).toEqual(localStorage.setItem('cartItems', '<ol><li>Item</li></ol>'));
  });
});
