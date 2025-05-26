import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { insertVoiceAgentSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth middleware
  await setupAuth(app);

  // Auth routes
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Voice agents routes
  app.get("/api/voice-agents", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const agents = await storage.getVoiceAgentsByUser(userId);
      res.json(agents);
    } catch (error) {
      console.error("Error fetching voice agents:", error);
      res.status(500).json({ message: "Failed to fetch voice agents" });
    }
  });

  app.post("/api/voice-agents", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const validatedData = insertVoiceAgentSchema.parse({
        ...req.body,
        userId,
      });
      
      const agent = await storage.createVoiceAgent(validatedData);
      res.json(agent);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      console.error("Error creating voice agent:", error);
      res.status(500).json({ message: "Failed to create voice agent" });
    }
  });

  app.get("/api/voice-agents/:id", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const agentId = parseInt(req.params.id);
      
      const agent = await storage.getVoiceAgent(agentId);
      if (!agent || agent.userId !== userId) {
        return res.status(404).json({ message: "Voice agent not found" });
      }
      
      res.json(agent);
    } catch (error) {
      console.error("Error fetching voice agent:", error);
      res.status(500).json({ message: "Failed to fetch voice agent" });
    }
  });

  app.patch("/api/voice-agents/:id", isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const agentId = parseInt(req.params.id);
      
      const agent = await storage.getVoiceAgent(agentId);
      if (!agent || agent.userId !== userId) {
        return res.status(404).json({ message: "Voice agent not found" });
      }

      const updateData = insertVoiceAgentSchema.partial().parse(req.body);
      const updatedAgent = await storage.updateVoiceAgent(agentId, updateData);
      
      res.json(updatedAgent);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid data", errors: error.errors });
      }
      console.error("Error updating voice agent:", error);
      res.status(500).json({ message: "Failed to update voice agent" });
    }
  });

  // LiveKit integration placeholder
  app.post("/api/livekit/token", isAuthenticated, async (req: any, res) => {
    try {
      // This would integrate with LiveKit API for voice demo
      // For now, return a placeholder response
      res.json({ 
        message: "LiveKit integration would be implemented here",
        token: "placeholder_token"
      });
    } catch (error) {
      console.error("Error generating LiveKit token:", error);
      res.status(500).json({ message: "Failed to generate LiveKit token" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
