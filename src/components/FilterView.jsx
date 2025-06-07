import { useState, useMemo } from "react";
import { ChevronDown, MapPin, Truck, Package, Calendar } from "lucide-react";
import { calculateTotalPrice } from "../utils/pricing";

const FilterDropdown = ({ label, value, options, onChange, icon: Icon }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-300 mb-2">
        <div className="flex items-center space-x-2">
          {Icon && <Icon className="w-4 h-4" />}
          <span>{label}</span>
        </div>
      </label>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-left text-white hover:bg-gray-600 transition-colors flex items-center justify-between"
      >
        <span>{value || "Select..."}</span>
        <ChevronDown
          className={`w-4 h-4 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-gray-700 border border-gray-600 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className="w-full px-4 py-3 text-left text-white hover:bg-gray-600 transition-colors border-b border-gray-600 last:border-b-0"
            >
              <div className="flex items-center justify-between">
                <span>{option.label}</span>
                {option.badge && (
                  <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded">
                    {option.badge}
                  </span>
                )}
              </div>
              {option.description && (
                <p className="text-xs text-gray-400 mt-1">
                  {option.description}
                </p>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const FilterView = ({ skips, selectedSkip, onSkipSelect }) => {
  const [filters, setFilters] = useState({
    size: "",
    placement: "",
    wasteType: "",
    hirePeriod: "",
  });

  // Generate filter options from available skips
  const filterOptions = useMemo(() => {
    const sizes = [...new Set(skips.map((skip) => skip.size))].sort(
      (a, b) => a - b
    );
    const hirePeriods = [
      ...new Set(skips.map((skip) => skip.hire_period_days)),
    ].sort((a, b) => a - b);

    return {
      size: sizes.map((size) => ({
        value: size.toString(),
        label: `${size} Yard Skip`,
        badge: size >= 20 ? "Large" : size >= 10 ? "Medium" : "Small",
      })),
      placement: [
        {
          value: "road",
          label: "Road Placement",
          description: "Can be placed on public roads",
        },
        {
          value: "private",
          label: "Private Property Only",
          description: "Must be placed on private property",
        },
      ],
      wasteType: [
        {
          value: "heavy",
          label: "Heavy Waste Accepted",
          description: "Suitable for construction debris, soil, etc.",
        },
        {
          value: "light",
          label: "Light Waste Only",
          description: "Household waste, garden waste, etc.",
        },
      ],
      hirePeriod: hirePeriods.map((days) => ({
        value: days.toString(),
        label: `${days} Days`,
        description:
          days >= 14 ? "Extended hire period" : "Standard hire period",
      })),
    };
  }, [skips]);

  // Filter skips based on current filters
  const filteredSkips = useMemo(() => {
    return skips.filter((skip) => {
      if (filters.size && skip.size.toString() !== filters.size) return false;
      if (filters.placement === "road" && !skip.allowed_on_road) return false;
      if (filters.placement === "private" && skip.allowed_on_road) return false;
      if (filters.wasteType === "heavy" && !skip.allows_heavy_waste)
        return false;
      if (filters.wasteType === "light" && skip.allows_heavy_waste)
        return false;
      if (
        filters.hirePeriod &&
        skip.hire_period_days.toString() !== filters.hirePeriod
      )
        return false;
      return true;
    });
  }, [skips, filters]);

  // Get the best match or first available skip
  const recommendedSkip = useMemo(() => {
    if (filteredSkips.length === 0) return null;
    if (filteredSkips.length === 1) return filteredSkips[0];

    // If multiple matches, prefer the one that matches most criteria
    return filteredSkips.reduce((best, current) => {
      const bestScore =
        (filters.size && best.size.toString() === filters.size ? 1 : 0) +
        (filters.placement === "road" && best.allowed_on_road ? 1 : 0) +
        (filters.placement === "private" && !best.allowed_on_road ? 1 : 0) +
        (filters.wasteType === "heavy" && best.allows_heavy_waste ? 1 : 0) +
        (filters.wasteType === "light" && !best.allows_heavy_waste ? 1 : 0) +
        (filters.hirePeriod &&
        best.hire_period_days.toString() === filters.hirePeriod
          ? 1
          : 0);

      const currentScore =
        (filters.size && current.size.toString() === filters.size ? 1 : 0) +
        (filters.placement === "road" && current.allowed_on_road ? 1 : 0) +
        (filters.placement === "private" && !current.allowed_on_road ? 1 : 0) +
        (filters.wasteType === "heavy" && current.allows_heavy_waste ? 1 : 0) +
        (filters.wasteType === "light" && !current.allows_heavy_waste ? 1 : 0) +
        (filters.hirePeriod &&
        current.hire_period_days.toString() === filters.hirePeriod
          ? 1
          : 0);

      return currentScore > bestScore ? current : best;
    });
  }, [filteredSkips, filters]);

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({ ...prev, [filterType]: value }));
  };

  const clearFilters = () => {
    setFilters({
      size: "",
      placement: "",
      wasteType: "",
      hirePeriod: "",
    });
  };

  const handleSelectSkip = () => {
    if (recommendedSkip) {
      onSkipSelect(recommendedSkip);
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Filter Controls */}
      <div className="bg-custom-dark rounded-xl p-6 mb-8 border border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white">
            Filter Your Perfect Skip
          </h3>
          <button
            onClick={clearFilters}
            className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
          >
            Clear All Filters
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FilterDropdown
            label="Skip Size"
            value={filters.size ? `${filters.size} Yard Skip` : ""}
            options={filterOptions.size}
            onChange={(value) => handleFilterChange("size", value)}
            icon={Package}
          />

          <FilterDropdown
            label="Placement"
            value={
              filters.placement
                ? filterOptions.placement.find(
                    (p) => p.value === filters.placement
                  )?.label
                : ""
            }
            options={filterOptions.placement}
            onChange={(value) => handleFilterChange("placement", value)}
            icon={MapPin}
          />

          <FilterDropdown
            label="Waste Type"
            value={
              filters.wasteType
                ? filterOptions.wasteType.find(
                    (w) => w.value === filters.wasteType
                  )?.label
                : ""
            }
            options={filterOptions.wasteType}
            onChange={(value) => handleFilterChange("wasteType", value)}
            icon={Truck}
          />

          <FilterDropdown
            label="Hire Period"
            value={filters.hirePeriod ? `${filters.hirePeriod} Days` : ""}
            options={filterOptions.hirePeriod}
            onChange={(value) => handleFilterChange("hirePeriod", value)}
            icon={Calendar}
          />
        </div>

        {/* Filter Summary */}
        <div className="mt-6 pt-4 border-t border-gray-600">
          <p className="text-sm text-gray-400">
            {filteredSkips.length === 0
              ? "No skips match your current filters. Try adjusting your criteria."
              : filteredSkips.length === 1
              ? "Perfect! We found exactly what you need."
              : `${filteredSkips.length} skips match your criteria. Showing the best recommendation.`}
          </p>
        </div>
      </div>

      {/* Recommended Skip Card */}
      {recommendedSkip ? (
        <div className="bg-custom-dark rounded-xl overflow-hidden border border-gray-700 shadow-lg mb-6">
          {/* Skip Image */}
          <div className="relative h-64 bg-gradient-to-br from-yellow-400 to-orange-500">
            <img
              src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=400&fit=crop&crop=center&auto=format&q=80"
              alt={`${recommendedSkip.size} Yard Skip`}
              className="w-full h-full object-cover opacity-80"
            />
            <div className="absolute top-6 right-6 bg-blue-600 text-white px-4 py-2 rounded-full text-lg font-semibold">
              {recommendedSkip.size} Yards
            </div>
            <div className="absolute top-6 left-6 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
              Recommended
            </div>
          </div>

          {/* Skip Details */}
          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column - Details */}
              <div>
                <h3 className="text-3xl font-bold text-white mb-4">
                  {recommendedSkip.size} Yard Skip
                </h3>
                <p className="text-gray-400 mb-6 text-lg">
                  {recommendedSkip.hire_period_days} day hire period
                </p>

                {/* Features */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center space-x-3">
                    <span
                      className={`w-3 h-3 rounded-full ${
                        recommendedSkip.allowed_on_road
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                    />
                    <span className="text-gray-300">
                      {recommendedSkip.allowed_on_road
                        ? "Road placement allowed"
                        : "Private property only"}
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span
                      className={`w-3 h-3 rounded-full ${
                        recommendedSkip.allows_heavy_waste
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                    />
                    <span className="text-gray-300">
                      {recommendedSkip.allows_heavy_waste
                        ? "Heavy waste accepted"
                        : "Light waste only"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column - Pricing & Action */}
              <div className="flex flex-col justify-center">
                <div className="text-center lg:text-right">
                  <div className="mb-6">
                    <span className="text-5xl font-bold text-blue-400">
                      £
                      {calculateTotalPrice(
                        recommendedSkip.price_before_vat,
                        recommendedSkip.vat
                      )}
                    </span>
                    <span className="text-gray-500 text-lg ml-2">inc. VAT</span>
                  </div>

                  <button
                    onClick={handleSelectSkip}
                    className={`w-full lg:w-auto px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 ${
                      selectedSkip?.id === recommendedSkip.id
                        ? "bg-green-600 text-white"
                        : "bg-blue-600 text-white hover:bg-blue-700 transform hover:scale-105"
                    }`}
                  >
                    {selectedSkip?.id === recommendedSkip.id
                      ? "Selected ✓"
                      : "Select This Skip"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {/* No Results State */}
      {filteredSkips.length === 0 ? (
        <div className="bg-custom-dark rounded-xl p-12 text-center border border-gray-700 mb-6">
          <Package className="w-16 h-16 text-gray-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">No Skips Found</h3>
          <p className="text-gray-400 mb-6">
            No skips match your current filter criteria. Try adjusting your
            filters or clearing them to see all available options.
          </p>
          <button
            onClick={clearFilters}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Clear All Filters
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default FilterView;
