const captureFather = document.querySelector('.items');
const father = document.querySelector('.cart__items');

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

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}

function cartItemClickListener(event) {
  const capFather = event.target.parentElement;
  capFather.removeChild(event.target);
  saveCartItems(capFather);
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const createItensProduct = async () => {
  const fun = await fetchProducts('computador');
  fun.results.forEach((product) => {
    const obj = {
      sku: product.id,
      name: product.title,
      image: product.thumbnail,
    };
    captureFather.appendChild(createProductItemElement(obj));
  });
};

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
};
 
const addItemCart = async () => {
  // await createItensProduct();
  const btns = document.querySelectorAll('.item__add');
  btns.forEach((btn) => {
   btn.addEventListener('click', addItem);
  });
  };

  const getAddLocalStorage = () => {
    father.innerHTML = getSavedCartItems();
    const childs = father.childNodes;
    childs.forEach((child) => {
      child.addEventListener('click', cartItemClickListener);
    });
  };

window.onload = () => {
  createItensProduct(); setTimeout(() => addItemCart(), 100);
  getAddLocalStorage();
};
