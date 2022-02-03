require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fecthProducts', () => {
  it('Teste se fetchProducts é uma função', async () => {
    expect.assertions(1);
    const func = await fetchProducts;
    expect(typeof func).toBe('function');
  });
  it('Teste se fetchProducts chamada com o argumento "computador", fetch foi chamado', async () => {
    expect.assertions(1);
    const func = await fetchProducts('computador');
    expect(fetch).toHaveBeenCalledTimes(1);
  });
  it('Teste se ao chamar a função fetchProducts com o argumento "computador", a função fetch utiliza o endpoint correto', async () => {
    expect.assertions(1);
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith("https://api.mercadolibre.com/sites/MLB/search?q=computador");
  });
  it('Teste se o retorno da função fetchProducts com o argumento "computador" é uma estrutura de dados igual ao objeto computadorSeach, que já está importado no arquivo', async () => {
    expect.assertions(1);
    const func = await fetchProducts('computador');
    expect(func).toEqual(computadorSearch);
  });
  it('Teste se, ao chamar a função fetchProduccts sem argumento, retorna um erro com a mensagem: You must privde an url', async () => {
    expect.assertions(1);
    const func = await fetchProducts();
    expect(func).toEqual(new Error('You must provide an url'))
  })
});
