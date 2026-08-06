import React, { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { initAuth, googleSignIn, getAccessToken, logout } from '../lib/googleAuth';
import { createGoogleSlidesDeck } from '../lib/slidesApi';
import { PITCH_SLIDES } from '../data/slidesData';
import { X, CheckCircle2, AlertCircle, ExternalLink, Loader2, LogOut } from 'lucide-react';

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
  const [token, setToken] = useState<string | null>(null);
  const [createdUrl, setCreatedUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

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
    setLoading(true);
    try {
      const res = await googleSignIn();
      if (res) {
        setUser(res.user);
        setToken(res.accessToken);
      }
    } catch (err: any) {
      setError(err.message || 'Ошибка входа через Google');
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async () => {
    if (!token) {
      setError('Необходима авторизация в аккаунте Google');
      return;
    }

    const confirmed = window.confirm(
      'Вы подтверждаете создание новой презентации "Семейная лаборатория: Проблема → Решение" в вашем аккаунте Google Slides?'
    );
    if (!confirmed) return;

    setError(null);
    setLoading(true);
    try {
      const result = await createGoogleSlidesDeck(token, PITCH_SLIDES);
      setCreatedUrl(result.presentationUrl);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Не удалось создать презентацию в Google Slides');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    setUser(null);
    setToken(null);
    setCreatedUrl(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white border border-slate-200/90 rounded-[24px] max-w-lg w-full p-6 sm:p-8 shadow-xl text-[#1F2937] relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-[#1F2937] p-1.5 rounded-xl hover:bg-slate-100 transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-[#D96B27]/10 text-[#D96B27] border border-[#D96B27]/20 flex items-center justify-center">
            <ExternalLink className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-extrabold text-[#29221D] font-['Manrope',sans-serif]">Экспорт в Google Slides</h3>
            <p className="text-xs text-[#786C62]">Создание презентации в вашем Google Drive</p>
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-xs sm:text-sm text-[#4A3E37] leading-relaxed">
            При подтверждении приложение создаст готовую стратегическую презентацию из {PITCH_SLIDES.length} слайдов («Проблема → Решение») прямо в вашем аккаунте Google Slides.
          </p>

          {/* Auth State */}
          {!user ? (
            <div className="bg-[#F5EFE6] p-4 rounded-2xl border border-[#E8E2D8] space-y-3">
              <p className="text-xs text-[#4A3E37] font-medium">
                Авторизуйтесь через Google для доступа к Google Slides и Google Drive:
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
                <span>Войти через Google</span>
              </button>
            </div>
          ) : (
            <div className="bg-[#F5EFE6] p-4 rounded-2xl border border-[#E8E2D8] space-y-3">
              <div className="flex items-center justify-between text-xs text-[#4A3E37]">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#15803D]" />
                  <span>Вы вошли как: <strong>{user.email}</strong></span>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-[#786C62] hover:text-[#C0392B] flex items-center space-x-1 font-semibold"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Выйти</span>
                </button>
              </div>

              {!createdUrl ? (
                <button
                  onClick={handleExport}
                  disabled={loading}
                  className="w-full flex items-center justify-center space-x-2 bg-[#D96B27] hover:bg-[#B85418] text-white font-bold px-4 py-3 rounded-xl transition-all shadow-sm text-sm"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Генерация Google Слайдов...</span>
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
                    Презентация успешно создана!
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
          )}

          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-[#DC2626] text-xs flex items-center gap-2 font-medium">
              <AlertCircle className="w-4 h-4 shrink-0 text-[#DC2626]" />
              <span>{error}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
