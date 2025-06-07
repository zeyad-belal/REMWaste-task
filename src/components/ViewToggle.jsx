import { VIEW_OPTIONS } from '../constants/views'

const ViewToggle = ({ currentView, onViewChange }) => {
  return (
    <div className="flex items-center bg-custom-dark rounded-lg p-1 border border-gray-700">
      {VIEW_OPTIONS.map((option) => {
        const Icon = option.icon
        const isActive = currentView === option.id
        
        return (
          <button
            key={option.id}
            onClick={() => onViewChange(option.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
              isActive
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-gray-400 hover:text-gray-300 hover:bg-gray-700'
            }`}
            title={option.description}
          >
            <Icon className="w-4 h-4" />
            <span className="hidden sm:inline">{option.label}</span>
          </button>
        )
      })}
    </div>
  )
}

export default ViewToggle
