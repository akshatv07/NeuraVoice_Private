import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
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
  CheckCircle,
  Lightbulb,
  Edit
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
  const [strategyPrompt, setStrategyPrompt] = useState("");
  const [showCongrats, setShowCongrats] = useState(false);
  const [isTestMode, setIsTestMode] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [createdAssistant, setCreatedAssistant] = useState<{name: string, id: string} | null>(null);
  const [selectedAssistant, setSelectedAssistant] = useState<string>("");
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);
  const [customVoicePersona, setCustomVoicePersona] = useState<string>("");
  const [urlInput, setUrlInput] = useState<string>("");
  const [addedUrls, setAddedUrls] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);
  const [showCustomPrompt, setShowCustomPrompt] = useState<boolean>(true);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [callStatus, setCallStatus] = useState<'idle' | 'calling' | 'called'>('idle');
  const [selectedAnalyticsAssistant, setSelectedAnalyticsAssistant] = useState<string>("");
  const [backgroundSound, setBackgroundSound] = useState<string>('none');
  const [guardrails, setGuardrails] = useState({
    avoidProfanity: false,
    stickToInfo: false,
    politeTone: false
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleGuardrailChange = (key: keyof typeof guardrails) => {
    setGuardrails(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleSubmitCustomPrompt = () => {
    if (!customVoicePersona.trim()) return;
    
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

  const addUrl = () => {
    const trimmedUrl = urlInput.trim();
    if (trimmedUrl) {
      // Add the URL to our list of URLs
      setAddedUrls(prev => [...prev, trimmedUrl]);
      // Clear the input after adding
      setUrlInput('');
    }
  };

  const removeUrl = (urlToRemove: string) => {
    setAddedUrls(prev => prev.filter(url => url !== urlToRemove));
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
    { id: "profile", label: "Profile", icon: User },
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

  const handleSubmit = async () => {
    if (!botName || !selectedGoal || !selectedPersona) {
      alert('Please fill in all required fields');
      return;
    }

    // Create the JSON payload
    const payload = {
      name: botName,
      persona: selectedPersona,
      goal: selectedGoal,
      domain: selectedDomain,
      department: selectedDepartment,
      strategyPrompt: strategyPrompt,
      customVoicePersona: customVoicePersona,
      backgroundSound: backgroundSound,
      // Include guardrails in the payload
      guardrails: {
        avoidProfanity: guardrails.avoidProfanity,
        stickToProvidedInfo: guardrails.stickToInfo,
        maintainPoliteTone: guardrails.politeTone
      },
      // Include added URLs
      urls: addedUrls,
      // Only include file metadata, not the actual files
      fileReferences: selectedFiles.map(file => ({
        name: file.name,
        type: file.type,
        size: file.size,
        // You might want to add an uploadId or reference from the file upload API
        uploadId: `temp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      })),
      createdAt: new Date().toISOString()
    };

    try {
      // Log the JSON payload for testing
      console.log('JSON Payload:', JSON.stringify(payload, null, 2));
      
      // TODO: Replace with your actual API endpoint
      const API_ENDPOINT = 'YOUR_API_ENDPOINT_HERE';
      
      // Send JSON data to the API
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Uncomment and add your auth token if needed
          // 'Authorization': `Bearer ${process.env.REACT_APP_API_KEY}`
        },
        body: JSON.stringify(payload)
      });

      // Get the response text first to check if it's valid JSON
      const responseText = await response.text();
      let responseData;
      
      try {
        // Try to parse the response as JSON
        responseData = responseText ? JSON.parse(responseText) : {};
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        // If we get here, the response wasn't JSON
        console.error('Failed to parse JSON response:', {
          status: response.status,
          statusText: response.statusText,
          responseText: responseText.substring(0, 1000), // Log first 1000 chars
          error: errorMessage
        });
        
        throw new Error(`Expected JSON response, but received: ${responseText.substring(0, 200)}...`);
      }

      if (!response.ok) {
        console.error('API Error Response:', {
          status: response.status,
          statusText: response.statusText,
          data: responseData
        });
        throw new Error(responseData.message || `HTTP error! status: ${response.status}`);
      }

      // Update UI with the new assistant
      setCreatedAssistant({
        id: responseData.id || `bot-${Date.now()}`,
        name: responseData.name || botName
      });
      setSelectedAssistant(responseData.id);
      setShowCreateBot(false);
      setShowCongrats(true);
      
      // Reset form
      setBotName('');
      setSelectedModel('');
      setSelectedPersona('');
      setSelectedGoal('');
      setSelectedFiles([]);
      setStrategyPrompt('');
      setCustomVoicePersona('');
      
      setTimeout(() => setShowCongrats(false), 4000);
      
    } catch (error) {
      console.error('Error creating voice assistant:', error);
      alert(`Error: ${error.message || 'Failed to create voice assistant. Please try again.'}`);
    }
  };

  const renderPlayground = () => (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white">Voice Assistant Playground</h1>
        </div>
        <Button 
          onClick={() => setShowCreateBot(true)}
          className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity"
        >
          <Sparkles className="w-4 h-4 mr-2" />
          Create Assistant
        </Button>
      </div>
      
      <div className="gradient-divider"></div>

      {createdAssistant ? (
        <Card className="bg-white/10 border-white/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold text-white">{createdAssistant.name}</h3>
                <p className="text-gray-300">Your voice assistant is ready to use</p>
              </div>
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline"
                  className="text-blue-400 border-blue-400 hover:bg-blue-400/10 hover:text-blue-300"
                  onClick={() => setShowCreateBot(true)}
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Edit
                </Button>
                <Button 
                  variant="outline"
                  className="text-red-400 border-red-400 hover:bg-red-400/10 hover:text-red-300"
                  onClick={() => {
                    if (window.confirm('Are you sure you want to delete this assistant? This action cannot be undone.')) {
                      setCreatedAssistant(null);
                      // Add any additional cleanup or API calls here
                    }
                  }}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </Button>
                <Button 
                  className="bg-green-500 hover:bg-green-600 text-white"
                  onClick={() => setActiveSection('test')}
                >
                  <Play className="w-4 h-4 mr-2" />
                  Test Now
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="bg-white/10 border-2 border-dashed border-white/20">
          <CardContent className="p-8 text-center">
            <div className="flex flex-col items-center">
              <Volume2 className="w-12 h-12 text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No Voice Assistants Yet</h3>
              <p className="text-gray-400">Click the 'Create New Assistant' button to get started</p>
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
                  <Label htmlFor="botName" className="mb-2 block">Agent Name</Label>
                  <Input 
                    id="botName"
                    value={botName}
                    onChange={(e) => setBotName(e.target.value)}
                    placeholder="Enter assistant name"
                    className="bg-white/10 border-white/20 text-white"
                  />
                </div>
                <div>
                  <Label>Industry</Label>
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
                  <Label>Use Case</Label>
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

            {/* Strategy Prompt */}
            <div className="space-y-4">
              <Label className="text-lg font-semibold flex items-center">
                <Lightbulb className="w-5 h-5 mr-2" />
                Strategy & Behavior
              </Label>
              <div className="space-y-2">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="no-profanity" 
                      className="border-white/30 data-[state=checked]:bg-primary" 
                      checked={guardrails.avoidProfanity}
                      onCheckedChange={() => handleGuardrailChange('avoidProfanity')}
                    />
                    <Label htmlFor="no-profanity" className="text-sm font-normal text-gray-300">Avoid profanity</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="stick-to-info" 
                      className="border-white/30 data-[state=checked]:bg-primary"
                      checked={guardrails.stickToInfo}
                      onCheckedChange={() => handleGuardrailChange('stickToInfo')}
                    />
                    <Label htmlFor="stick-to-info" className="text-sm font-normal text-gray-300">Stick to provided information</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="polite-tone" 
                      className="border-white/30 data-[state=checked]:bg-primary"
                      checked={guardrails.politeTone}
                      onCheckedChange={() => handleGuardrailChange('politeTone')}
                    />
                    <Label htmlFor="polite-tone" className="text-sm font-normal text-gray-300">Maintain a polite tone</Label>
                  </div>
                </div>
                <Label htmlFor="strategyPrompt" className="text-sm text-gray-300">
                  Define your assistant's behavior and strategy
                </Label>
                <Textarea
                  id="strategyPrompt"
                  value={strategyPrompt}
                  onChange={(e) => setStrategyPrompt(e.target.value)}
                  placeholder="Example: Act as a friendly and professional assistant that helps users with their banking needs. Be concise and focus on providing accurate information..."
                  className="min-h-[100px] bg-white/10 border-white/20 text-white placeholder-gray-400"
                />
                <p className="text-xs text-gray-400">
                  Describe how you want your assistant to behave, its tone, and any specific instructions
                </p>
              </div>
            </div>

            {/* Information Center */}
            <div className="gradient-divider"></div>
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
                    <div className="flex gap-2">
                      <Input 
                        placeholder="https://example.com"
                        className="bg-white/10 border-white/20 text-white flex-1"
                        value={urlInput}
                        onChange={(e) => setUrlInput(e.target.value)}
                      />
                      <Button 
                        onClick={addUrl}
                        disabled={!urlInput.trim()}
                        className="bg-primary hover:bg-primary/90"
                      >
                        Add
                      </Button>
                    </div>
                    {addedUrls.length > 0 && (
                      <div className="mt-2 space-y-2">
                        <p className="text-xs font-medium text-gray-300">Added URLs:</p>
                        <div className="space-y-1 max-h-32 overflow-y-auto">
                          {addedUrls.map((url, index) => (
                            <div key={index} className="flex items-center justify-between bg-white/5 p-2 rounded text-sm">
                              <span className="truncate max-w-xs text-gray-300">{url}</span>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="text-red-400 hover:text-red-300 h-6 w-6 p-0"
                                onClick={() => removeUrl(url)}
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    <p className="text-xs text-gray-400">
                      Add a URL to include web content in your assistant's knowledge
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Voice Configuration */}
            <div className="gradient-divider"></div>
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
                            onClick={() => setCustomVoicePersona(template.content)}
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
                            value={customVoicePersona}
                            onChange={(e) => setCustomVoicePersona(e.target.value)}
                            disabled={isSubmitting}
                          />
                          <div className="text-xs text-gray-400 text-right mt-1">
                            {customVoicePersona.length}/1000 characters
                          </div>
                        </div>
                        <Button
                          onClick={handleSubmitCustomPrompt}
                          disabled={!customVoicePersona.trim() || isSubmitting}
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
                      <Select 
                        value={backgroundSound}
                        onValueChange={setBackgroundSound}
                        defaultValue="none"
                      >
                        <SelectTrigger className="w-full bg-white/10 border-white/20 text-white h-8 text-sm hover:bg-white/15 transition-colors">
                          <SelectValue placeholder="Select sound" />
                        </SelectTrigger>
                        <SelectContent className="bg-dark-navy border-white/20 text-sm w-[--radix-select-trigger-width]">
                          <SelectItem value="none" className="hover:bg-white/10">Default (None)</SelectItem>
                          <SelectItem value="office" className="hover:bg-white/10">Office Premise</SelectItem>
                          <SelectItem value="reception" className="hover:bg-white/10">Reception</SelectItem>
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
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">Test Voice Assistant</h1>
      </div>
      
      <div className="gradient-divider"></div>
      
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

  const renderAnalytics = () => {
    const showAnalytics = createdAssistant && selectedAnalyticsAssistant;

    return (
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <h1 className="text-3xl font-bold text-white">Analytics Overview</h1>
          <div className="mt-4 md:mt-0">
            <Select
              value={selectedAnalyticsAssistant}
              onValueChange={setSelectedAnalyticsAssistant}
            >
              <SelectTrigger className="w-64 bg-white/10 border-white/20 text-white hover:bg-white/15">
                <SelectValue placeholder={
                  createdAssistant ? "Select Voice Assistant" : "No voice assistant yet"
                } />
              </SelectTrigger>
              {createdAssistant && (
                <SelectContent className="bg-gray-900 border-gray-700">
                  <SelectItem 
                    value={createdAssistant.id}
                    className="hover:bg-white/10 text-white"
                  >
                    {createdAssistant.name}
                  </SelectItem>
                </SelectContent>
              )}
            </Select>
          </div>
        </div>

        {!showAnalytics ? (
          <div className="mt-12 text-center">
            <div className="max-w-md mx-auto p-6 bg-white/5 rounded-lg border border-white/10">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <BarChart3 className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {createdAssistant ? "Select a Voice Assistant" : "No Voice Assistant"}
              </h3>
              <p className="text-gray-400">
                {createdAssistant 
                  ? "Please select a voice assistant from the dropdown to view analytics."
                  : "Create a voice assistant to start tracking analytics and performance metrics."}
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-white/5 border-white/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Total Calls</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-white">1,248</p>
              <p className="text-xs text-green-400 mt-1">+12% from last month</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/5 border-white/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Average Duration</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-white">4:32 min</p>
              <p className="text-xs text-green-400 mt-1">+0.5 min from last month</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/5 border-white/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-400">Satisfaction</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold text-white">92%</p>
              <p className="text-xs text-green-400 mt-1">+3% from last month</p>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10 md:col-span-2">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-gray-400">Call Volume</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-48 flex items-center justify-center bg-white/5 rounded-lg">
                <p className="text-gray-400">Call volume chart will be displayed here</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-gray-400">Top Intents</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {['Billing Questions', 'Technical Support', 'Account Access', 'Product Information', 'Returns'].map((intent, i) => (
                <div key={i} className="flex justify-between items-center">
                  <span className="text-sm text-gray-300">{intent}</span>
                  <span className="text-sm font-medium text-white">{Math.floor(Math.random() * 50) + 20}%</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
  };

  const renderProfile = () => (  
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white text-center">Profile Settings</h1>
      <Card className="bg-white/10 border-white/20 max-w-2xl w-full mx-auto">
        <CardContent className="p-8">
          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-white text-2xl font-bold">U</span>
              </div>
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

  const handleCallMe = async () => {
    if (!phoneNumber.trim()) {
      alert('Please enter a valid phone number');
      return;
    }
    
    console.log('Initiating call to:', phoneNumber);
    setCallStatus('calling');
    
    try {
      const requestBody = { phone_number: phoneNumber };
      console.log('Request body:', requestBody);
      
      // Use CORS proxy in development, direct in production
      const proxyUrl = import.meta.env.DEV 
        ? 'https://api.allorigins.win/raw?url='
        : '';
      const targetUrl = import.meta.env.DEV
        ? encodeURIComponent('http://20.0.165.135:8000/outbound')
        : '/api/outbound';
      
      const apiUrl = proxyUrl + targetUrl;
      console.log('Making API call to:', apiUrl);
      console.log('Request headers:', {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      });
      console.log('Request body:', JSON.stringify(requestBody, null, 2));
      
      try {
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
          },
          body: JSON.stringify(requestBody),
          credentials: 'include' // Include cookies if needed
        });
        
        console.log('Response status:', response.status);
        console.log('Response headers:', Object.fromEntries(response.headers.entries()));
        
        const responseText = await response.text();
        console.log('Raw response text:', responseText);
        
        if (!response.ok) {
          console.error('Error response status:', response.status);
          console.error('Error response text:', responseText);
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        let responseData;
        try {
          responseData = responseText ? JSON.parse(responseText) : {};
          console.log('Parsed response data:', responseData);
        } catch (e) {
          console.warn('Failed to parse JSON response, using raw text');
          responseData = responseText;
        }
      
        console.log('API Response:', responseData);
        setCallStatus('called');
        return; // Success case, exit the function
      } catch (innerError) {
        console.error('Error in API call:', innerError);
        throw innerError; // Re-throw to be caught by outer catch
      }
    } catch (error: unknown) {
      let errorMessage = 'Failed to initiate call';
      
      if (error instanceof Error) {
        console.error('Error details:', {
          name: error.name,
          message: error.message,
          stack: error.stack,
          fullError: JSON.stringify(error, Object.getOwnPropertyNames(error))
        });
        errorMessage = error.message;
      } else if (typeof error === 'string') {
        errorMessage = error;
      }
      
      alert(`Failed to initiate call: ${errorMessage}`);
      setCallStatus('idle');
    }
  };

  const resetCall = () => {
    setCallStatus('idle');
    setPhoneNumber('');
  };

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
                  <div className="w-20 h-20 rounded-full border border-white/10 flex items-center justify-center mb-4">
                    {/* Twilio logo placeholder */}
                  </div>
                  <h3 className="text-lg font-medium text-white mb-2">Twilio</h3>
                  <p className="text-sm text-gray-300 mb-4">Receive a phone call from our voice assistant.</p>
                  
                  <div className="w-full space-y-3">
                    {callStatus === 'idle' ? (
                      <>
                        <div className="space-y-2">
                          <Input
                            type="tel"
                            placeholder="Enter phone number"
                            className="bg-white/5 border-white/20 text-white placeholder-gray-400"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                          />
                          <p className="text-xs text-gray-400 text-left">Include country code (e.g., +1 for US)</p>
                        </div>
                        <Button 
                          className="w-full bg-primary hover:bg-primary/90"
                          onClick={handleCallMe}
                          disabled={!phoneNumber}
                        >
                          <Phone className="w-4 h-4 mr-2" />
                          Get a Call
                        </Button>
                      </>
                    ) : callStatus === 'calling' ? (
                      <div className="py-4 text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-2"></div>
                        <p className="text-sm text-gray-300">Initiating call to {phoneNumber}...</p>
                      </div>
                    ) : (
                      <div className="text-center py-4">
                        <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-2" />
                        <p className="text-green-400 font-medium mb-2">Call initiated!</p>
                        <p className="text-sm text-gray-300 mb-4">You should receive a call shortly on {phoneNumber}.</p>
                        <Button 
                          variant="outline" 
                          className="border-white/20 text-white hover:bg-white/10"
                          onClick={resetCall}
                        >
                          Call Another Number
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
              
              {/* WhatsApp Integration Card - Coming Soon */}
              <Card className="bg-white/5 border-white/10 opacity-70">
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <div className="w-20 h-20 rounded-full border border-white/10 flex items-center justify-center mb-4">
                    {/* WhatsApp logo placeholder */}
                  </div>
                  <h3 className="text-lg font-medium text-white mb-2">WhatsApp</h3>
                  <p className="text-sm text-gray-300 mb-4">Coming Soon</p>
                  <Button 
                    variant="outline" 
                    className="w-full border-white/20 text-white hover:bg-white/10"
                    disabled
                  >
                    Connect WhatsApp
                  </Button>
                </CardContent>
              </Card>
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
            <div className="gradient-divider mb-6"></div>
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
          <div className="gradient-divider"></div>
          <div className="p-4">
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
        <main className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            <div className="gradient-divider mb-8"></div>
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}