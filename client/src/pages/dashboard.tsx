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
  Sparkles,
  CheckCircle
} from "lucide-react";
// Using img tag directly for Vite compatibility

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState("playground");
  const [showCreateBot, setShowCreateBot] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState("neurava");
  const [selectedModel, setSelectedModel] = useState("neura_vn1");
  const [selectedPersona, setSelectedPersona] = useState("");
  const [selectedSample, setSelectedSample] = useState("");
  const [botName, setBotName] = useState("");
  const [selectedGoal, setSelectedGoal] = useState("");
  const [selectedDomain, setSelectedDomain] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [showCongrats, setShowCongrats] = useState(false);
  const [isTestMode, setIsTestMode] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [createdAssistant, setCreatedAssistant] = useState<{name: string, id: string} | null>(null);
  const [selectedAssistant, setSelectedAssistant] = useState<string>("");
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);
  const [customPrompt, setCustomPrompt] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);
  const [showCustomPrompt, setShowCustomPrompt] = useState<boolean>(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmitCustomPrompt = () => {
    if (!customPrompt.trim()) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setShowCustomPrompt(false);
      
      // Hide success message after 3 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 3000);
    }, 1000);
  };

  const promptTemplates = [
    {
      title: "Friendly Assistant",
      description: "Warm and approachable tone for customer service",
      content: "You are a friendly and helpful assistant. Speak in a warm, approachable tone. Be patient and understanding with users. Keep responses concise and to the point while maintaining a professional yet friendly demeanor."
    },
    {
      title: "Professional Expert",
      description: "Knowledgeable and authoritative tone for expert advice",
      content: "You are a professional expert in your field. Speak with confidence and authority. Provide clear, accurate information and be precise in your responses. Maintain a formal but not overly rigid tone."
    },
    {
      title: "Enthusiastic Sales",
      description: "Energetic and persuasive tone for sales and marketing",
      content: "You are an enthusiastic sales representative. Speak with energy and excitement. Be persuasive but not pushy. Highlight benefits and create a sense of urgency when appropriate. Keep the conversation engaging and positive."
    },
    {
      title: "Technical Support",
      description: "Patient and clear tone for technical assistance",
      content: "You are a technical support specialist. Be patient and methodical in your explanations. Break down complex concepts into simple terms. Always confirm understanding and be prepared to rephrase or provide additional clarification."
    }
  ];

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
      image: "/voice-samples/image (3).jpg",  // Professional Indian male with assertive look
      voiceSample: "/voice-samples/audio_1.wav"
    },
    { 
      id: "calm", 
      name: "Monika", 
      gender: "Female", 
      language: "Hindi",
      tone: "Reassuring",
      style: "Empathetic",
      image: "/voice-samples/monika.jpg",  // Professional Indian female with calm demeanor
      voiceSample: "/voice-samples/audio_2.wav"
    },
    { 
      id: "confident", 
      name: "Vikram", 
      gender: "Male", 
      language: "English",
      tone: "Confident",
      style: "Professional",
      image: "/voice-samples/Vikram.jpg",  // Confident Indian business professional
      voiceSample: "/voice-samples/audio_3.wav"
    },
    { 
      id: "polite", 
      name: "Raju", 
      gender: "Male", 
      language: "English",
      tone: "Polite",
      style: "Friendly",
      image: "/voice-samples/Raju.jpg",  // Friendly Indian professional with approachable look
      voiceSample: "/voice-samples/audio_4.wav"
    },
    { 
      id: "custom", 
      name: "Custom", 
      gender: "Custom", 
      language: "Custom",
      tone: "Custom",
      style: "Custom",
      image: ""
    }
  ];

  const handleSubmit = () => {
    if (botName && selectedGoal && selectedModel && selectedPersona) {
      const newAssistant = { 
        id: `bot-${Date.now()}`,
        name: botName 
      };
      setCreatedAssistant(newAssistant);
      setSelectedAssistant(newAssistant.id);
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

      {createdAssistant ? (
        <Card className="bg-white/10 border-white/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold text-white">{createdAssistant.name}</h3>
                <p className="text-gray-300">Your voice assistant is ready to use</p>
              </div>
              <Button 
                className="bg-green-500 hover:bg-green-600 text-white"
                onClick={() => setActiveSection('test')}
              >
                <Play className="w-4 h-4 mr-2" />
                Test Now
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="bg-white/10 border-2 border-dashed border-white/20">
          <CardContent className="p-8 text-center">
            <div className="flex flex-col items-center">
              <Volume2 className="w-12 h-12 text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No Voice Assistants Yet</h3>
              <p className="text-gray-400">Click the 'Create Voice Assistant' button above to get started</p>
            </div>
          </CardContent>
        </Card>
      )}

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
                    placeholder="Enter assistant name"
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
                      <SelectItem value="promotion">Promotion</SelectItem>
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

                      if (currentAudio) {
                        currentAudio.pause();
                        currentAudio.currentTime = 0;
                      }
                      
                      // Only play if voice sample exists
                      if (persona.voiceSample) {
                        console.log('Attempting to play:', persona.voiceSample);
                        const audio = new Audio(persona.voiceSample);
                        setCurrentAudio(audio);
                        
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
                      {persona.id !== 'custom' ? (
                      <div className="w-16 h-16 mx-auto mb-2 rounded-full overflow-hidden border-2 border-white/20">
                        <img 
                          src={persona.image} 
                          alt={persona.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-16 h-16 mx-auto mb-2 rounded-full border-2 border-dashed border-white/20 flex items-center justify-center">
                        <User className="w-6 h-6 text-gray-400" />
                      </div>
                    )}
                      <div className="space-y-1">
                        <p className="font-bold text-sm text-primary">{persona.name}</p>
                        {persona.id !== 'custom' && (
                          <>
                            <p className="text-xs font-medium text-gray-300">{persona.tone || 'Neutral'}</p>
                            <p className="text-xs text-gray-400">
                              {persona.name === 'Aryanveer' && 'A persuasive Hindi voice'}
                              {persona.name === 'Monika' && 'An empathetic Hindi voice'}
                              {persona.name === 'Vikram' && 'A resonant English voice'}
                              {persona.name === 'Raju' && 'A friendly English voice'}
                              {persona.name === 'Custom' && 'Custom voice configuration'}
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {selectedPersona === "custom" && (
                <div className="space-y-4">
                  {showCustomPrompt ? (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {promptTemplates.map((template) => (
                          <div
                            key={template.title}
                            className="p-4 border rounded-lg cursor-pointer hover:bg-white/5 transition-colors"
                            onClick={() => setCustomPrompt(template.content)}
                          >
                            <h4 className="font-medium">{template.title}</h4>
                            <p className="text-sm text-gray-400">{template.description}</p>
                          </div>
                        ))}
                      </div>
                      <div className="space-y-3">
                        <div className="relative">
                          <Textarea
                            placeholder="Or describe the voice personality you're looking for..."
                            className="bg-white/10 border-white/20 text-white min-h-[120px]"
                            value={customPrompt}
                            onChange={(e) => setCustomPrompt(e.target.value)}
                            disabled={isSubmitting}
                          />
                          <div className="text-xs text-gray-400 text-right mt-1">
                            {customPrompt.length}/1000 characters
                          </div>
                        </div>
                        <Button
                          onClick={handleSubmitCustomPrompt}
                          disabled={!customPrompt.trim() || isSubmitting}
                          className="w-full sm:w-auto"
                        >
                          {isSubmitting ? 'Generating...' : 'Generate Custom Persona'}
                        </Button>
                      </div>
                    </>
                  ) : (
                    <div className="p-4 border border-white/10 rounded-lg bg-white/5">
                      <p className="text-sm text-gray-300">Your custom persona has been generated.</p>
                    </div>
                  )}
                  {submitSuccess && (
                    <div className="p-3 bg-green-900/30 border border-green-800 text-green-400 text-sm rounded-md flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      Your custom persona has been generated successfully!
                    </div>
                  )}
                </div>
              )}

              <div className="mt-6">
                <div className="space-y-3">
                  <div className="space-y-1.5 w-1/4">
                    <div className="flex items-center justify-between">
                      <Label className="text-xs text-gray-400">Background Sound</Label>
                      <span className="text-xs text-gray-500">Optional</span>
                    </div>
                    <div>
                      <Select defaultValue="none">
                        <SelectTrigger className="w-full bg-white/10 border-white/20 text-white h-8 text-sm hover:bg-white/15 transition-colors">
                          <SelectValue placeholder="Select sound" />
                        </SelectTrigger>
                        <SelectContent className="bg-dark-navy border-white/20 text-sm w-[--radix-select-trigger-width]">
                          <SelectItem value="none" className="hover:bg-white/10">Default(None)</SelectItem>
                          <SelectItem value="office" className="hover:bg-white/10">Office Premise</SelectItem>
                          <SelectItem value="reception" className="hover:bg-white/10">Reception </SelectItem>
                          <SelectItem value="conference" className="hover:bg-white/10">Conference Room</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-[11px] text-gray-500 mt-1">Add ambient sound to make the voice feel more natural</p>
                    </div>
                  </div>
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
    </div>
  );

  const renderTest = () => (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">Test Voice Assistant</h1>
      
      <div className="max-w-md mx-auto">
        <Card className="bg-white/10 border-white/20">
          <CardContent className="p-12 text-center space-y-8">
            {!isTestMode ? (
              <div className="space-y-8">
                <motion.div
                  className="w-40 h-40 mx-auto bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsTestMode(true)}
                >
                  <Phone className="w-20 h-20 text-white" />
                </motion.div>
                <div className="space-y-4 w-full max-w-xs mx-auto">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-semibold text-white">Talk</h3>
                    <p className="text-gray-300">Click to start a test conversation</p>
                  </div>
                  <Select 
                    value={selectedAssistant}
                    onValueChange={setSelectedAssistant}
                  >
                    <SelectTrigger className="bg-white/10 border-white/20 text-white w-full">
                      <SelectValue placeholder="No assistants available" />
                    </SelectTrigger>
                    <SelectContent className="bg-dark-navy border-white/20">
                      {createdAssistant && (
                        <SelectItem value={createdAssistant.id}>
                          {createdAssistant.name}
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-8"
              >
                <motion.div
                  className="w-40 h-40 mx-auto bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center"
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
                  <Volume2 className="w-20 h-20 text-white" />
                </motion.div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-semibold text-white">Call in Progress</h3>
                  <p className="text-gray-300">
                    {createdAssistant 
                      ? `Speaking with ${createdAssistant.name}...`
                      : 'Speaking with voice assistant...'
                    }
                  </p>
                </div>
                <Button 
                  onClick={() => setIsTestMode(false)}
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10"
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

  const renderIntegrations = () => (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white">Integrations</h1>
      <Card className="bg-white/10 border-white/20">
        <CardContent className="p-8">
          <div className="space-y-6">
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-white">Connect Your Services</h2>
              <p className="text-gray-300">Enhance your voice assistant by connecting with third-party services.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card className="bg-white/5 border-white/10 hover:border-primary/50 transition-colors">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="w-16 h-16 bg-blue-100/10 rounded-full flex items-center justify-center mb-4">
                    <Phone className="w-8 h-8 text-blue-400" />
                  </div>
                  <h3 className="text-lg font-medium text-white mb-2">Twilio</h3>
                  <p className="text-sm text-gray-300 mb-4">Make and receive phone calls with your voice assistant</p>
                  <Button 
                    onClick={() => window.open('https://www.twilio.com/en-us', '_blank')}
                    className="bg-blue-600 hover:bg-blue-700 text-white w-full"
                  >
                    Connect with Twilio
                  </Button>
                </CardContent>
              </Card>
              
              {/* Add more integration cards here */}
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
      case "integrations": return renderIntegrations();
      case "profile": return renderProfile();
      default: return renderPlayground();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-navy via-midnight to-deep-purple">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 min-h-screen bg-white/5 border-r border-white/10 flex flex-col">
          <div className="p-6 flex-1">
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
          <div className="p-4 border-t border-white/10">
            <Button
              variant="ghost"
              className="w-full justify-start text-gray-300 hover:text-white hover:bg-white/5"
              onClick={() => window.open('mailto:support@neuravoice.com', '_blank')}
            >
              <Mail className="w-4 h-4 mr-2" />
              Contact Support
            </Button>
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