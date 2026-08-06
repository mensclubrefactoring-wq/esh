import React, { useState } from 'react';
import { exportToPptx } from '../lib/pptxExport';
import { PITCH_SLIDES } from '../data/slidesData';
import { X, FileSpreadsheet, Download, Loader2, CheckCircle2 } from 'lucide-react';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  user?: any;
  setUser?: any;
}

export const GoogleSlidesExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [loadingPptx, setLoadingPptx] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleExportPptx = async () => {
    setLoadingPptx(true);
    setError(null);
    try {
      await exportToPptx(PITCH_SLIDES);
      setDownloaded(true);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Ошибка генерации файла .pptx');
    } finally {
      setLoadingPptx(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white border border-[#E8E2D8] rounded-[24px] max-w-lg w-full p-6 sm:p-8 shadow-xl text-[#29221D] relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-[#786C62] hover:text-[#29221D] p-1.5 rounded-xl hover:bg-[#F5EFE6] transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-3 mb-5">
          <div className="w-10 h-10 rounded-xl bg-[#D96B27]/10 text-[#D96B27] border border-[#D96B27]/20 flex items-center justify-center">
            <FileSpreadsheet className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-extrabold text-[#29221D] font-['Manrope',sans-serif]">Экспорт презентации</h3>
            <p className="text-xs text-[#786C62]">Полный набор слайдов пилотного проекта ({PITCH_SLIDES.length} слайдов)</p>
          </div>
        </div>

        <div className="space-y-5">
          <div className="bg-[#FAF6F0] p-5 rounded-2xl border border-[#D96B27]/30 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-[#29221D]">Формат PowerPoint (.pptx)</span>
              <span className="text-[10px] font-extrabold uppercase bg-[#15803D]/10 text-[#15803D] px-2.5 py-0.5 rounded-full border border-[#15803D]/20">
                100% совместимость
              </span>
            </div>
            <p className="text-xs text-[#786C62] leading-relaxed">
              Вы скачаете презентацию с полной структурой (дизайн, детские рисунки, карточки кризисов, метрики и спикерские заметки). Файл напрямую открывается в PowerPoint, Keynote или импортируется в Google Слайды / Google Drive.
            </p>

            <button
              onClick={handleExportPptx}
              disabled={loadingPptx}
              className="w-full flex items-center justify-center space-x-2 bg-[#D96B27] hover:bg-[#B85418] text-white font-bold px-4 py-3 rounded-xl transition-all shadow-sm text-sm"
            >
              {loadingPptx ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Формирование файла .pptx...</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>Скачать .pptx презентацию</span>
                </>
              )}
            </button>
          </div>

          {downloaded && (
            <div className="bg-[#15803D]/10 border border-[#15803D]/30 p-3.5 rounded-xl text-center space-y-1">
              <p className="text-xs text-[#15803D] font-bold flex items-center justify-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#15803D]" />
                Файл презентации успешно сформирован и скачан!
              </p>
              <p className="text-[11px] text-[#786C62]">
                Вы можете открыть файл в PowerPoint или перетащить в ваш Google Диск для работы в Google Слайдах.
              </p>
            </div>
          )}

          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-[#DC2626] text-xs">
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
