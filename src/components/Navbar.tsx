import React from 'react';
import { AppView } from '../types';
import { Gamepad2, Layers, LineChart, Sparkles } from 'lucide-react';

interface NavbarProps {
  currentView: AppView;
  setCurrentView: (view: AppView) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  setCurrentView,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FFFDF9]/90 backdrop-blur-md border-b border-[#E8E2D8] text-[#29221D] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand / Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-[#D96B27] text-white flex items-center justify-center shadow-sm">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-sm sm:text-base font-extrabold tracking-tight text-[#29221D] flex items-center gap-2 font-['Manrope',sans-serif]">
                Семейная лаборатория
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#D96B27]/10 text-[#D96B27] border border-[#D96B27]/20">
                  Черновик · 18–35
                </span>
              </h1>
              <p className="text-[11px] text-[#786C62]">Тест-драйв совместной жизни без душноты</p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="hidden md:flex items-center space-x-1 bg-[#F5EFE6] p-1.5 rounded-2xl border border-[#E8E2D8]">
            <button
              onClick={() => setCurrentView('simulator')}
              className={`flex items-center space-x-2 px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                currentView === 'simulator'
                  ? 'bg-white text-[#D96B27] shadow-sm'
                  : 'text-[#786C62] hover:text-[#29221D]'
              }`}
            >
              <Gamepad2 className="w-4 h-4" />
              <span>Тест-драйв (3 часа)</span>
            </button>

            <button
              onClick={() => setCurrentView('cards')}
              className={`flex items-center space-x-2 px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                currentView === 'cards'
                  ? 'bg-white text-[#D96B27] shadow-sm'
                  : 'text-[#786C62] hover:text-[#29221D]'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Карточки игры</span>
            </button>

            <button
              onClick={() => setCurrentView('metrics')}
              className={`flex items-center space-x-2 px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                currentView === 'metrics'
                  ? 'bg-white text-[#D96B27] shadow-sm'
                  : 'text-[#786C62] hover:text-[#29221D]'
              }`}
            >
              <LineChart className="w-4 h-4" />
              <span>Инсайты &amp; Опыт</span>
            </button>
          </nav>

          {/* Status Badge */}
          <div className="hidden sm:flex items-center space-x-2 text-xs text-[#786C62] bg-[#F5EFE6] px-3 py-1.5 rounded-full border border-[#E8E2D8]">
            <span className="w-2 h-2 rounded-full bg-[#15803D] animate-pulse"></span>
            <span className="font-semibold text-[#29221D]">Офлайн формат: 12–20 человек</span>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="flex md:hidden overflow-x-auto py-2 border-t border-[#E8E2D8] space-x-2">
          <button
            onClick={() => setCurrentView('simulator')}
            className={`px-3 py-1 rounded-lg text-xs font-bold whitespace-nowrap ${
              currentView === 'simulator' ? 'bg-[#D96B27] text-white' : 'text-[#786C62]'
            }`}
          >
            Тест-драйв
          </button>
          <button
            onClick={() => setCurrentView('cards')}
            className={`px-3 py-1 rounded-lg text-xs font-bold whitespace-nowrap ${
              currentView === 'cards' ? 'bg-[#D96B27] text-white' : 'text-[#786C62]'
            }`}
          >
            Карточки
          </button>
          <button
            onClick={() => setCurrentView('metrics')}
            className={`px-3 py-1 rounded-lg text-xs font-bold whitespace-nowrap ${
              currentView === 'metrics' ? 'bg-[#D96B27] text-white' : 'text-[#786C62]'
            }`}
          >
            Инсайты
          </button>
        </div>
      </div>
    </header>
  );
};
