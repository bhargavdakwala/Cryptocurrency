import axios from 'axios'

const instance = axios.create({
	baseURL: 'https://api.coinlore.net/api/'
})

export default instance
