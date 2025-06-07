const LoadingSpinner = () => (
  <div className="min-h-screen bg-gray-950 flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4" />
      <p className="text-gray-300 text-lg">Loading skip options...</p>
    </div>
  </div>
)

export default LoadingSpinner
