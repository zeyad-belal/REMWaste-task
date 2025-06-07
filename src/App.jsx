import { useState } from "react";
import Header from "./components/Header";
import SkipCard from "./components/SkipCard";
import SelectedSkipSummary from "./components/SelectedSkipSummary";
import LoadingSpinner from "./components/LoadingSpinner";
import ErrorMessage from "./components/ErrorMessage";
import ViewToggle from "./components/ViewToggle";
import FilterView from "./components/FilterView";
import { useSkips } from "./hooks/useSkips";
import { calculateTotalPrice } from "./utils/pricing";
import { VIEW_TYPES } from "./constants/views";

const ActionButtons = ({ selectedSkip, onBack, onContinue }) => (
  <div className="flex flex-col sm:flex-row gap-4 justify-center">
    <button
      onClick={onBack}
      className="px-8 py-3 bg-gray-700 text-gray-300 rounded-lg font-semibold hover:bg-gray-600 transition-colors border border-gray-600"
    >
      Back
    </button>
    <button
      onClick={onContinue}
      disabled={!selectedSkip}
      className={`px-8 py-3 rounded-lg font-semibold transition-colors ${
        selectedSkip
          ? "bg-blue-600 text-white hover:bg-blue-700"
          : "bg-gray-700 text-gray-500 cursor-not-allowed border border-gray-600"
      }`}
    >
      Continue to Booking Details →
    </button>
  </div>
);


function App() {
  const [selectedSkip, setSelectedSkip] = useState(null);
  const [currentView, setCurrentView] = useState(VIEW_TYPES.GRID);
  const { skips, loading, error, refetch } = useSkips();

  const handleSkipSelect = (skip) => {
    setSelectedSkip(skip);
  };

  const handleViewChange = (view) => {
    setCurrentView(view);
  };

  const handleBack = () => {
    // Navigate to previous step
    console.log("Navigate back");
  };

  const handleContinue = () => {
    // Navigate to next step
    console.log("Continue to booking details");
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} onRetry={refetch} />;

  return (
    <div className="min-h-screen bg-gray-950">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header with View Toggle */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-12">
          <div className="text-center lg:text-left mb-6 lg:mb-0">
            <h2 className="text-4xl font-bold text-white mb-4">
              Choose Your Skip Size
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl">
              Select the perfect skip size for your project. All prices include
              VAT and delivery to NR32, Lowestoft.
            </p>
          </div>

          <div className="flex justify-center lg:justify-end">
            <ViewToggle
              currentView={currentView}
              onViewChange={handleViewChange}
            />
          </div>
        </div>

        {/* Content based on current view */}
        {currentView === VIEW_TYPES.GRID ? (
          <>
            {/* Grid View */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {skips?.map((skip) => (
                <SkipCard
                  key={skip.id}
                  skip={skip}
                  isSelected={selectedSkip?.id === skip.id}
                  onSelect={() => handleSkipSelect(skip)}
                  calculateTotalPrice={calculateTotalPrice}
                />
              ))}
            </div>
          </>
        ) : (
          <>
            {/* Filter View */}
            <FilterView
              skips={skips || []}
              selectedSkip={selectedSkip}
              onSkipSelect={handleSkipSelect}
            />
          </>
        )}

        <SelectedSkipSummary
          selectedSkip={selectedSkip}
          calculateTotalPrice={calculateTotalPrice}
        />

        <ActionButtons
          selectedSkip={selectedSkip}
          onBack={handleBack}
          onContinue={handleContinue}
        />
      </main>

      <footer className="bg-gray-800 text-white py-8 mt-16 border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">
            © 2025 WeWantWaste. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
