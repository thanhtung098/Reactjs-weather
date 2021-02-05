import axios from 'axios'
const KEY = 'd1855a32d3b7440b803152607210401';

export default axios.create({
    baseURL: 'https://api.weatherapi.com/v1/',
    params: {
        key: KEY,
        q: '',
        days: ''
    }
})