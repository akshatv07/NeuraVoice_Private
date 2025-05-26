import { motion } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLocation } from "wouter";

export default function Landing() {
  const { isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();

  const handleLogin = () => {
    window.location.href = "/api/login";
  };

  const handleDashboard = () => {
    setLocation("/dashboard");
  };

  const handleTalkToLenden = () => {
    // Placeholder for LiveKit integration
    alert("LiveKit integration would be implemented here for voice demo");
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
                onClick={() => scrollToSection('solutions')} 
                className="text-gray-300 hover:text-white transition-colors duration-300"
              >
                Solutions
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
              Voice Intelligence
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Create lifelike, intelligent voice agents without code. Deploy conversational AI that sounds natural and drives results.
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row gap-6 justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Button
              onClick={isAuthenticated ? handleDashboard : handleLogin}
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
      <section id="solutions" className="py-24 relative">
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

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: "fas fa-upload",
                title: "Upload Knowledge Base",
                description: "Upload your business documents, FAQs, or data to train the AI with your expertise",
                gradient: "from-primary to-secondary"
              },
              {
                icon: "fas fa-volume-up",
                title: "Choose Voice",
                description: "Select from a variety of lifelike AI voices to perfectly represent your brand",
                gradient: "from-secondary to-accent"
              },
              {
                icon: "fas fa-bullseye",
                title: "Assign a Goal",
                description: "Define your AI agent's purpose and objectives for targeted conversations",
                gradient: "from-accent to-coral"
              },
              {
                icon: "fas fa-play-circle",
                title: "Test the Bot",
                description: "Test and refine your voice agent's responses and behavior before going live",
                gradient: "from-coral to-primary"
              },
              {
                icon: "fas fa-rocket",
                title: "Go Live",
                description: "Integrate with WhatsApp, Instagram, CRM systems and deploy in just 5 minutes",
                gradient: "from-primary to-accent"
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                className="group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 transition-all duration-500 transform hover:scale-105 h-full">
                  <CardContent className="p-6 text-center">
                    <div className={`w-16 h-16 bg-gradient-to-r ${step.gradient} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg transition-all duration-300`}>
                      <i className={`${step.icon} text-2xl text-white`}></i>
                    </div>
                    <h3 className="text-lg font-semibold mb-3 text-white">{step.title}</h3>
                    <p className="text-gray-300 text-sm">{step.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Integration Icons */}
          <motion.div 
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="text-gray-300 mb-8">Seamlessly integrates with your favorite platforms</p>
            <div className="flex justify-center items-center gap-8 flex-wrap">
              {[
                { icon: "fab fa-whatsapp", color: "text-green-400" },
                { icon: "fab fa-instagram", color: "text-pink-400" },
                { icon: "fas fa-chart-line", color: "text-blue-400" },
                { icon: "fas fa-phone", color: "text-primary" }
              ].map((platform, index) => (
                <motion.div
                  key={index}
                  className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-all duration-300"
                  whileHover={{ scale: 1.1 }}
                >
                  <i className={`${platform.icon} text-2xl ${platform.color}`}></i>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-dark-navy/90 to-midnight/90"></div>
        
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
              <Card className="bg-white/5 backdrop-blur-lg border-white/10">
                <CardContent className="p-8 md:p-12">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                      <p className="text-lg text-gray-200 leading-relaxed">
                        <span className="text-accent font-semibold">NeuraVoice</span> is a plug-and-play, no-code voice AI platform designed to help anyone build lifelike, intelligent voice agents — without writing a single line of code.
                      </p>
                      <p className="text-lg text-gray-200 leading-relaxed">
                        Built with cutting-edge large language models and real-time infrastructure, NeuraVoice enables dynamic, multi-turn conversations that sound natural, human, and brand-consistent.
                      </p>
                      <p className="text-lg text-gray-200 leading-relaxed">
                        Whether you're educating users in regional languages or driving conversions through personalized interactions, NeuraVoice makes it <span className="text-primary font-semibold">simple, scalable, and seamless</span>.
                      </p>

                      <div className="grid grid-cols-2 gap-6 mt-8">
                        <div className="text-center">
                          <div className="text-3xl font-bold text-accent mb-2">5min</div>
                          <div className="text-sm text-gray-300">Deployment Time</div>
                        </div>
                        <div className="text-center">
                          <div className="text-3xl font-bold text-primary mb-2">0</div>
                          <div className="text-sm text-gray-300">Lines of Code</div>
                        </div>
                      </div>
                    </div>
                    <div className="relative">
                      <div className="w-full h-80 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl flex items-center justify-center border border-white/10">
                        <div className="text-center">
                          <i className="fas fa-microphone text-6xl text-primary mb-4"></i>
                          <p className="text-gray-300">Voice AI Interface</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
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
                className="w-10 h-10 bg-white/10 hover:bg-primary/20 rounded-lg flex items-center justify-center transition-all duration-300"
                whileHover={{ scale: 1.1 }}
              >
                <i className="fab fa-linkedin text-blue-400"></i>
              </motion.a>
              <motion.a 
                href="#" 
                className="w-10 h-10 bg-white/10 hover:bg-pink-500/20 rounded-lg flex items-center justify-center transition-all duration-300"
                whileHover={{ scale: 1.1 }}
              >
                <i className="fab fa-instagram text-pink-400"></i>
              </motion.a>
              <motion.a 
                href="#" 
                className="w-10 h-10 bg-white/10 hover:bg-accent/20 rounded-lg flex items-center justify-center transition-all duration-300"
                whileHover={{ scale: 1.1 }}
              >
                <i className="fas fa-globe text-accent"></i>
              </motion.a>
            </div>
          </div>

          <div className="border-t border-white/10 mt-8 pt-8 text-center">
            <p className="text-gray-400 text-sm">© 2024 NeuraVoice. All rights reserved. Building the future of conversational AI.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
