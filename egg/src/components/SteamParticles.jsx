import { motion } from 'framer-motion';

const SteamParticles = ({ isRunning }) => {
  if (!isRunning) return null;

  return (
    <div className="steam-container">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="steam-particle"
          initial={{ opacity: 0, y: 0, scale: 0.5 }}
          animate={{
            opacity: [0, 0.4, 0],
            y: -150,
            x: Math.sin(i) * 30,
            scale: [0.5, 1.5, 2],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            delay: i * 0.4,
            ease: "easeOut"
          }}
        />
      ))}
      <style jsx>{`
        .steam-container {
          position: absolute;
          bottom: 40%;
          left: 50%;
          transform: translateX(-50%);
          pointer-events: none;
          z-index: 10;
        }
        .steam-particle {
          position: absolute;
          width: 40px;
          height: 40px;
          background: radial-gradient(circle, rgba(255,255,255,0.4) 0%, transparent 70%);
          border-radius: 50%;
          filter: blur(10px);
        }
      `}</style>
    </div>
  );
};

export default SteamParticles;
