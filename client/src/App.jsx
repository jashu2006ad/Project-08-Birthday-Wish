import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import WelcomeScreen from './pages/WelcomeScreen';
import NotNowScreen from './pages/NotNowScreen';
import QuestionForm from './pages/QuestionForm';
import BirthdayCelebration from './pages/BirthdayCelebration';
import PhotoGallery from './pages/PhotoGallery';
import LoveMessages from './pages/LoveMessages';
import BirthdayCake from './pages/BirthdayCake';
import FinalMessage from './pages/FinalMessage';
import MusicPlayer from './components/MusicPlayer';

const SCREENS = {
  WELCOME: 'welcome',
  NOT_NOW: 'not_now',
  QUESTIONS: 'questions',
  CELEBRATION: 'celebration',
  GALLERY: 'gallery',
  MESSAGES: 'messages',
  CAKE: 'cake',
  FINALE: 'finale',
};

const pageTransition = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.5 },
};

export default function App() {
  const [screen, setScreen] = useState(SCREENS.WELCOME);
  const [musicVisible, setMusicVisible] = useState(false);

  function go(target) {
    setScreen(target);
    if (target === SCREENS.CELEBRATION) setMusicVisible(true);
  }

  function handleReplay() {
    setScreen(SCREENS.WELCOME);
    setMusicVisible(false);
  }

  return (
    <>
      <AnimatePresence mode="wait">
        {screen === SCREENS.WELCOME && (
          <motion.div key="welcome" {...pageTransition}>
            <WelcomeScreen
              onAgree={() => go(SCREENS.QUESTIONS)}
              onDecline={() => go(SCREENS.NOT_NOW)}
            />
          </motion.div>
        )}

        {screen === SCREENS.NOT_NOW && (
          <motion.div key="not-now" {...pageTransition}>
            <NotNowScreen onReturn={() => go(SCREENS.WELCOME)} />
          </motion.div>
        )}

        {screen === SCREENS.QUESTIONS && (
          <motion.div key="questions" {...pageTransition}>
            <QuestionForm onSuccess={() => go(SCREENS.CELEBRATION)} />
          </motion.div>
        )}

        {screen === SCREENS.CELEBRATION && (
          <motion.div key="celebration" {...pageTransition}>
            <BirthdayCelebration onContinue={() => go(SCREENS.GALLERY)} />
          </motion.div>
        )}

        {screen === SCREENS.GALLERY && (
          <motion.div key="gallery" {...pageTransition}>
            <PhotoGallery onContinue={() => go(SCREENS.MESSAGES)} />
          </motion.div>
        )}

        {screen === SCREENS.MESSAGES && (
          <motion.div key="messages" {...pageTransition}>
            <LoveMessages onContinue={() => go(SCREENS.CAKE)} />
          </motion.div>
        )}

        {screen === SCREENS.CAKE && (
          <motion.div key="cake" {...pageTransition}>
            <BirthdayCake onContinue={() => go(SCREENS.FINALE)} />
          </motion.div>
        )}

        {screen === SCREENS.FINALE && (
          <motion.div key="finale" {...pageTransition}>
            <FinalMessage onReplay={handleReplay} />
          </motion.div>
        )}
      </AnimatePresence>

      {musicVisible && <MusicPlayer />}
    </>
  );
}
