import React, { useState } from 'react';
import { WORKSHOP_ROLES, CRISIS_CARDS, SHAME_QUESTIONS, DISCOVERY_PROMPTS } from '../data/workshopData';
import { WorkshopRole, CrisisCard, ShameQuestion, UserPosition } from '../types';

import zoomerKitchenImg from '../assets/images/zeast_kitchen_1790070911305.jpg';
import genzGameImg from '../assets/images/zeast_friends_1790070927191.jpg';
import zoomerSunsetImg from '../assets/images/zeast_sunset_1790070939608.jpg';
import zoomerCozyImg from '../assets/images/zeast_planning_1790070953936.jpg';

export const WorkshopSimulator: React.FC = () => {
  const [activeBlock, setActiveBlock] = useState<number>(1);

  // Block 1 state: Candy Icebreaker
  const [candies, setCandies] = useState<
    { id: number; color: 'red' | 'blue'; desireOrFear: string; name: string }[]
  >([
    { id: 1, color: 'red', name: 'Саша', desireOrFear: 'Снять свой первый авторский проект' },
    { id: 2, color: 'blue', name: 'Маша', desireOrFear: 'Боюсь потерять свободу и раствориться в быту' },
  ]);
  const [newCandyName, setNewCandyName] = useState('');
  const [newCandyText, setNewCandyText] = useState('');

  const drawCandy = () => {
    if (!newCandyName || !newCandyText) return;
    const color = Math.random() > 0.5 ? 'red' : 'blue';
    setCandies((prev) => [
      ...prev,
      { id: Date.now(), color, name: newCandyName, desireOrFear: newCandyText },
    ]);
    setNewCandyName('');
    setNewCandyText('');
  };

  // Block 2 state: Game "Черновик"
  const [selectedRole, setSelectedRole] = useState<WorkshopRole | null>(WORKSHOP_ROLES[0]);
  const [currentCrisis, setCurrentCrisis] = useState<CrisisCard>(CRISIS_CARDS[0]);
  const [groupSolutionText, setGroupSolutionText] = useState('');
  const [submittedSolutions, setSubmittedSolutions] = useState<
    { crisisTitle: string; roleTitle: string; solution: string }[]
  >([]);

  const pickRandomCrisis = () => {
    const nextIdx = Math.floor(Math.random() * CRISIS_CARDS.length);
    setCurrentCrisis(CRISIS_CARDS[nextIdx]);
  };

  const getRoleIcon = (iconName: string) => {
    switch (iconName) {
      case 'Coins':
        return <span className="text-base shrink-0">🪙</span>;
      case 'UtensilsCrossed':
        return <span className="text-base shrink-0">🥢</span>;
      case 'LifeBuoy':
        return <span className="text-base shrink-0">🛟</span>;
      case 'PartyPopper':
        return <span className="text-base shrink-0">🪩</span>;
      case 'HeartPulse':
        return <span className="text-base shrink-0">🫀</span>;
      case 'Telescope':
        return <span className="text-base shrink-0">🔭</span>;
      case 'FlameKindling':
        return <span className="text-base shrink-0">🪵</span>;
      default:
        return <span className="text-base shrink-0">🧭</span>;
    }
  };

  const submitSolution = () => {
    if (!groupSolutionText || !selectedRole) return;
    setSubmittedSolutions((prev) => [
      ...prev,
      {
        crisisTitle: currentCrisis.title,
        roleTitle: selectedRole.title,
        solution: groupSolutionText,
      },
    ]);
    setGroupSolutionText('');
  };

  // Block 3 state: Scale "Я vs МЫ"
  const [userPositions, setUserPositions] = useState<UserPosition[]>([
    { id: '1', name: 'Участник 1', selfScore: 80, weScore: 40, futureSelfScore: 70, futureWeScore: 70 },
    { id: '2', name: 'Участник 2', selfScore: 45, weScore: 80, futureSelfScore: 65, futureWeScore: 65 },
    { id: '3', name: 'Участник 3', selfScore: 85, weScore: 30, futureSelfScore: 75, futureWeScore: 75 },
  ]);
  const [mySelfScore, setMySelfScore] = useState<number>(75);
  const [myWeScore, setMyWeScore] = useState<number>(45);

  const addMyPosition = () => {
    setUserPositions((prev) => [
      ...prev,
      {
        id: String(Date.now()),
        name: `Вы (${prev.length + 1})`,
        selfScore: mySelfScore,
        weScore: myWeScore,
        futureSelfScore: 70,
        futureWeScore: 70,
      },
    ]);
  };

  // Block 4 state: Shame Envelope Q&A
  const [selectedQuestion, setSelectedQuestion] = useState<ShameQuestion | null>(SHAME_QUESTIONS[0]);
  const [drawnQuestions, setDrawnQuestions] = useState<ShameQuestion[]>([SHAME_QUESTIONS[0]]);

  const drawNewQuestion = () => {
    const available = SHAME_QUESTIONS.filter((q) => !drawnQuestions.includes(q));
    if (available.length > 0) {
      const q = available[Math.floor(Math.random() * available.length)];
      setDrawnQuestions((prev) => [...prev, q]);
      setSelectedQuestion(q);
    } else {
      setSelectedQuestion(SHAME_QUESTIONS[Math.floor(Math.random() * SHAME_QUESTIONS.length)]);
    }
  };

  // Block 5 state: Discovery Map
  const [discoveryAnswers, setDiscoveryAnswers] = useState<{ [key: string]: string }>({
    p1: 'умение договариваться без вины',
    p2: 'перестану требовать от себя идеальности',
    p3: 'обсудить с партнером свои 3 личных "хочу"',
  });
  const [handshakesCount, setHandshakesCount] = useState<number>(5);

  return (
    <div className="w-full max-w-6xl mx-auto py-6 px-4 space-y-6">
      {/* Header Banner with Gen Z image */}
      <div className="bg-white border border-[#E8E2D8] p-6 rounded-[24px] shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <span className="text-xs font-bold uppercase tracking-widest text-[#D96B27] bg-[#D96B27]/10 px-3 py-1 rounded-full border border-[#D96B27]/20">
            Офлайн-симулятор для 18–35 лет
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#29221D] font-['Manrope',sans-serif]">
            Семейный тест-драйв (3 часа)
          </h2>
          <p className="text-xs sm:text-sm text-[#786C62] leading-relaxed font-medium">
            Безопасное пространство поиграть во «взрослую жизнь» без нотаций и скучных лекций.
          </p>
          <div className="flex items-center gap-2 pt-1 text-xs text-[#29221D] font-semibold">
            <span>⏱️</span>
            <span>3 часа • 4 стола по 4 участника</span>
          </div>
        </div>

        <div className="w-full md:w-64 h-36 rounded-2xl overflow-hidden border border-[#E8E2D8] shrink-0 shadow-inner relative">
          <img
            src={genzGameImg}
            alt="Молодые участники за игрой"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent flex items-end p-2.5">
            <span className="text-white text-[11px] font-bold">12–20 человек на коврах и пуфах</span>
          </div>
        </div>
      </div>

      {/* Workshop Block Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 bg-[#F5EFE6] p-1.5 rounded-[20px] border border-[#E8E2D8]">
        {[
          { id: 1, title: '1. Разморозка', duration: '20 мин', emoji: '🍬' },
          { id: 2, title: '2. «Черновик»', duration: '60 мин', emoji: '🎲' },
          { id: 3, title: '3. «Я vs МЫ»', duration: '30 мин', emoji: '⚖️' },
          { id: 4, title: '4. Конверт', duration: '40 мин', emoji: '💌' },
          { id: 5, title: '5. Открытия', duration: '30 мин', emoji: '✨' },
        ].map((block) => (
          <button
            key={block.id}
            onClick={() => setActiveBlock(block.id)}
            className={`flex flex-col items-center justify-center p-3 rounded-xl text-xs font-bold transition-all ${
              activeBlock === block.id
                ? 'bg-white text-[#D96B27] shadow-sm'
                : 'text-[#786C62] hover:text-[#29221D]'
            }`}
          >
            <div className="flex items-center space-x-1.5">
              <span className="text-sm">{block.emoji}</span>
              <span className="truncate">{block.title}</span>
            </div>
            <span className="text-[10px] opacity-75 font-mono">{block.duration}</span>
          </button>
        ))}
      </div>

      {/* BLOCK 1: Разморозка */}
      {activeBlock === 1 && (
        <div className="bg-white border border-[#E8E2D8] rounded-[24px] p-6 space-y-6 shadow-sm">
          <div className="border-b border-[#F0E8DD] pb-3">
            <span className="text-xs font-bold text-[#D96B27] uppercase tracking-wider">
              БЛОК 1 (20 минут)
            </span>
            <h3 className="text-lg sm:text-xl font-extrabold text-[#29221D] font-['Manrope',sans-serif]">
              Конфетка-знакомство
            </h3>
            <p className="text-xs text-[#786C62] mt-1">
              Тянем конфету: красная — мечта на год, оранжевая — честный страх взрослой жизни.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Draw Candy Form */}
            <div className="bg-[#F5EFE6] p-5 rounded-2xl border border-[#E8E2D8] space-y-3.5">
              <h4 className="text-xs font-bold text-[#29221D] uppercase tracking-wider flex items-center gap-1.5">
                <span>🍬</span>
                Вытянуть конфету
              </h4>

              <div className="space-y-2.5">
                <input
                  type="text"
                  value={newCandyName}
                  onChange={(e) => setNewCandyName(e.target.value)}
                  placeholder="Ваше имя (например: Артём)"
                  className="w-full bg-white border border-[#E8E2D8] rounded-xl px-3 py-2 text-xs text-[#29221D] focus:outline-none focus:border-[#D96B27]"
                />

                <textarea
                  value={newCandyText}
                  onChange={(e) => setNewCandyText(e.target.value)}
                  placeholder="Мечта или страх (например: боюсь потерять себя)"
                  rows={2}
                  className="w-full bg-white border border-[#E8E2D8] rounded-xl px-3 py-2 text-xs text-[#29221D] focus:outline-none focus:border-[#D96B27]"
                />

                <button
                  onClick={drawCandy}
                  className="w-full bg-[#D96B27] hover:bg-[#B85418] text-white font-bold py-2.5 rounded-xl text-xs transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  <span>🔀</span>
                  <span>Вытянуть случайную конфету</span>
                </button>
              </div>
            </div>

            {/* Pulled Candies Circle */}
            <div className="bg-[#F5EFE6] p-5 rounded-2xl border border-[#E8E2D8] space-y-2.5">
              <div className="flex items-center justify-between text-xs font-bold text-[#29221D]">
                <span>Круг участников ({candies.length})</span>
                <span className="text-[10px] text-[#786C62]">🔴 Мечта • 🟠 Страх</span>
              </div>

              <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                {candies.map((c) => (
                  <div
                    key={c.id}
                    className="p-2.5 rounded-xl border text-xs flex items-start space-x-2.5 bg-white border-[#E8E2D8]"
                  >
                    <div
                      className={`w-2.5 h-2.5 rounded-full mt-1 shrink-0 ${
                        c.color === 'red' ? 'bg-rose-500' : 'bg-[#D97706]'
                      }`}
                    />
                    <div>
                      <span className="font-bold text-[#29221D]">{c.name}</span>
                      <p className="text-[#4A3E37] text-[11px] mt-0.5">{c.desireOrFear}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* BLOCK 2: Игра «Черновик» */}
      {activeBlock === 2 && (
        <div className="bg-white border border-[#E8E2D8] rounded-[24px] p-6 space-y-6 shadow-sm">
          <div className="border-b border-[#F0E8DD] pb-3 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-[#D96B27] uppercase tracking-wider">
                БЛОК 2 (60 минут)
              </span>
              <h3 className="text-lg sm:text-xl font-extrabold text-[#29221D] font-['Manrope',sans-serif]">
                Игра «Черновик» — краш-тест быта
              </h3>
              <p className="text-xs text-[#786C62] mt-1">
                4 роли за столом решают реальный форс-мажор без ссор и взаимных упреков.
              </p>
            </div>

            <button
              onClick={pickRandomCrisis}
              className="bg-[#D96B27] hover:bg-[#B85418] text-white font-bold text-xs px-3 py-2 rounded-xl flex items-center gap-1.5 transition-all shadow-sm"
            >
              <span>🎲</span>
              <span>Случайный кризис</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Roles Selection */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-[#786C62] uppercase tracking-wider">
                Ваша роль за семейным столом:
              </h4>

              <div className="grid grid-cols-1 gap-2">
                {WORKSHOP_ROLES.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => setSelectedRole(r)}
                    className={`p-3 rounded-xl border text-left text-xs transition-all flex items-start gap-2.5 ${
                      selectedRole?.id === r.id
                        ? 'bg-[#D96B27]/10 border-[#D96B27] text-[#D96B27] font-bold'
                        : 'bg-[#F5EFE6] border-[#E8E2D8] text-[#4A3E37] hover:bg-[#EFE6D8]'
                    }`}
                  >
                    <div className="mt-0.5">{getRoleIcon(r.iconName)}</div>
                    <div>
                      <div className="font-bold">{r.title}</div>
                      <p className="text-[11px] text-[#786C62] font-normal mt-0.5">{r.description}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Current Crisis Card */}
            <div className="bg-[#F5EFE6] p-5 rounded-2xl border border-[#E8E2D8] space-y-3.5">
              <div className="flex items-center gap-1.5 text-xs font-black text-[#29221D]">
                <span>🪤</span>
                {currentCrisis.title}
              </div>

              <p className="text-xs text-[#4A3E37] leading-relaxed font-medium bg-white p-3 rounded-xl border border-[#E8E2D8]">
                {currentCrisis.text}
              </p>

              <div className="p-2.5 bg-[#D97706]/10 border border-[#D97706]/20 rounded-xl text-[#B45309] text-xs font-bold">
                🎯 Челлендж: {currentCrisis.challenge}
              </div>

              {/* Solution Submission */}
              <div className="space-y-2 pt-1">
                <textarea
                  value={groupSolutionText}
                  onChange={(e) => setGroupSolutionText(e.target.value)}
                  placeholder={`Решение от ${selectedRole?.title}: как договориться за 15 минут?`}
                  rows={2}
                  className="w-full bg-white border border-[#E8E2D8] rounded-xl p-2.5 text-xs text-[#29221D] focus:outline-none focus:border-[#D96B27]"
                />

                <button
                  onClick={submitSolution}
                  className="w-full bg-[#D96B27] hover:bg-[#B85418] text-white font-bold py-2 rounded-xl text-xs transition-all shadow-sm"
                >
                  Зафиксировать компромисс
                </button>
              </div>
            </div>
          </div>

          {/* Submitted Decisions */}
          {submittedSolutions.length > 0 && (
            <div className="pt-3 border-t border-[#F0E8DD] space-y-2">
              <h4 className="text-xs font-bold text-[#29221D]">
                Решения группы ({submittedSolutions.length}):
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {submittedSolutions.map((s, idx) => (
                  <div key={idx} className="bg-[#F5EFE6] p-3 rounded-xl border border-[#E8E2D8] text-xs">
                    <span className="text-[10px] text-[#D97706] font-bold block">{s.crisisTitle}</span>
                    <span className="text-[#29221D] font-bold block">{s.roleTitle}</span>
                    <p className="text-[#4A3E37] text-[11px] mt-0.5">{s.solution}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* BLOCK 3: Шкала «Я vs МЫ» */}
      {activeBlock === 3 && (
        <div className="bg-white border border-[#E8E2D8] rounded-[24px] p-6 space-y-6 shadow-sm">
          <div className="border-b border-[#F0E8DD] pb-3">
            <span className="text-xs font-bold text-[#D96B27] uppercase tracking-wider">
              БЛОК 3 (30 минут)
            </span>
            <h3 className="text-lg sm:text-xl font-extrabold text-[#29221D] font-['Manrope',sans-serif]">
              Шкала договоренности («Я» vs «МЫ»)
            </h3>
            <p className="text-xs text-[#786C62] mt-1">
              Баланс личной свободы и общих целей. Семья — это не растворение друг в друге.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Visualizer */}
            <div className="bg-[#F5EFE6] p-4 rounded-2xl border border-[#E8E2D8] flex flex-col items-center justify-center relative min-h-[260px]">
              <div className="w-full h-52 border border-[#D8CFC4] relative bg-white rounded-xl overflow-hidden">
                <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 divide-x divide-y divide-[#E8E2D8]">
                  <div className="p-2 text-[10px] text-[#A3988E]">Свобода без союза</div>
                  <div className="p-2 text-[10px] text-[#15803D] font-bold text-right">ЗДОРОВЫЙ БАЛАНС</div>
                  <div className="p-2 text-[10px] text-[#A3988E]">Изоляция</div>
                  <div className="p-2 text-[10px] text-[#A3988E] text-right">Потеря себя</div>
                </div>

                {userPositions.map((pos) => (
                  <div
                    key={pos.id}
                    className="absolute w-4 h-4 rounded-full bg-[#D96B27] border-2 border-white flex items-center justify-center -translate-x-1/2 -translate-y-1/2 shadow-sm"
                    style={{
                      left: `${pos.weScore}%`,
                      top: `${100 - pos.selfScore}%`,
                    }}
                    title={`${pos.name}: Я(${pos.selfScore}%) / МЫ(${pos.weScore}%)`}
                  />
                ))}
              </div>
              <div className="text-[10px] text-[#786C62] mt-2 font-medium">
                По горизонтали: союз (МЫ) • По вертикали: свобода (Я)
              </div>
            </div>

            {/* Slider */}
            <div className="bg-[#F5EFE6] p-5 rounded-2xl border border-[#E8E2D8] space-y-3.5">
              <h4 className="text-xs font-bold text-[#29221D]">Ваша точка на карте:</h4>

              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs text-[#4A3E37] font-semibold mb-1">
                    <span>Мои личные цели («Я»):</span>
                    <strong className="text-[#D96B27]">{mySelfScore}%</strong>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={mySelfScore}
                    onChange={(e) => setMySelfScore(Number(e.target.value))}
                    className="w-full accent-[#D96B27]"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs text-[#4A3E37] font-semibold mb-1">
                    <span>Общие цели пары («МЫ»):</span>
                    <strong className="text-[#15803D]">{myWeScore}%</strong>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={myWeScore}
                    onChange={(e) => setMyWeScore(Number(e.target.value))}
                    className="w-full accent-[#15803D]"
                  />
                </div>

                <button
                  onClick={addMyPosition}
                  className="w-full bg-[#D96B27] hover:bg-[#B85418] text-white font-bold py-2 rounded-xl text-xs transition-all shadow-sm"
                >
                  Добавить точку на общую карту
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* BLOCK 4: Конверт стыдных вопросов */}
      {activeBlock === 4 && (
        <div className="bg-white border border-[#E8E2D8] rounded-[24px] p-6 space-y-6 shadow-sm">
          <div className="border-b border-[#F0E8DD] pb-3 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-[#D96B27] uppercase tracking-wider">
                БЛОК 4 (40 минут)
              </span>
              <h3 className="text-lg sm:text-xl font-extrabold text-[#29221D] font-['Manrope',sans-serif]">
                Конверт неудобных вопросов
              </h3>
              <p className="text-xs text-[#786C62] mt-1">
                Честные ответы на вопросы о деньгах, интиме, выгорании и родителях.
              </p>
            </div>

            <button
              onClick={drawNewQuestion}
              className="bg-[#D96B27] hover:bg-[#B85418] text-white font-bold text-xs px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition-all shadow-sm"
            >
              <span>💌</span>
              <span>Следующий вопрос</span>
            </button>
          </div>

          {selectedQuestion && (
            <div className="bg-[#F5EFE6] p-5 rounded-2xl border border-[#E8E2D8] space-y-4">
              <div className="flex items-start space-x-3">
                <span className="text-xl shrink-0 mt-0.5">💌</span>
                <h4 className="text-base font-extrabold text-[#29221D] font-['Manrope',sans-serif]">
                  «{selectedQuestion.question}»
                </h4>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="bg-white p-3.5 rounded-xl border border-[#E8E2D8] space-y-1">
                  <span className="text-xs font-bold text-[#D96B27] block">Взгляд со стороны:</span>
                  <p className="text-xs text-[#4A3E37] leading-relaxed italic">{selectedQuestion.directorAnswer}</p>
                </div>

                <div className="bg-white p-3.5 rounded-xl border border-[#E8E2D8] space-y-1">
                  <span className="text-xs font-bold text-[#8B5CF6] block">Личный опыт:</span>
                  <p className="text-xs text-[#4A3E37] leading-relaxed italic">{selectedQuestion.artistAnswer}</p>
                </div>
              </div>

              <div className="p-3 bg-[#15803D]/10 border border-[#15803D]/20 rounded-xl text-[#15803D] text-xs font-bold flex items-center gap-2">
                <span>💡</span>
                <span>Главный вывод: {selectedQuestion.takeaway}</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* BLOCK 5: Карта открытий */}
      {activeBlock === 5 && (
        <div className="bg-white border border-[#E8E2D8] rounded-[24px] p-6 space-y-6 shadow-sm">
          <div className="border-b border-[#F0E8DD] pb-3">
            <span className="text-xs font-bold text-[#D96B27] uppercase tracking-wider">
              БЛОК 5 (30 минут)
            </span>
            <h3 className="text-lg sm:text-xl font-extrabold text-[#29221D] font-['Manrope',sans-serif]">
              Карта открытий и нетворкинг
            </h3>
            <p className="text-xs text-[#786C62] mt-1">
              Фиксация личного инсайта и обмен Telegram-контактами для продолжения дружбы.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#F5EFE6] p-5 rounded-2xl border border-[#E8E2D8] space-y-3">
              <h4 className="text-xs font-bold text-[#29221D] uppercase tracking-wider">
                Ваши 3 инсайта на память:
              </h4>

              {DISCOVERY_PROMPTS.map((pr) => (
                <div key={pr.id} className="space-y-1">
                  <label className="text-xs text-[#4A3E37] font-semibold block">{pr.text}</label>
                  <input
                    type="text"
                    value={discoveryAnswers[pr.id] || ''}
                    onChange={(e) =>
                      setDiscoveryAnswers({ ...discoveryAnswers, [pr.id]: e.target.value })
                    }
                    placeholder={pr.placeholder}
                    className="w-full bg-white border border-[#E8E2D8] rounded-xl px-3 py-2 text-xs text-[#29221D] focus:outline-none focus:border-[#D96B27]"
                  />
                </div>
              ))}
            </div>

            <div className="bg-[#F5EFE6] p-5 rounded-2xl border border-[#E8E2D8] space-y-4 flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-bold text-[#29221D] uppercase tracking-wider flex items-center gap-1.5">
                  <span>🤝</span>
                  Обмен контактами участников
                </h4>
                <p className="text-xs text-[#786C62] mt-1">
                  Сохраните связь с теми, с кем играли и договаривались за столом.
                </p>

                <div className="mt-4 text-center space-y-2">
                  <div className="text-3xl font-black text-[#D96B27] font-['Manrope',sans-serif]">
                    {handshakesCount} / 5
                  </div>
                  <p className="text-xs text-[#4A3E37] font-semibold">Контактов обменяно</p>
                  <button
                    onClick={() => setHandshakesCount((prev) => Math.min(prev + 1, 10))}
                    className="bg-[#D96B27] hover:bg-[#B85418] text-white font-bold px-4 py-2 rounded-xl text-xs transition-all shadow-sm"
                  >
                    +1 Обмен в Telegram
                  </button>
                </div>
              </div>

              <div className="p-3 bg-white border border-[#E8E2D8] rounded-xl text-xs text-[#15803D] font-bold text-center">
                ✓ Более 70% участников продолжают общаться после игры!
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
