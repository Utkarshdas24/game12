import { motion } from 'framer-motion';
import { Phone } from "lucide-react";
import Confetti from './Confetti';
import RotatingText from './RotatingText';
import Speedometer from './Speedometer';

const ThankYouScreen = ({ userName = "User", score, onRestart }) => {
    return (
        <div className="ghibli-card">
            <Confetti />

            {/* Background Pattern */}
            <div className="bg-burst"></div>

            {/* Content Layer - Responsive padding */}
            <div className="ghibli-content justify-between sm:justify-center py-4 sm:py-8">

                {/* Simple Thank You Message - Centered */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className="flex flex-col items-center justify-center my-8 sm:my-12 flex-1"
                >
                    <motion.h1
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 300, damping: 15 }}
                        className="text-5xl sm:text-6xl md:text-7xl font-black text-white italic tracking-tighter drop-shadow-[0_5px_5px_rgba(0,0,0,0.5)] mb-4"
                    >
                        THANK YOU!
                    </motion.h1>

                    {/* Name - Big, No Background */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-2xl sm:text-3xl md:text-4xl font-black text-blue-200 tracking-wide mb-2 text-center shadow-black drop-shadow-md"
                    >
                        {userName}
                    </motion.div>

                    {/* Recorded Message - Small */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="text-sm sm:text-base text-blue-100/80 font-bold uppercase tracking-widest text-center"
                    >
                        Your details have been recorded.
                    </motion.p>
                </motion.div>

                {/* White Details Card - Premium appearance */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="bg-white p-5 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-4 border-white/50 mb-4 w-full max-w-md mx-auto"
                >
                    {/* Expert Contact Section */}
                    <div className="flex items-center gap-4 sm:gap-6 mb-4 sm:mb-6 pb-4 sm:pb-6 border-b-2 border-slate-50">
                        <div className="bg-[#0066B2] p-3 sm:p-4 shadow-lg shrink-0">
                            <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                        </div>
                        <div>
                            <h3 className="text-[#0066B2] font-black text-[10px] sm:text-xs uppercase tracking-widest mb-1">
                                Expert Incoming
                            </h3>
                            <p className="text-slate-600 text-[11px] sm:text-sm font-bold leading-snug">
                                Experts will reach out to you within 24 hours.
                            </p>
                        </div>
                    </div>

                    {/* Banner Section */}
                    <div className="flex flex-col items-center justify-center py-2 sm:py-4">
                        <div className="w-fit max-w-full px-1">
                            <RotatingText
                                texts={[
                                    "10x Your Life Goals",
                                    "Secure Family Future",
                                    "Invest Smart, Live Better",
                                    "Plan Ahead, Live Free",
                                    "Wealth is a Journey"
                                ]}
                                mainClassName="px-3 sm:px-6 py-2 sm:py-3 bg-[#0066B2] text-white shadow-lg overflow-hidden relative font-black text-[10px] sm:text-lg md:text-xl uppercase tracking-tight sm:tracking-widest whitespace-nowrap min-w-0"
                                staggerFrom={"last"}
                                initial={{ y: "100%" }}
                                animate={{ y: 0 }}
                                exit={{ y: "-120%" }}
                                staggerDuration={0.02}
                                splitLevelClassName="overflow-hidden flex flex-nowrap justify-center gap-x-1 sm:gap-x-2"
                                transition={{ type: "spring", damping: 30, stiffness: 400 }}
                                rotationInterval={3000}
                            />
                        </div>
                    </div>
                </motion.div>

                {/* Footer Actions */}
                <div className="shrink-0 space-y-3 pb-4">
                    <button
                        onClick={onRestart}
                        className="group relative w-full bg-[#FF8C00] hover:bg-[#FF7000] text-white font-black text-base sm:text-lg py-4 sm:py-6 shadow-[0_6px_0_#993D00] active:translate-y-1 active:shadow-none transition-all uppercase tracking-widest border-2 border-white/20 flex items-center justify-center gap-3"
                    >
                        <span>Start New Quest</span>
                    </button>

                    <p className="text-center text-blue-100/60 font-black uppercase tracking-widest text-[8px] sm:text-[10px]">
                        Try different life goals?
                    </p>
                </div>

            </div>
        </div>
    );
};

export default ThankYouScreen;
