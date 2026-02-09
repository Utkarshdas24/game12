import { useState, useRef, useEffect, useCallback } from 'react';
import { useSound } from './useSound';

export const SCREENS = {
    WELCOME: 'welcome',
    GOAL_SELECTION: 'goal_selection',
    COUNTDOWN: 'countdown',
    ASSESSMENT: 'assessment',
    SCORE_RESULTS: 'score_results',
    THANK_YOU: 'thank_you'
};

export const useGameState = () => {
    const [currentScreen, setCurrentScreen] = useState(SCREENS.WELCOME);
    const [selectedGoals, setSelectedGoals] = useState([]);
    const [currentGoalIndex, setCurrentGoalIndex] = useState(0);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [responses, setResponses] = useState([]);
    const [score, setScore] = useState(0);
    const [showSuccessToast, setShowSuccessToast] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [leadName, setLeadName] = useState('');
    const [lives, setLives] = useState(3);
    const [isGameOver, setIsGameOver] = useState(false);

    const { playSound } = useSound();

    const gameTimerRef = useRef(null);

    const handleEndOfGame = useCallback(() => {
        setCurrentScreen(SCREENS.SCORE_RESULTS);
        if (gameTimerRef.current) {
            clearTimeout(gameTimerRef.current);
        }
    }, []);

    const startGameTimer = useCallback(() => {
        if (gameTimerRef.current) clearTimeout(gameTimerRef.current);
        // 5 minutes timer
        gameTimerRef.current = setTimeout(() => {
            handleEndOfGame();
        }, 300000);
    }, [handleEndOfGame]);

    const stopGameTimer = useCallback(() => {
        if (gameTimerRef.current) clearTimeout(gameTimerRef.current);
    }, []);

    useEffect(() => {
        return () => stopGameTimer();
    }, [stopGameTimer]);

    const startGame = useCallback((userName = '') => {
        if (userName) {
            setLeadName(userName);
        }
        setCurrentScreen(SCREENS.GOAL_SELECTION);
        setSelectedGoals([]);
        setCurrentGoalIndex(0);
        setCurrentQuestionIndex(0);
        setResponses([]);
        setScore(0);
    }, []);

    const handleGoalsSelected = useCallback((goals) => {
        setSelectedGoals(goals);
        setCurrentGoalIndex(0);
        setCurrentQuestionIndex(0);
        setCurrentScreen(SCREENS.COUNTDOWN);
    }, []);

    const handleCountdownComplete = useCallback(() => {
        setCurrentScreen(SCREENS.ASSESSMENT);
        startGameTimer();
    }, [startGameTimer]);

    const advanceGame = useCallback((isCorrect, currentGoal, totalGoals) => {
        const pointsPerQuestion = 100 / (totalGoals * 3);

        if (isCorrect) {
            setScore(prev => prev + pointsPerQuestion);
            playSound('correct');
        } else {
            playSound('incorrect');
        }

        setResponses(prev => [...prev, {
            goalId: currentGoal.id,
            goalName: currentGoal.name,
            questionIndex: currentQuestionIndex,
            answer: isCorrect
        }]);

        if (currentQuestionIndex < 2) {
            setCurrentQuestionIndex(prev => prev + 1);
        } else if (currentGoalIndex < totalGoals - 1) {
            setCurrentGoalIndex(prev => prev + 1);
            setCurrentQuestionIndex(0);
        } else {
            stopGameTimer();
            handleEndOfGame();
        }
    }, [currentQuestionIndex, currentGoalIndex, playSound, handleEndOfGame, stopGameTimer]);

    const handleCallNow = () => window.location.href = 'tel:+911800209999';

    const handleBookSlot = (bookingData) => {
        if (bookingData && bookingData.name) {
            setLeadName(bookingData.name);
        }
        setCurrentScreen(SCREENS.THANK_YOU);
    };

    const handleTalkToExpert = () => {
        // Since lead form is now part of Results screen, we just stay here or move to thank you after submit
        // Keeping as NO-OP or just providing it if needed for UI triggers
    };

    const handleRestart = () => {
        setCurrentScreen(SCREENS.WELCOME);
        setSelectedGoals([]);
        setCurrentGoalIndex(0);
        setCurrentQuestionIndex(0);
        setResponses([]);
        setScore(0);
        setLives(3);
        setIsGameOver(false);
        setLeadName('');
        stopGameTimer();
    };

    return {
        currentScreen,
        selectedGoals,
        currentGoalIndex,
        currentQuestionIndex,
        score,
        leadName,
        lives,
        isGameOver,
        showSuccessToast,
        successMessage,
        setShowSuccessToast,
        startGame,
        handleGoalsSelected,
        handleCountdownComplete,

        advanceGame,
        handleCallNow,
        handleBookSlot,
        handleTalkToExpert,
        handleRestart
    };
};
