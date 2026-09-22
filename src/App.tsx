import React, { useState } from 'react';
import { AppView } from './types';
import { Navbar } from './components/Navbar';
import { WorkshopSimulator } from './components/WorkshopSimulator';
import { CardDeckView } from './components/CardDeckView';
import { MetricsDashboard } from './components/MetricsDashboard';

export default function App() {
  const [currentView, setCurrentView] = useState<AppView>('simulator');

  return (
    <div className="min-h-screen bg-[#FFFDF9] text-[#29221D] font-sans selection:bg-[#D96B27] selection:text-white">
      <Navbar
        currentView={currentView}
        setCurrentView={setCurrentView}
      />

      <main className="pb-12">
        {currentView === 'simulator' && <WorkshopSimulator />}
        {currentView === 'cards' && <CardDeckView />}
        {currentView === 'metrics' && <MetricsDashboard />}
      </main>
    </div>
  );
}
