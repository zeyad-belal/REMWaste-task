import axios from 'axios'

const API_BASE_URL = 'https://app.wewantwaste.co.uk/api' // this will be in ur .env file in production

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor
apiClient.interceptors.request.use(
  (config) => {
    // Add any auth headers or logging here
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor
apiClient.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    // Handle common errors here
    const errorMessage = error.response?.data?.message || error.message || 'An error occurred'
    return Promise.reject(new Error(errorMessage))
  }
)

export const skipService = {
  getSkipsByLocation: async (postcode, area) => {
    try {
      const data = await apiClient.get('/skips/by-location', {
        params: { postcode, area }
      })
      return data
    } catch (error) {
      throw new Error(`Failed to fetch skips: ${error.message}`)
    }
  }
}

export default apiClient
