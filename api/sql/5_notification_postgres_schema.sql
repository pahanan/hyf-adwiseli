-- PostgreSQL Schema based on notification.prisma

-- Notification table
CREATE TABLE "Notification" (
    "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "influencerId" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "url" TEXT,
    "iconId" TEXT,
    "iconProvider" "StorageProvider",
    "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
    
    CONSTRAINT "Notification_influencerId_fkey" FOREIGN KEY ("influencerId") REFERENCES "Influencer"("id")
);

-- Index for Notification table
CREATE INDEX "Notification_influencerId_idx" ON "Notification"("influencerId");
CREATE INDEX "Notification_createdAt_idx" ON "Notification"("createdAt");

-- Mock data for Notification table

