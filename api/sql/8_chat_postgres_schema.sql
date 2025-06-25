-- PostgreSQL Schema based on chat.prisma
-- Enums
CREATE TYPE "MessageSender" AS ENUM ('INFLUENCER', 'BRAND');
CREATE TYPE "MessageType" AS ENUM ('TEXT');

-- Conversation table
CREATE TABLE "Conversation" (
    "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "influencerId" TEXT NOT NULL,
    "brandId" TEXT NOT NULL,
    "campaignId" TEXT,
    "offerId" TEXT,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "deletedAt" TIMESTAMP,
    "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),

    CONSTRAINT "Conversation_influencerId_fkey" FOREIGN KEY ("influencerId") REFERENCES "Influencer"("id") ON DELETE CASCADE,
    CONSTRAINT "Conversation_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "Brand"("id") ON DELETE CASCADE,
    CONSTRAINT "Conversation_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign"("id") ON DELETE CASCADE,
    CONSTRAINT "Conversation_offerId_fkey" FOREIGN KEY ("offerId") REFERENCES "CampaignOffer"("id") ON DELETE CASCADE
);

-- Message table
CREATE TABLE "Message" (
    "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "conversationId" TEXT,
    "influencerId" TEXT NOT NULL,
    "brandId" TEXT NOT NULL,
    "sender" "MessageSender" NOT NULL,
    "type" "MessageType" NOT NULL,
    "message" TEXT,
    "attachmentId" TEXT UNIQUE,
    "read" BOOLEAN NOT NULL DEFAULT false,
    "readAt" TIMESTAMP,
    "deleted" BOOLEAN NOT NULL DEFAULT false,
    "deletedAt" TIMESTAMP,
    "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
    
    CONSTRAINT "Message_conversationId_fkey" FOREIGN KEY ("conversationId") REFERENCES "Conversation"("id"),
    CONSTRAINT "Message_influencerId_fkey" FOREIGN KEY ("influencerId") REFERENCES "Influencer"("id") ON DELETE CASCADE,
    CONSTRAINT "Message_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "Brand"("id") ON DELETE CASCADE,
    CONSTRAINT "Message_attachmentId_fkey" FOREIGN KEY ("attachmentId") REFERENCES "StorageFile"("id")
);

-- Indexes for Conversation table
CREATE INDEX "Conversation_influencerId_idx" ON "Conversation"("influencerId");
CREATE INDEX "Conversation_brandId_idx" ON "Conversation"("brandId");

-- Indexes for Message table
CREATE INDEX "Message_influencerId_idx" ON "Message"("influencerId");
CREATE INDEX "Message_brandId_idx" ON "Message"("brandId");
CREATE INDEX "Message_conversationId_idx" ON "Message"("conversationId"); 