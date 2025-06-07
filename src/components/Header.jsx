import { STEPS } from '../constants/steps'
import StepItem from './StepItem'

const Header = () => {
  return (
    <header className="py-6">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 ">
        {/* Mobile Grid Layout */}
        <div className="grid grid-cols-3 gap-4 md:hidden">
          {STEPS.map((step) => (
            <StepItem key={step.id} step={step} />
          ))}
        </div>

        {/* Desktop Horizontal Layout */}
        <div className="hidden md:flex items-center justify-center space-x-4 text-sm">
          {STEPS.map((step, index) => (
            <StepItem 
              key={step.id} 
              step={step} 
              isLast={index === STEPS.length - 1}
            />
          ))}
        </div>
      </div>
    </header>
  )
}

export default Header
