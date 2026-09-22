import React, { useState } from 'react';
import {
  TrendingUp,
  Target,
  Users,
  Award,
  Sparkles,
  HeartHandshake,
} from 'lucide-react';
import zoomerSunsetImg from '../assets/images/zeast_sunset_1790070939608.jpg';

export const MetricsDashboard: React.FC = () => {
  const [participantsCount] = useState(16);
  const [telegramExchangePct] = useState(72);
  const [confidenceScore] = useState(84);

  return (
    <div className="w-full max-w-6xl mx-auto py-6 px-4 space-y-6">
      {/* Header Banner with Gen Z image */}
      <div className="bg-white border border-[#E8E2D8] p-6 rounded-[24px] shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <span className="text-xs font-bold uppercase tracking-widest text-[#D96B27] bg-[#D96B27]/10 px-3 py-1 rounded-full border border-[#D96B27]/20">
            Опыт участников 18–35 лет
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#29221D] font-['Manrope',sans-serif]">
            Что меняется за 3 часа тест-драйва
          </h2>
          <p className="text-xs sm:text-sm text-[#786C62] leading-relaxed font-medium">
            Снимаем страх быта, ипотеки и потери свободы через живую ролевую игру и честный разговор на равных.
          </p>
        </div>

        <div className="w-full md:w-56 h-32 rounded-2xl overflow-hidden border border-[#E8E2D8] shrink-0 shadow-inner relative">
          <img
            src={zoomerSunsetImg}
            alt="Молодая пара"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent flex items-end p-2.5">
            <span className="text-white text-[11px] font-bold">Будущее без страха</span>
          </div>
        </div>
      </div>

      {/* Top Stat Meters */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-[#E8E2D8] p-5 rounded-[20px] shadow-sm space-y-1.5">
          <div className="flex items-center justify-between text-xs text-[#786C62] font-semibold">
            <span>Живой формат</span>
            <Users className="w-4 h-4 text-[#D96B27]" />
          </div>
          <div className="text-3xl font-black text-[#29221D] font-['Manrope',sans-serif]">
            {participantsCount} человек
          </div>
          <p className="text-xs text-[#786C62]">4 стола по 4 незнакомых участника</p>
        </div>

        <div className="bg-white border border-[#E8E2D8] p-5 rounded-[20px] shadow-sm space-y-1.5">
          <div className="flex items-center justify-between text-xs text-[#786C62] font-semibold">
            <span>Обмен Telegram-контактами</span>
            <TrendingUp className="w-4 h-4 text-[#15803D]" />
          </div>
          <div className="text-3xl font-black text-[#15803D] font-['Manrope',sans-serif]">
            {telegramExchangePct}%
          </div>
          <p className="text-xs text-[#15803D] font-semibold">Хотят продолжать общение после игры</p>
        </div>

        <div className="bg-white border border-[#E8E2D8] p-5 rounded-[20px] shadow-sm space-y-1.5">
          <div className="flex items-center justify-between text-xs text-[#786C62] font-semibold">
            <span>Уверенность «Мы справимся»</span>
            <Award className="w-4 h-4 text-[#D97706]" />
          </div>
          <div className="text-3xl font-black text-[#D97706] font-['Manrope',sans-serif]">
            {confidenceScore} / 100
          </div>
          <p className="text-xs text-[#786C62]">Рост с 38 до 84 пунктов за один воркшоп</p>
        </div>
      </div>

      {/* 3 Core Insights - 50% less text, bullet points */}
      <div className="bg-white border border-[#E8E2D8] rounded-[24px] p-6 space-y-4 shadow-sm">
        <h3 className="text-base sm:text-lg font-black text-[#29221D] flex items-center gap-2 font-['Manrope',sans-serif]">
          <HeartHandshake className="w-5 h-5 text-[#D96B27]" />
          3 главных инсайта участников
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-[#F5EFE6] p-4 rounded-2xl border border-[#E8E2D8] space-y-2 flex flex-col justify-between">
            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase text-[#D96B27]">Инсайт 1</span>
              <h4 className="text-sm font-bold text-[#29221D]">Страх брака снимается договором</h4>
              <p className="text-xs text-[#4A3E37] leading-relaxed">
                Пугают не отношения, а неизвестность. Когда роли и бюджет проговорены заранее, тревога исчезает.
              </p>
            </div>
            <div className="text-[11px] font-bold text-[#15803D] bg-white/80 p-2 rounded-xl border border-[#E8E2D8]">
              ✓ Итог: смех вместо напряжения
            </div>
          </div>

          <div className="bg-[#F5EFE6] p-4 rounded-2xl border border-[#E8E2D8] space-y-2 flex flex-col justify-between">
            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase text-[#D96B27]">Инсайт 2</span>
              <h4 className="text-sm font-bold text-[#29221D]">Одиночество лечится сверстниками</h4>
              <p className="text-xs text-[#4A3E37] leading-relaxed">
                Увидеть, что у других те же сомнения и тараканы, — главное облегчение для 18–35 лет.
              </p>
            </div>
            <div className="text-[11px] font-bold text-[#15803D] bg-white/80 p-2 rounded-xl border border-[#E8E2D8]">
              ✓ Итог: общение вне тренинга
            </div>
          </div>

          <div className="bg-[#F5EFE6] p-4 rounded-2xl border border-[#E8E2D8] space-y-2 flex flex-col justify-between">
            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase text-[#D96B27]">Инсайт 3</span>
              <h4 className="text-sm font-bold text-[#29221D]">Личные границы сохраняются</h4>
              <p className="text-xs text-[#4A3E37] leading-relaxed">
                Семья — это не потеря себя. Правило «Личного окна Я» защищает мечты, учебу и хобби.
              </p>
            </div>
            <div className="text-[11px] font-bold text-[#15803D] bg-white/80 p-2 rounded-xl border border-[#E8E2D8]">
              ✓ Итог: готовый чек-лист на дом
            </div>
          </div>
        </div>
      </div>

      {/* Modern Takeaway for Gen Z */}
      <div className="bg-[#D96B27]/10 border border-[#D96B27]/20 p-5 rounded-[20px] text-[#29221D] text-xs sm:text-sm flex items-start gap-3">
        <Sparkles className="w-5 h-5 text-[#D96B27] shrink-0 mt-0.5" />
        <p className="font-medium leading-relaxed">
          <strong className="font-bold text-[#29221D]">Главный вывод:</strong> Семья для зумеров — это не долг перед обществом и не жертва свободой, а комфортный крафтовый союз двух равных партнеров, где каждый имеет право на личное пространство.
        </p>
      </div>
    </div>
  );
};
