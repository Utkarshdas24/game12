import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { lifeGoals } from '../data/lifeGoals';
import { X } from 'lucide-react';

const WelcomeScreen = ({ onStart }) => {
    const [showNamePopup, setShowNamePopup] = useState(false);
    const [userName, setUserName] = useState('');
    const [error, setError] = useState('');

    const handleStartClick = () => {
        setShowNamePopup(true);
    };

    const handleNameSubmit = (e) => {
        e.preventDefault();

        if (!userName.trim()) {
            setError('Please enter your name');
            return;
        }

        setError('');
        setShowNamePopup(false);

        setTimeout(() => {
            onStart(userName.trim());
        }, 600);
    };

    return (
        <div className="ghibli-card">
            {/* Background Image */}
            <div className="bg-burst"></div>

            {/* Content Container - Center aligned for impact */}
            <div className="ghibli-content justify-between sm:justify-center py-4 sm:py-8">

                {/* Header Section - Larger responsive typography */}
                <header className="w-full flex flex-col items-center z-50 shrink-0 mb-4 sm:mb-6">
                    <motion.div
                        initial={{ y: -30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="text-center"
                    >
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white drop-shadow-[0_4px_6px_rgba(0,0,0,0.5)] tracking-tighter leading-none mb-1 italic">
                            Are you prepared to
                        </h1>
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#FFD700] tracking-tight leading-none uppercase">
                            achieve your Life Goals?
                        </h1>
                    </motion.div>
                </header>

                {/* Main Visuals Area - Scaled down for PC/Tablet */}
                <div className="relative w-full flex-1 flex items-center justify-center min-h-[300px] sm:min-h-[350px] my-4 overflow-visible">

                    {/* Gold Coins - Scaled down */}
                    <img
                        src="/assets/gold_coins-removebg-preview.png"
                        alt="Gold Coins"
                        className="absolute bottom-4 -left-6 w-32 sm:w-32 md:w-40 z-0 opacity-100 drop-shadow-xl"
                    />
                    <img
                        src="/assets/gold_coins-removebg-preview.png"
                        alt="Gold Coins"
                        className="absolute bottom-4 -right-6 w-32 sm:w-32 md:w-40 z-0 opacity-100 transform scale-x-[-1] drop-shadow-xl"
                    />

                    {/* Central Clipboard - Optimized size */}
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2, type: "spring" }}
                        className="relative z-10 w-full max-w-[240px] sm:max-w-[260px] md:max-w-[290px] bg-white shadow-[0_15px_40px_rgba(0,0,0,0.6)] flex flex-col items-center border-[4px] sm:border-[6px] border-[#34495E] overflow-hidden shrink-0 transform -translate-y-4"
                    >
                        {/* Clip Element */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 sm:w-16 h-4 sm:h-5 bg-[#E5533D] shadow-lg flex items-center justify-center border-b-2 sm:border-b-4 border-[#C0392B] z-30">
                            <div className="w-2 sm:w-3 h-2 sm:h-3 bg-white border-2 border-[#C0392B] shadow-inner"></div>
                        </div>

                        <div className="pt-5 sm:pt-7 pb-4 sm:pb-6 px-3 sm:px-5 w-full bg-gradient-to-b from-white to-slate-100">
                            <h2 className="text-[#E67E22] text-[9px] sm:text-[11px] md:text-sm font-black uppercase text-center mb-2 sm:mb-3 tracking-tighter">
                                MISSION: <span className="text-[#D35400]">LIFE GOALS DONE</span>
                            </h2>

                            <ul className="grid grid-cols-1 gap-1 sm:gap-1.5 px-4">
                                {lifeGoals.map((goal) => (
                                    <li key={goal.id} className="flex items-center gap-1.5 sm:gap-2 text-[8px] sm:text-[10px] md:text-xs font-black text-[#2C3E50] border-b border-[#0066B2]/5 pb-0.5">
                                        <span className="text-[#0066B2]">•</span>
                                        <span className="truncate">{goal.name}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>

                    {/* Characters - Scaled down for safe fit */}
                    <motion.img
                        initial={{ x: -100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.3, type: "spring", damping: 15 }}
                        src="/assets/character_woman-removebg-preview.png"
                        alt="Professional Woman"
                        className="absolute bottom-0 -left-12 sm:-left-20 md:-left-24 h-[230px] sm:h-[240px] md:h-[280px] lg:h-[320px] object-contain z-20 drop-shadow-xl"
                    />

                    <motion.img
                        initial={{ x: 100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.3, type: "spring", damping: 15 }}
                        src="/assets/character_man-removebg-preview.png"
                        alt="Professional Man"
                        className="absolute bottom-0 -right-12 sm:-right-20 md:-right-24 h-[240px] sm:h-[250px] md:h-[290px] lg:h-[330px] object-contain z-20 drop-shadow-xl"
                    />
                </div>

                {/* Footer Section - Better margins */}
                <div className="w-full relative z-40 flex flex-col items-center gap-3 shrink-0 py-2">
                    <h3 className="text-white text-base sm:text-lg md:text-xl font-black drop-shadow-xl text-center leading-tight">
                        Measure your Life Goals preparedness
                    </h3>

                    <button
                        onClick={handleStartClick}
                        className="btn-primary-3d w-full max-w-[260px] sm:max-w-[340px] !py-3 sm:!py-5 !text-lg sm:!text-xl mt-1"
                    >
                        START
                    </button>
                    <p className="text-blue-200 font-bold uppercase tracking-[0.3em] mt-1 text-[8px] sm:text-[10px]">Ready for a mission?</p>
                </div>
            </div>

            {/* Name Input Popup */}
            <AnimatePresence>
                {showNamePopup && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md"
                        onClick={() => setShowNamePopup(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative bg-white shadow-2xl w-full max-w-[340px] p-6 border-[4px] sm:border-[6px] border-[#0066B2]"
                        >
                            <button
                                onClick={() => setShowNamePopup(false)}
                                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>

                            <div className="text-center mb-6">
                                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#0066B2] flex items-center justify-center mx-auto mb-4 shadow-xl border-4 border-white">
                                    <span className="text-3xl sm:text-4xl">👋</span>
                                </div>
                                <h2 className="text-[#0066B2] text-xl sm:text-2xl font-black mb-1">Welcome!</h2>
                                <p className="text-slate-500 font-bold text-sm sm:text-base">What should we call you?</p>
                            </div>

                            <form onSubmit={handleNameSubmit} className="space-y-4">
                                <div className="space-y-1.5">
                                    <label className="block text-slate-700 text-[10px] sm:text-xs font-black uppercase tracking-widest ml-1" htmlFor="userName">
                                        Your Name
                                    </label>
                                    <input
                                        id="userName"
                                        type="text"
                                        value={userName}
                                        onChange={(e) => {
                                            setUserName(e.target.value);
                                            setError('');
                                        }}
                                        placeholder="Full Name"
                                        className="w-full px-4 py-3 sm:py-4 border-4 border-slate-100 focus:border-[#0066B2] focus:outline-none focus:ring-4 focus:ring-[#0066B2]/10 text-slate-800 font-bold text-base sm:text-lg transition-all"
                                        autoFocus
                                    />
                                    {error && (
                                        <p className="text-red-500 text-[10px] font-black uppercase tracking-wider ml-1">{error}</p>
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    className="btn-primary-3d w-full !py-3 sm:!py-4"
                                >
                                    Let's Go!
                                </button>
                            </form>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default WelcomeScreen;
