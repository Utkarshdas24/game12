import { motion } from 'framer-motion';
import { Phone } from "lucide-react";
import Confetti from './Confetti';
import RotatingText from './RotatingText';
import Speedometer from './Speedometer';

const FinalThankYouScreen = ({ userName = "User", score, onRestart }) => {
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

export default FinalThankYouScreen;
