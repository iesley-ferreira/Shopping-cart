const getCepInfoSpanEl = document.querySelector('.cart__address');

export const getAddress = async (cep) => {
  const erro = 'CEP não encontrado';
  if (cep === '00000000') {
    getCepInfoSpanEl.innerText = erro;
    return erro;
  }
  const GET_CEP_URL1 = await fetch(`https://cep.awesomeapi.com.br/json/${cep}`);
  const result1 = await GET_CEP_URL1.json();
  const GET_CEP_URL2 = await fetch(`https://brasilapi.com.br/api/cep/v2/${cep}`);
  const result2 = await GET_CEP_URL2.json();
  const promisesArray = [result1, result2];
  const resolvido = await Promise.any(promisesArray);
  if (result1.code === 'invalid' && result2.name === 'CepPromiseError') {
    getCepInfoSpanEl.innerText = erro;
  }
  if (result1.code === 'not_found' || result2.name === 'CepPromiseError') {
    getCepInfoSpanEl.innerText = erro;
  }
  const { address_type: type, address_name: name, district, city, state } = resolvido;
  const exhibition = `${type} ${name} - ${district} - ${city} - ${state}`;
  getCepInfoSpanEl.innerText = exhibition;
  return resolvido;
};

// Deverá chamar a função getAddress com o CEP digitado no input e exibir o endereço completo na tela.
// Essa função só deve ser executada após o usuário digitar o CEP com 8 dígitos e pressionar o botão de buscar CEP com a classe cep-button.
export const searchCep = async () => {
  const CEP = document.querySelector('.cep-input').value;
  getAddress(CEP);
};
