const SummaryItem = ({ label, value }) => (
  <div>
    <p className="text-sm text-gray-400">{label}</p>
    <p className="text-lg font-semibold text-white">{value}</p>
  </div>
)

const SelectedSkipSummary = ({ selectedSkip, calculateTotalPrice }) => {
  if (!selectedSkip) return null

  return (
    <div className="bg-custom-dark rounded-xl shadow-lg p-6 mb-8 border border-gray-800">
      <h3 className="text-xl font-bold text-white mb-4">Selected Skip Summary</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SummaryItem 
          label="Skip Size" 
          value={`${selectedSkip.size} Yard Skip`} 
        />
        <SummaryItem 
          label="Hire Period" 
          value={`${selectedSkip.hire_period_days} days`} 
        />
        <SummaryItem 
          label="Total Price" 
          value={
            <span className="text-blue-400">
              £{calculateTotalPrice(selectedSkip.price_before_vat, selectedSkip.vat)} inc. VAT
            </span>
          } 
        />
      </div>
    </div>
  )
}

export default SelectedSkipSummary
