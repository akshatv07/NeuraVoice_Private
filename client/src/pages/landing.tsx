import { motion } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLocation } from "wouter";
import { useState, useRef, useEffect } from "react";

export default function Landing() {
  const { isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Initialize audio element with correct path
    audioRef.current = new Audio('/voice-samples/Conversation_for_Homepage.pdf.mp3');
    
    // Enable preloading
    audioRef.current.preload = 'auto';
    
    // Handle audio metadata loading
    const handleLoadedMetadata = () => {
      console.log('Audio metadata loaded, duration:', audioRef.current?.duration);
    };
    
    // Handle audio errors
    const handleError = (e: Event) => {
      console.error('Audio error:', e);
      setIsPlaying(false);
    };
    
    audioRef.current.addEventListener('loadedmetadata', handleLoadedMetadata);
    audioRef.current.addEventListener('error', handleError);
    
    // Cleanup on unmount
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.removeEventListener('loadedmetadata', handleLoadedMetadata);
        audioRef.current.removeEventListener('error', handleError);
        audioRef.current = null;
      }
    };
  }, []);

  const handleAudioPlay = async () => {
    if (!audioRef.current) {
      console.error('Audio element not initialized');
      return;
    }
    
    try {
      if (isPlaying) {
        // Stop and reset audio
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        setIsPlaying(false);
      } else {
        // Play audio
        await audioRef.current.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error('Audio playback error:', error);
      // Try to load the audio again if it fails
      try {
        audioRef.current.load();
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (retryError) {
        console.error('Failed to retry audio playback:', retryError);
        setIsPlaying(false);
      }
    }
  };
  
  // Handle audio ended event
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    
    const handleEnded = () => setIsPlaying(false);
    audio.addEventListener('ended', handleEnded);
    
    return () => {
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  const handleLogin = () => {
    window.location.href = "/api/login";
  };

  const handleDashboard = () => {
    setLocation("/dashboard");
  };

  const handleAssemble = () => {
    setLocation("/assembly");
  };

  const handleTalkToLenden = () => {
    // Redirect to LiveKit demo
    window.location.href = "https://interoperable-module-1cwqi3.sandbox.livekit.io/";
  };

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-dark-navy text-white">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-dark-navy/80 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <nav className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
                <i className="fas fa-brain text-white"></i>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                NeuraVoice
              </span>
            </div>

            {/* Center Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <button 
                onClick={() => scrollToSection('use-cases')} 
                className="text-gray-300 hover:text-white transition-colors duration-300"
              >
                Workflow
              </button>
              <button 
                onClick={() => scrollToSection('features')} 
                className="text-gray-300 hover:text-white transition-colors duration-300"
              >
                Features
              </button>
              <button 
                onClick={() => scrollToSection('integrations')} 
                className="text-gray-300 hover:text-white transition-colors duration-300"
              >
                Integrations
              </button>
              <button 
                onClick={() => scrollToSection('about')} 
                className="text-gray-300 hover:text-white transition-colors duration-300"
              >
                About
              </button>
            </div>

            {/* Right CTA */}
            <Button
              onClick={isAuthenticated ? handleDashboard : handleLogin}
              className="bg-gradient-to-r from-primary to-secondary hover:from-primary/80 hover:to-secondary/80 text-white font-medium transition-all duration-300 transform hover:scale-105"
            >
              {isAuthenticated ? 'Design Studio' : 'Sign In'}
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-dark-navy via-midnight to-primary/20"></div>
        <div className="absolute inset-0">
          <motion.div 
            className="absolute top-1/3 left-1/6 w-72 h-72 bg-primary rounded-full filter blur-3xl opacity-30"
            animate={{
              y: [0, -20, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div 
            className="absolute bottom-1/3 right-1/6 w-96 h-96 bg-accent rounded-full filter blur-3xl opacity-20"
            animate={{
              y: [0, 20, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: -2
            }}
          />
        </div>

        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="bg-gradient-to-r from-white via-gray-200 to-primary bg-clip-text text-transparent">
              State-of-the-Art AI
            </span>
            <br />
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Voice Intelligence Platform
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Create Human-like, intelligent voice agents without code. Deploy conversational AI that sounds natural and drives results.
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row gap-6 justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Button
              onClick={() => {
                window.location.href = "/dashboard";
              }}
              className="bg-gradient-to-r from-primary to-secondary hover:from-primary/80 hover:to-secondary/80 text-white font-semibold px-8 py-4 text-lg rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-primary/25"
              size="lg"
            >
              <i className="fas fa-cogs mr-2"></i>
              Assemble
            </Button>
            <Button
              onClick={handleTalkToLenden}
              variant="outline"
              className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 text-white font-semibold px-8 py-4 text-lg rounded-xl transition-all duration-300 transform hover:scale-105"
              size="lg"
            >
              <i className="fas fa-microphone mr-2"></i>
              Talk to LenDen
            </Button>
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="use-cases" className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-midnight/50 to-transparent"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              How Does It Work?
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Transform your business with AI-powered voice agents in 5 simple steps
            </p>
          </motion.div>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
              {[
                {
                  step: "01",
                  title: "Upload Knowledge Base",
                  description: "Upload your website URL, and business data to train the Agent",
                  icon: "fas fa-cloud-upload-alt",
                  gradient: "from-primary to-secondary"
                },
                {
                  step: "02",
                  title: "Choose Voice",
                  description: "Select from Human-like AI voices to represent your brand",
                  icon: "fas fa-microphone",
                  gradient: "from-secondary to-accent"
                },
                {
                  step: "03",
                  title: "Assign a Goal",
                  description: "Define your AI agent's purpose and objectives",
                  icon: "fas fa-bullseye",
                  gradient: "from-primary to-secondary"
                },
                {
                  step: "04",
                  title: "Test the Bot",
                  description: "Test and refine responses before going live",
                  icon: "fas fa-play-circle",
                  gradient: "from-secondary to-accent"
                },
                {
                  step: "05",
                  title: "Go Live",
                  description: "Deploy instantly across platforms",
                  icon: "fas fa-rocket",
                  gradient: "from-primary to-secondary"
                }
              ].map((step, index) => (
                <motion.div
                  key={index}
                  className="group text-center"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-500 transform hover:scale-105 h-full p-6">
                    <div className={`w-16 h-16 bg-gradient-to-r ${step.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-all duration-300`}>
                      <div className={`w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center text-white font-bold text-sm`}>
                        {step.step}
                      </div>
                    </div>
                    <motion.div
                      className={`w-12 h-12 bg-gradient-to-r ${step.gradient} rounded-xl flex items-center justify-center mx-auto mb-4`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <i className={`${step.icon} text-xl text-white`}></i>
                    </motion.div>
                    <h3 className="text-lg font-semibold mb-3 text-white">{step.title}</h3>
                    <p className="text-gray-300 text-sm leading-relaxed">{step.description}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Everything you need to build, deploy, and scale intelligent voice agents
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: "fas fa-brain",
                title: "Agentic Intelligence Systems",
                description: "Optimized agentic frameworks deliver ultra-low latency responses while maintaining natural conversation flow and context",
                gradient: "from-primary to-secondary"
              },
              {
                icon: "fas fa-microphone",
                title: "Humanized Voices",
                description: "Choose from hundreds of realistic AI voices or clone your own with just a few samples",
                gradient: "from-secondary to-accent"
              },
              {
                icon: "fas fa-globe",
                title: "Multi-Language Support",
                description: "Support for 5+ languages.",
                gradient: "from-accent to-coral",
                comingSoon: true
              },
              {
                icon: "fas fa-bolt",
                title: "Near Real-Time Processing",
                description: "Ultra-low latency for seamless, natural conversations",
                gradient: "from-coral to-primary"
              },
              {
                icon: "fas fa-shield-alt",
                title: "Enterprise Security",
                description: "Bank-grade encryption and compliance with SOC2, HIPAA",
                gradient: "from-primary to-accent",
                comingSoon: true
              },
              {
                icon: "fas fa-chart-line",
                title: "Overview",
                description: "Insights into conversation performance and user behavior",
                gradient: "from-accent to-secondary"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-500 transform hover:scale-105 h-full">
                  <CardContent className="p-6 relative">
                    {feature.comingSoon && (
                      <span className="absolute top-3 right-3 text-xs bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded-full">
                        Coming Soon
                      </span>
                    )}
                    <div className={`w-12 h-12 bg-gradient-to-r ${feature.gradient} rounded-lg flex items-center justify-center mb-4 group-hover:shadow-lg transition-all duration-300`}>
                      <i className={`${feature.icon} text-xl text-white`}></i>
                    </div>
                    <h3 className="text-lg font-semibold mb-3 text-white">{feature.title}</h3>
                    <p className="text-gray-300 text-sm">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Integrations Section */}
      <section id="integrations" className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/5 to-transparent"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex flex-col items-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Seamless Integrations
              </h2>
              <span className="text-sm bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full mb-2">
                Coming Soon
              </span>
            </div>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Connect with your existing tools and platforms in minutes
            </p>
          </motion.div>

          <div className="text-center max-w-4xl mx-auto">
            {/* Main Integration Text */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-8">
                Integrate with more than{" "}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  20+ platforms
                </span>{" "}
                in a snap.
              </h3>
            </motion.div>
            
            {/* Moving Platform Icons */}
            <div className="space-y-6 overflow-hidden mb-12">
              {/* Top Row - Moving Right to Left */}
              <motion.div 
                className="flex gap-4 whitespace-nowrap"
                animate={{ x: [0, -2000] }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              >
                {Array(3).fill(null).map((_, repeatIndex) => (
                  [
                    { icon: "fab fa-whatsapp", color: "text-green-400" },
                    { icon: "fab fa-instagram", color: "text-pink-400" },
                    { icon: "fab fa-facebook-messenger", color: "text-blue-400" },
                    { icon: "fas fa-chart-line", color: "text-orange-400" },
                    { icon: "fab fa-slack", color: "text-purple-400" },
                    { icon: "fab fa-discord", color: "text-indigo-400" },
                    { icon: "fab fa-microsoft", color: "text-blue-300" },
                    { icon: "fab fa-google", color: "text-red-300" },
                    { icon: "fab fa-facebook", color: "text-blue-500" },
                    { icon: "fab fa-salesforce", color: "text-blue-600" }
                  ].map((platform, index) => (
                    <div key={`${repeatIndex}-${index}`} className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <i className={`${platform.icon} text-lg ${platform.color}`}></i>
                    </div>
                  ))
                ))}
              </motion.div>
              
              {/* Bottom Row - Moving Left to Right */}
              <motion.div 
                className="flex gap-4 whitespace-nowrap"
                animate={{ x: [-2000, 0] }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              >
                {Array(3).fill(null).map((_, repeatIndex) => (
                  [
                    { icon: "fas fa-building", color: "text-red-400" },
                    { icon: "fas fa-headset", color: "text-green-500" },
                    { icon: "fab fa-telegram", color: "text-cyan-400" },
                    { icon: "fas fa-funnel-dollar", color: "text-purple-500" },
                    { icon: "fas fa-ticket-alt", color: "text-teal-400" },
                    { icon: "fas fa-phone", color: "text-primary" },
                    { icon: "fas fa-envelope", color: "text-secondary" },
                    { icon: "fab fa-hubspot", color: "text-orange-500" },
                    { icon: "fas fa-users", color: "text-cyan-300" },
                    { icon: "fas fa-cog", color: "text-gray-400" }
                  ].map((platform, index) => (
                    <div key={`${repeatIndex}-${index}`} className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <i className={`${platform.icon} text-lg ${platform.color}`}></i>
                    </div>
                  ))
                ))}
              </motion.div>
            </div>
          </div>


        </div>
      </section>

      {/* About Section */}
      <section id="about" className={`py-24 relative transition-all duration-1000 ${isPlaying ? 'bg-gradient-to-br from-primary/5 via-midnight/70 to-accent/5' : ''}`}>
        <div className={`absolute inset-0 transition-all duration-1000 ${isPlaying ? 'opacity-100' : 'opacity-0'}`}>
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-midnight/10 to-accent/5"></div>
        </div>
        <div className={`absolute inset-0 transition-all duration-1000 ${isPlaying ? 'opacity-0' : 'opacity-100 bg-gradient-to-r from-dark-navy/90 to-midnight/90'}`}></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto">
            <motion.div 
              className="text-center mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                About NeuraVoice
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className={`bg-white/5 backdrop-blur-lg transition-all duration-500 ${isPlaying ? 'border-primary/30' : 'border-white/10'} shadow-xl`}>
                <CardContent className="p-8 md:p-12">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                      <p className="text-lg text-gray-200 leading-relaxed">
                        <span className="text-accent font-semibold">NeuraVoice</span> is a plug-and-play, no-code voice AI platform designed to help anyone build humanized, intelligent voice agents — without writing a single line of code.
                      </p>
                      <p className="text-lg text-gray-200 leading-relaxed">
                        Built with cutting-edge large language models and real-time infrastructure, NeuraVoice enables dynamic, multi-turn conversations that sound natural, human, and brand-consistent.
                      </p>
                      <p className="text-lg text-gray-200 leading-relaxed">
                        Whether you're educating users in regional languages or driving conversions through personalized interactions, NeuraVoice makes it <span className="text-primary font-semibold">simple, scalable, and seamless</span>.
                      </p>

                      <div className="grid grid-cols-2 gap-6 mt-8">
                        <div className="text-center">
                          <div className="text-3xl font-bold text-accent mb-2">Fast</div>
                          <div className="text-sm text-gray-300">Deployment</div>
                        </div>
                        <div className="text-center">
                          <div className="text-3xl font-bold text-primary mb-2">0</div>
                          <div className="text-sm text-gray-300">Lines of Code</div>
                        </div>
                      </div>
                    </div>
                    <div className="relative">
                      <div 
                        className={`w-full h-80 bg-gradient-to-br from-dark-navy/90 to-midnight/90 rounded-2xl flex items-center justify-center border-2 ${isPlaying ? 'border-primary/50 shadow-2xl shadow-primary/30' : 'border-white/10 hover:border-primary/50'} transition-all duration-500 cursor-pointer overflow-hidden backdrop-blur-sm`}
                        onClick={handleAudioPlay}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => e.key === 'Enter' && handleAudioPlay()}
                      >
                        <div className="relative z-10 text-center p-8">
                          <div className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-6 transition-all duration-300 ${isPlaying ? 'bg-primary/20 scale-110' : 'bg-primary/10'}`}>
                            {isPlaying ? (
                              <div className="flex items-end h-12 gap-1">
                                {[1, 2, 3, 2, 1].map((height, i) => (
                                  <motion.div
                                    key={i}
                                    className="w-2 bg-primary rounded-full"
                                    animate={isPlaying ? {
                                      height: `${Math.random() * 40 + 10}px`,
                                      opacity: 0.7 + Math.random() * 0.3
                                    } : { height: '10px' }}
                                    transition={{
                                      duration: 0.5,
                                      repeat: Infinity,
                                      repeatType: 'reverse'
                                    }}
                                    style={{ height: '10px' }}
                                  />
                                ))}
                              </div>
                            ) : (
                              <i className="fas fa-play text-3xl text-primary"></i>
                            )}
                          </div>
                          <p className={`text-lg font-medium transition-all duration-300 ${isPlaying ? 'text-white bg-primary/10 px-4 py-2 rounded-lg border border-primary/30' : 'text-gray-300'}`}>
                            {isPlaying ? 'Listening... Click to stop' : 'Play Voice Sample'}
                          </p>
                          {isPlaying && (
                            <p className="text-sm text-gray-400 mt-2"></p>
                          )}
                        </div>
                        {/* Background removed as per request */}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About LenDenClub Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Powered by LenDenClub</h3>
            <div className="space-y-4 text-gray-300 text-sm leading-relaxed">
              <p>
                LenDenClub is India's No.1 Peer-to-Peer (P2P) Lending platform which is RBI registered NBFC - P2P. 
                We connect savvy lenders with creditworthy borrowers seeking short-term personal loans, delivering high 
                returns while diversifying your portfolio.
              </p>
              <p>
                Trusted by over 2 Crore users, LenDenClub stands as a one-stop solution for those looking to explore 
                new avenues of growth.
              </p>
              <p className="text-amber-400/90 italic">
                Please note, P2P investments carry risks. Investment decisions made by lenders based on this information 
                are at their discretion, and LenDenClub does not guarantee loan recovery from borrowers.
              </p>
              <div className="pt-2">
                <a 
                  href="http://www.lendenclub.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 transition-colors inline-flex items-center"
                >
                  <span>Visit Website</span>
                  <i className="fas fa-external-link-alt ml-2 text-xs"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-midnight/80 backdrop-blur-sm border-t border-white/10 py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-3 mb-6 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
                <i className="fas fa-brain text-white"></i>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                NeuraVoice
              </span>
            </div>

            <div className="flex items-center gap-6">
              <motion.a 
                href="#" 
                className="w-10 h-10 bg-white/10 hover:bg-blue-500/20 rounded-lg flex items-center justify-center transition-all duration-300"
                whileHover={{ scale: 1.1 }}
                title="Join our LinkedIn community"
              >
                <i className="fab fa-linkedin text-blue-400"></i>
              </motion.a>
              <motion.a 
                href="#" 
                className="w-10 h-10 bg-white/10 hover:bg-indigo-500/20 rounded-lg flex items-center justify-center transition-all duration-300"
                whileHover={{ scale: 1.1 }}
                title="Join our Discord community"
              >
                <i className="fab fa-discord text-indigo-400"></i>
              </motion.a>
              <motion.a 
                href="#" 
                className="w-10 h-10 bg-white/10 hover:bg-purple-500/20 rounded-lg flex items-center justify-center transition-all duration-300"
                whileHover={{ scale: 1.1 }}
                title="Join our Slack community"
              >
                <i className="fab fa-slack text-purple-400"></i>
              </motion.a>
              <motion.a 
                href="#" 
                className="w-10 h-10 bg-white/10 hover:bg-accent/20 rounded-lg flex items-center justify-center transition-all duration-300"
                whileHover={{ scale: 1.1 }}
                title="Visit our website"
              >
                <i className="fas fa-globe text-accent"></i>
              </motion.a>
            </div>
          </div>

          <div className="border-t border-white/10 mt-8 pt-8 text-center">
            <p className="text-gray-400 text-sm">© 2025 NeuraVoice. All rights reserved. Building the future of conversational AI.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
