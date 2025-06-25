-- PostgreSQL Schema based on auth.prisma
-- Enums
CREATE TYPE "AdwiseliPlatform" AS ENUM ('INFLUENCER', 'BRAND');

-- User table
CREATE TABLE "User" (
    "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT UNIQUE NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Influencer table
CREATE TABLE "Influencer" (
    "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "email" TEXT UNIQUE NOT NULL,
    "password" TEXT NOT NULL,
    "fullName" TEXT,
    "country" TEXT,
    "gender" TEXT,
    "birthday" TIMESTAMP,
    "interests" INTEGER[],
    "lastActiveAt" TIMESTAMP,
    "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
    "onboarded" BOOLEAN NOT NULL DEFAULT false,
    "fake" BOOLEAN NOT NULL DEFAULT false
);

-- Session table
CREATE TABLE "Session" (
    "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "userId" TEXT,
    "influencerId" TEXT,
    "accessToken" TEXT UNIQUE NOT NULL,
    "refreshToken" TEXT UNIQUE NOT NULL,
    "expiresAt" TIMESTAMP NOT NULL,
    "refreshTokenExpiresAt" TIMESTAMP NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
    
    CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id"),
    CONSTRAINT "Session_influencerId_fkey" FOREIGN KEY ("influencerId") REFERENCES "Influencer"("id")
);

-- Indexes for User table
CREATE INDEX "User_email_idx" ON "User"("email");

-- Indexes for Influencer table
CREATE INDEX "Influencer_id_idx" ON "Influencer"("id");
CREATE INDEX "Influencer_fullName_idx" ON "Influencer"("fullName");
CREATE INDEX "Influencer_id_fullName_gender_idx" ON "Influencer"("id", "fullName", "gender");
CREATE INDEX "Influencer_email_idx" ON "Influencer"("email");

-- Indexes for Session table
CREATE INDEX "Session_userId_idx" ON "Session"("userId");
CREATE INDEX "Session_influencerId_idx" ON "Session"("influencerId");
CREATE INDEX "Session_accessToken_idx" ON "Session"("accessToken");
CREATE INDEX "Session_refreshToken_idx" ON "Session"("refreshToken"); 