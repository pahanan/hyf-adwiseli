-- PostgreSQL Schema based on brand.prisma
-- Enums
CREATE TYPE "BrandRole" AS ENUM ('OWNER', 'ADMIN');

-- Brand table
CREATE TABLE "Brand" (
    "id" TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    "name" TEXT NOT NULL,
    "iconId" TEXT,
    "iconProvider" "StorageProvider",
    "createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

-- BrandUser table
CREATE TABLE "BrandUser" (
    "id" SERIAL PRIMARY KEY,
    "brandId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "role" "BrandRole" NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
    
    CONSTRAINT "BrandUser_brandId_fkey" FOREIGN KEY ("brandId") REFERENCES "Brand"("id") ON DELETE CASCADE,
    CONSTRAINT "BrandUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE,
    
    CONSTRAINT "BrandUser_brandId_userId_unique" UNIQUE ("brandId", "userId")
);

-- Indexes for Brand table
CREATE INDEX "Brand_id_idx" ON "Brand"("id");

-- Indexes for BrandUser table
CREATE INDEX "BrandUser_brandId_idx" ON "BrandUser"("brandId");
CREATE INDEX "BrandUser_userId_idx" ON "BrandUser"("userId"); 