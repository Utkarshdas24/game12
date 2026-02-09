import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { assessmentQuestions } from '../data/lifeGoals';

// Updated Video Mapping with new webm assets
const goalVideos = {
    1: '/assets/elements/childedu.webm',
    2: '/assets/elements/retirement.webm',
    3: '/assets/elements/house-planning.webm',
    4: '/assets/elements/M-planning.webm',
    5: '/assets/elements/world-travel.webm',
    6: '/assets/elements/emergency-funds.webm',
    7: '/assets/elements/debt-free.webm',
    8: '/assets/elements/business-planning.webm',
    9: '/assets/elements/health-security.webm'
};

const GoalAssessmentScreen = ({
    currentGoal,
    currentGoalIndex,
    currentQuestionIndex,
    onAnswer,
    score,
    lives
}) => {
    const [showIntro, setShowIntro] = useState(currentQuestionIndex === 0);
    const [timeLeft, setTimeLeft] = useState(30);
    const [isAnswering, setIsAnswering] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const timerRef = useRef(null);

    const currentQuestion = assessmentQuestions[currentQuestionIndex];
    const totalProgress = ((currentGoalIndex * 3) + currentQuestionIndex + 1) / 9 * 100;

    useEffect(() => {
        if (showIntro) {
            const timer = setTimeout(() => {
                setShowIntro(false);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [showIntro]);

    useEffect(() => {
        if (showIntro) return;

        setIsAnswering(false);
        setSelectedAnswer(null);
        setTimeLeft(30);

        const timerCallback = () => {
            setTimeLeft(prev => {
                if (prev <= 1) return 0;
                return prev - 1;
            });
        };

        timerRef.current = setInterval(timerCallback, 1000);
        return () => clearInterval(timerRef.current);
    }, [currentGoalIndex, currentQuestionIndex, showIntro]);

    useEffect(() => {
        if (timeLeft === 0 && !isAnswering && !showIntro) {
            clearInterval(timerRef.current);
            setIsAnswering(true);
            onAnswer(false);
        }
    }, [timeLeft, isAnswering, onAnswer, showIntro]);

    const handleAnswer = (answer) => {
        if (isAnswering || showIntro) return;
        setIsAnswering(true);
        setSelectedAnswer(answer);
        clearInterval(timerRef.current);



        setTimeout(() => {
            onAnswer(answer);
        }, 300);
    };

    if (!currentGoal || !currentQuestion) return null;

    return (
        <div className="ghibli-card">
            <div className="bg-burst"></div>

            <AnimatePresence mode='wait'>
                {showIntro ? (
                    <motion.div
                        key="intro"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                        transition={{ duration: 0.5 }}
                        className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#0066B2] p-4 text-center"
                    >
                        <div className="absolute inset-0 bg-[url('/assets/background_burst.png')] opacity-80 mix-blend-overlay bg-cover bg-center" />

                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="relative z-10"
                        >
                            <h2 className="text-blue-200 text-xs sm:text-sm font-bold uppercase tracking-[0.2em] mb-2">Next Goal</h2>
                            <h1 className="text-2xl sm:text-3xl lg:text-4xl text-white font-black drop-shadow-lg mb-6 leading-tight px-4">
                                {currentGoal.name}
                            </h1>
                        </motion.div>

                        <motion.div
                            initial={{ scale: 0, rotate: -10 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ type: "spring", bounce: 0.5, delay: 0.3 }}
                            className="relative z-10 w-64 h-64 sm:w-80 sm:h-80 mb-8 flex items-center justify-center overflow-hidden"
                        >
                            <video
                                key={currentGoal.id}
                                src={goalVideos[currentGoal.id]}
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="w-full h-full object-contain"
                                style={{
                                    clipPath: 'inset(0 10% 0 15%)',
                                    WebkitClipPath: 'inset(0 10% 0 15%)'
                                }}
                            />
                        </motion.div>

                        <motion.p className="relative z-10 text-blue-100 font-bold text-lg animate-pulse">Get Ready...</motion.p>
                    </motion.div>
                ) : (
                    <motion.div
                        key="content"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="ghibli-content justify-between sm:justify-center py-2 sm:py-6"
                    >
                        {/* Header Area - Clean and efficient */}
                        <div className="w-full shrink-0 mb-2 sm:mb-4">
                            <header className="flex items-center justify-between mb-2">
                                <div className="flex flex-col">
                                    <span className="text-blue-200 text-[10px] sm:text-xs font-bold uppercase tracking-widest">
                                        GOAL {currentGoalIndex + 1}/3
                                    </span>
                                    <h2 className="text-white text-base sm:text-lg md:text-xl font-black drop-shadow-md">
                                        {currentGoal.name}
                                    </h2>
                                </div>
                                <div className="relative w-10 h-10 sm:w-14 sm:h-14 flex items-center justify-center">
                                    <svg className="absolute w-full h-full -rotate-90 scale-110">
                                        <circle cx="50%" cy="50%" r="45%" stroke="rgba(255,255,255,0.2)" strokeWidth="3" fill="transparent" />
                                        <motion.circle
                                            cx="50%" cy="50%" r="45%"
                                            stroke={timeLeft <= 10 ? '#EF4444' : '#FF8C00'}
                                            strokeWidth="3" fill="transparent"
                                            strokeDasharray="100"
                                            animate={{ strokeDashoffset: 100 - (100 * (timeLeft / 30)) }}
                                            transition={{ duration: 1, ease: "linear" }}
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                    <span className={`text-sm sm:text-lg font-black ${timeLeft <= 10 ? 'text-red-300' : 'text-white'}`}>{timeLeft}</span>
                                </div>
                            </header>

                            <div className="progress-track h-2 sm:h-2.5">
                                <motion.div
                                    className="progress-fill"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${totalProgress}%` }}
                                    transition={{ duration: 0.5 }}
                                />
                            </div>
                        </div>

                        {/* Main Questions Container - Centered and Compact */}
                        <div className="flex-1 flex flex-col items-center justify-center gap-3 sm:gap-6 max-w-lg mx-auto w-full min-h-0">

                            {/* Image - Optimized size for PC */}
                            <div className="relative w-full aspect-square max-h-[160px] sm:max-h-[240px] md:max-h-[260px] flex items-center justify-center overflow-hidden">
                                <AnimatePresence mode='wait'>
                                    <motion.video
                                        key={currentGoal.id}
                                        src={goalVideos[currentGoal.id]}
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ duration: 0.3 }}
                                        className="max-h-full max-w-full object-contain z-20"
                                        style={{
                                            clipPath: 'inset(0 10% 0 15%)',
                                            WebkitClipPath: 'inset(0 10% 0 15%)'
                                        }}
                                    />
                                </AnimatePresence>
                            </div>

                            {/* Question Card - Premium glass look */}
                            <motion.div
                                key={`${currentGoal.id}-${currentQuestionIndex}`}
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="w-full bg-white/95 backdrop-blur-sm p-4 sm:p-6 shadow-2xl border-4 border-white/50 text-center"
                            >
                                <h3 className="text-slate-800 text-sm sm:text-base md:text-lg font-extrabold leading-tight">
                                    {currentQuestion.text.replace(/this (life )?goal/gi, `"${currentGoal.name}"`)}
                                </h3>
                            </motion.div>

                            {/* Action Buttons - White by default, Orange on select */}
                            <div className="w-full grid grid-cols-2 gap-4 sm:gap-6 mt-2">
                                <button
                                    onClick={() => handleAnswer(true)}
                                    disabled={isAnswering}
                                    className={`relative !py-4 sm:!py-5 !text-lg sm:!text-xl font-black transition-all border-4 uppercase tracking-widest active:translate-y-1 active:shadow-none shadow-[0_6px_0_rgba(0,0,0,0.2)] ${isAnswering && selectedAnswer === true
                                        ? 'bg-[#FF8C00] border-[#FF8C00] text-slate-900 shadow-[0_6px_0_#993D00]'
                                        : 'bg-white border-white/50 text-[#0066B2] hover:bg-slate-50'
                                        }`}
                                >
                                    YES
                                </button>
                                <button
                                    onClick={() => handleAnswer(false)}
                                    disabled={isAnswering}
                                    className={`relative !py-4 sm:!py-5 !text-lg sm:!text-xl font-black transition-all border-4 uppercase tracking-widest active:translate-y-1 active:shadow-none shadow-[0_6px_0_rgba(0,0,0,0.2)] ${isAnswering && selectedAnswer === false
                                        ? 'bg-[#FF8C00] border-[#FF8C00] text-slate-900 shadow-[0_6px_0_#993D00]'
                                        : 'bg-white border-white/50 text-[#0066B2] hover:bg-slate-50'
                                        }`}
                                >
                                    NO
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default GoalAssessmentScreen;
