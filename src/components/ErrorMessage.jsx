import { AlertTriangle } from 'lucide-react'

const ErrorMessage = ({ error, onRetry }) => (
  <div className="min-h-screen bg-gray-950 flex items-center justify-center">
    <div className="text-center bg-custom-dark p-8 rounded-lg shadow-lg border border-gray-700">
      <AlertTriangle className="w-16 h-16 text-red-400 mx-auto mb-4" />
      <h2 className="text-2xl font-bold text-white mb-2">Oops! Something went wrong</h2>
      <p className="text-gray-300 mb-4">{error}</p>
      <button 
        onClick={onRetry}
        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Try Again
      </button>
    </div>
  </div>
)

export default ErrorMessage
