import { searchCep } from './helpers/cepFunctions';
import { fetchProductsList } from './helpers/fetchFunctions';
import { createProductElement } from './helpers/shopFunctions';
import './style.css';

document.querySelector('.cep-button').addEventListener('click', searchCep);

const productsEl = document.querySelector('.products');
const loading = document.createElement('h2');
loading.className = 'loading';
loading.innerText = 'carregando...';
productsEl.appendChild(loading);

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
