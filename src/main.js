import { searchCep } from './helpers/cepFunctions';
import { fetchProductsList } from './helpers/fetchFunctions';
import { createProductElement } from './helpers/shopFunctions';
import './style.css';

document.querySelector('.cep-button').addEventListener('click', searchCep);

const productList = await fetchProductsList('computador');

productList.map(async (product) => {
  const list = await createProductElement(product);
  document.querySelector('.products').appendChild(list);
});
