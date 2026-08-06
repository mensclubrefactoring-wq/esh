import React, { useState } from 'react';
import { WORKSHOP_ROLES, CRISIS_CARDS } from '../data/workshopData';
import { CrisisCard } from '../types';
import { Layers, Plus, ShieldAlert, Printer } from 'lucide-react';

export const CardDeckView: React.FC = () => {
  const [crises, setCrises] = useState<CrisisCard[]>(CRISIS_CARDS);
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
      challenge: newChallenge || 'Как ваша группа договорится в этой ситуации?',
      discussionPrompts: ['Как разделить ответственность?', 'Какое решение минимально болезненно?'],
    };
    setCrises((prev) => [...prev, newCard]);
    setNewTitle('');
    setNewText('');
    setNewChallenge('');
    setShowAddModal(false);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full max-w-7xl mx-auto py-6 px-4 space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white border border-[#E8E2D8] p-6 rounded-[24px] shadow-sm">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#D96B27] bg-[#D96B27]/10 px-3 py-1 rounded-full border border-[#D96B27]/20">
            Игровой реквизит
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#29221D] mt-2 font-['Manrope',sans-serif]">
            Карточки и Вводные для игры «Черновик»
          </h2>
          <p className="text-xs text-[#786C62] mt-1 font-medium">
            Комплект материалов для распечатки или работы в онлайн-лаборатории.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-[#D96B27] hover:bg-[#B85418] text-white font-bold text-xs px-4 py-2.5 rounded-xl flex items-center gap-1.5 transition-all shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Добавить вводную</span>
          </button>

          <button
            onClick={handlePrint}
            className="bg-[#F5EFE6] hover:bg-[#EFE6D8] text-[#29221D] font-bold text-xs px-4 py-2.5 rounded-xl flex items-center gap-1.5 transition-all border border-[#E8E2D8]"
          >
            <Printer className="w-4 h-4" />
            <span>Печать карт</span>
          </button>
        </div>
      </div>

      {/* Section 1: Role Cards */}
      <div className="space-y-4">
        <h3 className="text-lg font-extrabold text-[#29221D] flex items-center gap-2 font-['Manrope',sans-serif]">
          <Layers className="w-5 h-5 text-[#D96B27]" />
          Карточки семейных ролей (4 Должности)
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {WORKSHOP_ROLES.map((role) => (
            <div
              key={role.id}
              className="bg-white border border-[#E8E2D8] rounded-[20px] p-5 flex flex-col justify-between space-y-3 shadow-sm hover:border-[#D96B27] transition-all"
            >
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#D96B27]">
                  РОЛЬ В СЕМЬЕ
                </span>
                <h4 className="text-base font-bold text-[#29221D] mt-1 font-['Manrope',sans-serif]">{role.title}</h4>
                <p className="text-xs text-[#4A3E37] mt-2 leading-relaxed">{role.description}</p>
              </div>

              <div className="pt-3 border-t border-[#F0E8DD] text-[11px] text-[#786C62]">
                Роль меняется каждые 2 дня по графику
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section 2: Crisis Cards Gallery */}
      <div className="space-y-4 pt-4">
        <h3 className="text-lg font-extrabold text-[#29221D] flex items-center gap-2 font-['Manrope',sans-serif]">
          <ShieldAlert className="w-5 h-5 text-[#C0392B]" />
          Набор карточек-ловушек («Вводные-неожиданности»)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {crises.map((card) => (
            <div
              key={card.id}
              className="bg-white border border-[#E8E2D8] rounded-[20px] p-6 space-y-3 shadow-sm border-l-4 border-l-[#D97706]"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#29221D]">{card.title}</span>
                <span className="text-[10px] uppercase font-bold text-[#786C62] bg-[#F5EFE6] px-2.5 py-1 rounded-full">
                  {card.category}
                </span>
              </div>

              <p className="text-xs text-[#4A3E37] leading-relaxed font-medium">{card.text}</p>

              <div className="p-3 bg-[#D97706]/10 border border-[#D97706]/20 rounded-xl text-[#B45309] text-xs font-bold">
                🎯 {card.challenge}
              </div>

              <div className="space-y-1">
                <span className="text-[11px] text-[#786C62] font-semibold">Вопросы для обсуждения:</span>
                <ul className="text-[11px] text-[#4A3E37] list-disc list-inside space-y-0.5">
                  {card.discussionPrompts.map((dp, idx) => (
                    <li key={idx}>{dp}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for adding custom card */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white border border-[#E8E2D8] rounded-[24px] max-w-md w-full p-6 space-y-4 shadow-xl">
            <h3 className="text-lg font-extrabold text-[#29221D]">Добавить собственную вводную для игры</h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-[#4A3E37] font-semibold block mb-1">Название вводной:</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="например: Вводная №5 «Внезапная поездка»"
                  className="w-full bg-[#F5EFE6] border border-[#E8E2D8] rounded-xl p-3 text-[#29221D] focus:outline-none focus:border-[#D96B27]"
                />
              </div>

              <div>
                <label className="text-[#4A3E37] font-semibold block mb-1">Описание ситуации:</label>
                <textarea
                  value={newText}
                  onChange={(e) => setNewText(e.target.value)}
                  placeholder="Опишите бытовой кризис или неожиданное событие"
                  rows={3}
                  className="w-full bg-[#F5EFE6] border border-[#E8E2D8] rounded-xl p-3 text-[#29221D] focus:outline-none focus:border-[#D96B27]"
                />
              </div>

              <div>
                <label className="text-[#4A3E37] font-semibold block mb-1">Главный вызов / челлендж:</label>
                <input
                  type="text"
                  value={newChallenge}
                  onChange={(e) => setNewChallenge(e.target.value)}
                  placeholder="например: Как договориться за 10 минут без споров?"
                  className="w-full bg-[#F5EFE6] border border-[#E8E2D8] rounded-xl p-3 text-[#29221D] focus:outline-none focus:border-[#D96B27]"
                />
              </div>
            </div>

            <div className="flex items-center justify-end space-x-2 pt-2">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-[#786C62] hover:bg-[#F5EFE6]"
              >
                Отмена
              </button>
              <button
                onClick={handleAddCard}
                className="bg-[#D96B27] hover:bg-[#B85418] text-white font-bold px-4 py-2 rounded-xl text-xs"
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
