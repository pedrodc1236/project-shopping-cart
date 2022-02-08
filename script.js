const captureFather = document.querySelector('.items');
const father = document.querySelector('.cart__items');
const arr = [];
const captureP = document.querySelector('.total-price');
const captureBtnClear = document.querySelector('.empty-cart'); 
const captureContainer = document.querySelector('.container');

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

// Função auxiliar para criação dos produtos
function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

// Função para pegar todos ID's
function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

const funPrice = (param) => {
  captureP.innerHTML = '';
  const allLi = [...param];
  let sum = 0;
  allLi.forEach((li) => {
    const innerTextLi = li.innerText;
    const indexLi = innerTextLi.indexOf('$') + 1;
    const stringNumber = innerTextLi.substr(indexLi);
    const price = parseFloat(stringNumber);
    sum += price;
  });

  captureP.innerText = sum;
};

// Função para remover os itens do carrinho e para filtrar os objtos que iram para o array do carrinho do qual vai ser feita a soma dos preços
function cartItemClickListener(event) {
  const capFather = event.target.parentElement;
  capFather.removeChild(event.target);
  saveCartItems(capFather);
  // const id = event.target.innerText.substr(5, 13); 
  // const newArray = arr.filter((obj) => obj.sku !== id);
  // arr = [...newArray];
  // captureP.innerText = sumPriceTotal();
  funPrice(father.children);
}

// Função para criação das li do qual ficaram na lista de compra a direita com seu respectivo innerHTML e exento de click no botão para adicionar/criar
function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

// Função para adicionar o 'carregando...' antes da requisição chegar
const addLoading = () => {
  const createLoading = document.createElement('p');
  createLoading.className = 'loading';
  createLoading.innerText = 'carregando...';
  captureContainer.appendChild(createLoading);
};

// Função para remover o 'carregando...'
const removeLoading = () => {
  const loading = document.querySelector('.loading');
  captureContainer.removeChild(loading);
};

// Função assincrona para pegar os dados do API e tornar as sections de cada item adicionados filhos da sections de items
const createItensProduct = async () => {
  addLoading();
  const fun = await fetchProducts('computador');
  removeLoading();
  fun.results.forEach((product) => {
    const obj = {
      sku: product.id,
      name: product.title,
      image: product.thumbnail,
    };
    captureFather.appendChild(createProductItemElement(obj));
  });
};

// Função assincrona para conseguir o id e criação do objeto do qual vai adicionar o innertext das li do carrinho e o push para o array do qual será usado para a soma do preço dos produtos, e como é uma função de adicionar recebe a soma no innerText de um P que representa o valor total dos produtos.
const addItem = async (event) => {
  const captureFat = event.target.parentElement;
  const capturefirstChild = captureFat.firstElementChild;
  const id = capturefirstChild.innerText;
  const apiFetch = await fetchItem(id);
  const objeto = {
    sku: apiFetch.id,
    name: apiFetch.title,
    salePrice: apiFetch.price,
  };
  father.appendChild(createCartItemElement(objeto));
  saveCartItems(father);
  funPrice(father.children);
};
 
// Função assíncrona responsável por capturar todos os botões dos produtos e colocar um evento de click em cada um deles, trazendo a função de add os produtos como auxilio para o evento.
const addItemCart = async () => {
  // await createItensProduct();
  const btns = document.querySelectorAll('.item__add');
  btns.forEach((btn) => {
   btn.addEventListener('click', addItem);
  });
  };

// Função para salvar o carrinho ao recarregar a pagina atráves do localStorage e imprementar o evento de salvar quando remover também a todos os filhos da Ol que são li's.
  const getAddLocalStorage = () => {
    father.innerHTML = getSavedCartItems();
    const childs = father.childNodes;
    childs.forEach((child) => {
      child.addEventListener('click', cartItemClickListener);
    });
  };

// Função para esvaziar o carrinho, limpando o carrinho de compras
const clearCart = () => {
  captureBtnClear.addEventListener('click', () => {
    father.innerHTML = '';
    captureP.innerText = 0;
    saveCartItems(father);
  }); 
};

window.onload = () => {
  createItensProduct(); setTimeout(() => addItemCart(), 100);
  getAddLocalStorage();
  clearCart();
};
