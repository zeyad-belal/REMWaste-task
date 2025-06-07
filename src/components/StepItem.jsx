import {  STEP_STATUS } from '../constants/steps'

const StepItem = ({ step, isLast }) => {
  const Icon = step.icon
  const isCompleted = step.status === STEP_STATUS.COMPLETED
  const isCurrent = step.status === STEP_STATUS.CURRENT

  const getStepStyles = () => {
    if (isCompleted || isCurrent) {
      return {
        iconBg: 'bg-blue-600',
        iconColor: 'text-white',
        textColor: 'text-blue-400 font-medium',
        lineColor: 'bg-blue-600'
      }
    }
    return {
      iconBg: 'bg-transparent',
      iconColor: 'text-gray-400',
      textColor: 'text-gray-400',
      lineColor: 'bg-gray-600'
    }
  }

  const styles = getStepStyles()

  return (
    <>
      {/* Mobile Layout */}
      <div className="flex flex-col items-center space-y-2 md:hidden">
        <div className={`w-8 h-8 ${styles.iconBg} rounded-full flex items-center justify-center`}>
          <Icon className={`w-4 h-4 ${styles.iconColor}`} />
        </div>
        <span className={`text-xs ${styles.textColor}`}>{step.label}</span>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:flex items-center space-x-3">
        <div className={`w-8 h-8 ${styles.iconBg} rounded-full flex items-center justify-center`}>
          <Icon className={`w-4 h-4 ${styles.iconColor}`} />
        </div>
        <span className={`text-sm ${styles.textColor}`}>{step.label}</span>
        {!isLast && <div className={`w-16 h-0.5 ${styles.lineColor}`} />}
      </div>
    </>
  )
}

export default StepItem