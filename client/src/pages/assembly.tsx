import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useLocation } from "wouter";

export default function Assembly() {
  const { user, isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState("Assembly");

  // Redirect if not authenticated
  if (!isAuthenticated) {
    setLocation("/");
    return null;
  }

  const handleLogout = () => {
    window.location.href = "/api/logout";
  };

  const sidebarItems = [
    { id: "Assembly", icon: "fas fa-cogs", label: "Assembly" },
    { id: "Test", icon: "fas fa-play", label: "Test" },
    { id: "Overview", icon: "fas fa-chart-bar", label: "Overview" },
    { id: "Settings", icon: "fas fa-cog", label: "Settings" },
  ];

  return (
    <div className="min-h-screen bg-dark-navy">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-midnight/80 backdrop-blur-sm border-r border-white/10 min-h-screen">
          <div className="p-6">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-lg flex items-center justify-center">
                <i className="fas fa-brain text-white"></i>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                NeuraVoice
              </span>
            </div>

            <nav className="space-y-2 mb-8">
              {sidebarItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                    activeTab === item.id
                      ? "text-white bg-primary/20 border border-primary/30"
                      : "text-gray-300 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <i className={item.icon}></i>
                  <span>{item.label}</span>
                </button>
              ))}
            </nav>

            {/* User Info */}
            <div className="border-t border-white/10 pt-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-accent to-coral rounded-full flex items-center justify-center">
                  <i className="fas fa-user text-white text-sm"></i>
                </div>
                <div>
                  <p className="text-white text-sm font-medium">
                    {user?.firstName || user?.email || "User"}
                  </p>
                  <p className="text-gray-400 text-xs">Pro Plan</p>
                </div>
              </div>
              <Button
                onClick={handleLogout}
                variant="outline"
                size="sm"
                className="w-full border-white/20 text-gray-300 hover:text-white hover:bg-white/10"
              >
                <i className="fas fa-sign-out-alt mr-2"></i>
                Logout
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Voice Agent Assembly</h1>
              <p className="text-gray-300">Create and configure your intelligent voice agent</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-gray-300">Cost: <span className="text-green-400">~$0.1/min</span></span>
                </div>
                <div className="flex items-center gap-1 ml-4">
                  <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                  <span className="text-gray-300">Latency: <span className="text-orange-400">~1900ms</span></span>
                </div>
              </div>
            </div>
          </div>

          {/* Assembly Configuration */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Configuration Panel */}
            <div className="xl:col-span-2 space-y-6">
              {/* STT (Speech-to-Text) */}
              <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <i className="fas fa-microphone text-primary"></i>
                    STT (Speech-to-Text)
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-gray-300">Provider Model</Label>
                    <Select defaultValue="neuravoice">
                      <SelectTrigger className="bg-white/10 border-white/20 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="neuravoice">NeuraVoice - 11 Labs</SelectItem>
                        <SelectItem value="deepgram">Deepgram</SelectItem>
                        <SelectItem value="amazon">Amazon Transcribe</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-gray-300">Voice Selection</Label>
                    <Select defaultValue="sample">
                      <SelectTrigger className="bg-white/10 border-white/20 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sample">Play from sample voices</SelectItem>
                        <SelectItem value="custom">Upload custom voice</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* TTS (Text-to-Speech) */}
              <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <i className="fas fa-volume-up text-secondary"></i>
                    TTS (Text-to-Speech)
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-gray-300">Prompt Configuration</Label>
                    <Textarea 
                      className="bg-white/10 border-white/20 text-white placeholder-gray-400 min-h-[100px]"
                      placeholder="Enter your voice generation prompt..."
                      defaultValue="Text based field -> Existing template for prompt, but should be editable."
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Knowledge Base */}
              <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <i className="fas fa-database text-accent"></i>
                    Knowledge Base
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center hover:border-primary/50 transition-colors duration-300">
                    <i className="fas fa-cloud-upload-alt text-4xl text-gray-400 mb-4"></i>
                    <p className="text-gray-300 mb-2">Upload documents, PDFs, URLs</p>
                    <p className="text-sm text-gray-400 mb-4">Supports PDF, DOC, TXT files</p>
                    <Button className="bg-primary hover:bg-primary/80 text-white">
                      <i className="fas fa-plus mr-2"></i>
                      Add Knowledge
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* LLM Configuration */}
              <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <i className="fas fa-brain text-coral"></i>
                    LLM (Large Language Model)
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-gray-300">Model Selection</Label>
                    <Select defaultValue="gpt4">
                      <SelectTrigger className="bg-white/10 border-white/20 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gpt4">GPT-4 (Top 4-5 models)</SelectItem>
                        <SelectItem value="claude">Claude 3.5 Sonnet</SelectItem>
                        <SelectItem value="gemini">Gemini Pro</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-gray-300">Model Cost & Performance</Label>
                    <div className="text-sm text-gray-400">Model list with cost estimates</div>
                  </div>
                </CardContent>
              </Card>

              {/* Use Case */}
              <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <i className="fas fa-target text-primary"></i>
                    Use Case
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div>
                    <Label className="text-gray-300">Industry & Use Case</Label>
                    <Select defaultValue="finance">
                      <SelectTrigger className="bg-white/10 border-white/20 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="finance">Finance & Banking - Sales Awareness/Promotional</SelectItem>
                        <SelectItem value="healthcare">Healthcare - Customer Support</SelectItem>
                        <SelectItem value="retail">Retail - Lead Generation</SelectItem>
                        <SelectItem value="education">Education - Information Assistant</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Panel - Agent Status & Actions */}
            <div className="space-y-6">
              {/* Agent Status */}
              <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Agent Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Configuration</span>
                    <span className="text-yellow-400">In Progress</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Voice Model</span>
                    <span className="text-green-400">Ready</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Knowledge Base</span>
                    <span className="text-gray-400">Pending</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Integration</span>
                    <span className="text-gray-400">Not Configured</span>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full bg-gradient-to-r from-primary to-secondary text-white">
                    <i className="fas fa-save mr-2"></i>
                    Save Configuration
                  </Button>
                  <Button className="w-full bg-gradient-to-r from-accent to-coral text-white">
                    <i className="fas fa-play mr-2"></i>
                    Test Agent
                  </Button>
                  <Button className="w-full border border-white/20 text-gray-300 hover:text-white hover:bg-white/10">
                    <i className="fas fa-download mr-2"></i>
                    Export Config
                  </Button>
                </CardContent>
              </Card>

              {/* Performance Metrics */}
              <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Performance</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-300 text-sm">Cost Efficiency</span>
                      <span className="text-green-400 text-sm">85%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-gradient-to-r from-green-400 to-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-300 text-sm">Response Speed</span>
                      <span className="text-orange-400 text-sm">72%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-gradient-to-r from-orange-400 to-orange-500 h-2 rounded-full" style={{ width: '72%' }}></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}