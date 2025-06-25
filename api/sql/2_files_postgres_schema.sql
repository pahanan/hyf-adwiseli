-- PostgreSQL Schema based on files.prisma
-- Enums
CREATE TYPE "MediaType" AS ENUM ('IMAGE', 'VIDEO', 'FILE');
CREATE TYPE "StorageProvider" AS ENUM ('R2', 'S3');

-- StorageFile table
CREATE TABLE "StorageFile" (
    "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "influencerId" TEXT,
    "brandId" TEXT,
    "userId" TEXT,
    "type" "MediaType" NOT NULL,
    "mimeType" TEXT NOT NULL,
    "bytes" BIGINT NOT NULL,
    "provider" "StorageProvider" NOT NULL DEFAULT 'R2',
    "createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Indexes for StorageFile table
CREATE INDEX "StorageFile_influencerId_idx" ON "StorageFile"("influencerId");
CREATE INDEX "StorageFile_brandId_idx" ON "StorageFile"("brandId");
CREATE INDEX "StorageFile_userId_idx" ON "StorageFile"("userId");
