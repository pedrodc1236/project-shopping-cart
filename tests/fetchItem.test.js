require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fecthItem', () => {
  it('Teste se fetchItem é uma função', async () => {
    expect.assertions(1);
    const func = await fetchItem;
    expect(typeof func).toBe('function');
  });
  it('Teste se fetchItem chamada com o argumento "MLB1615760527", fetch foi chamado', async () => {
    expect.assertions(1);
    const func = await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledTimes(1);
  });
  it('Teste se, ao chamar a função fetchItem com o argumento do item "MLB1615760527", a função fetch utiliza o endpoint correto', async () => {
    expect.assertions(1);
    await fetchItem('MLB1615760527')
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/items/MLB1615760527');
  });
  it('Teste se o retorno da função fetchItem com o argumento do item "MLB1615760527" é uma estrutura de dados igual ao objeto item que já está importado no arquivo', async () => {
    expect.assertions(1);
    const func = await fetchItem('MLB1615760527');
    expect(func).toEqual(item);
  });
  it('Teste se, ao chamar a fufnção fetchItem sem argumento, retorna um erro com a mensagem: You must provide an url', async () => {
    expect.assertions(1);
    const func = await fetchItem();
    expect(func).toEqual(new Error('You must provide an url'));
  });
});
