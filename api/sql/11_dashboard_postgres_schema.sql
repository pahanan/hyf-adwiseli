-- Table to track profile & link clicks at brand level
CREATE TABLE "BrandProfileClick" (
    "id" SERIAL PRIMARY KEY,
    "brandId" TEXT NOT NULL,
    "clicks" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
    
    CONSTRAINT "BrandProfileClick_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "Brand"("id") ON DELETE CASCADE
);

-- Table to track earnings (for influencer or brand if needed)
CREATE TABLE "Earnings" (
    "id" SERIAL PRIMARY KEY,
    "influencerId" TEXT,
    "brandId" TEXT,
    "amount" NUMERIC(10,2) NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'DKK',
    "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),

    CONSTRAINT "Earnings_influencerId_fkey" FOREIGN KEY ("influencerId") REFERENCES "Influencer"("id") ON DELETE SET NULL,
    CONSTRAINT "Earnings_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "Brand"("id") ON DELETE SET NULL
);

-- Table to link videos to campaigns directly
CREATE TABLE "CampaignVideo" (
    "id" SERIAL PRIMARY KEY,
    "campaignId" TEXT NOT NULL,
    "videoId" TEXT NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),

    CONSTRAINT "CampaignVideo_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign"("id") ON DELETE CASCADE,
    CONSTRAINT "CampaignVideo_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "InfluencerVideo"("id") ON DELETE CASCADE
);

-- Optionally: table to store time series performance data (for graph)
CREATE TABLE "PerformanceMetric" (
    "id" SERIAL PRIMARY KEY,
    "brandId" TEXT,
    "influencerId" TEXT,
    "metricType" TEXT NOT NULL, -- e.g. 'views', 'likes', 'shares'
    "value" INTEGER NOT NULL,
    "recordedAt" TIMESTAMP NOT NULL DEFAULT NOW(),

    CONSTRAINT "PerformanceMetric_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "Brand"("id") ON DELETE CASCADE,
    CONSTRAINT "PerformanceMetric_influencerId_fkey" FOREIGN KEY ("influencerId") REFERENCES "Influencer"("id") ON DELETE CASCADE
);
