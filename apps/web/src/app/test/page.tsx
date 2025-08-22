'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CyberpunkCircularMenu = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [glitchActive, setGlitchActive] = useState(false);

  // Menu items configuration
  const menuItems = [
    {
      id: 1,
      title: 'NEURAL NET',
      icon: '⚡',
      description: 'Access Neural Network',
      color: 'from-cyan-500 to-blue-600',
      shadowColor: 'shadow-cyan-500/50',
      glowColor: 'shadow-cyan-400/80',
    },
    {
      id: 2,
      title: 'CYBER CORE',
      icon: '🔧',
      description: 'System Configuration',
      color: 'from-purple-500 to-pink-600',
      shadowColor: 'shadow-purple-500/50',
      glowColor: 'shadow-purple-400/80',
    },
    {
      id: 3,
      title: 'DATA STREAM',
      icon: '📡',
      description: 'Information Flow',
      color: 'from-green-500 to-emerald-600',
      shadowColor: 'shadow-green-500/50',
      glowColor: 'shadow-green-400/80',
    },
    {
      id: 4,
      title: 'FIREWALL',
      icon: '🛡️',
      description: 'Security Protocols',
      color: 'from-red-500 to-orange-600',
      shadowColor: 'shadow-red-500/50',
      glowColor: 'shadow-red-400/80',
    },
    {
      id: 5,
      title: 'QUANTUM',
      icon: '⚛️',
      description: 'Quantum Computing',
      color: 'from-yellow-500 to-amber-600',
      shadowColor: 'shadow-yellow-500/50',
      glowColor: 'shadow-yellow-400/80',
    },
    {
      id: 6,
      title: 'MATRIX',
      icon: '🌐',
      description: 'Virtual Reality',
      color: 'from-indigo-500 to-violet-600',
      shadowColor: 'shadow-indigo-500/50',
      glowColor: 'shadow-indigo-400/80',
    },
  ];

  // Calculate positions for 6 segments
  const getSegmentPath = (index) => {
    const angle = (360 / 6) * index;
    const startAngle = angle - 30;
    const endAngle = angle + 30;

    const radius = 120;
    const innerRadius = 60;

    const startAngleRad = (startAngle * Math.PI) / 180;
    const endAngleRad = (endAngle * Math.PI) / 180;

    const x1 = Math.cos(startAngleRad) * innerRadius;
    const y1 = Math.sin(startAngleRad) * innerRadius;
    const x2 = Math.cos(startAngleRad) * radius;
    const y2 = Math.sin(startAngleRad) * radius;

    const x3 = Math.cos(endAngleRad) * radius;
    const y3 = Math.sin(endAngleRad) * radius;
    const x4 = Math.cos(endAngleRad) * innerRadius;
    const y4 = Math.sin(endAngleRad) * innerRadius;

    return `M ${x1} ${y1} L ${x2} ${y2} A ${radius} ${radius} 0 0 1 ${x3} ${y3} L ${x4} ${y4} A ${innerRadius} ${innerRadius} 0 0 0 ${x1} ${y1}`;
  };

  const getTextPosition = (index) => {
    const angle = (360 / 6) * index;
    const radius = 90;
    const angleRad = (angle * Math.PI) / 180;

    return {
      x: Math.cos(angleRad) * radius,
      y: Math.sin(angleRad) * radius,
    };
  };

  // Glitch effect
  useEffect(() => {
    const interval = setInterval(
      () => {
        setGlitchActive(true);
        setTimeout(() => setGlitchActive(false), 150);
      },
      3000 + Math.random() * 2000,
    );

    return () => clearInterval(interval);
  }, []);

  const centerButtonVariants = {
    idle: {
      scale: 1,
      rotate: 0,
      boxShadow: '0 0 20px rgba(0, 255, 255, 0.3)',
    },
    hover: {
      scale: 1.5,
      rotate: 180,
      boxShadow: '0 0 40px rgba(0, 255, 255, 0.8)',
      transition: { duration: 0.3 },
    },
    active: {
      scale: 0.95,
      boxShadow: '0 0 60px rgba(0, 255, 255, 1)',
    },
  };

  const segmentVariants = {
    idle: {
      scale: 1,
      opacity: 0.8,
      filter: 'brightness(1)',
    },
    hover: {
      scale: 1.15,
      opacity: 1,
      filter: 'brightness(1.3)',
      transition: { duration: 0.05 },
    },
  };

  const textVariants = {
    hidden: {
      opacity: 0,
      scale: 0.5,
      y: 20,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: 'backOut',
      },
    },
    exit: {
      opacity: 0,
      scale: 0.5,
      y: -20,
      transition: { duration: 0.2 },
    },
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-8">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>

        {/* Scanning Lines */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/10 to-transparent"
          animate={{
            y: ['-100%', '100%'],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'linear',
          }}
        />

        {/* Glitch Overlay */}
        <AnimatePresence>
          {glitchActive && (
            <motion.div
              className="absolute inset-0 bg-red-500/5"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.5, 0, 0.3, 0] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Main Menu Container */}
      <div className="relative">
        {/* Outer Ring Effects */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-cyan-400/30"
          animate={{
            rotate: [0, 360]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            width: "300px",
            height: "300px",
            left: "-30px",
            top: "-30px"
          }}
        />

        <motion.div
          className="absolute inset-0 rounded-full border border-purple-400/20"
          animate={{
            rotate: [360, 0]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            width: "320px",
            height: "320px",
            left: "-40px",
            top: "-40px"
          }}
        />

        {/* Main Menu SVG */}
        <svg width="240" height="240" viewBox="-120 -120 240 240" className="relative z-20 overflow-visible">
          {/* Background Circle */}
          <circle cx="0" cy="0" r="120" fill="none" stroke="url(#borderGradient)" strokeWidth="1" opacity="0.3" />

          <circle cx="0" cy="0" r="60" fill="none" stroke="url(#borderGradient)" strokeWidth="1" opacity="0.3" />

          {/* Gradient Definitions */}
          <defs>
            <linearGradient id="borderGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00ffff" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#ff00ff" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#ffff00" stopOpacity="0.6" />
            </linearGradient>

            {menuItems.map((item, index) => (
              <linearGradient key={`gradient-${index}`} id={`gradient-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={item.color.split(' ')[0].replace('from-', '')} />
                <stop offset="100%" stopColor={item.color.split(' ')[1].replace('to-', '')} />
              </linearGradient>
            ))}
          </defs>

          {/* Menu Segments */}
          {menuItems.map((item, index) => {
            if (hoveredIndex === index) return null; // Pomiń aktywny segment
            const textPos = getTextPosition(index);

            return (
              <g key={item.id}>
                <motion.path
                  d={getSegmentPath(index)}
                  fill={`url(#gradient-${index})`}
                  stroke="rgba(15, 160, 204, 0.24)"
                  strokeWidth="1"
                  variants={segmentVariants}
                  initial="idle"
                  animate="idle"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="cursor-pointer transition-all duration-100"
                />

                <text x={textPos.x} y={textPos.y} textAnchor="middle" dominantBaseline="middle" className="text-xl pointer-events-none select-none" fill="white" opacity={0.8}>
                  {item.icon}
                </text>
              </g>
            );
          })}

          {/* Renderuj aktywny segment na końcu (będzie na wierzchu) */}
          {hoveredIndex !== null && (
            <g key={`active-${menuItems[hoveredIndex].id}`}>
              <motion.path
                d={getSegmentPath(hoveredIndex)}
                fill={`url(#gradient-${hoveredIndex})`}
                stroke="rgba(29, 172, 216, 0.61)"
                strokeWidth="1"
                variants={segmentVariants}
                initial="idle"
                animate="hover"
                onMouseEnter={() => setHoveredIndex(hoveredIndex)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{
                  filter: `drop-shadow(0 0 2px ${
                    menuItems[hoveredIndex].color.includes('cyan')
                      ? '#00ffff'
                      : menuItems[hoveredIndex].color.includes('purple')
                        ? '#ff00ff'
                        : menuItems[hoveredIndex].color.includes('green')
                          ? '#00ff00'
                          : menuItems[hoveredIndex].color.includes('red')
                            ? '#ff0000'
                            : menuItems[hoveredIndex].color.includes('yellow')
                              ? '#ffff00'
                              : '#8888ff'
                  })`,
                }}
                className="cursor-pointer transition-all duration-100"
              />

              <text
                x={getTextPosition(hoveredIndex).x}
                y={getTextPosition(hoveredIndex).y}
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-xl pointer-events-none select-none"
                fill="white"
                opacity={1}
              >
                {menuItems[hoveredIndex].icon}
              </text>
            </g>
          )}
        </svg>

        {/* Center Button */}
        <motion.button
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 border-2 border-cyan-400/50 flex items-center justify-center z-20"
          variants={centerButtonVariants}
          initial="idle"
          whileHover="hover"
          whileTap="active"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <motion.div
            animate={{
              rotate: isMenuOpen ? 45 : 0,
            }}
            transition={{ duration: 0.3 }}
            className="text-white text-2xl font-bold"
          ></motion.div>
        </motion.button>

        {/* Floating Text Labels */}
        <AnimatePresence>
          {hoveredIndex !== null && (
            <motion.div
              key={`label-${hoveredIndex}`}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none z-30"
              variants={textVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="bg-black/80 backdrop-blur-sm border border-cyan-400/30 rounded-lg px-4 py-2 text-center">
                <div className="text-cyan-400 font-bold text-sm tracking-wider">{menuItems[hoveredIndex].title}</div>
                <div className="text-gray-300 text-xs mt-1">{menuItems[hoveredIndex].description}</div>
              </div>

              {/* Glowing Effect */}
              <div className="absolute inset-0 bg-cyan-400/20 rounded-lg blur-xl -z-50" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Status Indicators */}
        <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 flex space-x-4">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className={`w-2 h-2 rounded-full ${hoveredIndex === i ? 'bg-cyan-400' : 'bg-gray-600'}`}
              animate={{
                scale: hoveredIndex === i ? [1, 1.5, 1] : 1,
                opacity: hoveredIndex === i ? [0.5, 1, 0.5] : 0.5,
              }}
              transition={{
                duration: 1,
                repeat: hoveredIndex === i ? Infinity : 0,
              }}
            />
          ))}
        </div>

        {/* Corner Decorations */}
        <div className="absolute -top-6 -left-6 w-12 h-12 border-l-2 border-t-2 border-cyan-400/50" />
        <div className="absolute -top-6 -right-6 w-12 h-12 border-r-2 border-t-2 border-cyan-400/50" />
        <div className="absolute -bottom-6 -left-6 w-12 h-12 border-l-2 border-b-2 border-cyan-400/50" />
        <div className="absolute -bottom-6 -right-6 w-12 h-12 border-r-2 border-b-2 border-cyan-400/50" />

        {/* Data Stream Effect */}
        <motion.div
          className="absolute top-0 left-0 w-full h-full pointer-events-none"
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-cyan-400 rounded-full"
              style={{
                top: `${50 + Math.sin((i * 30 * Math.PI) / 180) * 45}%`,
                left: `${50 + Math.cos((i * 30 * Math.PI) / 180) * 45}%`,
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.1,
              }}
            />
          ))}
        </motion.div>
      </div>

      {/* HUD Elements */}
      <div className="fixed top-4 left-4 text-cyan-400 font-mono text-sm">
        <div className="backdrop-blur-sm border border-cyan-400/30 rounded px-3 py-2">
          <div>STATUS: ONLINE</div>
          <div>NEURAL: {hoveredIndex !== null ? 'ACTIVE' : 'IDLE'}</div>
          <div className="flex items-center">
            CONNECTION:
            <motion.div
              className="ml-2 w-2 h-2 bg-green-400 rounded-full"
              animate={{
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
              }}
            />
          </div>
        </div>
      </div>

      <div className="fixed top-4 right-4 text-cyan-400 font-mono text-sm">
        <div className="bg-black/50 backdrop-blur-sm border border-cyan-400/30 rounded px-3 py-2">
          <div>CYBER_MENU_V2.0</div>
          <div>SECTORS: 6/6</div>
          <div>MODE: {isMenuOpen ? 'EXPANDED' : 'COMPACT'}</div>
        </div>
      </div>

      {/* Glitch Text Effect */}
      <AnimatePresence>
        {glitchActive && (
          <motion.div
            className="fixed bottom-4 left-1/2 transform -translate-x-1/2 text-red-400 font-mono text-xs"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0, 1, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.15 }}
          >
            SYSTEM_GLITCH_DETECTED_0x{Math.random().toString(16).substr(2, 4).toUpperCase()}
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .bg-grid-pattern {
          background-image: linear-gradient(rgba(255, 1, 1, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px);
          background-size: 20px 20px;
        }
      `}</style>
    </div>
  );
};

export default CyberpunkCircularMenu;
