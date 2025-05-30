import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Settings, 
  BarChart3, 
  TestTube, 
  Play,
  Upload,
  Mic,
  Phone,
  Users,
  Activity,
  Zap,
  FileText,
  Link,
  Trash2,
  FolderPlus,
  Volume2,
  User,
  Mail,
  Shield,
  Sparkles
} from "lucide-react";
// Using img tag directly for Vite compatibility

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState("playground");
  const [showCreateBot, setShowCreateBot] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState("neurava");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedPersona, setSelectedPersona] = useState("");
  const [selectedSample, setSelectedSample] = useState("");
  const [botName, setBotName] = useState("");
  const [selectedGoal, setSelectedGoal] = useState("");
  const [selectedDomain, setSelectedDomain] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [showCongrats, setShowCongrats] = useState(false);
  const [isTestMode, setIsTestMode] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);
      setSelectedFiles(prevFiles => [...prevFiles, ...files]);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
  };

  const sidebarItems = [
    { id: "playground", label: "Playground", icon: Play },
    { id: "test", label: "Test", icon: TestTube },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "integrations", label: "Integrations", icon: Link },
    { id: "profile", label: "Profile", icon: Settings },
  ];

  const providers = [
    { 
      id: "neurava", 
      name: "NeuraVoice", 
      models: [
        { id: "neura_vn1", name: "Neura_vn1", latency: "300ms", cost: "$0.00", tags: ["Fastest", "Cheapest"] }
      ]
    },
    { 
      id: "groq", 
      name: "Groq", 
      models: [
        { id: "deepseek", name: "deepseek-r1-distill-llama-70b", latency: "600ms", cost: "$0.01", tags: [] },
        { id: "llama-3.3", name: "llama-3.3-70b-versatile", latency: "600ms", cost: "$0.01", tags: [] },
        { id: "llama-3.1", name: "llama-3.1-8b-instant", latency: "300ms", cost: "$0.00", tags: ["Fastest", "Cheapest"] },
        { id: "llama3-8b", name: "llama3-8b-8192", latency: "300ms", cost: "$0.00", tags: ["Fastest", "Cheapest"] }
      ]
    }
  ];

  const personas = [
    { 
      id: "aggressive", 
      name: "Aryanveer", 
      gender: "Male", 
      language: "Hindi",
      tone: "Assertive",
      style: "Persuasive",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop&crop=faces&q=80",
      voiceSample: "/voice-samples/audio_1.wav"
    },
    { 
      id: "calm", 
      name: "Monika", 
      gender: "Female", 
      language: "Hindi",
      tone: "Reassuring",
      style: "Empathetic",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=faces&q=80",
      voiceSample: "/voice-samples/audio_2.wav"
    },
    { 
      id: "confident", 
      name: "Vikram", 
      gender: "Male", 
      language: "English",
      tone: "Confident",
      style: "Professional",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=faces&q=80",
      voiceSample: "/voice-samples/audio_3.wav"
    },
    { 
      id: "polite", 
      name: "Raju", 
      gender: "Male", 
      language: "English",
      tone: "Polite",
      style: "Friendly",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=faces&q=80",
      voiceSample: "/voice-samples/audio_4.wav"
    },
    { 
      id: "custom", 
      name: "Custom", 
      gender: "Custom", 
      language: "Custom",
      tone: "Custom",
      style: "Custom",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop&crop=faces&q=80"
    }
  ];

  const handleSubmit = () => {
    if (botName && selectedGoal && selectedModel && selectedPersona) {
      setShowCreateBot(false);
      setShowCongrats(true);
      setTimeout(() => setShowCongrats(false), 4000);
    }
  };

  const renderPlayground = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">Playground</h1>
        <Button 
          onClick={() => setShowCreateBot(true)}
          className="bg-gradient-to-r from-primary to-secondary hover:scale-105 transition-transform"
        >
          <Play className="w-4 h-4 mr-2" />
          Create Voice Assistant
        </Button>
      </div>

      {/* Create Bot Dialog */}
      <Dialog open={showCreateBot} onOpenChange={setShowCreateBot}>
        <DialogContent className="max-w-4xl bg-dark-navy border-2 border-primary/50 shadow-lg shadow-primary/20 text-white max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center">Create Your Voice Assistant</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* Basic Configuration */}
            <div className="space-y-4">
              <Label className="text-lg font-semibold">Basic Configuration</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="botName" className="mb-2 block">Voice Assistant Name</Label>
                  <Input 
                    id="botName"
                    value={botName}
                    onChange={(e) => setBotName(e.target.value)}
                    placeholder="Enter bot name..."
                    className="bg-white/10 border-white/20 text-white"
                  />
                </div>
                <div>
                  <Label>Domain</Label>
                  <Select value={selectedDomain} onValueChange={setSelectedDomain}>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue placeholder="Select domain..." />
                    </SelectTrigger>
                    <SelectContent className="bg-dark-navy border-white/20">
                      <SelectItem value="fintech">FinTech</SelectItem>
                      <SelectItem value="banking">Banking</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="hospitality">Hospitality</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Department</Label>
                  <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue placeholder="Select department..." />
                    </SelectTrigger>
                    <SelectContent className="bg-dark-navy border-white/20">
                      <SelectItem value="sales">Sales</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                      <SelectItem value="finance">Finance</SelectItem>
                      <SelectItem value="hr">Human Resource</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Select Goal</Label>
                  <Select value={selectedGoal} onValueChange={setSelectedGoal}>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue placeholder="Choose a goal..." />
                    </SelectTrigger>
                    <SelectContent className="bg-dark-navy border-white/20">
                      <SelectItem value="sales">Sales</SelectItem>
                      <SelectItem value="awareness">Awareness</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <Separator className="bg-white/20" />

            {/* Processor Configuration */}
            <div className="space-y-4">
              <Label className="text-lg font-semibold flex items-center">
                <Zap className="w-5 h-5 mr-2" />
                Processor
              </Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Provider</Label>
                  <Select value={selectedProvider} onValueChange={setSelectedProvider}>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-dark-navy border-white/20">
                      {providers.map(provider => (
                        <SelectItem key={provider.id} value={provider.id}>
                          {provider.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Models</Label>
                  <Select value={selectedModel} onValueChange={setSelectedModel}>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue placeholder="Select model..." />
                    </SelectTrigger>
                    <SelectContent className="bg-dark-navy border-white/20">
                      {providers.find(p => p.id === selectedProvider)?.models.map(model => (
                        <SelectItem key={model.id} value={model.id}>
                          <div className="flex items-center justify-between w-full">
                            <span>{model.name}</span>
                            <div className="flex items-center space-x-2 ml-4">
                              <span className="text-xs text-gray-400">{model.latency}</span>
                              <span className="text-xs text-gray-400">{model.cost}</span>
                              {model.tags.map(tag => (
                                <Badge key={tag} variant="secondary" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <Separator className="bg-white/20" />

            {/* Information Center */}
            <div className="space-y-4">
              <Label className="text-lg font-semibold flex items-center">
                <FileText className="w-5 h-5 mr-2" />
                Information Center
              </Label>
              
              <Tabs defaultValue="files" className="w-full">
                <TabsList className="grid w-full grid-cols-2 bg-dark-navy border border-white/20">
                  <TabsTrigger 
                    value="files" 
                    className="data-[state=active]:bg-primary/20 data-[state=active]:text-white data-[state=active]:shadow-sm"
                  >
                    Upload Files
                  </TabsTrigger>
                  <TabsTrigger 
                    value="url" 
                    className="data-[state=active]:bg-primary/20 data-[state=active]:text-white data-[state=active]:shadow-sm"
                  >
                    Add URL
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="files" className="mt-4">
                  <div className="border-2 border-dashed border-white/20 rounded-lg p-6 text-center">
                    <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                    <p className="text-sm text-gray-400 mb-4">Drag & drop .txt or .pdf files (no .docx)</p>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      className="hidden"
                      accept=".pdf,.txt"
                      multiple
                    />
                    <Button 
                      variant="outline" 
                      className="border-white/20 mb-4"
                      onClick={triggerFileInput}
                    >
                      Browse Files
                    </Button>
                    {selectedFiles.length > 0 && (
                      <div className="mt-4 space-y-2 text-left">
                        <p className="text-sm font-medium text-gray-300">Selected Files:</p>
                        <div className="space-y-2 max-h-40 overflow-y-auto">
                          {selectedFiles.map((file, index) => (
                            <div key={index} className="flex items-center justify-between bg-white/5 p-2 rounded">
                              <span className="text-sm text-gray-300 truncate max-w-xs">{file.name}</span>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="text-red-400 hover:text-red-300 h-6 w-6 p-0"
                                onClick={() => removeFile(index)}
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </TabsContent>
                
                <TabsContent value="url" className="mt-4">
                  <div className="space-y-3">
                    <Input 
                      placeholder="https://example.com"
                      className="bg-white/10 border-white/20 text-white"
                    />
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Voice Configuration */}
            <div className="space-y-4">
              <Label className="text-lg font-semibold flex items-center">
                <Mic className="w-5 h-5 mr-2" />
                Voice Configuration
              </Label>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {personas.map(persona => (
                  <div 
                    key={persona.id}
                    onClick={() => {
                      setSelectedPersona(persona.id);
                      
                      // Only play if voice sample exists
                      if (persona.voiceSample) {
                        console.log('Attempting to play:', persona.voiceSample);
                        const audio = new Audio(persona.voiceSample);
                        
                        // Add event listeners for debugging
                        audio.onerror = (e) => {
                          console.error('Audio error:', e);
                          console.error('Audio error details:', audio.error);
                        };
                        
                        audio.oncanplay = () => {
                          console.log('Audio can play');
                        };
                        
                        audio.play().catch(error => {
                          console.error('Error playing voice sample:', error);
                          console.error('Audio element state:', {
                            readyState: audio.readyState,
                            error: audio.error,
                            networkState: audio.networkState,
                            src: audio.src
                          });
                        });
                      } else {
                        console.log('No voice sample for persona:', persona.name);
                      }
                    }}
                    className={`p-4 rounded-lg border cursor-pointer transition-all ${
                      selectedPersona === persona.id 
                        ? 'border-primary bg-primary/20' 
                        : 'border-white/20 bg-white/5 hover:bg-white/10'
                    }`}
                  >
                    <div className="text-center space-y-3">
                      <div className="w-16 h-16 mx-auto mb-2 rounded-full overflow-hidden border-2 border-white/20">
                        <img 
                          src={persona.image} 
                          alt={persona.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="space-y-1">
                        <p className="font-bold text-sm text-primary">{persona.name}</p>
                        <p className="text-xs font-medium text-gray-300">Tone: {persona.tone || 'Neutral'}</p>
                        <p className="text-xs text-gray-400">{persona.gender} • {persona.language}</p>
                        <p className="text-xs text-gray-400">{persona.style || 'Conversational'}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {selectedPersona === "custom" && (
                <Textarea 
                  placeholder="Describe the voice personality you're looking for..."
                  className="bg-white/10 border-white/20 text-white"
                />
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <Label>Background Sound</Label>
                  <Select>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue placeholder="Select background..." />
                    </SelectTrigger>
                    <SelectContent className="bg-dark-navy border-white/20">
                      <SelectItem value="office">Office Noise</SelectItem>
                      <SelectItem value="reception">Reception Noise</SelectItem>
                      <SelectItem value="conference">Conference Noise</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Background URL (MP3 only)</Label>
                  <Input 
                    placeholder="https://example.com/audio.mp3"
                    className="bg-white/10 border-white/20 text-white"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-center pt-6">
              <Button 
                onClick={handleSubmit}
                className="bg-gradient-to-r from-primary to-secondary px-8 py-3 text-lg font-semibold hover:scale-105 transition-transform"
                disabled={!botName || !selectedGoal || !selectedModel || !selectedPersona}
              >
                SUBMIT
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Congratulations Modal */}
      <Dialog open={showCongrats} onOpenChange={setShowCongrats}>
        <DialogContent className="max-w-md bg-dark-navy/95 border-white/20 text-white text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="space-y-6"
          >
            <Sparkles className="w-16 h-16 mx-auto text-primary" />
            <div>
              <h3 className="text-2xl font-bold mb-2">Congratulations!</h3>
              <p className="text-gray-300">"{botName}" is ready for your test</p>
            </div>
            <div className="flex space-x-4 justify-center">
              <Button 
                onClick={() => {
                  setShowCongrats(false);
                  setActiveSection("test");
                }}
                className="bg-gradient-to-r from-primary to-secondary"
              >
                Test
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setShowCongrats(false)}
                className="border-white/20"
              >
                Edit
              </Button>
            </div>
          </motion.div>
        </DialogContent>
      </Dialog>

      {/* Empty State */}
      <Card className="bg-white/5 border-white/10 border-dashed">
        <CardContent className="flex flex-col items-center justify-center py-16">
          <Play className="w-16 h-16 text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold text-white mb-2">No Voice Assistants Yet</h3>
          <p className="text-gray-400 text-center mb-6">
            Create your first voice assistant to get started with automated conversations.
          </p>
        </CardContent>
      </Card>
    </div>
  );

  const renderTest = () => (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">Test Voice Assistant</h1>
      
      <div className="max-w-2xl mx-auto">
        <Card className="bg-white/10 border-white/20">
          <CardContent className="p-8 text-center space-y-6">
            {!isTestMode ? (
              <>
                <motion.div
                  className="w-32 h-32 mx-auto bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsTestMode(true)}
                >
                  <Phone className="w-16 h-16 text-white" />
                </motion.div>
                <div>
                  <h3 className="text-2xl font-semibold text-white mb-2">Talk</h3>
                  <p className="text-gray-300">Click to start a test conversation</p>
                </div>
                <div className="max-w-xs mx-auto">
                  <Label>Select Assistant</Label>
                  <Select>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue placeholder="Choose assistant..." />
                    </SelectTrigger>
                    <SelectContent className="bg-dark-navy border-white/20">
                      <SelectItem value="test-bot">Test Bot</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <motion.div
                  className="w-32 h-32 mx-auto bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center"
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Volume2 className="w-16 h-16 text-white" />
                </motion.div>
                <div>
                  <h3 className="text-2xl font-semibold text-white mb-2">Call in Progress</h3>
                  <p className="text-gray-300">Speaking with your voice assistant...</p>
                </div>
                <Button 
                  onClick={() => setIsTestMode(false)}
                  variant="outline"
                  className="border-red-500/50 text-red-400 hover:bg-red-500/10"
                >
                  End Call
                </Button>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">Analytics Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-white/10 border-white/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Total Calls</p>
                <p className="text-2xl font-bold text-white">1,247</p>
              </div>
              <Phone className="w-8 h-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white/10 border-white/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Average Call Duration</p>
                <p className="text-2xl font-bold text-white">3m 24s</p>
              </div>
              <Activity className="w-8 h-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white/10 border-white/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Call Volume</p>
                <p className="text-2xl font-bold text-white">89.4%</p>
              </div>
              <Users className="w-8 h-8 text-green-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-white/10 border-white/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-300 text-sm">Cost per Conversation</p>
                <p className="text-2xl font-bold text-white">$0.12</p>
              </div>
              <Zap className="w-8 h-8 text-secondary" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderProfile = () => (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white text-center">Profile Settings</h1>
      <Card className="bg-white/10 border-white/20 max-w-2xl w-full mx-auto">
        <CardContent className="p-8">
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <Avatar className="w-16 h-16">
                <AvatarFallback className="bg-primary text-white text-xl">U</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-xl font-semibold text-white">User Profile</h3>
                <div className="flex items-center text-gray-300 mt-1">
                  <Mail className="w-4 h-4 mr-2" />
                  <span>user@example.com</span>
                </div>
              </div>
            </div>
            
            <Separator className="bg-white/20" />
            
            <div className="space-y-4">
              <Button 
                variant="outline" 
                className="w-full justify-start border-white/20 text-white hover:bg-white/10"
              >
                <Shield className="w-4 h-4 mr-2" />
                Change Password
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start border-red-500/50 text-red-400 hover:bg-red-500/10"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Account
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case "playground": return renderPlayground();
      case "test": return renderTest();
      case "analytics": return renderAnalytics();
      case "profile": return renderProfile();
      default: return renderPlayground();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-navy via-midnight to-deep-purple">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 min-h-screen bg-white/5 border-r border-white/10">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-white mb-8">NeuraVoice</h2>
            <nav className="space-y-2">
              {sidebarItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center px-4 py-3 rounded-lg transition-all ${
                    activeSection === item.id 
                      ? 'bg-primary/20 text-primary border border-primary/30' 
                      : 'text-gray-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        </div>
        
        {/* Main Content */}
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}