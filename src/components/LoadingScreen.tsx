import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

export const LoadingScreen = ({ onLoadingComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => onLoadingComplete(), 500);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(timer);
  }, [onLoadingComplete]);

  return (
    <div className="fixed inset-0 bg-futuristic-bg flex items-center justify-center">
      <div className="text-center">
        {/* Glowing F Logo */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative mb-8"
        >
          <motion.div
            animate={{ 
              boxShadow: [
                "0 0 20px hsl(180 100% 50% / 0.4)",
                "0 0 40px hsl(180 100% 50% / 0.8)",
                "0 0 20px hsl(180 100% 50% / 0.4)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-32 h-32 mx-auto bg-futuristic-surface rounded-2xl flex items-center justify-center border border-futuristic-primary/30"
          >
            <span className="text-6xl font-bold text-futuristic-glow">F</span>
          </motion.div>
        </motion.div>

        {/* Company Name */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-3xl font-bold text-white mb-2"
        >
          Fruppe's Org
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="text-muted-foreground mb-8"
        >
          Advanced Business Management System
        </motion.p>

        {/* Progress Bar */}
        <div className="w-64 mx-auto">
          <div className="h-2 bg-futuristic-surface rounded-full overflow-hidden border border-futuristic-primary/20">
            <motion.div
              className="h-full bg-gradient-to-r from-futuristic-primary to-futuristic-secondary"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
          <p className="text-futuristic-glow text-sm mt-2">{progress}%</p>
        </div>

        {/* Loading Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="text-sm text-muted-foreground mt-4"
        >
          Initializing systems...
        </motion.p>
      </div>
    </div>
  );
};