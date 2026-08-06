import React, { useState } from 'react';
import { AppView } from './types';
import { User } from 'firebase/auth';
import { Navbar } from './components/Navbar';
import { PresentationView } from './components/PresentationView';
import { WorkshopSimulator } from './components/WorkshopSimulator';
import { CardDeckView } from './components/CardDeckView';
import { MetricsDashboard } from './components/MetricsDashboard';
import { GoogleSlidesExportModal } from './components/GoogleSlidesExportModal';

export default function App() {
  const [currentView, setCurrentView] = useState<AppView>('presentation');
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  return (
    <div className="min-h-screen bg-[#FFFDF9] text-[#29221D] font-sans selection:bg-[#D96B27] selection:text-white">
      <Navbar
        currentView={currentView}
        setCurrentView={setCurrentView}
        onOpenExportModal={() => setIsExportModalOpen(true)}
        user={user}
      />

      <main className="pb-12">
        {currentView === 'presentation' && (
          <PresentationView onOpenExportModal={() => setIsExportModalOpen(true)} />
        )}
        {currentView === 'simulator' && <WorkshopSimulator />}
        {currentView === 'cards' && <CardDeckView />}
        {currentView === 'metrics' && <MetricsDashboard />}
      </main>

      {/* Export to Google Slides Modal */}
      <GoogleSlidesExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        user={user}
        setUser={setUser}
      />
    </div>
  );
}
