-- PostgreSQL Schema based on other.prisma
-- Interest table
CREATE TABLE "Interest" (
    "id" SERIAL PRIMARY KEY,
    "name" TEXT UNIQUE NOT NULL,
    "createdAt" TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Indexes for Interest table
CREATE INDEX "Interest_name_idx" ON "Interest"("name"); 