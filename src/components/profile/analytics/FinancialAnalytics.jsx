import React from 'react';
import FinancialSummary from './FinancialSummary';
import RevenueChart from './RevenueChart';
import CropPerformance from './CropPerformance';
import SeasonAnalysis from './SeasonAnalysis';
import FarmEfficiency from './FarmEfficiency';
import SmartInsights from './SmartInsights';
import FinancialMilestones from './FinancialMilestones';

export default function FinancialAnalytics() {
  return (
    <div className="mt-12 flex flex-col gap-6 animate-fade-in-up">
      <div className="flex items-center gap-4 mb-2">
        <h2 className="text-3xl font-black text-slate-800 tracking-tight">📊 Financial Analytics</h2>
        <div className="flex-1 h-0.5 bg-gradient-to-r from-farm-green to-transparent rounded-full opacity-30"></div>
      </div>
      
      {/* Section 1: Summary */}
      <FinancialSummary />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Column (2/3 width) */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Section 2: Chart */}
          <RevenueChart />
          
          {/* Section 3: Crop Performance */}
          <CropPerformance />
          
          {/* Section 4: Season Analysis */}
          <SeasonAnalysis />
        </div>

        {/* Sidebar Column (1/3 width) */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          {/* Section 6: Smart Insights */}
          <SmartInsights />
          
          {/* Section 5: Farm Efficiency */}
          <FarmEfficiency />
          
          {/* Section 7: Milestones */}
          <FinancialMilestones />
        </div>

      </div>
    </div>
  );
}
