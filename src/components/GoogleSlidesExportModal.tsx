import React, { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { initAuth, googleSignIn, getAccessToken, setAccessToken, logout } from '../lib/googleAuth';
import { createGoogleSlidesDeck } from '../lib/slidesApi';
import { exportToPptx } from '../lib/pptxExport';
import { PITCH_SLIDES } from '../data/slidesData';
import { X, CheckCircle2, AlertCircle, ExternalLink, Loader2, LogOut, FileSpreadsheet, Download, Key, Info } from 'lucide-react';

interface GoogleSlidesExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | null;
  setUser: (user: User | null) => void;
}

export const GoogleSlidesExportModal: React.FC<GoogleSlidesExportModalProps> = ({
  isOpen,
  onClose,
  user,
  setUser,
}) => {
  const [loading, setLoading] = useState(false);
  const [loadingPptx, setLoadingPptx] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [manualToken, setManualToken] = useState('');
  const [showTokenInput, setShowTokenInput] = useState(false);
  const [createdUrl, setCreatedUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDomainError, setIsDomainError] = useState(false);

  useEffect(() => {
    if (isOpen) {
      initAuth(
        async (currUser) => {
          setUser(currUser);
          const t = await getAccessToken();
          setToken(t);
        },
        () => {
          setUser(null);
          setToken(null);
        }
      );
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSignIn = async () => {
    setError(null);
    setIsDomainError(false);
    setLoading(true);
    try {
      const res = await googleSignIn();
      if (res) {
        setUser(res.user);
        setToken(res.accessToken);
      }
    } catch (err: any) {
      console.error('Sign in error:', err);
      if (err.code === 'auth/unauthorized-domain' || err.message?.includes('unauthorized-domain')) {
        setIsDomainError(true);
        setError('Домен предпросмотра не авторизован в Firebase Auth (auth/unauthorized-domain). Воспользуйтесь прямым экспортом в .pptx или введите OAuth токен.');
      } else {
        setError(err.message || 'Ошибка входа через Google');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleManualTokenSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualToken.trim()) return;
    setAccessToken(manualToken.trim());
    setToken(manualToken.trim());
    setError(null);
  };

  const handleExportGoogleSlides = async () => {
    const activeToken = token || manualToken;
    if (!activeToken) {
      setError('Необходима авторизация или входной токен Google API');
      return;
    }

    const confirmed = window.confirm(
      `Подтверждаете экспорт ${PITCH_SLIDES.length} слайдов в Google Slides?`
    );
    if (!confirmed) return;

    setError(null);
    setLoading(true);
    try {
      const result = await createGoogleSlidesDeck(activeToken, PITCH_SLIDES);
      setCreatedUrl(result.presentationUrl);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Не удалось создать презентацию в Google Slides');
    } finally {
      setLoading(false);
    }
  };

  const handleExportPptx = async () => {
    setLoadingPptx(true);
    setError(null);
    try {
      await exportToPptx(PITCH_SLIDES);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Ошибка генерации файла .pptx');
    } finally {
      setLoadingPptx(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    setUser(null);
    setToken(null);
    setCreatedUrl(null);
    setIsDomainError(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white border border-[#E8E2D8] rounded-[24px] max-w-lg w-full p-6 sm:p-8 shadow-xl text-[#29221D] relative max-h-[90vh] overflow-y-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-[#786C62] hover:text-[#29221D] p-1.5 rounded-xl hover:bg-[#F5EFE6] transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-[#D96B27]/10 text-[#D96B27] border border-[#D96B27]/20 flex items-center justify-center">
            <ExternalLink className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-extrabold text-[#29221D] font-['Manrope',sans-serif]">Экспорт презентации (11 слайдов)</h3>
            <p className="text-xs text-[#786C62]">Выберите удобный формат экспорта стратегического питча</p>
          </div>
        </div>

        <div className="space-y-5">
          {/* Option 1: Direct PPTX Export (Guaranteed 100% working locally) */}
          <div className="bg-[#FAF6F0] p-4 sm:p-5 rounded-2xl border border-[#D96B27]/30 space-y-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-2">
                <FileSpreadsheet className="w-5 h-5 text-[#D96B27]" />
                <span className="text-sm font-bold text-[#29221D]">1. Формат PowerPoint (.pptx)</span>
              </div>
              <span className="text-[10px] font-extrabold uppercase bg-[#15803D]/10 text-[#15803D] px-2.5 py-0.5 rounded-full border border-[#15803D]/20">
                Работает 100% без авторизации
              </span>
            </div>
            <p className="text-xs text-[#786C62]">
              Скачайте полный файл .pptx с дизайном, карточками, спикерскими заметками и метриками. Файл можно напрямую загрузить в Google Drive и открыть как Google Slides.
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
                  <span>Скачать презентацию .pptx (PowerPoint)</span>
                </>
              )}
            </button>
          </div>

          {/* Option 2: Direct Google Slides API */}
          <div className="bg-[#F5EFE6] p-4 sm:p-5 rounded-2xl border border-[#E8E2D8] space-y-3">
            <div className="flex items-center space-x-2">
              <ExternalLink className="w-5 h-5 text-[#4285F4]" />
              <span className="text-sm font-bold text-[#29221D]">2. Генерация напрямую в Google Slides</span>
            </div>

            {/* If Auth is active or token is present */}
            {(user || token) ? (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-[#4A3E37] bg-white p-2.5 rounded-xl border border-[#E8E2D8]">
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-[#15803D]" />
                    <span>Токен авторизации активирован</span>
                  </div>
                  {user && (
                    <button
                      onClick={handleLogout}
                      className="text-[#786C62] hover:text-[#C0392B] flex items-center space-x-1 font-semibold text-xs"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Выйти</span>
                    </button>
                  )}
                </div>

                {!createdUrl ? (
                  <button
                    onClick={handleExportGoogleSlides}
                    disabled={loading}
                    className="w-full flex items-center justify-center space-x-2 bg-[#4285F4] hover:bg-blue-700 text-white font-bold px-4 py-3 rounded-xl transition-all shadow-sm text-sm"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Создание презентации в Google Slides...</span>
                      </>
                    ) : (
                      <>
                        <ExternalLink className="w-4 h-4" />
                        <span>Сгенерировать в Google Slides</span>
                      </>
                    )}
                  </button>
                ) : (
                  <div className="bg-[#15803D]/10 border border-[#15803D]/30 p-4 rounded-xl text-center space-y-2">
                    <p className="text-xs text-[#15803D] font-bold flex items-center justify-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-[#15803D]" />
                      Презентация создана в Google Slides!
                    </p>
                    <a
                      href={createdUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-[#15803D] hover:bg-green-800 text-white font-bold px-4 py-2.5 rounded-xl text-xs transition-all shadow-sm"
                    >
                      <span>Открыть презентацию в Google Slides</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-xs text-[#786C62]">
                  Авторизуйтесь через Google для мгновенного экспорта слайдов в ваш Google Drive:
                </p>

                <button
                  onClick={handleSignIn}
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-3 bg-white text-[#29221D] font-bold px-4 py-3 rounded-xl border border-[#E8E2D8] hover:bg-[#FAF6F0] transition-all shadow-sm text-sm"
                >
                  <svg className="w-5 h-5" viewBox="0 0 48 48">
                    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                    <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                    <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                  </svg>
                  <span>Войти через Google и сгенерировать</span>
                </button>

                {/* Option to enter manual Google Access Token */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setShowTokenInput(!showTokenInput)}
                    className="text-xs text-[#4285F4] hover:underline flex items-center gap-1 font-semibold"
                  >
                    <Key className="w-3.5 h-3.5" />
                    <span>{showTokenInput ? 'Скрыть ввод токена' : 'Ввести Google Access Token вручную'}</span>
                  </button>

                  {showTokenInput && (
                    <form onSubmit={handleManualTokenSubmit} className="mt-2 space-y-2">
                      <input
                        type="text"
                        placeholder="Вставьте ya29... Google OAuth Access Token"
                        value={manualToken}
                        onChange={(e) => setManualToken(e.target.value)}
                        className="w-full text-xs p-2.5 rounded-xl border border-[#E8E2D8] bg-white text-[#29221D] focus:outline-none focus:ring-2 focus:ring-[#D96B27]"
                      />
                      <button
                        type="submit"
                        className="w-full bg-[#29221D] text-white text-xs font-bold py-2 rounded-xl hover:bg-black transition-all"
                      >
                        Применить токен и продолжить
                      </button>
                    </form>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Error & Info Banner */}
          {error && (
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl text-[#92400E] text-xs space-y-2">
              <div className="flex items-start gap-2 font-bold text-amber-900">
                <AlertCircle className="w-4 h-4 shrink-0 text-[#D96B27] mt-0.5" />
                <span>Оповещение авторизации</span>
              </div>
              <p className="leading-relaxed">{error}</p>

              {isDomainError && (
                <div className="pt-2 border-t border-amber-200/60 space-y-1.5 text-[11px] text-amber-800">
                  <p className="font-bold flex items-center gap-1">
                    <Info className="w-3.5 h-3.5 text-[#D96B27]" />
                    Почему это происходит и как решить:
                  </p>
                  <ul className="list-disc list-inside space-y-1 pl-1">
                    <li>
                      <strong>Быстрый способ:</strong> Нажмите оранжевую кнопку выше <strong>«Скачать презентацию .pptx»</strong> — вы получите полный готовый файл PowerPoint, который открывается в Google Slides без ограничений!
                    </li>
                    <li>
                      <strong>Для Google Slides API:</strong> Добавьте домен <code className="bg-white/80 px-1 py-0.5 rounded font-mono text-[10px]">{window.location.hostname}</code> в Разрешенные домены (Authorized Domains) в настройках Firebase Console.
                    </li>
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

