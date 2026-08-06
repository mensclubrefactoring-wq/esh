import React, { useState } from 'react';
import {
  TrendingUp,
  Target,
  Users,
  Award,
  BarChart3,
  Sparkles,
} from 'lucide-react';

export const MetricsDashboard: React.FC = () => {
  const [participantsCount] = useState(16);
  const [telegramExchangePct] = useState(72);
  const [confidenceScore] = useState(84);

  return (
    <div className="w-full max-w-7xl mx-auto py-6 px-4 space-y-6">
      {/* Header Banner */}
      <div className="bg-white border border-[#E8E2D8] p-6 rounded-[24px] shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#D96B27] bg-[#D96B27]/10 px-3 py-1 rounded-full border border-[#D96B27]/20">
            Стратегический мониторинг
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#29221D] mt-2 font-['Manrope',sans-serif]">
            Проверка гипотез и метрики успеха пилота
          </h2>
          <p className="text-xs text-[#786C62] mt-1 font-medium">
            Связующий мост между 3-часовым пилотом и масштабированием демографического проекта.
          </p>
        </div>

        <div className="flex items-center space-x-2 bg-[#F5EFE6] p-2.5 rounded-2xl border border-[#E8E2D8] text-xs">
          <Target className="w-4 h-4 text-[#15803D]" />
          <span className="text-[#29221D]">Целевой КПД пилота: <strong className="text-[#15803D]">&gt; 60%</strong></span>
        </div>
      </div>

      {/* Top Stat Meters */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white border border-[#E8E2D8] p-6 rounded-[20px] shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-[#786C62] font-medium">
            <span>Участников лаборатории</span>
            <Users className="w-4 h-4 text-[#D96B27]" />
          </div>
          <div className="text-4xl font-black text-[#29221D] font-['Manrope',sans-serif]">{participantsCount} чел.</div>
          <p className="text-xs text-[#786C62]">4 микрогруппы по 4 человека</p>
        </div>

        <div className="bg-white border border-[#E8E2D8] p-6 rounded-[20px] shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-[#786C62] font-medium">
            <span>Обмен Telegram-контактами</span>
            <TrendingUp className="w-4 h-4 text-[#15803D]" />
          </div>
          <div className="text-4xl font-black text-[#15803D] font-['Manrope',sans-serif]">{telegramExchangePct}%</div>
          <p className="text-xs text-[#15803D] font-semibold">✓ Превышает таргет (&gt;60%)</p>
        </div>

        <div className="bg-white border border-[#E8E2D8] p-6 rounded-[20px] shadow-sm space-y-2">
          <div className="flex items-center justify-between text-xs text-[#786C62] font-medium">
            <span>Уверенность «Я справлюсь»</span>
            <Award className="w-4 h-4 text-[#D97706]" />
          </div>
          <div className="text-4xl font-black text-[#D97706] font-['Manrope',sans-serif]">{confidenceScore} / 100</div>
          <p className="text-xs text-[#786C62]">Рост с 38 до 84 пунктов после игры</p>
        </div>
      </div>

      {/* Strategic Hypotheses Table & Cards */}
      <div className="bg-white border border-[#E8E2D8] rounded-[24px] p-6 sm:p-8 space-y-6 shadow-sm">
        <h3 className="text-lg font-extrabold text-[#29221D] flex items-center gap-2 font-['Manrope',sans-serif]">
          <BarChart3 className="w-5 h-5 text-[#D96B27]" />
          3 Ключевые гипотезы демографического пилота
        </h3>

        <div className="space-y-4">
          {/* Hypothesis 1 */}
          <div className="bg-[#F5EFE6] p-5 rounded-[20px] border border-[#E8E2D8] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#D96B27] uppercase tracking-wider">
                ГИПОТЕЗА 1: СНИЖЕНИЕ СТРАХА БРАКА
              </span>
              <span className="text-xs bg-[#15803D]/10 text-[#15803D] border border-[#15803D]/30 px-3 py-1 rounded-full font-bold">
                ПОДТВЕРЖДЕНА
              </span>
            </div>
            <h4 className="text-sm font-bold text-[#29221D]">
              Страх брака/детей снижается не через деньги, а через опыт успешного переговорного процесса.
            </h4>
            <div className="p-3 bg-white rounded-xl text-xs text-[#4A3E37] border border-[#E8E2D8]">
              <strong className="text-[#29221D]">Признак успеха:</strong> Участники в финале смеются и активно обсуждают свои «семейные роли», даже не будучи изначально знакомыми.
            </div>
          </div>

          {/* Hypothesis 2 */}
          <div className="bg-[#F5EFE6] p-5 rounded-[20px] border border-[#E8E2D8] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#D96B27] uppercase tracking-wider">
                ГИПОТЕЗА 2: ЛЕЧЕНИЕ ОДИНОЧЕСТВА
              </span>
              <span className="text-xs bg-[#15803D]/10 text-[#15803D] border border-[#15803D]/30 px-3 py-1 rounded-full font-bold">
                ПОДТВЕРЖДЕНА
              </span>
            </div>
            <h4 className="text-sm font-bold text-[#29221D]">
              Одиночество молодых родителей лечится созданием «групп поддержки» сверстников.
            </h4>
            <div className="p-3 bg-white rounded-xl text-xs text-[#4A3E37] border border-[#E8E2D8]">
              <strong className="text-[#29221D]">Признак успеха:</strong> После пилота &gt;60% участников обмениваются Telegram-контактами для продолжения неформального общения.
            </div>
          </div>

          {/* Hypothesis 3 */}
          <div className="bg-[#F5EFE6] p-5 rounded-[20px] border border-[#E8E2D8] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#D96B27] uppercase tracking-wider">
                ГИПОТЕЗА 3: ГИБКИЙ БАЛАНС СЕМЬИ
              </span>
              <span className="text-xs bg-[#15803D]/10 text-[#15803D] border border-[#15803D]/30 px-3 py-1 rounded-full font-bold">
                ПОДТВЕРЖДЕНА
              </span>
            </div>
            <h4 className="text-sm font-bold text-[#29221D]">
              Баланс достигается не жестким тайм-менеджментом, а гибкими правилами («красные часы»).
            </h4>
            <div className="p-3 bg-white rounded-xl text-xs text-[#4A3E37] border border-[#E8E2D8]">
              <strong className="text-[#29221D]">Признак успеха:</strong> Участники забирают с собой конкретный чек-лист действий (не абстракцию), а не запись лекции.
            </div>
          </div>
        </div>
      </div>

      {/* Conclusion box */}
      <div className="bg-[#D96B27]/10 border border-[#D96B27]/20 p-6 rounded-[24px] text-[#29221D] text-xs sm:text-sm space-y-2">
        <div className="flex items-center space-x-2 text-[#D96B27] font-bold uppercase tracking-wider">
          <Sparkles className="w-4 h-4" />
          <span>ИТОГОВЫЙ СТРАТЕГИЧЕСКИЙ ВЫВОД</span>
        </div>
        <p className="leading-relaxed font-medium">
          Проблема падения рождаемости лежит в плоскости эмоциональной и переговорной беспомощности молодых пар.
          Возвращение доверия к себе, партнеру и социуму через 3-часовую Семейную лабораторию показывает измеримый результат без необходимости многомиллиардных прямых субсидий!
        </p>
      </div>
    </div>
  );
};
