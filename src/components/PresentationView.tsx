import React, { useState } from 'react';
import { PITCH_SLIDES } from '../data/slidesData';
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  BookOpen,
  Copy,
  Check,
  Share2,
  Sparkles,
  AlertTriangle,
  Lightbulb,
  CheckCircle2,
  ArrowRight,
  TrendingDown,
  TrendingUp,
} from 'lucide-react';

interface PresentationViewProps {
  onOpenExportModal: () => void;
}

export const PresentationView: React.FC<PresentationViewProps> = ({ onOpenExportModal }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [showNotes, setShowNotes] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [copied, setCopied] = useState(false);

  const slide = PITCH_SLIDES[currentSlideIndex];

  const handleNext = () => {
    if (currentSlideIndex < PITCH_SLIDES.length - 1) {
      setCurrentSlideIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex((prev) => prev - 1);
    }
  };

  const copySlideText = () => {
    let text = `${slide.part} | Слайд ${slide.id}: ${slide.title}\n${slide.subtitle}\n\n`;
    if (slide.heroMetric) {
      text += `Ключевая цифра: ${slide.heroMetric.value} — ${slide.heroMetric.label} (${slide.heroMetric.subtext})\n\n`;
    }
    slide.bulletPoints.forEach((bp) => {
      text += bp.title ? `• ${bp.title}: ${bp.text}\n` : `• ${bp.text}\n`;
    });
    if (slide.callout) {
      text += `\n[${slide.callout.title}]\n${slide.callout.text}\n`;
    }
    if (slide.speakerNotes) {
      text += `\nЗаметки спикера:\n${slide.speakerNotes}`;
    }

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={`flex flex-col transition-all duration-300 ${
        isFullscreen ? 'fixed inset-0 z-50 bg-[#FFFDF9] p-4 sm:p-8 overflow-y-auto' : 'w-full max-w-7xl mx-auto py-6 px-4'
      }`}
    >
      {/* Top Control Bar (Warm Executive Theme) */}
      <div className="flex flex-wrap items-center justify-between mb-4 bg-white border border-[#E8E2D8] p-3.5 rounded-2xl shadow-sm">
        <div className="flex items-center space-x-3 text-xs text-[#786C62]">
          <span className="font-bold text-[#D96B27] bg-[#D96B27]/10 border border-[#D96B27]/20 px-3 py-1 rounded-full uppercase tracking-wider">
            {slide.part}
          </span>
          <span className="hidden sm:inline">•</span>
          <span className="font-medium text-[#29221D]">
            Слайд <strong className="text-[#D96B27]">{slide.id}</strong> из {PITCH_SLIDES.length}
          </span>
        </div>

        <div className="flex items-center space-x-2 mt-2 sm:mt-0">
          <button
            onClick={() => setShowNotes(!showNotes)}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              showNotes
                ? 'bg-[#D96B27] text-white shadow-sm'
                : 'bg-[#F5EFE6] text-[#29221D] hover:bg-[#EFE6D8]'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>{showNotes ? 'Скрыть заметки' : 'Заметки спикера'}</span>
          </button>

          <button
            onClick={copySlideText}
            className="flex items-center space-x-1.5 bg-[#F5EFE6] text-[#29221D] hover:bg-[#EFE6D8] px-3 py-1.5 rounded-xl text-xs font-semibold transition-all"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-[#15803D]" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Скопировано' : 'Копировать'}</span>
          </button>

          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="bg-[#F5EFE6] text-[#29221D] hover:bg-[#EFE6D8] p-2 rounded-xl transition-all"
            title="Полноэкранный режим"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main Slide Screen — Warm Keynote Style Canvas */}
      <div className="relative bg-[#FFFDF9] border border-[#E8E2D8] rounded-[24px] shadow-[0_10px_30px_rgba(217,107,39,0.05)] overflow-hidden min-h-[560px] flex flex-col justify-between p-6 sm:p-12 transition-all duration-500 animate-fadeIn">
        
        {/* Top Header Row */}
        <div>
          <div className="flex items-center justify-between border-b border-[#E8E2D8] pb-4 mb-8">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#D96B27]" />
              <span className="text-xs font-bold tracking-widest uppercase text-[#D96B27] font-mono">
                {slide.part}
              </span>
            </div>
            <span className="text-xs font-mono font-bold text-[#786C62]">
              SLIDE {slide.id < 10 ? `0${slide.id}` : slide.id} / {PITCH_SLIDES.length < 10 ? `0${PITCH_SLIDES.length}` : PITCH_SLIDES.length}
            </span>
          </div>

          {/* 12 Column Layout Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left / Primary Text Column (5-6 Cols) */}
            <div className="lg:col-span-6 space-y-6">
              
              {/* Title & Subtitle */}
              <div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#29221D] tracking-tight leading-[1.1] font-['Manrope',sans-serif] mb-3">
                  {slide.title}
                </h2>
                <p className="text-lg sm:text-xl font-semibold text-[#786C62] leading-snug font-['Inter',sans-serif]">
                  {slide.subtitle}
                </p>
              </div>

              {/* Key Bullet Points */}
              <div className="space-y-4 pt-2">
                {slide.bulletPoints.map((bp, idx) => (
                  <div key={idx} className="flex items-start space-x-3.5 group">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#D96B27] mt-2 shrink-0 group-hover:scale-125 transition-transform" />
                    <div className="text-sm sm:text-base text-[#29221D] leading-relaxed">
                      {bp.title && (
                        <strong className="font-bold text-[#29221D] mr-1 font-['Inter',sans-serif]">
                          {bp.title}:
                        </strong>
                      )}
                      <span className="text-[#4A3E37] font-normal">{bp.text}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Slide 7 Special Table Data (if present) */}
              {slide.tableData && (
                <div className="space-y-3 pt-2">
                  {slide.tableData.map((row, idx) => (
                    <div key={idx} className="bg-[#F5EFE6] p-4 rounded-[18px] border border-[#E8E2D8] space-y-1">
                      <div className="text-xs font-bold text-[#D96B27] uppercase tracking-wider">
                        ГИПОТЕЗА 0{idx + 1}
                      </div>
                      <p className="text-xs font-semibold text-[#29221D]">{row.col1}</p>
                      <p className="text-xs text-[#15803D] font-medium bg-[#15803D]/10 p-2 rounded-lg mt-1">
                        ✓ Признак успеха: {row.col2}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Executive Callout Box */}
              {slide.callout && (
                <div
                  className={`p-5 rounded-[20px] border transition-all ${
                    slide.callout.type === 'warning'
                      ? 'bg-[#C0392B]/5 border-[#C0392B]/30 text-[#C0392B]'
                      : slide.callout.type === 'solution'
                      ? 'bg-[#15803D]/5 border-[#15803D]/30 text-[#15803D]'
                      : 'bg-[#D96B27]/5 border-[#D96B27]/30 text-[#D96B27]'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className="mt-0.5 shrink-0">
                      {slide.callout.type === 'warning' ? (
                        <AlertTriangle className="w-5 h-5 text-[#C0392B]" />
                      ) : slide.callout.type === 'solution' ? (
                        <CheckCircle2 className="w-5 h-5 text-[#15803D]" />
                      ) : (
                        <Sparkles className="w-5 h-5 text-[#D96B27]" />
                      )}
                    </div>
                    <div>
                      <span className="text-[11px] font-bold tracking-widest uppercase block mb-1">
                        {slide.callout.title}
                      </span>
                      <p className="text-xs sm:text-sm font-medium text-[#29221D] leading-relaxed">
                        {slide.callout.text}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right / Visual Column (6-7 Cols: 70% Visual Ratio) */}
            <div className="lg:col-span-6 space-y-6 flex flex-col justify-between h-full">
              
              {/* Hero Metric Number Card */}
              {slide.heroMetric && (
                <div
                  className={`p-6 sm:p-8 rounded-[24px] border shadow-sm flex flex-col justify-center transition-transform hover:scale-[1.01] ${
                    slide.heroMetric.isProblem
                      ? 'bg-white border-[#C0392B]/20'
                      : 'bg-white border-[#D96B27]/20'
                  }`}
                >
                  <span className="text-xs font-bold uppercase tracking-widest text-[#786C62] mb-1">
                    КЛЮЧЕВОЙ ПОКАЗАТЕЛЬ
                  </span>
                  <div
                    className={`text-6xl sm:text-7xl lg:text-8xl font-black font-['Manrope',sans-serif] tracking-tight leading-none my-2 ${
                      slide.heroMetric.isProblem ? 'text-[#C0392B]' : 'text-[#D96B27]'
                    }`}
                  >
                    {slide.heroMetric.value}
                  </div>
                  <p className="text-base sm:text-lg font-bold text-[#29221D] leading-snug">
                    {slide.heroMetric.label}
                  </p>
                  {slide.heroMetric.subtext && (
                    <p className="text-xs text-[#786C62] mt-1 font-medium">
                      {slide.heroMetric.subtext}
                    </p>
                  )}
                </div>
              )}

              {/* Children's Drawing Artwork Card */}
              {slide.imageUrl && (
                <div className="relative group overflow-hidden rounded-[24px] border border-[#E8E2D8] shadow-sm bg-[#F5EFE6]">
                  <img
                    src={slide.imageUrl}
                    alt={slide.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-56 sm:h-72 object-cover transition-transform duration-700 group-hover:scale-105 contrast-[1.02] brightness-[1.01]"
                  />
                  
                  {/* Soft Gradient Overlay & Caption */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-4">
                    <p className="text-xs text-white font-medium tracking-wide drop-shadow-sm flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#D97706]" />
                      {slide.imageCaption || 'Детский рисунок'}
                    </p>
                  </div>
                </div>
              )}

              {/* Special Slide 9 Coordinate Plane Visualization ("Я" vs "МЫ") */}
              {slide.id === 9 && (
                <div className="bg-white border border-[#E8E2D8] p-5 rounded-[20px] shadow-sm space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold text-[#29221D]">
                    <span>Координатная плоскость «Я» vs «МЫ»</span>
                    <span className="text-[#15803D] font-semibold">Баланс ролей</span>
                  </div>
                  
                  <div className="relative h-44 bg-[#F5EFE6] rounded-xl border border-[#E8E2D8] flex items-center justify-center p-4 overflow-hidden">
                    {/* Axes lines */}
                    <div className="absolute inset-x-0 top-1/2 h-0.5 bg-[#D8CFC4]" />
                    <div className="absolute inset-y-0 left-1/2 w-0.5 bg-[#D8CFC4]" />
                    
                    {/* Axis Labels */}
                    <span className="absolute left-2 top-2 text-[10px] font-bold text-[#786C62]">
                      «Я» (Карьера / Творчество)
                    </span>
                    <span className="absolute right-2 bottom-2 text-[10px] font-bold text-[#D96B27]">
                      «МЫ» (Семья / Дети)
                    </span>

                    {/* Target Sweet Spot Bubble */}
                    <div className="absolute top-6 right-6 bg-[#15803D]/20 border border-[#15803D] text-[#15803D] px-3 py-1.5 rounded-full text-xs font-bold animate-pulse shadow-sm">
                      Оптимум лаборатории
                    </div>

                    {/* Plot Points */}
                    <div className="absolute left-8 bottom-8 w-3 h-3 rounded-full bg-[#C0392B]" title="До игры (дисбаланс)" />
                    <div className="absolute right-12 top-10 w-4 h-4 rounded-full bg-[#D96B27] shadow-md flex items-center justify-center text-[9px] text-white font-bold">
                      ✓
                    </div>
                  </div>
                  <p className="text-[11px] text-[#786C62] text-center">
                    Практика «Красных часов» восстанавливает обе оси без жертв
                  </p>
                </div>
              )}

            </div>
          </div>
        </div>

        {/* Speaker Notes Drawer (if toggled) */}
        {showNotes && (
          <div className="mt-8 p-5 bg-[#F5EFE6] rounded-[18px] border border-[#E8E2D8] text-xs text-[#29221D]">
            <div className="flex items-center space-x-2 text-[#D96B27] font-bold uppercase tracking-wider mb-1.5">
              <BookOpen className="w-4 h-4" />
              <span>Шпаргалка для выступления (Speaker Notes)</span>
            </div>
            <p className="leading-relaxed text-[#4A3E37] font-medium italic">
              «{slide.speakerNotes}»
            </p>
          </div>
        )}

        {/* Slide Bottom Navigation Bar */}
        <div className="flex items-center justify-between pt-6 border-t border-[#E8E2D8] mt-8">
          <button
            onClick={handlePrev}
            disabled={currentSlideIndex === 0}
            className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
              currentSlideIndex === 0
                ? 'opacity-30 cursor-not-allowed text-[#786C62]'
                : 'bg-[#F5EFE6] text-[#29221D] hover:bg-[#EFE6D8]'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Назад</span>
          </button>

          {/* Quick Dots Pagination */}
          <div className="flex items-center space-x-2">
            {PITCH_SLIDES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlideIndex(idx)}
                className={`transition-all ${
                  idx === currentSlideIndex
                    ? 'w-8 h-2.5 rounded-full bg-[#D96B27]'
                    : 'w-2.5 h-2.5 rounded-full bg-[#D8CFC4] hover:bg-[#B8ACA0]'
                }`}
                title={`Перейти к слайду ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            disabled={currentSlideIndex === PITCH_SLIDES.length - 1}
            className={`flex items-center space-x-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
              currentSlideIndex === PITCH_SLIDES.length - 1
                ? 'opacity-30 cursor-not-allowed text-[#786C62]'
                : 'bg-[#D96B27] text-white hover:bg-[#B85418] shadow-md'
            }`}
          >
            <span>Далее</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Footer Banner for Google Slides Export */}
      <div className="mt-6 bg-white border border-[#E8E2D8] p-5 rounded-[20px] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-3.5">
          <div className="w-10 h-10 rounded-2xl bg-[#D97706]/10 text-[#D97706] flex items-center justify-center shrink-0">
            <Share2 className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-[#29221D]">Нужна готовая презентация в Google Slides?</h4>
            <p className="text-xs text-[#786C62]">
              Экспортируйте все {PITCH_SLIDES.length} слайдов с вашей стилистикой одним кликом в свой Google Диск
            </p>
          </div>
        </div>
        <button
          onClick={onOpenExportModal}
          className="bg-[#D96B27] hover:bg-[#B85418] text-white font-bold px-4 py-2 rounded-xl text-xs transition-all shadow-sm shrink-0 flex items-center gap-2"
        >
          <span>Экспорт в Google Slides</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
