import { saveCartID } from './helpers/cartFunctions';
import { searchCep } from './helpers/cepFunctions';
import { fetchProduct, fetchProductsList } from './helpers/fetchFunctions';
import { createCartProductElement, createProductElement } from './helpers/shopFunctions';
import './style.css';

document.querySelector('.cep-button').addEventListener('click', searchCep);

const productsEl = document.querySelector('.products');
const loading = document.createElement('h2');
loading.className = 'loading';
loading.innerText = 'carregando...';
productsEl.appendChild(loading);

const addCart = async (ID) => {
  const prodInfo = await fetchProduct(ID);
  saveCartID(ID);
  const prodExibition = createCartProductElement(prodInfo);
  const cart = document.querySelector('.cart__products');
  cart.appendChild(prodExibition);
};

try {
  const productList = await fetchProductsList('computador');
  productsEl.innerText = '';
  productList.forEach((product) => {
    productsEl.appendChild(createProductElement(product));
  });
} catch (error) {
  productsEl.innerText = '';
  const err = document.createElement('h2');
  err.className = 'error';
  err.innerText = error.message;
  productsEl.appendChild(err);
}

document.addEventListener('click', (event) => {
  if (event.target.className === 'product__add') {
    const clickProdID = event.target.parentNode.firstChild.innerText;
    addCart(clickProdID);
  }
});
