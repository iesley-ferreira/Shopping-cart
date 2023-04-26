export const fetchProduct = async (productID) => {
  if (!productID) throw new Error('ID não informado');
  const result = await fetch(`https://api.mercadolibre.com/items/${productID}`);
  const data = await result.json();
  return data;
};

export const fetchProductsList = async (product) => {
  if (!product) throw new Error('Termo de busca não informado');
  try {
    const result = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${product}`);
    const data = await result.json();
    return data.results;
  } catch {
    throw new Error('Algum erro ocorreu, recarregue a página e tente novamente');
  }
};
