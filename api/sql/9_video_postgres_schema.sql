-- PostgreSQL Schema based on video.prisma
-- InfluencerVideo table
CREATE TABLE "InfluencerVideo" (
    "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "postId" TEXT NOT NULL,
    "platform" "SocialAccountType" NOT NULL,
    "socialAccountId" TEXT NOT NULL,
    
    "caption" TEXT,
    "shares" INTEGER NOT NULL DEFAULT 0,
    "saves" INTEGER NOT NULL DEFAULT 0,
    "share_url" TEXT,
    "audience_countries" TEXT,
    "impression_sources" TEXT,
    "full_video_watched_rate" REAL NOT NULL DEFAULT 0,
    "total_time_watched" REAL NOT NULL DEFAULT 0,
    "embed_url" TEXT,
    "reach" INTEGER NOT NULL DEFAULT 0,
    "video_duration" REAL NOT NULL DEFAULT 0,
    "thumbnail_url" TEXT,
    "likes" INTEGER NOT NULL DEFAULT 0,
    "average_time_watched" REAL NOT NULL DEFAULT 0,
    "video_views" INTEGER NOT NULL DEFAULT 0,
    "comments" INTEGER NOT NULL DEFAULT 0,
    
    "thumbnailId" TEXT,
    "thumbnailProvider" "StorageProvider",
    "videoId" TEXT,
    "videoProvider" "StorageProvider",
    
    "downloaded" BOOLEAN NOT NULL DEFAULT false,
    "downloadFailed" BOOLEAN NOT NULL DEFAULT false,
    "isAdVideo" BOOLEAN NOT NULL,
    
    "createdAt" TIMESTAMP NOT NULL,
    
    CONSTRAINT "InfluencerVideo_socialAccountId_fkey" FOREIGN KEY ("socialAccountId") REFERENCES "SocialAccount"("id") ON DELETE CASCADE,
    CONSTRAINT "InfluencerVideo_thumbnailId_fkey" FOREIGN KEY ("thumbnailId") REFERENCES "StorageFile"("id"),
    CONSTRAINT "InfluencerVideo_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "StorageFile"("id"),
    
    CONSTRAINT "InfluencerVideo_postId_platform_unique" UNIQUE ("postId", "platform")
);

-- Indexes for InfluencerVideo table
CREATE INDEX "InfluencerVideo_socialAccountId_isAdVideo_createdAt_idx" ON "InfluencerVideo"("socialAccountId", "isAdVideo", "createdAt");
CREATE INDEX "InfluencerVideo_socialAccountId_idx" ON "InfluencerVideo"("socialAccountId");
CREATE INDEX "InfluencerVideo_isAdVideo_idx" ON "InfluencerVideo"("isAdVideo");
CREATE INDEX "InfluencerVideo_video_views_idx" ON "InfluencerVideo"("video_views");
CREATE INDEX "InfluencerVideo_socialAccountId_downloaded_idx" ON "InfluencerVideo"("socialAccountId", "downloaded");
CREATE INDEX "InfluencerVideo_socialAccountId_downloaded_video_views_idx" ON "InfluencerVideo"("socialAccountId", "downloaded", "video_views");
CREATE INDEX "InfluencerVideo_downloaded_video_views_desc_idx" ON "InfluencerVideo"("downloaded", "video_views" DESC); 