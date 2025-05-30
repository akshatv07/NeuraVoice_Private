import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";
import type { VoiceAgent } from "@shared/schema";

export default function Dashboard() {
  const { user, isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState("Assembly");
  const [agentGoal, setAgentGoal] = useState("");
  const [createdAgent, setCreatedAgent] = useState<{name: string, id: string} | null>(null);

  // Redirect if not authenticated
  if (!isAuthenticated) {
    setLocation("/");
    return null;
  }

  // Fetch voice agents
  const { data: voiceAgents = [] as VoiceAgent[], isLoading } = useQuery<VoiceAgent[]>({
    queryKey: ["/api/voice-agents"],
    enabled: isAuthenticated,
  });

  // Create voice agent mutation
  const createAgentMutation = useMutation({
    mutationFn: async (data: { name: string; goal: string }) => {
      const response = await apiRequest("POST", "/api/voice-agents", data);
      return response.json();
    },
    onSuccess: (data) => {
      setCreatedAgent({ name: data.name, id: data.id });
      queryClient.invalidateQueries({ queryKey: ["/api/voice-agents"] });
      toast({
        title: "Success",
        description: "Voice agent created successfully!",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create voice agent. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleCreateAgent = () => {
    if (!agentGoal.trim()) {
      toast({
        title: "Error",
        description: "Please define a goal for your voice agent.",
        variant: "destructive",
      });
      return;
    }

    createAgentMutation.mutate({
      name: `Agent ${Date.now()}`,
      goal: agentGoal,
    });
  };

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
              <h1 className="text-3xl font-bold text-white mb-2">
                {activeTab === "Assembly" && "Voice Agent Assembly"}
                {activeTab === "Test" && "Test Your Agent"}
                {activeTab === "Overview" && "Performance Overview"}
                {activeTab === "Settings" && "Account Settings"}
              </h1>
              <p className="text-gray-300">
                {activeTab === "Assembly" && "Create and configure your intelligent voice agent"}
                {activeTab === "Test" && "Test your voice agent's responses and behavior"}
                {activeTab === "Overview" && "Monitor your agent's performance and analytics"}
                {activeTab === "Settings" && "Manage your account and preferences"}
              </p>
            </div>
            <Button
              onClick={() => toast({ title: "Progress saved!", description: "Your work has been saved successfully." })}
              className="bg-gradient-to-r from-primary to-secondary text-white hover:from-primary/80 hover:to-secondary/80 transition-all duration-300"
            >
              <i className="fas fa-save mr-2"></i>
              Save Progress
            </Button>
          </div>

          {/* Content based on active tab */}
          {activeTab === "Assembly" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
              {/* Knowledge Base Section */}
              <div className="lg:col-span-2 space-y-6">
                <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <i className="fas fa-database text-primary"></i>
                      Knowledge Base
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center hover:border-primary/50 transition-colors duration-300">
                      <i className="fas fa-cloud-upload-alt text-4xl text-gray-400 mb-4"></i>
                      <p className="text-gray-300 mb-2">Upload your documents, FAQs, or knowledge base</p>
                      <p className="text-sm text-gray-400 mb-4">Supports PDF, DOC, TXT files</p>
                      <Button className="bg-primary hover:bg-primary/80 text-white">
                        <i className="fas fa-plus mr-2"></i>
                        Add Files
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Voice Selection */}
                <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <i className="fas fa-microphone text-secondary"></i>
                      Voice Selection
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {[
                        { name: "Alex", type: "Professional Male", color: "from-blue-500 to-blue-600" },
                        { name: "Sarah", type: "Friendly Female", color: "from-pink-500 to-pink-600" },
                        { name: "Custom", type: "Upload Voice", color: "from-green-500 to-green-600", isCustom: true }
                      ].map((voice, index) => (
                        <div
                          key={index}
                          className="bg-white/10 border border-white/20 rounded-lg p-4 text-center hover:bg-white/20 transition-all duration-300 cursor-pointer"
                        >
                          <div className={`w-12 h-12 bg-gradient-to-r ${voice.color} rounded-full flex items-center justify-center mx-auto mb-3`}>
                            <i className={`fas fa-${voice.isCustom ? 'plus' : 'user'} text-white`}></i>
                          </div>
                          <p className="text-white font-medium">{voice.name}</p>
                          <p className="text-xs text-gray-400">{voice.type}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Configuration Panel */}
              <div className="space-y-6">
                {/* Goal Setting */}
                <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <i className="fas fa-bullseye text-accent"></i>
                      Agent Goal
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      value={agentGoal}
                      onChange={(e) => setAgentGoal(e.target.value)}
                      className="w-full bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-primary"
                      rows={4}
                      placeholder="Define your voice agent's primary objective..."
                    />
                  </CardContent>
                </Card>

                {/* Quick Stats */}
                <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                  <CardHeader>
                    <CardTitle className="text-white">Agent Status</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Training Status</span>
                      <span className="text-yellow-400">In Progress</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Voice Model</span>
                      <span className="text-green-400">Ready</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Integration</span>
                      <span className="text-gray-400">Pending</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Create Agent Button */}
                <Button
                  onClick={handleCreateAgent}
                  disabled={createAgentMutation.isPending}
                  className="w-full bg-gradient-to-r from-accent to-coral text-white font-semibold py-3 hover:from-accent/80 hover:to-coral/80 transition-all duration-300 transform hover:scale-105"
                >
                  {createAgentMutation.isPending ? (
                    <>
                      <i className="fas fa-spinner fa-spin mr-2"></i>
                      Creating...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-plus mr-2"></i>
                      Create Agent
                    </>
                  )}
                </Button>

                {/* Test Button */}
                <Button
                  onClick={() => setActiveTab("Test")}
                  className="w-full bg-gradient-to-r from-primary to-secondary text-white font-semibold py-3 hover:from-primary/80 hover:to-secondary/80 transition-all duration-300"
                >
                  <i className="fas fa-play mr-2"></i>
                  Test Agent
                </Button>
              </div>
            </motion.div>
          )}

          {activeTab === "Test" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl mx-auto"
            >
              <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                <CardContent className="p-8">
                  {createdAgent || (voiceAgents && voiceAgents.length > 0) ? (
                    <div className="text-center">
                      <div className="flex items-center justify-center mb-6">
                        <div className="w-24 h-24 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full flex items-center justify-center">
                          <i className="fas fa-robot text-4xl text-primary"></i>
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {createdAgent ? createdAgent.name : voiceAgents[0].name}
                      </h3>
                      <p className="text-gray-300 mb-8">
                        {createdAgent 
                          ? "Your voice assistant is ready for testing!" 
                          : `Test your ${voiceAgents[0].name} voice assistant's responses and behavior.`}
                      </p>
                      <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button
                          className="bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 text-lg hover:from-primary/90 hover:to-secondary/90 transition-all duration-300"
                          onClick={() => toast({ 
                            title: "Test Session Started", 
                            description: `Testing ${createdAgent ? createdAgent.name : voiceAgents[0].name} voice assistant.` 
                          })}
                        >
                          <i className="fas fa-play mr-2"></i>
                          Start Test Session
                        </Button>
                        <Button
                          variant="outline"
                          className="border-white/20 text-gray-300 hover:text-white px-8 py-4 text-lg"
                          onClick={() => setActiveTab("Assembly")}
                        >
                          <i className="fas fa-cog mr-2"></i>
                          Configure Agent
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center">
                      <i className="fas fa-microphone text-6xl text-gray-400 mb-6"></i>
                      <h3 className="text-2xl font-bold text-white mb-2">No Voice Assistant Created</h3>
                      <p className="text-gray-300 mb-8">
                        Create your first voice assistant to get started with automated conversations.
                      </p>
                      <Button
                        className="bg-gradient-to-r from-primary to-secondary text-white px-8 py-4 text-lg"
                        onClick={() => setActiveTab("Assembly")}
                      >
                        <i className="fas fa-plus mr-2"></i>
                        Create Voice Assistant
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )}

          {activeTab === "Overview" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                <CardContent className="p-6 text-center">
                  <i className="fas fa-chart-line text-4xl text-primary mb-4"></i>
                  <h3 className="text-xl font-bold text-white mb-2">Total Conversations</h3>
                  <p className="text-3xl font-bold text-accent">1,234</p>
                </CardContent>
              </Card>
              <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                <CardContent className="p-6 text-center">
                  <i className="fas fa-clock text-4xl text-secondary mb-4"></i>
                  <h3 className="text-xl font-bold text-white mb-2">Avg. Duration</h3>
                  <p className="text-3xl font-bold text-coral">3:42</p>
                </CardContent>
              </Card>
              <Card className="bg-white/5 backdrop-blur-sm border-white/10">
                <CardContent className="p-6 text-center">
                  <i className="fas fa-thumbs-up text-4xl text-green-400 mb-4"></i>
                  <h3 className="text-xl font-bold text-white mb-2">Success Rate</h3>
                  <p className="text-3xl font-bold text-green-400">94%</p>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {activeTab === "Settings" && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="bg-white/5 backdrop-blur-sm border-white/10 max-w-2xl mx-auto">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-white mb-6">Account Settings</h3>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-white mb-2">Email</label>
                      <div className="w-full bg-white/10 border border-white/20 rounded-lg p-3 text-gray-400">
                        {user?.email || "No email provided"}
                      </div>
                    </div>
                    <div>
                      <label className="block text-white mb-2">Name</label>
                      <div className="w-full bg-white/10 border border-white/20 rounded-lg p-3 text-gray-400">
                        {user?.firstName && user?.lastName
                          ? `${user.firstName} ${user.lastName}`
                          : user?.firstName || "No name provided"}
                      </div>
                    </div>
                    <Button className="w-full bg-gradient-to-r from-primary to-secondary text-white">
                      Update Settings
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Voice Agents List */}
          {isLoading ? (
            <div className="text-center text-gray-300 mt-8">
              <i className="fas fa-spinner fa-spin text-2xl mb-2"></i>
              <p>Loading voice agents...</p>
            </div>
          ) : activeTab === "Assembly" ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-8"
            >
              <h3 className="text-xl font-bold text-white mb-4">
                {voiceAgents.length > 0 ? 'Your Voice Agents' : 'Your Voice Assistant'}
              </h3>
              
              {voiceAgents.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {voiceAgents.map((agent: VoiceAgent) => (
                    <Card key={agent.id} className="bg-white/5 backdrop-blur-sm border-white/10">
                      <CardContent className="p-4">
                        <h4 className="text-white font-semibold mb-2">{agent.name}</h4>
                        <p className="text-gray-300 text-sm mb-3 line-clamp-2">{agent.goal}</p>
                        <div className="flex justify-between items-center">
                          <span className={`text-xs px-2 py-1 rounded ${
                            agent.status === 'ready' ? 'bg-green-500/20 text-green-400' :
                            agent.status === 'training' ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-gray-500/20 text-gray-400'
                          }`}>
                            {agent.status}
                          </span>
                          <div className="flex gap-2">
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="border-white/20 text-gray-300 hover:text-white"
                              onClick={() => setActiveTab("Test")}
                            >
                              <i className="fas fa-play mr-1"></i>
                              Test
                            </Button>
                            <Button size="sm" variant="outline" className="border-white/20 text-gray-300 hover:text-white">
                              Edit
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : createdAgent ? (
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-8 text-center">
                  <i className="fas fa-robot text-6xl text-green-400 mb-4"></i>
                  <h3 className="text-2xl font-semibold text-white mb-2">{createdAgent.name}</h3>
                  <p className="text-gray-400 mb-6">Your voice assistant is ready to test!</p>
                  <div className="flex justify-center gap-4">
                    <Button
                      onClick={() => setActiveTab("Test")}
                      className="bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700"
                    >
                      <i className="fas fa-play mr-2"></i>
                      Test Now
                    </Button>
                    <Button
                      variant="outline"
                      className="border-white/20 text-gray-300 hover:text-white"
                    >
                      <i className="fas fa-cog mr-2"></i>
                      Configure
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="bg-white/5 backdrop-blur-sm border border-dashed border-white/20 rounded-lg p-8 text-center">
                  <i className="fas fa-robot text-6xl text-gray-400 mb-4"></i>
                  <h3 className="text-2xl font-semibold text-white mb-2">No Voice Assistants Yet</h3>
                  <p className="text-gray-400 mb-6">Create your first voice assistant to get started</p>
                  <Button
                    className="bg-gradient-to-r from-primary to-secondary text-white hover:from-primary/80 hover:to-secondary/80"
                  >
                    <i className="fas fa-plus mr-2"></i>
                    Create Voice Assistant
                  </Button>
                </div>
              )}
            </motion.div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
