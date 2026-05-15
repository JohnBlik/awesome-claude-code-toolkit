import { AnimatePresence, motion } from 'framer-motion';

interface Props {
  visible: boolean;
}

export function LoadingScreen({ visible }: Props) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          role="status"
          aria-live="polite"
          aria-label="Loading Aurora"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: 'easeInOut' } }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0b0b15]"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="relative h-24 w-24"
          >
            <motion.span
              className="absolute inset-0 rounded-full bg-gradient-to-tr from-brand-500 via-glow-violet to-glow-pink blur-xl"
              animate={{ scale: [1, 1.25, 1], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.svg
              viewBox="0 0 100 100"
              className="relative h-24 w-24"
              animate={{ rotate: 360 }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'linear' }}
            >
              <defs>
                <linearGradient id="loaderG" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#818cf8" />
                  <stop offset="50%" stopColor="#c084fc" />
                  <stop offset="100%" stopColor="#f472b6" />
                </linearGradient>
              </defs>
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="url(#loaderG)"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray="160 100"
              />
            </motion.svg>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-8 text-sm uppercase tracking-[0.4em] text-white/60"
          >
            Loading the experience
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
