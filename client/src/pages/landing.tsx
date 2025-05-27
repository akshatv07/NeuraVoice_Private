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
                onClick={() => scrollToSection('use-cases')} 
                className="text-gray-300 hover:text-white transition-colors duration-300"
              >
                Use Cases
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
              Try in minutes. Deploy in days.
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Transform your business with AI-powered voice agents in 3 revolutionary steps
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {[
              {
                step: "01",
                title: "Choose your workflow",
                description: "Pick from 1000s of pre-made templates, or build one yourself",
                visual: "sound-wave",
                gradient: "from-primary to-secondary"
              },
              {
                step: "02", 
                title: "Plug it in",
                description: "Whether it's in your telephony, website, or in your app, we have it covered",
                visual: "network",
                gradient: "from-secondary to-accent"
              },
              {
                step: "03",
                title: "Done",
                description: "Handle millions of calls and watch how they perform",
                visual: "success",
                gradient: "from-accent to-coral"
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                className="mb-16 last:mb-0"
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                  <div className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                    <div className="flex items-center gap-4 mb-6">
                      <div className={`w-12 h-12 bg-gradient-to-r ${step.gradient} rounded-lg flex items-center justify-center text-white font-bold text-lg`}>
                        {step.step}
                      </div>
                      <div>
                        <h3 className="text-3xl font-bold text-white mb-2">{step.title}</h3>
                        <p className="text-lg text-gray-300">{step.description}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                    <Card className="bg-white/5 backdrop-blur-sm border-white/10 p-8 h-64 flex items-center justify-center">
                      <div className="text-center">
                        {step.visual === "sound-wave" && (
                          <motion.div 
                            className="flex justify-center items-end gap-1 h-24"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 1 }}
                          >
                            {Array.from({ length: 12 }).map((_, i) => (
                              <motion.div
                                key={i}
                                className={`w-3 bg-gradient-to-t ${step.gradient} rounded-full`}
                                style={{ height: `${20 + Math.sin(i * 0.5) * 30}px` }}
                                animate={{
                                  height: [
                                    `${20 + Math.sin(i * 0.5) * 30}px`,
                                    `${40 + Math.sin(i * 0.5 + Math.PI) * 30}px`,
                                    `${20 + Math.sin(i * 0.5) * 30}px`
                                  ]
                                }}
                                transition={{
                                  duration: 2,
                                  repeat: Infinity,
                                  delay: i * 0.1
                                }}
                              />
                            ))}
                          </motion.div>
                        )}
                        
                        {step.visual === "network" && (
                          <motion.div 
                            className="relative w-32 h-32 mx-auto"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 1 }}
                          >
                            <div className={`absolute inset-0 bg-gradient-to-r ${step.gradient} rounded-full opacity-20`}></div>
                            {Array.from({ length: 8 }).map((_, i) => (
                              <motion.div
                                key={i}
                                className={`absolute w-3 h-3 bg-gradient-to-r ${step.gradient} rounded-full`}
                                style={{
                                  top: `${50 + 40 * Math.sin(i * Math.PI / 4)}%`,
                                  left: `${50 + 40 * Math.cos(i * Math.PI / 4)}%`,
                                  transform: 'translate(-50%, -50%)'
                                }}
                                animate={{
                                  scale: [1, 1.5, 1],
                                  opacity: [0.6, 1, 0.6]
                                }}
                                transition={{
                                  duration: 2,
                                  repeat: Infinity,
                                  delay: i * 0.2
                                }}
                              />
                            ))}
                          </motion.div>
                        )}
                        
                        {step.visual === "success" && (
                          <motion.div 
                            className="relative"
                            initial={{ opacity: 0, scale: 0 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, type: "spring" }}
                          >
                            <div className={`w-24 h-24 bg-gradient-to-r ${step.gradient} rounded-full flex items-center justify-center mx-auto`}>
                              <motion.i 
                                className="fas fa-check text-4xl text-white"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                              />
                            </div>
                            <motion.div
                              className={`absolute -inset-4 bg-gradient-to-r ${step.gradient} rounded-full opacity-20`}
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            />
                          </motion.div>
                        )}
                      </div>
                    </Card>
                  </div>
                </div>
              </motion.div>
            ))}
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
                title: "Advanced AI Models",
                description: "Powered by cutting-edge large language models for natural conversations",
                gradient: "from-primary to-secondary"
              },
              {
                icon: "fas fa-microphone",
                title: "Lifelike Voices",
                description: "Choose from hundreds of realistic AI voices or clone your own",
                gradient: "from-secondary to-accent"
              },
              {
                icon: "fas fa-globe",
                title: "Multi-Language Support",
                description: "Support for 50+ languages including regional dialects",
                gradient: "from-accent to-coral"
              },
              {
                icon: "fas fa-bolt",
                title: "Real-Time Processing",
                description: "Ultra-low latency for seamless, natural conversations",
                gradient: "from-coral to-primary"
              },
              {
                icon: "fas fa-shield-alt",
                title: "Enterprise Security",
                description: "Bank-grade encryption and compliance with SOC2, HIPAA",
                gradient: "from-primary to-accent"
              },
              {
                icon: "fas fa-chart-line",
                title: "Advanced Analytics",
                description: "Detailed insights into conversation performance and user behavior",
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
                  <CardContent className="p-6">
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
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Seamless Integrations
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Connect with your existing tools and platforms in minutes
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Communication Platforms */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="bg-white/5 backdrop-blur-sm border-white/10 p-8 h-full">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <i className="fas fa-comments text-primary"></i>
                  Communication Platforms
                </h3>
                <div className="grid grid-cols-3 gap-6">
                  {[
                    { name: "WhatsApp", icon: "fab fa-whatsapp", color: "text-green-400" },
                    { name: "Instagram", icon: "fab fa-instagram", color: "text-pink-400" },
                    { name: "Facebook", icon: "fab fa-facebook", color: "text-blue-400" },
                    { name: "Telegram", icon: "fab fa-telegram", color: "text-cyan-400" },
                    { name: "Discord", icon: "fab fa-discord", color: "text-indigo-400" },
                    { name: "Slack", icon: "fab fa-slack", color: "text-purple-400" }
                  ].map((platform, index) => (
                    <motion.div
                      key={index}
                      className="text-center group"
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="w-16 h-16 bg-white/10 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:bg-white/20 transition-all duration-300">
                        <i className={`${platform.icon} text-2xl ${platform.color}`}></i>
                      </div>
                      <p className="text-sm text-gray-300">{platform.name}</p>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* CRM & Business Tools */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="bg-white/5 backdrop-blur-sm border-white/10 p-8 h-full">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <i className="fas fa-briefcase text-secondary"></i>
                  CRM & Business Tools
                </h3>
                <div className="grid grid-cols-3 gap-6">
                  {[
                    { name: "Salesforce", icon: "fab fa-salesforce", color: "text-blue-500" },
                    { name: "HubSpot", icon: "fas fa-chart-line", color: "text-orange-400" },
                    { name: "Zoho", icon: "fas fa-building", color: "text-red-400" },
                    { name: "Freshdesk", icon: "fas fa-headset", color: "text-green-500" },
                    { name: "Pipedrive", icon: "fas fa-funnel-dollar", color: "text-purple-500" },
                    { name: "Zendesk", icon: "fas fa-ticket-alt", color: "text-teal-400" }
                  ].map((platform, index) => (
                    <motion.div
                      key={index}
                      className="text-center group"
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="w-16 h-16 bg-white/10 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:bg-white/20 transition-all duration-300">
                        <i className={`${platform.icon} text-2xl ${platform.color}`}></i>
                      </div>
                      <p className="text-sm text-gray-300">{platform.name}</p>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Additional Integration Categories */}
          <motion.div 
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {[
                { title: "E-commerce", icon: "fas fa-shopping-cart", count: "20+" },
                { title: "Analytics", icon: "fas fa-chart-bar", count: "15+" },
                { title: "Telephony", icon: "fas fa-phone", count: "25+" },
                { title: "Custom APIs", icon: "fas fa-code", count: "∞" }
              ].map((category, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="w-20 h-20 bg-gradient-to-r from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <i className={`${category.icon} text-2xl text-white`}></i>
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-2">{category.title}</h4>
                  <p className="text-sm text-gray-300">{category.count} integrations</p>
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
