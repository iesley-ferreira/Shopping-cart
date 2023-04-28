import { getSavedCartIDs } from './helpers/cartFunctions';
import { searchCep } from './helpers/cepFunctions';
import { fetchProduct, fetchProductsList } from './helpers/fetchFunctions';
import { createCartProductElement,
  createProductElement, sumProductsPrice } from './helpers/shopFunctions';
import './style.css';

document.querySelector('.cep-button').addEventListener('click', () => {
  const inputPreenchido = 8;
  const validaCep = document.querySelector('.cep-input').value.length === inputPreenchido;
  if (validaCep) searchCep();
});

// CRIA OS PRODUTOS E POPULA A SECTION PRINCIPAL DO SITE
const criaProdutos = async () => {
  const productsSectionEl = document.querySelector('.products');
  const loading = document.createElement('h2');
  loading.className = 'loading';
  loading.innerText = 'carregando...';
  productsSectionEl.appendChild(loading);
  try {
    const productList = await fetchProductsList('computador');
    productsSectionEl.innerText = '';
    productList.forEach((product) => {
      const newProduct = createProductElement(product);
      productsSectionEl.appendChild(newProduct);
    });
  } catch (error) {
    productsSectionEl.innerText = '';
    const err = document.createElement('h2');
    err.className = 'error';
    err.innerText = error.message;
    productsSectionEl.appendChild(err);
  }
  // Quando a página é recarregada, soma o valor dos produtos do carrinho através do localStorage.
  sumProductsPrice();
};
criaProdutos();

// AO RECARREGAR A PÁGINA MOSTRA OS PRODUTOS QUE ESTÃO SALVOS NO CARRINHO
const recuperaProdutosDoLocalStorage = async () => {
  const cartOlEl = document.querySelector('.cart__products');
  const arr = getSavedCartIDs();
  const arrProdsInfo = await Promise.all(arr.map(async (item) => fetchProduct(item)));

  arrProdsInfo.forEach((prod) => {
    const newProd = createCartProductElement(prod);
    cartOlEl.appendChild(newProd);
  });
};
recuperaProdutosDoLocalStorage();
