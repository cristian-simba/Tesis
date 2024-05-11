import axios from 'axios';

export const getNoticias = async () => {
  const url = 'https://api.bing.microsoft.com/v7.0/news/search';
  const params = { 
    q: 'moda estilo fashion ropa vestir', 
    setLang: 'es', 
    count: 3
  };
  const headers = { 'Ocp-Apim-Subscription-Key': '3f23ee86f6f04626abf3a782eb20444x' };

  try {
    const response = await axios.get(url, { params, headers });
    console.log(response.data) 
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
