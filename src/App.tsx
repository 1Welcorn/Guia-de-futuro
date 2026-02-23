/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ChevronRight, 
  ChevronLeft, 
  CheckCircle2, 
  Sparkles, 
  Target, 
  Users, 
  Cpu, 
  Compass,
  ArrowRight,
  RefreshCcw,
  BookOpen,
  Briefcase,
  BarChart3,
  FileText,
  Download,
  PieChart as PieChartIcon,
  Lock,
  Printer
} from 'lucide-react';
import { questions, profiles, Profile } from './questions';
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip as RechartsTooltip
} from 'recharts';

const App = () => {
  const [step, setStep] = useState<'intro' | 'setup' | 'quiz' | 'result' | 'explore'>('intro');
  const [userInfo, setUserInfo] = useState({ name: '', email: '' });
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, 'a' | 'b' | 'c' | 'd'>>({});
  const [activeResultTab, setActiveResultTab] = useState<'perfil' | 'relatorio' | 'carreiras' | 'cursos'>('perfil');
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [allResults, setAllResults] = useState<any[]>([]);
  const [adminFilter, setAdminFilter] = useState<string>('all');
  const isAdminUser = userInfo.email.toLowerCase() === 'f4330252301@gmail.com';

  useEffect(() => {
    if (isAdminMode) {
      fetch('/api/results')
        .then(res => res.json())
        .then(data => setAllResults(data))
        .catch(err => console.error(err));
    }
  }, [isAdminMode]);

  useEffect(() => {
    if (!isAdminMode && activeResultTab === 'relatorio') {
      setActiveResultTab('perfil');
    }
  }, [isAdminMode, activeResultTab]);

  const progress = (Object.keys(answers).length / questions.length) * 100;

  const handleAnswer = (questionId: number, optionId: 'a' | 'b' | 'c' | 'd') => {
    const newAnswers = { ...answers, [questionId]: optionId };
    setAnswers(newAnswers);
    
    if (currentQuestionIndex < questions.length - 1) {
      setTimeout(() => setCurrentQuestionIndex(prev => prev + 1), 300);
    } else {
      // Quiz finished, calculate profile and save
      const finalScores = calculateScores(newAnswers);
      const primaryProfile = Object.entries(finalScores).sort(([, a], [, b]) => b - a)[0][0];
      saveResults(newAnswers, primaryProfile);
    }
  };

  const calculateScores = (currentAnswers: Record<number, 'a' | 'b' | 'c' | 'd'>) => {
    const counts: Record<'a' | 'b' | 'c' | 'd', number> = { a: 0, b: 0, c: 0, d: 0 };
    const weights = { skill: 1.5, personality: 1.2, interest: 1.0 };

    (Object.entries(currentAnswers) as Array<[string, 'a' | 'b' | 'c' | 'd']>).forEach(([qId, ans]) => {
      const question = questions.find(q => q.id === parseInt(qId));
      const weight = question ? weights[question.category] : 1.0;
      counts[ans] += weight;
    });
    return counts;
  };

  const saveResults = async (finalAnswers: Record<number, 'a' | 'b' | 'c' | 'd'>, profile: string) => {
    try {
      await fetch('/api/results', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userInfo,
          answers: finalAnswers,
          profile,
          timestamp: new Date().toISOString()
        })
      });
    } catch (error) {
      console.error('Failed to save results:', error);
    }
  };

  const scores = useMemo(() => {
    const counts: Record<'a' | 'b' | 'c' | 'd', number> = { a: 0, b: 0, c: 0, d: 0 };
    const weights = { skill: 1.5, personality: 1.2, interest: 1.0 };

    (Object.entries(answers) as Array<[string, 'a' | 'b' | 'c' | 'd']>).forEach(([qId, ans]) => {
      const question = questions.find(q => q.id === parseInt(qId));
      const weight = question ? weights[question.category] : 1.0;
      counts[ans] += weight;
    });
    return counts;
  }, [answers]);

  const analysisMetrics = useMemo(() => {
    const sortedScores = (Object.entries(scores) as Array<['a' | 'b' | 'c' | 'd', number]>)
      .sort(([, a], [, b]) => b - a);
    
    const primary = sortedScores[0];
    const secondary = sortedScores[1];
    
    // Confidence calculation: how much lead the primary has over the average
    const total = (Object.values(scores) as number[]).reduce((a, b) => a + b, 0);
    const average = total / 4;
    const lead = primary[1] - average;
    const confidence = Math.min(Math.round((lead / primary[1]) * 100 + 50), 98);

    // Consistency: Check if category-specific winners match
    const categoryWinners = ['interest', 'skill', 'personality'].map(cat => {
      const catCounts = { a: 0, b: 0, c: 0, d: 0 };
      questions.filter(q => q.category === cat).forEach(q => {
        if (answers[q.id]) catCounts[answers[q.id]]++;
      });
      return (Object.entries(catCounts) as Array<['a' | 'b' | 'c' | 'd', number]>)
        .sort(([, a], [, b]) => b - a)[0][0];
    });
    
    const isConsistent = categoryWinners.every(w => w === primary[0]);

    return {
      primary: primary[0],
      secondary: secondary[0],
      confidence,
      isConsistent,
      gap: primary[1] - secondary[1]
    };
  }, [scores, answers]);

  const calculateResult = (): Profile => {
    return profiles[analysisMetrics.primary];
  };

  const radarData = useMemo(() => {
    return [
      { subject: 'Prático/Dinâmico', A: scores.a, fullMark: 15 },
      { subject: 'Estratégico/Líder', A: scores.b, fullMark: 15 },
      { subject: 'Humanista/Social', A: scores.c, fullMark: 15 },
      { subject: 'Analítico/Inovador', A: scores.d, fullMark: 15 },
    ];
  }, [scores]);

  const pieData = useMemo(() => {
    return [
      { name: 'Explorador', value: scores.a, color: '#F27D26' },
      { name: 'Líder', value: scores.b, color: '#2563EB' },
      { name: 'Conector', value: scores.c, color: '#10B981' },
      { name: 'Inovador', value: scores.d, color: '#4F46E5' },
    ].filter(d => d.value > 0);
  }, [scores]);

  const resultProfile = useMemo(() => {
    if (step === 'result') return calculateResult();
    return null;
  }, [step, answers]);

  const mentorAdvice = useMemo(() => {
    if (!resultProfile) return "";

    const secondaryTitle = profiles[analysisMetrics.secondary].title;
    
    let advice = `Olá, ${userInfo.name}! Com base na sua pontuação de ${analysisMetrics.confidence}%, percebemos que você possui um perfil predominantemente ${resultProfile.title}. `;
    
    if (analysisMetrics.isConsistent) {
      advice += `Sua consistência entre interesses e habilidades é notável, o que indica uma forte inclinação natural para esta área. `;
    } else {
      advice += `Seu perfil é multidisciplinar, apresentando também fortes traços de ${secondaryTitle}. Isso é uma vantagem competitiva no mercado atual, que valoriza profissionais versáteis. `;
    }

    advice += `Para o seu futuro, recomendamos focar em cursos que explorem sua ${resultProfile.characteristics.split(',')[0].toLowerCase()}. `;
    
    if (resultProfile.id === 'd') {
      advice += `No cenário brasileiro, carreiras em tecnologia e análise de dados estão em alta. Considere o ENEM para ingressar em Institutos Federais ou Universidades de ponta. `;
    } else if (resultProfile.id === 'b') {
      advice += `Sua capacidade de liderança será muito valorizada em cargos de gestão. O Sisu é uma ótima porta de entrada para cursos de Administração e Engenharia. `;
    } else if (resultProfile.id === 'c') {
      advice += `O mundo precisa de pessoas com sua empatia. Carreiras em saúde e educação oferecem estabilidade e propósito, especialmente no setor público. `;
    } else {
      advice += `Sua energia e praticidade são ideais para o setor de serviços e gastronomia. Cursos técnicos do Sistema S (SENAI/SENAC) podem acelerar sua entrada no mercado. `;
    }

    advice += `Continue explorando suas opções e lembre-se: o sucesso é a soma de pequenos esforços repetidos dia após dia!`;
    
    return advice;
  }, [resultProfile, analysisMetrics, userInfo.name]);

  const resetQuiz = () => {
    setStep('intro');
    setCurrentQuestionIndex(0);
    setAnswers({});
    setActiveResultTab('perfil');
  };

  return (
    <div className="min-h-screen bg-stone-50 bg-grid-pattern flex flex-col items-center justify-center p-4 sm:p-8 md:p-12 overflow-x-hidden">
      <AnimatePresence mode="wait">
        {step === 'intro' && (
          <motion.div 
            key="intro"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="max-w-7xl w-full flex flex-col lg:flex-row items-center gap-12 lg:gap-20 relative"
          >
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
              <motion.div 
                animate={{ 
                  y: [0, -20, 0],
                  rotate: [0, 5, 0]
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-10 left-10 w-64 h-64 bg-brand-primary/5 rounded-full blur-3xl"
              />
              <motion.div 
                animate={{ 
                  y: [0, 20, 0],
                  rotate: [0, -5, 0]
                }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-10 right-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"
              />
            </div>

            {/* Left Side: Hero Text */}
            <div className="flex-1 text-center lg:text-left space-y-6 md:space-y-8 z-10">
              <motion.div
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex items-center justify-center lg:justify-start gap-2 mb-6">
                  <div className="w-10 h-10 bg-brand-primary rounded-xl flex items-center justify-center text-white font-black text-xl shadow-lg shadow-brand-primary/20">
                    G
                  </div>
                  <span className="font-display font-black text-xl md:text-2xl tracking-tighter text-brand-secondary">Guia de <span className="text-brand-primary">Futuro</span></span>
                </div>
                <span className="inline-block px-4 py-1.5 bg-brand-primary/10 text-brand-primary rounded-full text-[10px] md:text-xs font-black uppercase tracking-widest mb-4">
                  🚀 Edição 2026
                </span>
                <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-black leading-[0.9] text-brand-secondary tracking-tighter">
                  SEU <span className="text-brand-primary">FUTURO</span> <br />
                  NÃO É UM <br />
                  <span className="italic font-serif text-stone-300">MISTÉRIO.</span>
                </h1>
              </motion.div>

              <motion.p 
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-lg md:text-xl text-stone-500 font-medium max-w-lg mx-auto lg:mx-0 leading-relaxed"
              >
                O teste vocacional que entende a <span className="text-brand-secondary font-bold underline decoration-brand-primary underline-offset-4">Geração Z</span>. 
                Descubra carreiras que realmente combinam com você, não com o que seus pais querem.
              </motion.p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 pt-8 border-t border-stone-200">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map(i => (
                    <img 
                      key={i}
                      src={`https://picsum.photos/seed/user${i}/100/100`} 
                      className="w-10 h-10 rounded-full border-2 border-white shadow-sm"
                      alt="User"
                    />
                  ))}
                </div>
                <p className="text-sm text-stone-400 font-medium text-center sm:text-left">
                  <span className="text-stone-800 font-bold">Descubra seu potencial</span> e planeje sua carreira com clareza.
                </p>
              </div>
            </div>

            {/* Right Side: Visual Element */}
            <div className="flex-1 w-full flex items-center justify-center z-10">
              <motion.button 
                onClick={() => setStep('setup')}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ delay: 0.5 }}
                className="w-full max-w-md lg:max-w-none h-64 sm:h-80 bg-brand-primary rounded-[2.5rem] md:rounded-[3rem] p-8 md:p-12 flex flex-col justify-center items-center text-center text-white overflow-hidden relative group shadow-2xl shadow-brand-primary/20 cursor-pointer"
              >
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute -top-24 -right-24 w-64 h-64 border-4 border-white/10 rounded-full"
                />
                <motion.div 
                  animate={{ rotate: -360 }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  className="absolute -bottom-12 -left-12 w-48 h-48 border-2 border-white/10 rounded-full"
                />
                
                <div className="relative z-10 space-y-4 md:space-y-6">
                  <div className="w-16 h-16 md:w-24 md:h-24 bg-white/20 backdrop-blur-md rounded-2xl md:rounded-3xl flex items-center justify-center mx-auto mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-500 shadow-xl">
                    <ArrowRight className="w-8 h-8 md:w-12 md:h-12" />
                  </div>
                  <div className="space-y-1 md:space-y-2">
                    <h4 className="text-3xl md:text-4xl font-black tracking-tighter leading-none">PRONTO PARA <br />COMEÇAR?</h4>
                    <p className="text-brand-secondary font-bold text-base md:text-lg">O teste leva menos de 5 minutos.</p>
                  </div>
                </div>
              </motion.button>
            </div>
          </motion.div>
        )}

        {step === 'setup' && (
          <motion.div 
            key="setup"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="max-w-md w-full bg-white border border-stone-200 p-6 sm:p-10 rounded-[2.5rem] space-y-6 md:space-y-8 shadow-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/5 rounded-full -mr-16 -mt-16" />
            
            <div className="text-center space-y-2 relative">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-brand-primary/10 text-brand-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users size={32} />
              </div>
              <h2 className="text-2xl md:text-3xl font-display font-black text-brand-secondary tracking-tight">QUEM É VOCÊ?</h2>
              <p className="text-sm md:text-base text-stone-500 font-medium">Seu relatório será 100% personalizado.</p>
            </div>
            <div className="space-y-4 md:space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] md:text-xs font-black text-stone-400 uppercase tracking-[0.2em] ml-1">Nome Completo</label>
                <input 
                  type="text" 
                  value={userInfo.name}
                  onChange={(e) => setUserInfo(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Ex: Maria Silva"
                  className="w-full px-5 md:px-6 py-3 md:py-4 bg-stone-50 border-2 border-stone-100 rounded-2xl focus:border-brand-primary focus:bg-white outline-none transition-all font-medium text-base md:text-lg"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] md:text-xs font-black text-stone-400 uppercase tracking-[0.2em] ml-1">E-mail</label>
                <input 
                  type="email" 
                  value={userInfo.email}
                  onChange={(e) => setUserInfo(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="Ex: maria@email.com"
                  className="w-full px-5 md:px-6 py-3 md:py-4 bg-stone-50 border-2 border-stone-100 rounded-2xl focus:border-brand-primary focus:bg-white outline-none transition-all font-medium text-base md:text-lg"
                />
              </div>
              <button 
                disabled={!userInfo.name || !userInfo.email}
                onClick={() => setStep('quiz')}
                className="w-full py-4 md:py-5 bg-brand-secondary text-white rounded-2xl font-black text-lg md:text-xl hover:bg-brand-primary disabled:opacity-50 disabled:hover:bg-brand-secondary transition-all shadow-lg active:scale-95"
              >
                VAMOS NESSA!
              </button>
              <button 
                onClick={() => setStep('intro')}
                className="w-full py-2 text-stone-400 hover:text-stone-600 font-bold uppercase tracking-widest text-[10px] md:text-xs transition-colors"
              >
                Voltar
              </button>
            </div>
          </motion.div>
        )}


        {step === 'quiz' && (
          <motion.div 
            key="quiz"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="max-w-3xl w-full space-y-6 md:space-y-8"
          >
            {/* Header & Progress */}
            <div className="flex items-center justify-between mb-2 md:mb-4">
              <button 
                onClick={() => setStep('intro')}
                className="p-2 md:p-3 hover:bg-white rounded-xl md:rounded-2xl transition-all text-stone-400 hover:text-brand-secondary shadow-sm"
              >
                <ChevronLeft size={20} className="md:w-6 md:h-6" />
              </button>
              <div className="flex-1 mx-4 md:mx-8 relative">
                <div className="h-2 md:h-3 w-full bg-stone-200 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-brand-primary"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                  />
                </div>
                <div className="absolute -top-5 md:-top-6 left-0 w-full flex justify-between px-1">
                   <span className="text-[8px] md:text-[10px] font-black text-stone-400 uppercase tracking-widest">Progresso</span>
                   <span className="text-[8px] md:text-[10px] font-black text-brand-primary uppercase tracking-widest">{Math.round(progress)}%</span>
                </div>
              </div>
              <span className="text-[10px] md:text-sm font-display font-black text-brand-secondary bg-white px-3 md:px-4 py-1.5 md:py-2 rounded-lg md:rounded-xl shadow-sm">
                {currentQuestionIndex + 1} <span className="text-stone-300">/</span> {questions.length}
              </span>
            </div>

            {/* Question Card */}
            <div className="bg-white p-6 sm:p-8 md:p-14 rounded-[2rem] md:rounded-[3rem] space-y-6 md:space-y-10 shadow-2xl border border-stone-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 md:w-64 h-32 md:h-64 bg-brand-primary/5 rounded-full -mr-16 md:-mr-32 -mt-16 md:-mt-32 blur-2xl md:blur-3xl" />
              
              <div className="space-y-3 md:space-y-4 relative">
                <span className="inline-block px-3 md:px-4 py-1 md:py-1.5 bg-brand-secondary text-white rounded-full text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em]">
                  {questions[currentQuestionIndex].category === 'personality' ? 'Personalidade' : 
                   questions[currentQuestionIndex].category === 'skill' ? 'Habilidade' : 'Interesse'}
                </span>
                <motion.h2 
                  key={currentQuestionIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-display font-black text-brand-secondary leading-tight tracking-tight"
                >
                  {questions[currentQuestionIndex].text}
                </motion.h2>
              </div>

              <div className="grid grid-cols-1 gap-3 md:gap-4 relative">
                {questions[currentQuestionIndex].options.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleAnswer(questions[currentQuestionIndex].id, option.id)}
                    className={`
                      group relative w-full p-4 md:p-6 text-left rounded-2xl md:rounded-3xl border-2 transition-all flex items-center gap-4 md:gap-6
                      ${answers[questions[currentQuestionIndex].id] === option.id 
                        ? 'border-brand-primary bg-brand-primary/5 text-brand-primary ring-4 ring-brand-primary/10' 
                        : 'border-stone-100 bg-stone-50/50 hover:border-brand-secondary hover:bg-white text-stone-700'}
                    `}
                  >
                    <div className={`
                      w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl flex items-center justify-center font-black text-lg md:text-xl transition-all
                      ${answers[questions[currentQuestionIndex].id] === option.id 
                        ? 'bg-brand-primary text-white' 
                        : 'bg-white text-stone-400 group-hover:bg-brand-secondary group-hover:text-white shadow-sm'}
                    `}>
                      {option.id.toUpperCase()}
                    </div>
                    <span className="flex-1 font-bold text-base md:text-lg leading-tight">{option.text}</span>
                    {answers[questions[currentQuestionIndex].id] === option.id && (
                      <CheckCircle2 className="text-brand-primary w-5 h-5 md:w-6 md:h-6" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center px-2 md:px-4">
              <button 
                disabled={currentQuestionIndex === 0}
                onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
                className="flex items-center gap-1 md:gap-2 text-stone-400 hover:text-brand-secondary font-black text-[10px] md:text-xs uppercase tracking-widest disabled:opacity-0 transition-all"
              >
                <ChevronLeft size={14} className="md:w-4 md:h-4" /> Anterior
              </button>
              
              {Object.keys(answers).length === questions.length && currentQuestionIndex === questions.length - 1 ? (
                <button 
                  onClick={() => setStep('result')}
                  className="flex items-center gap-2 md:gap-3 px-6 md:px-10 py-4 md:py-5 bg-brand-primary text-white rounded-xl md:rounded-2xl font-black text-base md:text-xl shadow-xl shadow-brand-primary/20 hover:scale-105 active:scale-95 transition-all"
                >
                  VER RESULTADO <Sparkles size={20} className="md:w-6 md:h-6" />
                </button>
              ) : (
                <button
                  disabled={!answers[questions[currentQuestionIndex].id]}
                  onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
                  className="flex items-center gap-1 md:gap-2 px-6 md:px-8 py-3 md:py-4 bg-brand-secondary text-white rounded-xl md:rounded-2xl font-black text-[10px] md:text-sm uppercase tracking-widest hover:bg-brand-primary disabled:opacity-30 transition-all active:scale-95"
                >
                  Próxima <ChevronRight size={16} className="md:w-5 md:h-5" />
                </button>
              )}
            </div>
          </motion.div>
        )}

        {step === 'result' && resultProfile && (
          <motion.div 
            key="result"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-6xl w-full space-y-6 md:space-y-8"
          >
            <div className="text-center space-y-4 relative">
              <div className="flex justify-center mb-4 md:mb-6">
                <div className="flex items-center gap-2 md:gap-3 bg-white px-4 md:px-6 py-2 md:py-3 rounded-xl md:rounded-2xl shadow-xl border border-stone-100 transform -rotate-2">
                  <div className="w-8 h-8 md:w-10 md:h-10 bg-brand-primary rounded-lg md:rounded-xl flex items-center justify-center text-white font-black text-lg md:text-xl shadow-lg shadow-brand-primary/20">
                    G
                  </div>
                  <span className="font-display font-black text-lg md:text-2xl tracking-tighter text-brand-secondary">Guia de <span className="text-brand-primary">Futuro</span></span>
                </div>
              </div>
              <div className="absolute top-0 right-0 flex gap-2 no-print">
                {isAdminUser && (
                  <button 
                    onClick={() => setIsAdminMode(!isAdminMode)}
                    className={`p-2 rounded-full transition-all ${isAdminMode ? 'bg-brand-primary text-white shadow-lg' : 'bg-white text-stone-300 hover:text-brand-primary shadow-sm border border-stone-100'}`}
                    title="Alternar Visão Administrativa"
                  >
                    <Lock size={16} />
                  </button>
                )}
                <button 
                  onClick={() => window.print()}
                  className="p-2 bg-white text-stone-300 hover:text-brand-primary rounded-full shadow-sm border border-stone-100 transition-all"
                  title="Imprimir Relatório"
                >
                  <Printer size={16} />
                </button>
              </div>
              <h2 className="text-stone-400 font-bold uppercase tracking-[0.15em] md:tracking-[0.2em] text-[10px] md:text-sm">Relatório Vocacional de {userInfo.name}</h2>
              <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-display font-black text-white p-3 md:p-4 inline-block rounded-2xl md:rounded-3xl ${resultProfile.color} shadow-2xl transform -rotate-1`}>
                {resultProfile.title}
              </h1>
              <p className="text-stone-400 text-[10px] md:text-sm font-mono mt-1 md:mt-2">{userInfo.email}</p>
            </div>

            {isAdminMode && (
              <div className="space-y-6 no-print">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
                  <div className="p-3 md:p-4 bg-white rounded-xl md:rounded-2xl border border-stone-100 shadow-sm text-center">
                    <h4 className="text-[8px] md:text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1">Nível de Precisão</h4>
                    <div className="text-xl md:text-2xl font-black text-brand-primary">{analysisMetrics.confidence}%</div>
                    <div className="w-full h-1 bg-stone-100 rounded-full mt-2 overflow-hidden">
                      <div className="h-full bg-brand-primary" style={{ width: `${analysisMetrics.confidence}%` }}></div>
                    </div>
                  </div>
                  <div className="p-3 md:p-4 bg-white rounded-xl md:rounded-2xl border border-stone-100 shadow-sm text-center">
                    <h4 className="text-[8px] md:text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1">Perfil Secundário</h4>
                    <div className="text-xs md:text-sm font-bold text-stone-700">{profiles[analysisMetrics.secondary].title}</div>
                    <div className="text-[8px] md:text-[10px] text-stone-400 mt-0.5 md:mt-1">Forte influência nas suas escolhas</div>
                  </div>
                  <div className="p-3 md:p-4 bg-white rounded-xl md:rounded-2xl border border-stone-100 shadow-sm text-center">
                    <h4 className="text-[8px] md:text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-1">Consistência</h4>
                    <div className={`text-xs md:text-sm font-bold ${analysisMetrics.isConsistent ? 'text-emerald-600' : 'text-amber-600'}`}>
                      {analysisMetrics.isConsistent ? 'Alta Convergência' : 'Perfil Multidisciplinar'}
                    </div>
                    <div className="text-[8px] md:text-[10px] text-stone-400 mt-0.5 md:mt-1">Baseado em Interesses vs. Habilidades</div>
                  </div>
                </div>

                {/* Stored Results Table */}
                <div className="bg-white rounded-2xl border border-stone-100 shadow-sm overflow-hidden">
                  <div className="p-4 border-bottom border-stone-100 bg-stone-50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <h3 className="text-sm font-bold text-stone-800 uppercase tracking-wider">Histórico de Testes ({allResults.length})</h3>
                    <div className="flex items-center gap-2">
                      <label className="text-[10px] font-bold text-stone-400 uppercase">Filtrar:</label>
                      <select 
                        value={adminFilter}
                        onChange={(e) => setAdminFilter(e.target.value)}
                        className="text-xs p-1 rounded border border-stone-200 bg-white outline-none focus:border-brand-primary"
                      >
                        <option value="all">Todos</option>
                        <option value="a">Explorador</option>
                        <option value="b">Líder</option>
                        <option value="c">Conector</option>
                        <option value="d">Inovador</option>
                      </select>
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-stone-50 text-stone-400 uppercase font-bold">
                        <tr>
                          <th className="px-4 py-3">Nome</th>
                          <th className="px-4 py-3">Email</th>
                          <th className="px-4 py-3">Perfil</th>
                          <th className="px-4 py-3">Data</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-100">
                        {allResults
                          .filter(res => adminFilter === 'all' || res.profile === adminFilter)
                          .map((res, idx) => (
                          <tr key={idx} className="hover:bg-stone-50 transition-colors">
                            <td className="px-4 py-3 font-bold text-stone-700">{res.name}</td>
                            <td className="px-4 py-3 text-stone-500">{res.email}</td>
                            <td className="px-4 py-3">
                              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold text-white ${profiles[res.profile as 'a'|'b'|'c'|'d']?.color || 'bg-stone-300'}`}>
                                {profiles[res.profile as 'a'|'b'|'c'|'d']?.title || 'N/A'}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-stone-400">{new Date(res.timestamp).toLocaleDateString()}</td>
                          </tr>
                        ))}
                        {allResults.length === 0 && (
                          <tr>
                            <td colSpan={4} className="px-4 py-8 text-center text-stone-400 italic">Nenhum resultado armazenado ainda.</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Tabs Navigation */}
            <div className="flex justify-center flex-wrap gap-1.5 md:gap-2 p-1 bg-stone-200 rounded-xl md:rounded-2xl w-fit mx-auto no-print">
              {[
                { id: 'perfil', label: 'Seu Perfil', icon: Users },
                ...(isAdminMode ? [{ id: 'relatorio', label: 'Relatório', icon: BarChart3 }] : []),
                { id: 'carreiras', label: 'Carreiras', icon: Briefcase },
                { id: 'cursos', label: 'Cursos Técnicos', icon: BookOpen }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveResultTab(tab.id as any)}
                  className={`
                    flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-lg md:rounded-xl font-bold text-[10px] md:text-sm transition-all
                    ${activeResultTab === tab.id ? 'bg-white text-brand-secondary shadow-sm' : 'text-stone-500 hover:text-stone-700'}
                  `}
                >
                  <tab.icon size={14} className="md:w-4 md:h-4" /> {tab.label}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
              {/* Main Content Area */}
              <div className="lg:col-span-2 space-y-6">
                <AnimatePresence mode="wait">
                  {activeResultTab === 'perfil' && (
                    <motion.div 
                      key="perfil"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="glass-card p-6 md:p-8 rounded-2xl md:rounded-3xl space-y-6"
                    >
                      <div className="space-y-3 md:space-y-4">
                        <h3 className="text-xl md:text-2xl font-bold text-stone-800 flex items-center gap-2">
                          <Users className="text-stone-400 w-5 h-5 md:w-6 md:h-6" /> Sobre Você
                        </h3>
                        <p className="text-base md:text-lg text-stone-600 leading-relaxed">
                          {resultProfile.description}
                        </p>
                      </div>

                      <div className="space-y-3 md:space-y-4">
                        <h3 className="text-xl md:text-2xl font-bold text-stone-800 flex items-center gap-2">
                          <Target className="text-stone-400 w-5 h-5 md:w-6 md:h-6" /> Características Principais
                        </h3>
                        <p className="text-base md:text-lg text-stone-600">
                          {resultProfile.characteristics}
                        </p>
                      </div>

                      {/* AI Advice Card inside Profile Tab */}
                      <div className="bg-brand-secondary text-white p-6 md:p-8 rounded-2xl md:rounded-3xl shadow-xl relative overflow-hidden mt-6 md:mt-8">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                          <Cpu size={80} className="md:w-[120px] md:h-[120px]" />
                        </div>
                        <div className="relative z-10 space-y-3 md:space-y-4">
                          <h3 className="text-xl md:text-2xl font-bold flex items-center gap-2">
                            <Sparkles className="text-brand-primary w-5 h-5 md:w-6 md:h-6" /> Análise do Mentor Técnico
                          </h3>
                          <p className="text-base md:text-lg text-stone-200 leading-relaxed italic">
                            "{mentorAdvice}"
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeResultTab === 'relatorio' && (
                    <motion.div 
                      key="relatorio"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-6"
                    >
                      <div className="glass-card p-6 md:p-8 rounded-2xl md:rounded-3xl space-y-6 md:space-y-8">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                          <h3 className="text-xl md:text-2xl font-bold text-stone-800 flex items-center gap-2">
                            <FileText className="text-stone-400 w-5 h-5 md:w-6 md:h-6" /> Mapeamento de Competências
                          </h3>
                          <div className="flex gap-2 no-print w-full sm:w-auto">
                            <button 
                              onClick={() => window.print()}
                              className="w-full sm:w-auto p-2 md:p-2.5 bg-brand-primary text-white rounded-lg hover:bg-orange-600 transition-colors flex items-center justify-center gap-2 text-xs md:text-sm font-bold"
                            >
                              <Printer size={16} className="md:w-5 md:h-5" /> Imprimir Relatório
                            </button>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                          <div className="h-[300px] w-full">
                            <h4 className="text-sm font-bold text-stone-400 uppercase tracking-widest mb-4 text-center">Gráfico de Radar</h4>
                            <ResponsiveContainer width="100%" height="100%">
                              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                                <PolarGrid stroke="#e5e7eb" />
                                <PolarAngleAxis dataKey="subject" tick={{ fill: '#6b7280', fontSize: 10 }} />
                                <Radar
                                  name="Perfil"
                                  dataKey="A"
                                  stroke="#F27D26"
                                  fill="#F27D26"
                                  fillOpacity={0.6}
                                />
                              </RadarChart>
                            </ResponsiveContainer>
                          </div>

                          <div className="h-[300px] w-full">
                            <h4 className="text-sm font-bold text-stone-400 uppercase tracking-widest mb-4 text-center">Distribuição de Interesses</h4>
                            <ResponsiveContainer width="100%" height="100%">
                              <PieChart>
                                <Pie
                                  data={pieData}
                                  cx="50%"
                                  cy="50%"
                                  innerRadius={60}
                                  outerRadius={80}
                                  paddingAngle={5}
                                  dataKey="value"
                                >
                                  {pieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                  ))}
                                </Pie>
                                <RechartsTooltip />
                              </PieChart>
                            </ResponsiveContainer>
                          </div>
                        </div>

                        <div className="pt-6 border-t border-stone-100">
                          <h4 className="font-bold text-stone-800 mb-4">Análise de Profissionais da Área</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200">
                              <h5 className="font-bold text-sm text-stone-700 mb-2">Pontos Fortes</h5>
                              <ul className="text-sm text-stone-600 space-y-1">
                                <li>• Alta capacidade de adaptação</li>
                                <li>• {resultProfile.characteristics.split(',')[0]}</li>
                                <li>• Alinhamento com tendências de {resultProfile.id === 'd' ? 'tecnologia' : resultProfile.id === 'c' ? 'humanas' : 'gestão'}</li>
                                {analysisMetrics.confidence > 80 && <li>• Perfil altamente focado e definido</li>}
                              </ul>
                            </div>
                            <div className="p-4 bg-stone-50 rounded-2xl border border-stone-200">
                              <h5 className="font-bold text-sm text-stone-700 mb-2">Oportunidades de Crescimento</h5>
                              <ul className="text-sm text-stone-600 space-y-1">
                                <li>• Fortalecer competências de {scores.a < scores.d ? 'prática' : 'análise'}</li>
                                <li>• Explorar networking em áreas de {resultProfile.careers[0]}</li>
                                {analysisMetrics.gap < 2 && <li>• Desenvolver habilidades do perfil {profiles[analysisMetrics.secondary].title}</li>}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeResultTab === 'carreiras' && (
                    <motion.div 
                      key="carreiras"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-6"
                    >
                      {resultProfile.detailedCareers.map((career, idx) => (
                        <div key={idx} className="glass-card p-8 rounded-3xl space-y-6">
                          <div className="flex justify-between items-center border-b border-stone-100 pb-4">
                            <h3 className="text-3xl font-display font-bold text-stone-800">{career.name}</h3>
                            <span className="px-4 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold uppercase tracking-wider">Mercado em Alta</span>
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-4">
                              <h4 className="font-bold text-stone-800 flex items-center gap-2"><ArrowRight size={16} className="text-brand-primary" /> Atividades Diárias</h4>
                              <p className="text-stone-600 text-sm leading-relaxed">{career.dailyActivities}</p>
                            </div>
                            <div className="space-y-4">
                              <h4 className="font-bold text-stone-800 flex items-center gap-2"><ArrowRight size={16} className="text-brand-primary" /> Perspectiva de Mercado</h4>
                              <p className="text-stone-600 text-sm leading-relaxed">{career.marketOutlook}</p>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                            <div className="space-y-4">
                              <h4 className="font-bold text-stone-800 flex items-center gap-2"><ArrowRight size={16} className="text-brand-primary" /> Onde Estudar</h4>
                              <p className="text-stone-600 text-sm leading-relaxed">{career.whereToStudy}</p>
                            </div>
                            <div className="space-y-4">
                              <h4 className="font-bold text-stone-800 flex items-center gap-2"><ArrowRight size={16} className="text-brand-primary" /> Especializações</h4>
                              <div className="flex flex-wrap gap-2">
                                {career.specializations.map((spec, sIdx) => (
                                  <span key={sIdx} className="px-3 py-1 bg-stone-100 text-stone-500 rounded-lg text-xs font-medium">{spec}</span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </motion.div>
                  )}

                  {activeResultTab === 'cursos' && (
                    <motion.div 
                      key="cursos"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="grid grid-cols-1 gap-6"
                    >
                      {resultProfile.techCourses.map((course, idx) => (
                        <div key={idx} className="glass-card p-8 rounded-3xl space-y-4 border-l-8 border-brand-primary">
                          <div className="flex justify-between items-start">
                            <h3 className="text-2xl font-bold text-stone-800">{course.name}</h3>
                            <span className="px-4 py-1 bg-stone-100 text-stone-500 rounded-full text-xs font-bold uppercase">{course.duration}</span>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                            <div className="space-y-2">
                              <h4 className="font-bold text-stone-400 text-xs uppercase tracking-widest">O que você aprende</h4>
                              <p className="text-stone-600 text-sm leading-relaxed">{course.whatYouLearn}</p>
                            </div>
                            <div className="space-y-2">
                              <h4 className="font-bold text-stone-400 text-xs uppercase tracking-widest">Oportunidades de Emprego</h4>
                              <p className="text-stone-600 text-sm leading-relaxed">{course.jobOpportunities}</p>
                            </div>
                          </div>
                          <div className="pt-4 flex items-center gap-2 text-brand-primary font-bold text-sm uppercase tracking-wider">
                            <Compass size={18} /> Onde encontrar: {course.whereToFind}
                          </div>
                        </div>
                      ))}
                      <div className="p-6 bg-stone-100 rounded-3xl text-center">
                        <p className="text-stone-500 text-sm italic">
                          "Os cursos técnicos são pontes rápidas para o sucesso profissional no Brasil."
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Sidebar / Actions */}
              <div className="space-y-6 no-print">
                <div className="glass-card p-6 rounded-3xl space-y-4">
                  <h4 className="font-bold text-stone-800">Próximos Passos</h4>
                  <ul className="space-y-3">
                    <li className="flex gap-3 text-sm text-stone-600">
                      <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0">1</div>
                      Pesquise sobre as carreiras citadas no Sisu/Prouni.
                    </li>
                    <li className="flex gap-3 text-sm text-stone-600">
                      <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0">2</div>
                      Procure profissionais da área nas redes sociais.
                    </li>
                    <li className="flex gap-3 text-sm text-stone-600">
                      <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0">3</div>
                      Verifique cursos técnicos gratuitos (como os do IF ou Senai).
                    </li>
                  </ul>
                </div>

                <button 
                  onClick={resetQuiz}
                  className="w-full flex items-center justify-center gap-3 py-5 bg-white border-2 border-stone-100 text-stone-400 rounded-3xl font-black text-sm uppercase tracking-[0.2em] hover:border-brand-secondary hover:text-brand-secondary transition-all active:scale-95 shadow-sm"
                >
                  <RefreshCcw size={20} /> RECOMEÇAR JORNADA
                </button>

                <div className="p-6 bg-orange-50 rounded-3xl border border-orange-100">
                  <p className="text-xs text-orange-800 font-medium leading-relaxed">
                    <strong>Dica Portfólio:</strong> Este relatório mapeia competências essenciais valorizadas por recrutadores modernos. Use os gráficos para demonstrar seu perfil multidisciplinar!
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;


