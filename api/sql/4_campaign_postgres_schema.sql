-- PostgreSQL Schema based on campaign.prisma
-- Enums
CREATE TYPE "CampaignGoal" AS ENUM ('AWARENESS', 'PROMOTION', 'SALES', 'TRAFFIC');
CREATE TYPE "CampaignContentType" AS ENUM ('INFLUENCER', 'UGC');
CREATE TYPE "CampaignStatus" AS ENUM ('GENERATING', 'PENDING', 'ACTIVE', 'CANCELLED');
CREATE TYPE "CampaignOfferStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED');

-- Campaign table
CREATE TABLE "Campaign" (
    "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "brandId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "status" "CampaignStatus" NOT NULL,
    "goal" "CampaignGoal" NOT NULL,
    "contentType" "CampaignContentType" NOT NULL,
    "creatorAmount" INTEGER NOT NULL,
    "creatorAgeRange" INTEGER[] NOT NULL,
    "audienceCountries" TEXT[] NOT NULL,
    "creatorInterests" INTEGER[] NOT NULL,
    "audienceAgeDistribution" JSONB NOT NULL,
    "audienceGenderDistribution" JSONB NOT NULL,
    "minimumFollowers" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
    
    CONSTRAINT "Campaign_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "Brand"("id")
);

-- CampaignOffer table
CREATE TABLE "CampaignOffer" (
    "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "campaignId" TEXT NOT NULL,
    "status" "CampaignOfferStatus" NOT NULL DEFAULT 'PENDING',
        CONSTRAINT "CampaignOffer_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign"("id") ON DELETE CASCADE
);

-- CampaignCreatorMatchmakingResult table
CREATE TABLE "CampaignCreatorMatchmakingResult" (
    "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "campaignId" TEXT NOT NULL,
    "offerId" TEXT NOT NULL,
    "influencerId" TEXT NOT NULL,
    "overallScore" REAL NOT NULL,
    "interestScore" REAL NOT NULL,
    "influencerAgeScore" REAL NOT NULL,
    "audienceAgeScore" REAL NOT NULL,
    "audienceCountriesScore" REAL NOT NULL,
    "audienceGenderScore" REAL NOT NULL,
    "performanceMetricsScore" REAL NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
    
    CONSTRAINT "CampaignCreatorMatchmakingResult_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign"("id") ON DELETE CASCADE,
    CONSTRAINT "CampaignCreatorMatchmakingResult_offerId_fkey" FOREIGN KEY ("offerId") REFERENCES "CampaignOffer"("id") ON DELETE CASCADE,
    CONSTRAINT "CampaignCreatorMatchmakingResult_influencerId_fkey" FOREIGN KEY ("influencerId") REFERENCES "Influencer"("id") ON DELETE CASCADE
);

-- Indexes for Campaign table
CREATE INDEX "Campaign_brandId_idx" ON "Campaign"("brandId");
CREATE INDEX "Campaign_status_idx" ON "Campaign"("status");

-- Indexes for CampaignOffer table
CREATE INDEX "CampaignOffer_campaignId_idx" ON "CampaignOffer"("campaignId");
CREATE INDEX "CampaignOffer_status_idx" ON "CampaignOffer"("status");

-- Indexes for CampaignCreatorMatchmakingResult table
CREATE INDEX "CampaignCreatorMatchmakingResult_campaignId_idx" ON "CampaignCreatorMatchmakingResult"("campaignId");
CREATE INDEX "CampaignCreatorMatchmakingResult_offerId_idx" ON "CampaignCreatorMatchmakingResult"("offerId");
CREATE INDEX "CampaignCreatorMatchmakingResult_influencerId_idx" ON "CampaignCreatorMatchmakingResult"("influencerId"); 