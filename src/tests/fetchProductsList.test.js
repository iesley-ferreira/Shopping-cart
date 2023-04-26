import './mocks/fetchSimulator';
import { fetchProductsList } from '../helpers/fetchFunctions';
import computadorSearch from './mocks/search';

// implemente seus testes aqui
describe('Teste a função fetchProductsList', () => {
  it('fetchProductsList é uma função', () => {
    expect(typeof fetchProductsList).toBe('function')
  });

  it('fetch é chamado ao executar fetchProductsList', async () => {
    await fetchProductsList('computador');
    expect(fetch).toHaveBeenCalled();
  });

  it('fetch é chamado com o endpoint correto ao executar fetchProductsList', async () => {
    await fetchProductsList('computador');
    expect(fetch).toHaveBeenCalledWith('https://api.mercadolibre.com/sites/MLB/search?q=computador');
  });

  it(`Teste se fetchProductsList com o argumento 'computador' é igual ao objeto computadorSearch`, async () => {
    const result = await fetchProductsList('computador')
    expect(result).toEqual(computadorSearch);
  });

  it(`Teste se fetchProductsList ao ser chamada sem argumento, retorna um erro com a mensagem: 'Termo de busca não informado'`, async () => {
    await expect(fetchProductsList()).rejects.toThrow('Termo de busca não informado');
  });

  it(`Teste se fetchProductsList ao não conseguir consultar a API, retorna um erro com a mensagem: 'Algum erro ocorreu, recarregue a página e tente novamente'`, async () => {
    await expect(fetchProductsList('XABALABADUB')).rejects.toThrow('Algum erro ocorreu, recarregue a página e tente novamente');
  });
 
});
