  // Axios configuration for the server 
const api = axios.create({
  baseURL: 'http://0.0.0.0:8080/',
  timeout: 1000,
  headers: {
   'authorization': Cookies.get('JWT_TOKEN')
  }
});