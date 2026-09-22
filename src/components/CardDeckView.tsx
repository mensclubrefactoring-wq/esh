import React, { useState } from 'react';
import { WORKSHOP_ROLES, CRISIS_CARDS, SECRET_DREAMS, COMPENSATION_CARDS, SHAME_QUESTIONS, DISCOVERY_PROMPTS } from '../data/workshopData';
import { CrisisCard, SecretDreamCard, CompensationCard } from '../types';
import {
  Layers, Plus, ShieldAlert, Sparkles, Heart, HelpCircle, FileText, CheckCircle,
  Home, Stethoscope, Briefcase, Wallet, Users, Baby, Compass, Smile, Eye, Award
} from 'lucide-react';

import zoomerKitchenImg from '../assets/images/zeast_kitchen_1790070911305.jpg';
import genzGameImg from '../assets/images/zeast_friends_1790070927191.jpg';
import zoomerSunsetImg from '../assets/images/zeast_sunset_1790070939608.jpg';
import zoomerCozyImg from '../assets/images/zeast_planning_1790070953936.jpg';

export const CardDeckView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'roles' | 'crises' | 'dreams' | 'compensations' | 'questions' | 'postcards'>('all');
  const [viewSide, setViewSide] = useState<'front' | 'back'>('front');
  const [crises, setCrises] = useState<CrisisCard[]>(CRISIS_CARDS);
  const [dreams] = useState<SecretDreamCard[]>(SECRET_DREAMS);
  const [compensations] = useState<CompensationCard[]>(COMPENSATION_CARDS);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newText, setNewText] = useState('');
  const [newChallenge, setNewChallenge] = useState('');

  const handleAddCard = () => {
    if (!newTitle || !newText) return;
    const newCard: CrisisCard = {
      id: `custom_${Date.now()}`,
      title: newTitle,
      category: 'relations',
      text: newText,
      challenge: newChallenge || 'Как распределить задачи без упреков?',
      discussionPrompts: ['Как разделить ответственность?', 'Какое решение комфортно обоим?'],
    };
    setCrises((prev) => [...prev, newCard]);
    setNewTitle('');
    setNewText('');
    setNewChallenge('');
    setShowAddModal(false);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'health':
        return <Stethoscope className="w-3.5 h-3.5 text-[#E11D48]" />;
      case 'work':
        return <Briefcase className="w-3.5 h-3.5 text-[#D97706]" />;
      case 'money':
        return <Wallet className="w-3.5 h-3.5 text-[#059669]" />;
      case 'relations':
      default:
        return <Users className="w-3.5 h-3.5 text-[#7C3AED]" />;
    }
  };

  const getRoleIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Wallet className="w-5 h-5 text-[#D96B27]" />;
      case 1:
        return <Home className="w-5 h-5 text-[#2563EB]" />;
      case 2:
        return <Baby className="w-5 h-5 text-[#16A34A]" />;
      case 3:
      default:
        return <Compass className="w-5 h-5 text-[#9333EA]" />;
    }
  };

  const getRoleImage = (index: number) => {
    const images = [zoomerKitchenImg, zoomerCozyImg, genzGameImg, zoomerSunsetImg];
    return images[index % images.length];
  };

  return (
    <div className="w-full max-w-7xl mx-auto py-6 px-4 space-y-6">
      {/* Header Banner */}
      <div className="bg-[#FFFDF9] border-2 border-[#E8E2D8] p-6 rounded-[28px] shadow-sm relative overflow-hidden">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#D96B27] bg-[#D96B27]/10 px-3 py-1 rounded-full border border-[#D96B27]/20 flex items-center gap-1.5">
                <Smile className="w-3.5 h-3.5" />
                Картотека для 18–35 лет
              </span>
              <span className="text-[11px] font-bold text-[#786C62] bg-[#F5EFE6] px-2.5 py-1 rounded-full">
                33 карты игры
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-[#29221D] font-['Manrope',sans-serif]">
              Колода игры «Черновик»
            </h2>
            <p className="text-xs sm:text-sm text-[#4A3E37] leading-relaxed font-medium">
              4 роли семейного совета, 12 бытовых краш-тестов, 8 тайных мечт, 6 купонов выгорания и стыдные вопросы.
            </p>
          </div>

          {/* Action buttons & View Switcher */}
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            {/* Front/Back Side Switch */}
            <div className="bg-[#F5EFE6] p-1 rounded-xl border border-[#E8E2D8] flex items-center">
              <button
                onClick={() => setViewSide('front')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                  viewSide === 'front' ? 'bg-white text-[#29221D] shadow-sm' : 'text-[#786C62] hover:text-[#29221D]'
                }`}
              >
                <Eye className="w-3.5 h-3.5 text-[#D96B27]" />
                Лицо карт
              </button>
              <button
                onClick={() => setViewSide('back')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                  viewSide === 'back' ? 'bg-[#29221D] text-white shadow-sm' : 'text-[#786C62] hover:text-[#29221D]'
                }`}
              >
                <Award className="w-3.5 h-3.5 text-[#F59E0B]" />
                Рубашки колоды
              </button>
            </div>

            <button
              onClick={() => setShowAddModal(true)}
              className="bg-[#D96B27] hover:bg-[#B85418] text-white font-bold text-xs px-4 py-2.5 rounded-xl flex items-center gap-1.5 transition-all shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Добавить карточку</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tabs Filter */}
      <div className="flex flex-wrap items-center gap-2 border-b border-[#E8E2D8] pb-3 print:hidden">
        {[
          { id: 'all', label: 'Все колоды (33 карты)' },
          { id: 'roles', label: '🏠 4 Должности' },
          { id: 'crises', label: '🚨 12 Бытовых кризисов' },
          { id: 'dreams', label: '✨ 8 Секретных мечт' },
          { id: 'compensations', label: '🌱 6 Купонов заботы' },
          { id: 'questions', label: '✉️ Стыдные вопросы' },
          { id: 'postcards', label: '📝 Карта открытий' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`text-xs font-bold px-3.5 py-2 rounded-xl transition-all ${
              activeTab === tab.id
                ? 'bg-[#D96B27] text-white shadow-sm'
                : 'bg-white text-[#786C62] hover:bg-[#F5EFE6] border border-[#E8E2D8]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* IF CARD BACKS VIEW SELECTED */}
      {viewSide === 'back' && (
        <div className="space-y-4">
          <div className="bg-[#FEF3C7] border border-[#F59E0B]/30 p-4 rounded-2xl text-xs text-[#92400E] font-bold flex items-center justify-between">
            <span>🎨 Рубашки карт настольной игры «Черновик» для живого воркшопа.</span>
            <button onClick={() => setViewSide('front')} className="underline text-[#D96B27]">Вернуться к тексту карт</button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, idx) => (
              <div
                key={idx}
                className="bg-[#FFFDF9] border-4 border-[#29221D] rounded-[24px] p-6 h-80 flex flex-col justify-between items-center text-center relative shadow-md overflow-hidden"
              >
                {/* Outer frame pattern */}
                <div className="absolute inset-2 border-2 border-dashed border-[#D96B27]/40 rounded-[18px] pointer-events-none"></div>

                <div className="pt-2 z-10">
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#D96B27] bg-[#D96B27]/10 px-2.5 py-1 rounded-full">
                    СЕМЕЙНАЯ ИГРА
                  </span>
                </div>

                <div className="my-auto space-y-3 z-10">
                  <img
                    src={[zoomerKitchenImg, zoomerCozyImg, genzGameImg, zoomerSunsetImg][idx % 4]}
                    alt="Gen Z couple"
                    className="w-24 h-24 object-cover mx-auto rounded-2xl border-2 border-[#E8E2D8] shadow-sm bg-white"
                  />
                  <h4 className="text-xl font-black text-[#29221D] font-['Manrope',sans-serif] tracking-tight">
                    ЧЕРНОВИК
                  </h4>
                  <p className="text-[11px] font-extrabold text-[#786C62]">
                    Тест-драйв отношений
                  </p>
                </div>

                <div className="pb-1 z-10 text-[9px] font-bold text-[#A89F91] uppercase tracking-widest">
                  № {idx + 1} • ИГРОВОЙ РЕКВИЗИТ
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* IF FRONT SIDE VIEW SELECTED */}
      {viewSide === 'front' && (
        <>
          {/* SECTION 1: ROLE CARDS */}
          {(activeTab === 'all' || activeTab === 'roles') && (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-[#E8E2D8] pb-2">
                <h3 className="text-lg font-extrabold text-[#29221D] flex items-center gap-2 font-['Manrope',sans-serif]">
                  <Layers className="w-5 h-5 text-[#D96B27]" />
                  Колода №1: Семейные роли (4 Должности)
                </h3>
                <span className="text-xs text-[#786C62] font-semibold">Каждые 2 дня происходит ротация</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {WORKSHOP_ROLES.map((role, idx) => (
                  <div
                    key={role.id}
                    className="bg-[#FFFDF9] border-2 border-[#E8E2D8] rounded-[24px] p-5 flex flex-col justify-between space-y-4 shadow-sm hover:border-[#D96B27] transition-all relative overflow-hidden print:border-black print:break-inside-avoid group"
                  >
                    {/* Top tape accent */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-2.5 bg-[#E8E2D8]/80 rounded-b-md"></div>

                    <div>
                      {/* Family illustration header thumbnail */}
                      <div className="w-full h-24 rounded-xl overflow-hidden mb-3 border border-[#E8E2D8] bg-[#F5EFE6] relative">
                        <img
                          src={getRoleImage(idx)}
                          alt={role.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm p-1.5 rounded-lg shadow-sm">
                          {getRoleIcon(idx)}
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase tracking-wider text-[#D96B27] bg-[#D96B27]/10 px-2.5 py-0.5 rounded-md">
                          ДОЛЖНОСТЬ #{idx + 1}
                        </span>
                        <span className="text-[10px] text-[#786C62] font-bold">Семейный совет</span>
                      </div>

                      <h4 className="text-base font-black text-[#29221D] mt-2 font-['Manrope',sans-serif]">
                        {role.title}
                      </h4>
                      <p className="text-xs text-[#4A3E37] mt-2 leading-relaxed font-medium">
                        {role.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t-2 border-dashed border-[#F0E8DD] space-y-2">
                      <div className="flex items-center justify-between text-[10px] font-bold text-[#786C62]">
                        <span>График смены:</span>
                        <span className="text-[#D96B27] bg-[#D96B27]/10 px-2 py-0.5 rounded-md">2 виртуальных дня</span>
                      </div>
                      <p className="text-[10px] text-[#A89F91] italic text-center">
                        «Каждый должен побывать в роли финансового и бытового лидера»
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SECTION 2: CRISIS CARDS */}
          {(activeTab === 'all' || activeTab === 'crises') && (
            <div className="space-y-4 pt-6">
              <div className="flex items-center justify-between border-b border-[#E8E2D8] pb-2">
                <h3 className="text-lg font-extrabold text-[#29221D] flex items-center gap-2 font-['Manrope',sans-serif]">
                  <ShieldAlert className="w-5 h-5 text-[#C0392B]" />
                  Колода №2: Карточки-ловушки (12 Бытовых кризисов)
                </h3>
                <span className="text-xs text-[#786C62] font-semibold">12 неожиданных жизненных вводных</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {crises.map((card, idx) => (
                  <div
                    key={card.id}
                    className="bg-[#FAF7F2] border-2 border-[#E8E2D8] rounded-[24px] p-5 space-y-3.5 shadow-sm border-l-8 border-l-[#D97706] print:border-black print:break-inside-avoid flex flex-col justify-between relative overflow-hidden"
                  >
                    {/* Decorative pin */}
                    <div className="absolute top-2 right-3 text-sm opacity-60">📍</div>

                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between pr-4">
                        <span className="text-xs font-black text-[#29221D] font-['Manrope',sans-serif] flex items-center gap-1.5">
                          {card.title}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-[9px] font-extrabold uppercase text-[#786C62] bg-white px-2.5 py-1 rounded-full border border-[#E8E2D8] flex items-center gap-1">
                          {getCategoryIcon(card.category)}
                          {card.category === 'health' && 'Здоровье'}
                          {card.category === 'work' && 'Работа и дедлайн'}
                          {card.category === 'money' && 'Финансы'}
                          {card.category === 'relations' && 'Отношения и быт'}
                        </span>
                        <span className="text-[10px] text-[#A89F91] font-bold">Карта #{idx + 1}</span>
                      </div>

                      <div className="bg-white p-3 rounded-xl border border-[#E8E2D8] text-xs text-[#4A3E37] leading-relaxed font-medium shadow-2xs">
                        {card.text}
                      </div>
                    </div>

                    <div className="space-y-2.5 pt-2 border-t-2 border-dashed border-[#E8E2D8]">
                      <div className="p-3 bg-[#FFF7ED] border border-[#FDBA74] rounded-xl text-[#C2410C] text-xs font-bold space-y-0.5">
                        <span className="text-[10px] font-black uppercase tracking-wider text-[#EA580C] block">
                          🎯 Семейный вызов (Челлендж)
                        </span>
                        <span>{card.challenge}</span>
                      </div>

                      <div className="space-y-1 bg-white/60 p-2.5 rounded-xl border border-[#E8E2D8]/60">
                        <span className="text-[10px] text-[#786C62] font-black uppercase tracking-wider block">
                          Вопросы для семейного совета:
                        </span>
                        <ul className="text-[11px] text-[#4A3E37] space-y-1">
                          {card.discussionPrompts.map((dp, pIdx) => (
                            <li key={pIdx} className="flex items-start gap-1.5">
                              <span className="text-[#D96B27] shrink-0 font-bold">♥</span>
                              <span className="font-medium">{dp}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SECTION 3: SECRET DREAMS */}
          {(activeTab === 'all' || activeTab === 'dreams') && (
            <div className="space-y-4 pt-6">
              <div className="flex items-center justify-between border-b border-[#E8E2D8] pb-2">
                <h3 className="text-lg font-extrabold text-[#29221D] flex items-center gap-2 font-['Manrope',sans-serif]">
                  <Sparkles className="w-5 h-5 text-[#8B5CF6]" />
                  Колода №3: Секретные мечты из конверта (8 карт)
                </h3>
                <span className="text-xs text-[#786C62] font-semibold">Достается тайком на раунде #3</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {dreams.map((dream, idx) => (
                  <div
                    key={dream.id}
                    className="bg-[#FAF5FF] border-2 border-[#E9D5FF] rounded-[24px] p-5 space-y-4 shadow-sm border-t-8 border-t-[#8B5CF6] print:border-black print:break-inside-avoid flex flex-col justify-between relative"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-black uppercase tracking-wider text-[#8B5CF6] bg-white px-2.5 py-0.5 rounded-md border border-[#D8B4FE]">
                          {dream.category}
                        </span>
                        <span className="text-[10px] font-bold text-[#6B21A8]">Тайная карта #{idx + 1}</span>
                      </div>

                      <div className="bg-white p-3.5 rounded-xl border border-[#E9D5FF]">
                        <p className="text-sm font-black text-[#29221D] leading-snug">
                          «{dream.text}»
                        </p>
                      </div>
                    </div>

                    <div className="space-y-1.5 pt-2 border-t border-[#E9D5FF]">
                      <span className="text-[10px] text-[#6B21A8] font-bold block uppercase tracking-wider">
                        Цена реализации мечты:
                      </span>
                      <div className="text-xs font-black text-[#6D28D9] bg-[#F3E8FF] p-2.5 rounded-xl text-center border border-[#DDD6FE]">
                        💎 {dream.resourceCost}
                      </div>
                      <p className="text-[9px] text-[#9333EA] text-center font-medium">
                        Не показывайте эту карту партнеру до подведения итогов!
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SECTION 4: COMPENSATION CARDS */}
          {(activeTab === 'all' || activeTab === 'compensations') && (
            <div className="space-y-4 pt-6">
              <div className="flex items-center justify-between border-b border-[#E8E2D8] pb-2">
                <h3 className="text-lg font-extrabold text-[#29221D] flex items-center gap-2 font-['Manrope',sans-serif]">
                  <Heart className="w-5 h-5 text-[#16A34A]" />
                  Колода №4: Карты-Компенсаторы выгорания (6 Семейных Купонов)
                </h3>
                <span className="text-xs text-[#786C62] font-semibold">Используются при угрозе нервного срыва</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {compensations.map((c, idx) => (
                  <div
                    key={c.id}
                    className="bg-[#F0FDF4] border-2 border-dashed border-[#16A34A] rounded-[24px] p-5 space-y-3.5 shadow-sm print:border-black print:break-inside-avoid relative overflow-hidden"
                  >
                    {/* Ticket coupon header */}
                    <div className="flex items-center justify-between border-b border-[#BBF7D0] pb-2">
                      <span className="text-[10px] font-black uppercase tracking-widest text-[#15803D] bg-white px-2.5 py-0.5 rounded-full border border-[#86EFAC]">
                        СЕМЕЙНЫЙ КУПОН #{idx + 1}
                      </span>
                      <span className="text-[10px] font-bold text-[#166534]">БЕССРОЧНО</span>
                    </div>

                    <div className="space-y-1.5">
                      <h4 className="text-base font-black text-[#14532D] font-['Manrope',sans-serif]">
                        {c.title}
                      </h4>
                      <p className="text-xs text-[#166534] leading-relaxed font-medium bg-white p-3 rounded-xl border border-[#86EFAC]/50">
                        {c.rule}
                      </p>
                    </div>

                    <div className="pt-2 flex items-center justify-between bg-[#DCFCE7] p-2.5 rounded-xl border border-[#86EFAC]">
                      <span className="text-[11px] font-extrabold text-[#15803D]">Эффект:</span>
                      <span className="text-xs font-black text-[#166534] bg-white px-2.5 py-0.5 rounded-lg shadow-2xs">
                        {c.effect}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SECTION 5: SHAME QUESTIONS ENVELOPE */}
          {(activeTab === 'all' || activeTab === 'questions') && (
            <div className="space-y-4 pt-6">
              <div className="flex items-center justify-between border-b border-[#E8E2D8] pb-2">
                <h3 className="text-lg font-extrabold text-[#29221D] flex items-center gap-2 font-['Manrope',sans-serif]">
                  <HelpCircle className="w-5 h-5 text-[#D96B27]" />
                  Колода №5: «Конверт стыдных вопросов» (4 карточки с разбором)
                </h3>
                <span className="text-xs text-[#786C62] font-semibold">Анонимные неудобные вопросы и ответы фасилитаторов</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {SHAME_QUESTIONS.map((q, idx) => (
                  <div
                    key={q.id}
                    className="bg-white border-2 border-[#E8E2D8] rounded-[24px] p-5 space-y-3.5 shadow-sm print:border-black print:break-inside-avoid relative"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase font-black text-[#D96B27] bg-[#D96B27]/10 px-2.5 py-0.5 rounded-md">
                        ТЕМА: {q.category.toUpperCase()}
                      </span>
                      <span className="text-[10px] text-[#786C62] font-bold">Вопрос #{idx + 1} из конверта</span>
                    </div>

                    <div className="bg-[#FAF7F2] p-3.5 rounded-xl border border-[#E8E2D8]">
                      <p className="text-xs font-bold text-[#29221D] italic leading-relaxed">
                        «{q.question}»
                      </p>
                    </div>

                    <div className="space-y-2 text-[11px] bg-[#F5EFE6]/60 p-3.5 rounded-xl border border-[#E8E2D8]">
                      <p className="text-[#29221D] leading-relaxed">
                        <span className="font-bold text-[#D96B27]">🎬 Режиссер (Театр): </span>
                        {q.directorAnswer}
                      </p>
                      <p className="text-[#29221D] leading-relaxed pt-1 border-t border-[#E8E2D8]/80">
                        <span className="font-bold text-[#8B5CF6]">🎨 Художник (Музей): </span>
                        {q.artistAnswer}
                      </p>
                    </div>

                    <div className="p-2.5 bg-[#DCFCE7] text-[#15803D] rounded-xl text-[11px] font-extrabold flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 shrink-0" />
                      <span>{q.takeaway}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SECTION 6: DISCOVERY POSTCARDS */}
          {(activeTab === 'all' || activeTab === 'postcards') && (
            <div className="space-y-4 pt-6">
              <div className="flex items-center justify-between border-b border-[#E8E2D8] pb-2">
                <h3 className="text-lg font-extrabold text-[#29221D] flex items-center gap-2 font-['Manrope',sans-serif]">
                  <FileText className="w-5 h-5 text-[#2563EB]" />
                  Колода №6: «Карта открытий» (Финал симуляции)
                </h3>
                <span className="text-xs text-[#786C62] font-semibold">Заполняется участниками после рефлексии</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {DISCOVERY_PROMPTS.map((dp, idx) => (
                  <div
                    key={dp.id}
                    className="bg-[#FFFDF9] border-2 border-[#2563EB]/40 rounded-[24px] p-5 space-y-3.5 shadow-sm print:border-black print:break-inside-avoid relative"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black text-[#2563EB] bg-[#DBEAFE] px-2.5 py-0.5 rounded-md">
                        ФИНАЛЬНАЯ ОТКРЫТКА #{idx + 1}
                      </span>
                      <span className="text-[10px] text-[#94A3B8] font-bold">Личный рефлексивный бэдж</span>
                    </div>

                    <p className="text-xs font-black text-[#29221D] leading-snug">{dp.text}</p>

                    <div className="h-20 border-2 border-dashed border-[#CBD5E1] rounded-xl bg-[#F8FAFC] p-3 flex items-start text-[11px] text-[#94A3B8] italic">
                      {dp.placeholder}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {/* Modal for adding custom card */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm print:hidden">
          <div className="bg-white border border-[#E8E2D8] rounded-[28px] max-w-md w-full p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-[#E8E2D8] pb-3">
              <h3 className="text-base font-black text-[#29221D]">Добавить семейную вводную</h3>
              <button onClick={() => setShowAddModal(false)} className="text-[#786C62] text-xs font-bold">✕</button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-[#4A3E37] font-bold block mb-1">Название вводной карточки:</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="например: Вводная №13 «Внезапная поездка»"
                  className="w-full bg-[#F5EFE6] border border-[#E8E2D8] rounded-xl p-3 text-[#29221D] focus:outline-none focus:border-[#D96B27] font-medium"
                />
              </div>

              <div>
                <label className="text-[#4A3E37] font-bold block mb-1">Описание бытового кризиса:</label>
                <textarea
                  value={newText}
                  onChange={(e) => setNewText(e.target.value)}
                  placeholder="Опишите жизненную ситуацию или сбой в быту"
                  rows={3}
                  className="w-full bg-[#F5EFE6] border border-[#E8E2D8] rounded-xl p-3 text-[#29221D] focus:outline-none focus:border-[#D96B27] font-medium"
                />
              </div>

              <div>
                <label className="text-[#4A3E37] font-bold block mb-1">Главный вызов / челлендж:</label>
                <input
                  type="text"
                  value={newChallenge}
                  onChange={(e) => setNewChallenge(e.target.value)}
                  placeholder="например: Как договориться за 10 минут без споров?"
                  className="w-full bg-[#F5EFE6] border border-[#E8E2D8] rounded-xl p-3 text-[#29221D] focus:outline-none focus:border-[#D96B27] font-medium"
                />
              </div>
            </div>

            <div className="flex items-center justify-end space-x-2 pt-2 border-t border-[#E8E2D8]">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2.5 rounded-xl text-xs font-bold text-[#786C62] hover:bg-[#F5EFE6]"
              >
                Отмена
              </button>
              <button
                onClick={handleAddCard}
                className="bg-[#D96B27] hover:bg-[#B85418] text-white font-bold px-5 py-2.5 rounded-xl text-xs shadow-sm"
              >
                Сохранить карточку
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

