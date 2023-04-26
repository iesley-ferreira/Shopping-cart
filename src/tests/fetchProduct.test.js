import './mocks/fetchSimulator';
import { fetchProduct } from '../helpers/fetchFunctions';
import product from './mocks/product';

// implemente seus testes aqui
describe('Teste a função fetchProduct', () => {
  it('Teste se fetchProduct é uma função', () => {
    expect(typeof fetchProduct).toBe('function')
  });

  it(`Teste se ao chamar a função fetchProduct com o argumento "MLB1405519561", a fetch é chamada`, async () => {
    await fetchProduct('MLB1405519561')
    expect(fetch).toHaveBeenCalled();
  });

  it(`Teste se ao chamar a função fetchProduct com o argumento do produto "MLB1405519561", a função fetch utiliza o endpoint correto`, async () => {
    await fetchProduct('MLB1405519561')
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/items/MLB1405519561');
  });

  it(`Teste se o retorno da função fetchProduct com o argumento do produto "MLB1405519561" é uma estrutura de dados igual ao objeto produto que já está importado no arquivo`, async () => {
    const result = await fetchProduct('MLB1405519561')
    expect(result).toEqual(product);
  });

  it(`Teste se, ao chamar a função fetchProduct sem argumento, retorna um erro com a mensagem: 'ID não informado'`, async () => {
    await expect( fetchProduct()).rejects.toThrow('ID não informado');
  });
});
