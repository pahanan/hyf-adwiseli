-- PostgreSQL Schema based on social-accounts.prisma
-- Enums
CREATE TYPE "SocialAccountType" AS ENUM ('TIKTOK');

-- SocialAccount table
CREATE TABLE "SocialAccount" (
    "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "type" "SocialAccountType" NOT NULL DEFAULT 'TIKTOK',
    "active" BOOLEAN NOT NULL DEFAULT false,
    "influencerId" TEXT,
    "socialId" TEXT NOT NULL,
    "refreshToken" TEXT,
    "refreshTokenExpiresAt" TIMESTAMP,
    "accessToken" TEXT,
    "accessTokenExpiresAt" TIMESTAMP,
    "lastInsightsFetchAt" TIMESTAMP,
    "lastOAuthRefreshAt" TIMESTAMP,
    "fullName" TEXT,
    "username" TEXT NOT NULL,
    "profilePictureId" TEXT,
    "profilePictureProvider" "StorageProvider",
    "bio" TEXT,
    "followers" INTEGER,
    "engagementRate" REAL,
    "averageViews" REAL,
    "medianViews" REAL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
    
    "audienceCountry1" TEXT,
    "audienceCountry1Percentage" REAL,
    "audienceCountry2" TEXT,
    "audienceCountry2Percentage" REAL,
    "audienceCountry3" TEXT,
    "audienceCountry3Percentage" REAL,
    "audienceCountryOtherPercentage" REAL,
    "audienceMalePercentage" REAL,
    "audienceFemalePercentage" REAL,
    "audienceOtherPercentage" REAL,
    "audience18Percentage" REAL,
    "audience25Percentage" REAL,
    "audience35Percentage" REAL,
    "audience45Percentage" REAL,
    "audience55Percentage" REAL,
    
    CONSTRAINT "SocialAccount_influencerId_fkey" FOREIGN KEY ("influencerId") REFERENCES "Influencer"("id") ON DELETE SET NULL,
    CONSTRAINT "SocialAccount_profilePictureId_fkey" FOREIGN KEY ("profilePictureId") REFERENCES "StorageFile"("id"),
    
    CONSTRAINT "SocialAccount_type_socialId_unique" UNIQUE ("type", "socialId")
);

-- Indexes for SocialAccount table
CREATE INDEX "SocialAccount_type_idx" ON "SocialAccount"("type");
CREATE INDEX "SocialAccount_active_idx" ON "SocialAccount"("active");
CREATE INDEX "SocialAccount_socialId_idx" ON "SocialAccount"("socialId");
CREATE INDEX "SocialAccount_followers_idx" ON "SocialAccount"("followers");
CREATE INDEX "SocialAccount_engagementRate_idx" ON "SocialAccount"("engagementRate");
CREATE INDEX "SocialAccount_averageViews_idx" ON "SocialAccount"("averageViews");
CREATE INDEX "SocialAccount_medianViews_idx" ON "SocialAccount"("medianViews");
CREATE INDEX "SocialAccount_influencerId_type_active_idx" ON "SocialAccount"("influencerId", "type", "active");
CREATE INDEX "SocialAccount_type_username_idx" ON "SocialAccount"("type", "username");
CREATE INDEX "SocialAccount_influencerId_type_followers_idx" ON "SocialAccount"("influencerId", "type", "followers");
CREATE INDEX "SocialAccount_influencerId_type_engagementRate_idx" ON "SocialAccount"("influencerId", "type", "engagementRate");
CREATE INDEX "SocialAccount_influencerId_type_medianViews_idx" ON "SocialAccount"("influencerId", "type", "medianViews"); 