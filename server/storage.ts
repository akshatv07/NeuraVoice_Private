import {
  users,
  voiceAgents,
  type User,
  type UpsertUser,
  type VoiceAgent,
  type InsertVoiceAgent,
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

// Interface for storage operations
export interface IStorage {
  // User operations (IMPORTANT) these user operations are mandatory for Replit Auth.
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  
  // Voice agent operations
  getVoiceAgentsByUser(userId: string): Promise<VoiceAgent[]>;
  getVoiceAgent(id: number): Promise<VoiceAgent | undefined>;
  createVoiceAgent(agent: InsertVoiceAgent): Promise<VoiceAgent>;
  updateVoiceAgent(id: number, data: Partial<InsertVoiceAgent>): Promise<VoiceAgent>;
}

export class DatabaseStorage implements IStorage {
  // User operations (IMPORTANT) these user operations are mandatory for Replit Auth.
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  // Voice agent operations
  async getVoiceAgentsByUser(userId: string): Promise<VoiceAgent[]> {
    return await db.select().from(voiceAgents).where(eq(voiceAgents.userId, userId));
  }

  async getVoiceAgent(id: number): Promise<VoiceAgent | undefined> {
    const [agent] = await db.select().from(voiceAgents).where(eq(voiceAgents.id, id));
    return agent;
  }

  async createVoiceAgent(agentData: InsertVoiceAgent): Promise<VoiceAgent> {
    const [agent] = await db
      .insert(voiceAgents)
      .values(agentData)
      .returning();
    return agent;
  }

  async updateVoiceAgent(id: number, data: Partial<InsertVoiceAgent>): Promise<VoiceAgent> {
    const [agent] = await db
      .update(voiceAgents)
      .set(data)
      .where(eq(voiceAgents.id, id))
      .returning();
    return agent;
  }
}

export const storage = new DatabaseStorage();