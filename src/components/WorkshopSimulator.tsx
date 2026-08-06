import React, { useState } from 'react';
import { WORKSHOP_ROLES, CRISIS_CARDS, SHAME_QUESTIONS, DISCOVERY_PROMPTS } from '../data/workshopData';
import { WorkshopRole, CrisisCard, ShameQuestion, UserPosition } from '../types';
import {
  Sparkles,
  Candy,
  Users,
  Clock,
  HelpCircle,
  Compass,
  CheckCircle2,
  Heart,
  MessageSquare,
  ShieldAlert,
  Shuffle,
  RefreshCw,
} from 'lucide-react';

export const WorkshopSimulator: React.FC = () => {
  const [activeBlock, setActiveBlock] = useState<number>(1);

  // Block 1 state: Candy Icebreaker
  const [candies, setCandies] = useState<
    { id: number; color: 'red' | 'blue'; desireOrFear: string; name: string }[]
  >([
    { id: 1, color: 'red', name: 'Алексей (Режиссер)', desireOrFear: 'Снять свой первый короткометражный фильм' },
    { id: 2, color: 'blue', name: 'Мария (Художник)', desireOrFear: 'Боюсь, что дети вырастут, а я потеряю себя' },
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
    { id: '1', name: 'Участник 1', selfScore: 80, weScore: 30, futureSelfScore: 70, futureWeScore: 70 },
    { id: '2', name: 'Участник 2', selfScore: 40, weScore: 85, futureSelfScore: 65, futureWeScore: 65 },
    { id: '3', name: 'Участник 3', selfScore: 90, weScore: 20, futureSelfScore: 75, futureWeScore: 75 },
  ]);
  const [mySelfScore, setMySelfScore] = useState<number>(75);
  const [myWeScore, setMyWeScore] = useState<number>(35);

  const addMyPosition = () => {
    setUserPositions((prev) => [
      ...prev,
      {
        id: String(Date.now()),
        name: `Вы (Участник ${prev.length + 1})`,
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
    p1: 'способность слышать и договариваться без вины',
    p2: 'перестану требовать от себя идеальности и заложу "красные часы"',
    p3: 'обсудить с партнером свои 3 персональных "хочу"',
  });
  const [handshakesCount, setHandshakesCount] = useState<number>(5);

  return (
    <div className="w-full max-w-7xl mx-auto py-6 px-4 space-y-6">
      {/* Header Banner */}
      <div className="bg-white border border-[#E8E2D8] p-6 sm:p-8 rounded-[24px] shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#D96B27] bg-[#D96B27]/10 px-3 py-1 rounded-full border border-[#D96B27]/20">
            Интерактивный симулятор
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-[#29221D] mt-2 font-['Manrope',sans-serif]">
            «Семейная лаборатория. Тест-драйв» (3 часа)
          </h2>
          <p className="text-xs text-[#786C62] mt-1 font-medium">
            Безопасное пространство поиграть во «взрослость» для 12–20 незнакомых участников.
          </p>
        </div>

        <div className="flex items-center space-x-2 bg-[#F5EFE6] p-2.5 rounded-2xl border border-[#E8E2D8] text-xs text-[#29221D] font-semibold">
          <Clock className="w-4 h-4 text-[#D96B27]" />
          <span>Формат: 3 часа | 4 микрогруппы</span>
        </div>
      </div>

      {/* Workshop Block Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 bg-[#F5EFE6] p-1.5 rounded-[20px] border border-[#E8E2D8]">
        {[
          { id: 1, title: 'Блок 1: Разморозка', duration: '20 мин', icon: Candy },
          { id: 2, title: 'Блок 2: «Черновик»', duration: '60 мин', icon: Users },
          { id: 3, title: 'Блок 3: «Я vs МЫ»', duration: '30 мин', icon: Compass },
          { id: 4, title: 'Блок 4: Конверт', duration: '40 мин', icon: HelpCircle },
          { id: 5, title: 'Блок 5: Карта', duration: '30 мин', icon: CheckCircle2 },
        ].map((block) => {
          const Icon = block.icon;
          return (
            <button
              key={block.id}
              onClick={() => setActiveBlock(block.id)}
              className={`flex flex-col items-center justify-center p-3 rounded-xl text-xs font-bold transition-all ${
                activeBlock === block.id
                  ? 'bg-white text-[#D96B27] shadow-sm'
                  : 'text-[#786C62] hover:text-[#29221D]'
              }`}
            >
              <div className="flex items-center space-x-1">
                <Icon className="w-3.5 h-3.5" />
                <span className="truncate">{block.title}</span>
              </div>
              <span className="text-[10px] opacity-75 font-mono">{block.duration}</span>
            </button>
          );
        })}
      </div>

      {/* BLOCK 1: Разморозка */}
      {activeBlock === 1 && (
        <div className="bg-white border border-[#E8E2D8] rounded-[24px] p-6 sm:p-8 shadow-sm space-y-6">
          <div className="border-b border-[#F0E8DD] pb-4 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-[#D96B27] uppercase tracking-wider">
                БЛОК 1 (20 минут)
              </span>
              <h3 className="text-xl font-extrabold text-[#29221D] font-['Manrope',sans-serif]">Интерактив «Конфетка-знакомство»</h3>
              <p className="text-xs text-[#786C62] mt-1">
                Ведущие и участники вытягивают конфеты с двумя начинками для задания искреннего тона без вопросов "А ты замужем?".
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Draw Candy Form */}
            <div className="bg-[#F5EFE6] p-6 rounded-[20px] border border-[#E8E2D8] space-y-4">
              <h4 className="text-sm font-bold text-[#29221D] flex items-center gap-2">
                <Candy className="w-4 h-4 text-[#D97706]" />
                Вытянуть конфету знакомства
              </h4>

              <div className="space-y-3">
                <div>
                  <label className="text-xs text-[#4A3E37] font-semibold block mb-1">Ваше имя / роль:</label>
                  <input
                    type="text"
                    value={newCandyName}
                    onChange={(e) => setNewCandyName(e.target.value)}
                    placeholder="например: Анна"
                    className="w-full bg-white border border-[#E8E2D8] rounded-xl px-3 py-2.5 text-xs text-[#29221D] focus:outline-none focus:border-[#D96B27]"
                  />
                </div>

                <div>
                  <label className="text-xs text-[#4A3E37] font-semibold block mb-1">
                    Ваше желание на год ИЛИ Ваш страх во взрослой жизни:
                  </label>
                  <textarea
                    value={newCandyText}
                    onChange={(e) => setNewCandyText(e.target.value)}
                    placeholder="например: Боюсь ипотеки ИЛИ хочу запустить проект"
                    rows={2}
                    className="w-full bg-white border border-[#E8E2D8] rounded-xl px-3 py-2.5 text-xs text-[#29221D] focus:outline-none focus:border-[#D96B27]"
                  />
                </div>

                <button
                  onClick={drawCandy}
                  className="w-full bg-[#D96B27] hover:bg-[#B85418] text-white font-bold py-2.5 rounded-xl text-xs transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  <Shuffle className="w-4 h-4" />
                  <span>Вытянуть конфету случайного цвета</span>
                </button>
              </div>
            </div>

            {/* Pulled Candies Circle */}
            <div className="bg-[#F5EFE6] p-6 rounded-[20px] border border-[#E8E2D8] space-y-3">
              <h4 className="text-sm font-bold text-[#29221D] flex items-center justify-between">
                <span>Круг знакомства участников ({candies.length})</span>
                <span className="text-[11px] text-[#786C62] font-normal">🔴 Красная = Желание | 🟠 Оранжевая = Страх</span>
              </h4>

              <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
                {candies.map((c) => (
                  <div
                    key={c.id}
                    className={`p-3 rounded-xl border text-xs flex items-start space-x-3 bg-white ${
                      c.color === 'red'
                        ? 'border-rose-200 text-rose-900'
                        : 'border-[#F5D0A9] text-[#8C4311]'
                    }`}
                  >
                    <div
                      className={`w-3 h-3 rounded-full mt-0.5 shrink-0 ${
                        c.color === 'red' ? 'bg-rose-500' : 'bg-[#D97706]'
                      }`}
                    />
                    <div>
                      <span className="font-bold text-[#29221D] block">{c.name}</span>
                      <p className="opacity-90 mt-0.5">{c.desireOrFear}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* BLOCK 2: Игра «Мой дом. Черновик» */}
      {activeBlock === 2 && (
        <div className="bg-white border border-[#E8E2D8] rounded-[24px] p-6 sm:p-8 shadow-sm space-y-6">
          <div className="border-b border-[#F0E8DD] pb-4 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-[#D96B27] uppercase tracking-wider">
                БЛОК 2 (60 минут) — Главная гипотеза
              </span>
              <h3 className="text-xl font-extrabold text-[#29221D] font-['Manrope',sans-serif]">Иммерсивная игра «Черновик»</h3>
              <p className="text-xs text-[#786C62] mt-1">
                1 комната + 1 зарплата + 1 ребенок + 1 мечта. Моделирование кризисов и переговоров.
              </p>
            </div>

            <button
              onClick={pickRandomCrisis}
              className="bg-[#D96B27] hover:bg-[#B85418] text-white font-bold text-xs px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition-all"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Вытянуть новую карточку-кризис</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Roles Selection */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-[#786C62] uppercase tracking-wider">
                1. Распределение «Должностей» в группе:
              </h4>

              <div className="grid grid-cols-1 gap-2">
                {WORKSHOP_ROLES.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => setSelectedRole(r)}
                    className={`p-3.5 rounded-2xl border text-left text-xs transition-all ${
                      selectedRole?.id === r.id
                        ? 'bg-[#D96B27]/10 border-[#D96B27] text-[#D96B27] font-bold'
                        : 'bg-[#F5EFE6] border-[#E8E2D8] text-[#4A3E37] hover:bg-[#EFE6D8]'
                    }`}
                  >
                    <div className="font-bold mb-0.5">{r.title}</div>
                    <p className="text-[11px] text-[#786C62] font-normal">{r.description}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Current Crisis Card */}
            <div className="bg-[#F5EFE6] p-6 rounded-[20px] border border-[#E8E2D8] space-y-4">
              <div className="flex items-center justify-between border-b border-[#E8E2D8] pb-3">
                <span className="text-xs font-bold text-[#29221D] flex items-center gap-1.5">
                  <ShieldAlert className="w-4 h-4 text-[#D97706]" />
                  {currentCrisis.title}
                </span>
              </div>

              <p className="text-xs text-[#4A3E37] leading-relaxed font-medium">
                {currentCrisis.text}
              </p>

              <div className="p-3 bg-[#D97706]/10 border border-[#D97706]/20 rounded-xl text-[#B45309] text-xs font-bold">
                🎯 ЧЕЛЛЕНДЖ: {currentCrisis.challenge}
              </div>

              {/* Solution Submission */}
              <div className="space-y-2 pt-2">
                <label className="text-xs text-[#4A3E37] font-semibold block">
                  Предложите решение от лица вашей роли (<strong>{selectedRole?.title}</strong>):
                </label>
                <textarea
                  value={groupSolutionText}
                  onChange={(e) => setGroupSolutionText(e.target.value)}
                  placeholder="Как ваша группа договорится решить эту ситуацию за 20 минут?"
                  rows={3}
                  className="w-full bg-white border border-[#E8E2D8] rounded-xl p-3 text-xs text-[#29221D] focus:outline-none focus:border-[#D96B27]"
                />

                <button
                  onClick={submitSolution}
                  className="w-full bg-[#D96B27] hover:bg-[#B85418] text-white font-bold py-2.5 rounded-xl text-xs transition-all"
                >
                  Зафиксировать компромисс группы
                </button>
              </div>
            </div>
          </div>

          {/* Submitted Group Decisions Log */}
          {submittedSolutions.length > 0 && (
            <div className="pt-4 border-t border-[#F0E8DD] space-y-3">
              <h4 className="text-xs font-bold text-[#29221D]">
                Зафиксированные переговорные решения группы ({submittedSolutions.length}):
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {submittedSolutions.map((s, idx) => (
                  <div key={idx} className="bg-[#F5EFE6] p-3.5 rounded-xl border border-[#E8E2D8] text-xs">
                    <span className="text-[10px] text-[#D97706] font-bold block">{s.crisisTitle}</span>
                    <span className="text-[#29221D] font-bold block mt-0.5">{s.roleTitle}</span>
                    <p className="text-[#4A3E37] mt-1">{s.solution}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* BLOCK 3: Шкала «Я» vs «МЫ» */}
      {activeBlock === 3 && (
        <div className="bg-white border border-[#E8E2D8] rounded-[24px] p-6 sm:p-8 shadow-sm space-y-6">
          <div className="border-b border-[#F0E8DD] pb-4 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-[#D96B27] uppercase tracking-wider">
                БЛОК 3 (30 минут)
              </span>
              <h3 className="text-xl font-extrabold text-[#29221D] font-['Manrope',sans-serif]">Диагностика «Шкала договоренности» («Я» vs «МЫ»)</h3>
              <p className="text-xs text-[#786C62] mt-1">
                Анонимное нанесение стикеров: вертикальная ось «Я» (мои интересы), горизонтальная «МЫ» (интересы партнера/ребенка).
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Quadrant Visualizer */}
            <div className="bg-[#F5EFE6] p-4 rounded-[20px] border border-[#E8E2D8] flex flex-col items-center justify-center relative min-h-[300px]">
              <div className="absolute top-2 text-[10px] font-bold text-[#D96B27] uppercase tracking-widest">
                Ось Y: МОИ ИНТЕРЕСЫ («Я»)
              </div>
              <div className="absolute right-2 text-[10px] font-bold text-[#15803D] uppercase tracking-widest rotate-90 sm:rotate-0">
                Ось X: ИНТЕРЕСЫ ПАРТНЕРА («МЫ»)
              </div>

              {/* Grid Lines */}
              <div className="w-full h-56 border border-[#D8CFC4] relative bg-white rounded-xl overflow-hidden">
                <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 divide-x divide-y divide-[#E8E2D8]">
                  <div className="p-2 text-[10px] text-[#A3988E]">Эгоизм</div>
                  <div className="p-2 text-[10px] text-[#15803D] font-bold text-right">БАЛАНС СЕМЬИ</div>
                  <div className="p-2 text-[10px] text-[#A3988E]">Изоляция</div>
                  <div className="p-2 text-[10px] text-[#A3988E] text-right">Самопожертвование</div>
                </div>

                {/* Plotted Users */}
                {userPositions.map((pos) => (
                  <div
                    key={pos.id}
                    className="absolute w-4 h-4 rounded-full bg-[#D96B27] border-2 border-white flex items-center justify-center -translate-x-1/2 -translate-y-1/2 shadow-md transition-all group"
                    style={{
                      left: `${pos.weScore}%`,
                      top: `${100 - pos.selfScore}%`,
                    }}
                  >
                    <span className="opacity-0 group-hover:opacity-100 absolute bottom-5 bg-[#29221D] text-white text-[10px] px-2 py-0.5 rounded-lg border border-[#4A3E37] whitespace-nowrap z-10">
                      {pos.name}: Я({pos.selfScore}) / МЫ({pos.weScore})
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Slider to add your own point */}
            <div className="bg-[#F5EFE6] p-6 rounded-[20px] border border-[#E8E2D8] space-y-4">
              <h4 className="text-sm font-bold text-[#29221D]">
                Отметить свое текущее состояние на шкале:
              </h4>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs text-[#4A3E37] font-semibold mb-1">
                    <span>Насколько развито твое «Я» (личные цели)?</span>
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
                    <span>Насколько учтены интересы «МЫ» (пары/ребенка)?</span>
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
                  className="w-full bg-[#D96B27] hover:bg-[#B85418] text-white font-bold py-2.5 rounded-xl text-xs transition-all shadow-sm"
                >
                  Прикрепить анонимную точку на общую доску
                </button>
              </div>

              {/* Host commentary */}
              <div className="p-3.5 bg-white border border-[#E8E2D8] rounded-xl text-xs text-[#4A3E37] space-y-1">
                <span className="font-bold text-[#D96B27] block">Комментарий Режиссера:</span>
                <p className="italic">
                  «Большинство ищет идеальный баланс, но боится, что "Я" исчезнет. В театре мы называем это "поиском мизансцены". Это нормальный динамический процесс!»
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* BLOCK 4: Инструмент «Конверт решений» */}
      {activeBlock === 4 && (
        <div className="bg-white border border-[#E8E2D8] rounded-[24px] p-6 sm:p-8 shadow-sm space-y-6">
          <div className="border-b border-[#F0E8DD] pb-4 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-[#D96B27] uppercase tracking-wider">
                БЛОК 4 (40 минут)
              </span>
              <h3 className="text-xl font-extrabold text-[#29221D] font-['Manrope',sans-serif]">Инструмент «Конверт стыдных вопросов»</h3>
              <p className="text-xs text-[#786C62] mt-1">
                Откровенный диалог с ведущей семьей (режиссер + художник) без скучных лекций и менторства.
              </p>
            </div>

            <button
              onClick={drawNewQuestion}
              className="bg-[#D96B27] hover:bg-[#B85418] text-white font-bold text-xs px-4 py-2.5 rounded-xl flex items-center gap-1.5 transition-all shadow-sm"
            >
              <HelpCircle className="w-4 h-4" />
              <span>Достать вопрос из конверта</span>
            </button>
          </div>

          {selectedQuestion && (
            <div className="bg-[#F5EFE6] p-6 rounded-[20px] border border-[#E8E2D8] space-y-6">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-xl bg-[#D96B27]/10 text-[#D96B27] flex items-center justify-center shrink-0">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#D96B27]">
                    Категория: {selectedQuestion.category}
                  </span>
                  <h4 className="text-lg font-extrabold text-[#29221D] mt-0.5 font-['Manrope',sans-serif]">
                    "{selectedQuestion.question}"
                  </h4>
                </div>
              </div>

              {/* Answers Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white p-4.5 rounded-2xl border border-[#E8E2D8] space-y-2">
                  <span className="text-xs font-bold text-[#D96B27] block">
                    🎬 Ответ Мужа (Режиссер):
                  </span>
                  <p className="text-xs text-[#4A3E37] leading-relaxed italic">
                    {selectedQuestion.directorAnswer}
                  </p>
                </div>

                <div className="bg-white p-4.5 rounded-2xl border border-[#E8E2D8] space-y-2">
                  <span className="text-xs font-bold text-[#D97706] block">
                    🎨 Ответ Жены (Художник):
                  </span>
                  <p className="text-xs text-[#4A3E37] leading-relaxed italic">
                    {selectedQuestion.artistAnswer}
                  </p>
                </div>
              </div>

              <div className="p-3.5 bg-[#15803D]/10 border border-[#15803D]/20 rounded-xl text-[#15803D] text-xs font-bold flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#15803D] shrink-0" />
                <span>ЗОЛОТОЕ ПРАВИЛО: {selectedQuestion.takeaway}</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* BLOCK 5: Рефлексия и Карта открытий */}
      {activeBlock === 5 && (
        <div className="bg-white border border-[#E8E2D8] rounded-[24px] p-6 sm:p-8 shadow-sm space-y-6">
          <div className="border-b border-[#F0E8DD] pb-4 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-[#D96B27] uppercase tracking-wider">
                БЛОК 5 (30 минут)
              </span>
              <h3 className="text-xl font-extrabold text-[#29221D] font-['Manrope',sans-serif]">Рефлексия и «Карта открытий»</h3>
              <p className="text-xs text-[#786C62] mt-1">
                Заполнение открытки из 3 фразы и фиксация первого маленького шага.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Prompts Form */}
            <div className="bg-[#F5EFE6] p-6 rounded-[20px] border border-[#E8E2D8] space-y-4">
              <h4 className="text-sm font-bold text-[#29221D]">
                Персональная «Карта открытий»:
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

            {/* Handshake counter */}
            <div className="bg-[#F5EFE6] p-6 rounded-[20px] border border-[#E8E2D8] space-y-4 flex flex-col justify-between">
              <div>
                <h4 className="text-sm font-bold text-[#29221D] flex items-center gap-2">
                  <Heart className="w-4 h-4 text-[#C0392B]" />
                  Финальное рукопожатие без слов & Контакты
                </h4>
                <p className="text-xs text-[#786C62] mt-1 leading-relaxed">
                  За 3 минуты обменяться контактами и сказать фразу поддержки 5 участникам.
                </p>

                <div className="mt-6 text-center space-y-2">
                  <div className="text-4xl font-black text-[#D96B27] font-['Manrope',sans-serif]">{handshakesCount} / 5</div>
                  <p className="text-xs text-[#4A3E37] font-semibold">Соседских рукопожатий совершено</p>
                  <button
                    onClick={() => setHandshakesCount((prev) => Math.min(prev + 1, 10))}
                    className="bg-[#D96B27] hover:bg-[#B85418] text-white font-bold px-4 py-2.5 rounded-xl text-xs transition-all shadow-sm"
                  >
                    +1 Обмен контактом в Telegram
                  </button>
                </div>
              </div>

              <div className="p-3.5 bg-white border border-[#E8E2D8] rounded-xl text-xs text-[#15803D] font-bold text-center">
                ✓ Подтверждение Гипотезы №2: Участники забирают контакты новых друзей!
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
