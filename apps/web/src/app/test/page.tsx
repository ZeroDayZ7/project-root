'use client'
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Login3DSystem = () => {
  const [currentView, setCurrentView] = useState('login'); // 'login', 'register', 'forgot', 'dashboard'
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phone: '',
    company: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const [focusedField, setFocusedField] = useState('');
  const [notification, setNotification] = useState({ show: false, message: '', type: 'success' });

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) / 20;
        const y = (e.clientY - rect.top - rect.height / 2) / 20;
        setMousePosition({ x, y });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email jest wymagany';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Nieprawidłowy format email';
    }
    
    if (!formData.password) {
      newErrors.password = 'Hasło jest wymagane';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Hasło musi mieć co najmniej 8 znaków';
    }
    
    if (currentView === 'register') {
      if (!formData.firstName) newErrors.firstName = 'Imię jest wymagane';
      if (!formData.lastName) newErrors.lastName = 'Nazwisko jest wymagane';
      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Potwierdzenie hasła jest wymagane';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Hasła nie są zgodne';
      }
      if (!agreedToTerms) {
        newErrors.terms = 'Musisz zaakceptować regulamin';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    // Symulacja API call
    setTimeout(() => {
      setIsLoading(false);
      
      if (currentView === 'login') {
        setIsLoggedIn(true);
        setCurrentView('dashboard');
        showNotification('Zalogowano pomyślnie!', 'success');
      } else if (currentView === 'register') {
        setCurrentView('login');
        showNotification('Konto zostało utworzone! Możesz się teraz zalogować.', 'success');
      } else if (currentView === 'forgot') {
        setCurrentView('login');
        showNotification('Link do resetowania hasła został wysłany na email.', 'success');
      }
    }, 2000);
  };

  const showNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: '', type: 'success' });
    }, 4000);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentView('login');
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      phone: '',
      company: ''
    });
    showNotification('Wylogowano pomyślnie!', 'success');
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      rotateY: -90,
      scale: 0.8,
      z: -100
    },
    visible: { 
      opacity: 1, 
      rotateY: 0,
      scale: 1,
      z: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
        staggerChildren: 0.1
      }
    },
    exit: { 
      opacity: 0, 
      rotateY: 90,
      scale: 0.8,
      z: -100,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const fieldVariants = {
    hidden: { opacity: 0, y: 30, rotateX: -45 },
    visible: { 
      opacity: 1, 
      y: 0, 
      rotateX: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const buttonVariants = {
    idle: { scale: 1 },
    hover: { 
      scale: 1.05,
      rotateX: 5,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    },
    tap: { 
      scale: 0.95,
      rotateX: -5
    }
  };

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      rotateZ: [-2, 2, -2],
      transition: {
        duration: 4,
        ease: "easeInOut",
        repeat: Infinity
      }
    }
  };

  const InputField = ({ 
    type, 
    placeholder, 
    value, 
    onChange, 
    error, 
    icon, 
    showPasswordToggle, 
    onTogglePassword,
    showPassword 
  }) => (
    <motion.div 
      variants={fieldVariants}
      className="relative mb-6"
      onFocus={() => setFocusedField(placeholder)}
      onBlur={() => setFocusedField('')}
    >
      <motion.div
        className="relative"
        whileHover={{ rotateX: 2, scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-xl opacity-70">
          {icon}
        </div>
        <motion.input
          type={showPasswordToggle ? (showPassword ? 'text' : 'password') : type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full pl-12 pr-12 py-4 bg-background border-2 rounded-xl focus:outline-none focus:ring-4 focus:ring-opacity-20 transition-all duration-300 ${
            error 
              ? 'border-red-400 focus:border-red-500 focus:ring-red-500' 
              : focusedField === placeholder
                ? 'border-blue-400 focus:border-blue-500 focus:ring-blue-500 shadow-lg'
                : 'border-gray-300 hover:border-gray-400'
          }`}
          whileFocus={{ 
            scale: 1.02,
            rotateX: 1,
            transition: { duration: 0.2 }
          }}
        />
        {showPasswordToggle && (
          <button
            type="button"
            onClick={onTogglePassword}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-xl opacity-70 hover:opacity-100 transition-opacity"
          >
            {showPassword ? '🙈' : '👁️'}
          </button>
        )}
      </motion.div>
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10, rotateX: -90 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            exit={{ opacity: 0, y: -10, rotateX: -90 }}
            className="absolute left-0 top-full mt-1 text-red-500 text-sm"
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );

  const ActionButton = ({ children, type = "button", variant = "primary", onClick, disabled }) => (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      variants={buttonVariants}
      initial="idle"
      whileHover={!disabled ? "hover" : "idle"}
      whileTap={!disabled ? "tap" : "idle"}
      className={`relative w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 overflow-hidden ${
        variant === 'primary'
          ? `bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg hover:shadow-xl ${
              disabled ? 'opacity-50 cursor-not-allowed' : 'hover:from-blue-700 hover:to-purple-700'
            }`
          : variant === 'secondary'
          ? 'bg-background border-2 border-gray-300 hover:border-gray-400 hover:bg-gray-50'
          : 'bg-transparent hover:bg-gray-100'
      }`}
      style={{
        transform: `perspective(1000px) rotateX(${mousePosition.y * 0.1}deg) rotateY(${mousePosition.x * 0.1}deg)`
      }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0"
        whileHover={{ opacity: 1, x: ['-100%', '100%'] }}
        transition={{ duration: 0.6 }}
      />
      <span className="relative z-10">{children}</span>
    </motion.button>
  );

  const Checkbox = ({ checked, onChange, label, error }) => (
    <motion.div 
      className="flex items-start space-x-3 mb-4"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div 
        className="relative mt-1"
        whileTap={{ scale: 0.9 }}
      >
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only"
        />
        <motion.div
          className={`w-5 h-5 rounded border-2 cursor-pointer flex items-center justify-center ${
            checked 
              ? 'bg-blue-600 border-blue-600' 
              : error 
                ? 'border-red-400' 
                : 'border-gray-300 hover:border-gray-400'
          }`}
          onClick={() => onChange(!checked)}
          whileHover={{ scale: 1.1, rotateZ: 5 }}
          whileTap={{ scale: 0.9 }}
        >
          <AnimatePresence>
            {checked && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                className="text-white text-xs"
              >
                ✓
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
      <div className="flex-1">
        <label className="text-sm cursor-pointer" onClick={() => onChange(!checked)}>
          {label}
        </label>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-500 text-xs mt-1"
          >
            {error}
          </motion.div>
        )}
      </div>
    </motion.div>
  );

  if (currentView === 'dashboard') {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        {/* Navigation */}
        <motion.nav 
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-background shadow-lg border-b"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center space-x-8">
                <motion.div 
                  className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                  whileHover={{ scale: 1.05 }}
                >
                  Dashboard 3D
                </motion.div>
                <div className="hidden md:flex space-x-6">
                  <motion.a href="#" className="hover:text-blue-600 transition-colors" whileHover={{ y: -2 }}>Strona główna</motion.a>
                  <motion.a href="#" className="hover:text-blue-600 transition-colors" whileHover={{ y: -2 }}>Projekty</motion.a>
                  <motion.a href="#" className="hover:text-blue-600 transition-colors" whileHover={{ y: -2 }}>Zespół</motion.a>
                  <motion.a href="#" className="hover:text-blue-600 transition-colors" whileHover={{ y: -2 }}>Ustawienia</motion.a>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <motion.button 
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  whileHover={{ scale: 1.1, rotateZ: 15 }}
                  whileTap={{ scale: 0.9 }}
                >
                  🔔
                </motion.button>
                <motion.div 
                  className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold cursor-pointer"
                  whileHover={{ scale: 1.1, rotateY: 180 }}
                  transition={{ duration: 0.3 }}
                >
                  U
                </motion.div>
                <ActionButton onClick={handleLogout} variant="secondary">
                  Wyloguj
                </ActionButton>
              </div>
            </div>
          </div>
        </motion.nav>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-8"
            >
              <h1 className="text-4xl font-bold mb-2">Witaj w Dashboard!</h1>
              <p className="text-lg opacity-70">Zarządzaj swoimi projektami i zespołem w jednym miejscu.</p>
            </motion.div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[
                { title: 'Projekty', value: '24', icon: '📊', color: 'from-blue-500 to-blue-600' },
                { title: 'Zespół', value: '12', icon: '👥', color: 'from-green-500 to-green-600' },
                { title: 'Zadania', value: '156', icon: '✅', color: 'from-yellow-500 to-yellow-600' },
                { title: 'Przychód', value: '$12.5k', icon: '💰', color: 'from-purple-500 to-purple-600' }
              ].map((stat, index) => (
                <motion.div
                  key={stat.title}
                  initial={{ opacity: 0, y: 30, rotateY: -90 }}
                  animate={{ opacity: 1, y: 0, rotateY: 0 }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
                  whileHover={{ 
                    scale: 1.05, 
                    rotateX: 5,
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                  }}
                  className={`bg-gradient-to-r ${stat.color} rounded-xl p-6 text-white shadow-lg cursor-pointer`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white/80 text-sm font-medium">{stat.title}</p>
                      <p className="text-3xl font-bold mt-1">{stat.value}</p>
                    </div>
                    <motion.div 
                      className="text-4xl"
                      whileHover={{ scale: 1.2, rotateZ: 15 }}
                    >
                      {stat.icon}
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-background rounded-xl shadow-lg p-6 border"
              >
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <span className="mr-2">📈</span>
                  Ostatnia aktywność
                </h3>
                <div className="space-y-4">
                  {[
                    { action: 'Nowy projekt utworzony', time: '2 godz. temu', user: 'Jan Kowalski' },
                    { action: 'Zadanie ukończone', time: '4 godz. temu', user: 'Anna Nowak' },
                    { action: 'Nowy członek zespołu', time: '1 dzień temu', user: 'Piotr Wiśniewski' },
                    { action: 'Raport wygenerowany', time: '2 dni temu', user: 'Marta Krawczyk' }
                  ].map((activity, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 + index * 0.1 }}
                      whileHover={{ x: 5, backgroundColor: 'rgba(59, 130, 246, 0.05)' }}
                      className="flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 cursor-pointer"
                    >
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="font-medium">{activity.action}</p>
                        <p className="text-sm opacity-60">{activity.user} • {activity.time}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
                className="bg-background rounded-xl shadow-lg p-6 border"
              >
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <span className="mr-2">🎯</span>
                  Nadchodzące zadania
                </h3>
                <div className="space-y-4">
                  {[
                    { task: 'Spotkanie z klientem', deadline: 'Jutro, 14:00', priority: 'high' },
                    { task: 'Przegląd kodu', deadline: 'Za 2 dni', priority: 'medium' },
                    { task: 'Prezentacja projektu', deadline: 'Za 3 dni', priority: 'high' },
                    { task: 'Aktualizacja dokumentacji', deadline: 'Za tydzień', priority: 'low' }
                  ].map((task, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.9 + index * 0.1 }}
                      whileHover={{ scale: 1.02, rotateX: 2 }}
                      className="flex items-center justify-between p-3 rounded-lg border hover:shadow-md transition-all duration-200 cursor-pointer"
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${
                          task.priority === 'high' ? 'bg-red-500' :
                          task.priority === 'medium' ? 'bg-yellow-500' :
                          'bg-green-500'
                        }`}></div>
                        <div>
                          <p className="font-medium">{task.task}</p>
                          <p className="text-sm opacity-60">{task.deadline}</p>
                        </div>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1, rotateZ: 90 }}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        ⋯
                      </motion.button>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden"
      style={{ perspective: '1000px' }}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            variants={floatingVariants}
            animate="animate"
            transition={{ delay: i * 0.1 }}
          />
        ))}
      </div>

      {/* Notification */}
      <AnimatePresence>
        {notification.show && (
          <motion.div
            initial={{ opacity: 0, y: -50, rotateX: -90 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            exit={{ opacity: 0, y: -50, rotateX: -90 }}
            className={`fixed top-4 right-4 px-6 py-4 rounded-xl shadow-lg z-50 ${
              notification.type === 'success' 
                ? 'bg-green-500 text-white' 
                : 'bg-red-500 text-white'
            }`}
          >
            <div className="flex items-center space-x-2">
              <span>{notification.type === 'success' ? '✅' : '❌'}</span>
              <span>{notification.message}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Card */}
      <motion.div
        className="w-full max-w-md"
        style={{
          transform: `perspective(1000px) rotateX(${mousePosition.y * 0.05}deg) rotateY(${mousePosition.x * 0.05}deg)`
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="bg-background rounded-2xl shadow-2xl p-8 border backdrop-blur-sm"
            style={{
              transformStyle: 'preserve-3d',
            }}
          >
            {/* Header */}
            <motion.div 
              className="text-center mb-8"
              variants={fieldVariants}
            >
              <motion.div
                className="text-6xl mb-4"
                whileHover={{ scale: 1.2, rotateZ: 10 }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
              >
                {currentView === 'login' ? '🔐' : 
                 currentView === 'register' ? '👤' : '🔑'}
              </motion.div>
              <h2 className="text-3xl font-bold mb-2">
                {currentView === 'login' ? 'Logowanie' : 
                 currentView === 'register' ? 'Rejestracja' : 'Reset hasła'}
              </h2>
              <p className="opacity-70">
                {currentView === 'login' ? 'Witaj ponownie! Zaloguj się do swojego konta.' : 
                 currentView === 'register' ? 'Utwórz nowe konto i dołącz do nas.' : 
                 'Wpisz swój email, aby zresetować hasło.'}
              </p>
            </motion.div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <InputField
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(value) => handleInputChange('email', value)}
                error={errors.email}
                icon="📧"
              />

              {/* Register Fields */}
              {currentView === 'register' && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <InputField
                      type="text"
                      placeholder="Imię"
                      value={formData.firstName}
                      onChange={(value) => handleInputChange('firstName', value)}
                      error={errors.firstName}
                      icon="👤"
                    />
                    <InputField
                      type="text"
                      placeholder="Nazwisko"
                      value={formData.lastName}
                      onChange={(value) => handleInputChange('lastName', value)}
                      error={errors.lastName}
                      icon="👤"
                    />
                  </div>
                  
                  <InputField
                    type="tel"
                    placeholder="Telefon (opcjonalnie)"
                    value={formData.phone}
                    onChange={(value) => handleInputChange('phone', value)}
                    icon="📱"
                  />
                  
                  <InputField
                    type="text"
                    placeholder="Firma (opcjonalnie)"
                    value={formData.company}
                    onChange={(value) => handleInputChange('company', value)}
                    icon="🏢"
                  />
                </>
              )}

              {/* Password Fields */}
              {currentView !== 'forgot' && (
                <>
                  <InputField
                    type="password"
                    placeholder="Hasło"
                    value={formData.password}
                    onChange={(value) => handleInputChange('password', value)}
                    error={errors.password}
                    icon="🔒"
                    showPasswordToggle={true}
                    showPassword={showPassword}
                    onTogglePassword={() => setShowPassword(!showPassword)}
                  />

                  {currentView === 'register' && (
                    <InputField
                      type="password"
                      placeholder="Potwierdź hasło"
                      value={formData.confirmPassword}
                      onChange={(value) => handleInputChange('confirmPassword', value)}
                      error={errors.confirmPassword}
                      icon="🔒"
                      showPasswordToggle={true}
                      showPassword={showConfirmPassword}
                      onTogglePassword={() => setShowConfirmPassword(!showConfirmPassword)}
                    />
                  )}
                </>
              )}

              {/* Remember Me / Terms */}
              {currentView === 'login' && (
                <div className="flex items-center justify-between">
                  <Checkbox
                    checked={rememberMe}
                    onChange={setRememberMe}
                    label="Zapamiętaj mnie"
                  />
                  <motion.button
                    type="button"
                    onClick={() => setCurrentView('forgot')}
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
                    whileHover={{ scale: 1.05, x: 5 }}
                  >
                    Zapomniałeś hasła?
                  </motion.button>
                </div>
              )}

              {currentView === 'register' && (
                <Checkbox
                  checked={agreedToTerms}
                  onChange={setAgreedToTerms}
                  label={
                    <span>
                      Akceptuję{' '}
                      <button type="button" className="text-blue-600 hover:text-blue-800 underline">
                        Regulamin
                      </button>
                      {' '}i{' '}
                      <button type="button" className="text-blue-600 hover:text-blue-800 underline">
                        Politykę Prywatności
                      </button>
                    </span>
                  }
                  error={errors.terms}
                />
              )}

              {/* Submit Button */}
              <motion.div variants={fieldVariants}>
                <ActionButton 
                  type="submit" 
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <motion.div 
                      className="flex items-center justify-center space-x-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <motion.div
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                      <span>Przetwarzanie...</span>
                    </motion.div>
                  ) : (
                    <>
                      {currentView === 'login' && '🚀 Zaloguj się'}
                      {currentView === 'register' && '✨ Utwórz konto'}
                      {currentView === 'forgot' && '📧 Wyślij link'}
                    </>
                  )}
                </ActionButton>
              </motion.div>
            </form>

            {/* Footer Links */}
            <motion.div 
              className="mt-8 text-center"
              variants={fieldVariants}
            >
              {currentView === 'login' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-center space-x-4">
                    <div className="h-px bg-gray-300 flex-1"></div>
                    <span className="text-gray-500 text-sm">lub</span>
                    <div className="h-px bg-gray-300 flex-1"></div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { icon: '🔍', name: 'Google', color: 'hover:bg-red-50' },
                      { icon: '📘', name: 'Facebook', color: 'hover:bg-blue-50' },
                      { icon: '🐦', name: 'Twitter', color: 'hover:bg-blue-50' }
                    ].map((social) => (
                      <motion.button
                        key={social.name}
                        type="button"
                        className={`p-3 border border-gray-300 rounded-xl transition-colors ${social.color}`}
                        whileHover={{ scale: 1.05, rotateY: 10 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span className="text-xl">{social.icon}</span>
                      </motion.button>
                    ))}
                  </div>
                  
                  <p className="text-sm">
                    Nie masz konta?{' '}
                    <motion.button
                      type="button"
                      onClick={() => setCurrentView('register')}
                      className="text-blue-600 hover:text-blue-800 font-medium underline"
                      whileHover={{ scale: 1.05 }}
                    >
                      Zarejestruj się
                    </motion.button>
                  </p>
                </div>
              )}

              {currentView === 'register' && (
                <p className="text-sm">
                  Masz już konto?{' '}
                  <motion.button
                    type="button"
                    onClick={() => setCurrentView('login')}
                    className="text-blue-600 hover:text-blue-800 font-medium underline"
                    whileHover={{ scale: 1.05 }}
                  >
                    Zaloguj się
                  </motion.button>
                </p>
              )}

              {currentView === 'forgot' && (
                <p className="text-sm">
                  Pamiętasz hasło?{' '}
                  <motion.button
                    type="button"
                    onClick={() => setCurrentView('login')}
                    className="text-blue-600 hover:text-blue-800 font-medium underline"
                    whileHover={{ scale: 1.05 }}
                  >
                    Wróć do logowania
                  </motion.button>
                </p>
              )}
            </motion.div>

            {/* Additional Features */}
            {currentView === 'login' && (
              <motion.div 
                className="mt-6 pt-6 border-t border-gray-200"
                variants={fieldVariants}
              >
                <div className="grid grid-cols-2 gap-4 text-center">
                  <motion.div 
                    className="p-4 rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 cursor-pointer"
                    whileHover={{ scale: 1.02, rotateX: 5 }}
                  >
                    <div className="text-2xl mb-2">🔐</div>
                    <div className="text-sm font-medium">Bezpieczne</div>
                    <div className="text-xs opacity-70">256-bit SSL</div>
                  </motion.div>
                  <motion.div 
                    className="p-4 rounded-xl bg-gradient-to-br from-green-50 to-blue-50 cursor-pointer"
                    whileHover={{ scale: 1.02, rotateX: 5 }}
                  >
                    <div className="text-2xl mb-2">⚡</div>
                    <div className="text-sm font-medium">Szybkie</div>
                    <div className="text-xs opacity-70"> 2s ładowania</div>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {/* Demo Credentials */}
            {currentView === 'login' && (
              <motion.div 
                className="mt-4 p-4 bg-yellow-50 rounded-xl border border-yellow-200"
                variants={fieldVariants}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
              >
                <div className="text-center">
                  <div className="text-sm font-medium text-yellow-800 mb-2">🧪 Demo Credentials</div>
                  <div className="text-xs text-yellow-700 space-y-1">
                    <div>Email: demo@example.com</div>
                    <div>Hasło: demo123456</div>
                  </div>
                  <motion.button
                    type="button"
                    onClick={() => {
                      setFormData({
                        ...formData,
                        email: 'demo@example.com',
                        password: 'demo123456'
                      });
                    }}
                    className="mt-2 text-xs text-blue-600 hover:text-blue-800 underline"
                    whileHover={{ scale: 1.05 }}
                  >
                    Użyj danych demo
                  </motion.button>
                </div>
              </motion.div>
            )}

            {/* Password Strength Indicator */}
            {(currentView === 'register' || currentView === 'login') && formData.password && (
              <motion.div 
                className="mt-4"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
              >
                <div className="text-sm font-medium mb-2">Siła hasła:</div>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4].map((level) => {
                    const passwordStrength = formData.password.length >= 12 ? 4 :
                                           formData.password.length >= 8 ? 3 :
                                           formData.password.length >= 6 ? 2 :
                                           formData.password.length >= 4 ? 1 : 0;
                    return (
                      <motion.div
                        key={level}
                        className={`h-2 flex-1 rounded-full ${
                          level <= passwordStrength 
                            ? passwordStrength === 1 ? 'bg-red-400' :
                              passwordStrength === 2 ? 'bg-yellow-400' :
                              passwordStrength === 3 ? 'bg-blue-400' :
                              'bg-green-400'
                            : 'bg-gray-200'
                        }`}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: level <= passwordStrength ? 1 : 0 }}
                        transition={{ delay: level * 0.1 }}
                      />
                    );
                  })}
                </div>
                <div className="text-xs mt-1 opacity-70">
                  {formData.password.length >= 12 ? 'Bardzo silne' :
                   formData.password.length >= 8 ? 'Silne' :
                   formData.password.length >= 6 ? 'Średnie' :
                   formData.password.length >= 4 ? 'Słabe' : 'Bardzo słabe'}
                </div>
              </motion.div>
            )}

            {/* Registration Progress */}
            {currentView === 'register' && (
              <motion.div 
                className="mt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <div className="text-sm font-medium mb-2">Postęp rejestracji:</div>
                <div className="flex items-center space-x-2">
                  {[
                    { step: 'Email', completed: !!formData.email && !errors.email },
                    { step: 'Dane', completed: !!formData.firstName && !!formData.lastName },
                    { step: 'Hasło', completed: !!formData.password && !!formData.confirmPassword && formData.password === formData.confirmPassword },
                    { step: 'Regulamin', completed: agreedToTerms }
                  ].map((item, index) => (
                    <motion.div 
                      key={item.step}
                      className="flex items-center space-x-1"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                    >
                      <motion.div
                        className={`w-3 h-3 rounded-full border-2 flex items-center justify-center ${
                          item.completed 
                            ? 'bg-green-500 border-green-500' 
                            : 'border-gray-300'
                        }`}
                        whileHover={{ scale: 1.2 }}
                      >
                        {item.completed && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="text-white text-xs"
                          >
                            ✓
                          </motion.div>
                        )}
                      </motion.div>
                      <span className={`text-xs ${item.completed ? 'text-green-600 font-medium' : 'opacity-70'}`}>
                        {item.step}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Language Selector */}
            <motion.div 
              className="absolute top-4 right-4"
              whileHover={{ scale: 1.1 }}
            >
              <motion.select
                className="bg-transparent text-sm border border-gray-300 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                whileFocus={{ scale: 1.05 }}
              >
                <option value="pl">🇵🇱 PL</option>
                <option value="en">🇺🇸 EN</option>
                <option value="de">🇩🇪 DE</option>
              </motion.select>
            </motion.div>

            {/* Theme Toggle */}
            <motion.button
              className="absolute top-4 left-4 p-2 rounded-lg hover:bg-gray-100 transition-colors"
              whileHover={{ scale: 1.1, rotateY: 180 }}
              whileTap={{ scale: 0.9 }}
            >
              🌙
            </motion.button>

            {/* Loading Overlay */}
            <AnimatePresence>
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-2xl flex items-center justify-center z-10"
                >
                  <motion.div className="text-center">
                    <motion.div
                      className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full mx-auto mb-4"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    <motion.p
                      className="text-gray-600 font-medium"
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      {currentView === 'login' ? 'Logowanie...' :
                       currentView === 'register' ? 'Tworzenie konta...' :
                       'Wysyłanie emaila...'}
                    </motion.p>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Footer */}
      <motion.div 
        className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
      >
        <div className="flex items-center justify-center space-x-6 text-sm opacity-70">
          <motion.a href="#" className="hover:opacity-100 transition-opacity" whileHover={{ y: -2 }}>
            Pomoc
          </motion.a>
          <motion.a href="#" className="hover:opacity-100 transition-opacity" whileHover={{ y: -2 }}>
            Prywatność
          </motion.a>
          <motion.a href="#" className="hover:opacity-100 transition-opacity" whileHover={{ y: -2 }}>
            Regulamin
          </motion.a>
        </div>
        <motion.p 
          className="text-xs opacity-50 mt-2"
          whileHover={{ opacity: 70 }}
        >
          © 2025 3D Login System. Wszystkie prawa zastrzeżone.
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Login3DSystem;