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

const productList = await fetchProductsList('computador');

productsEl.innerHTML = '';

productList.map(async (product) => {
  const list = await createProductElement(product);
  document.querySelector('.products').appendChild(list);
});
