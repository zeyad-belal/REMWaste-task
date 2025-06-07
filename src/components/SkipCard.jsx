import { Check } from 'lucide-react'

const FeatureIndicator = ({ allowed, allowedText, deniedText }) => (
  <div className="flex items-center space-x-2">
    <span className={`w-2 h-2 rounded-full ${allowed ? 'bg-green-500' : 'bg-red-500'}`} />
    <span className="text-sm text-gray-300">
      {allowed ? allowedText : deniedText}
    </span>
  </div>
)

const SkipCard = ({ skip, isSelected, onSelect, calculateTotalPrice }) => {
  const getSkipImage = () => {
    return `https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop&crop=center&auto=format&q=80`
  }

  return (
    <div
      className={`bg-custom-dark rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer border border-gray-800 ${
        isSelected ? 'ring-4 ring-blue-500 ring-opacity-50' : ''
      }`}
      onClick={onSelect}
    >
      {/* Skip Image */}
      <div className="relative h-48 bg-gradient-to-br from-yellow-400 to-orange-500">
        <img
          src={getSkipImage()}
          alt={`${skip.size} Yard Skip`}
          className="w-full h-full object-cover opacity-80"
        />
        <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
          {skip.size} Yards
        </div>
        {isSelected && (
          <div className="absolute inset-0 bg-blue-600/5 flex items-center justify-center">
            <div className="bg-white rounded-full p-3 shadow-xl">
              <Check className="w-8 h-8 text-blue-600" />
            </div>
          </div>
        )}
      </div>

      {/* Skip Details */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2">{skip.size} Yard Skip</h3>
        <p className="text-gray-400 mb-4">{skip.hire_period_days} day hire period</p>
        
        {/* Features */}
        <div className="space-y-2 mb-4">
          <FeatureIndicator
            allowed={skip.allowed_on_road}
            allowedText="Road placement allowed"
            deniedText="Private property only"
          />
          <FeatureIndicator
            allowed={skip.allows_heavy_waste}
            allowedText="Heavy waste accepted"
            deniedText="Light waste only"
          />
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-3xl font-bold text-blue-400">
              £{calculateTotalPrice(skip.price_before_vat, skip.vat)}
            </span>
            <span className="text-gray-500 text-sm ml-1">inc. VAT</span>
          </div>
          <button
            className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
              isSelected
                ? 'bg-blue-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600 border border-gray-600'
            }`}
          >
            {isSelected ? 'Selected' : 'Select'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default SkipCard
