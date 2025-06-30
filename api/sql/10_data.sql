-- Mock Data for Adwiseli Database
-- This file contains 3 mock entries for each table in the database

-- 1. Interest table (no dependencies)
INSERT INTO "Interest" ("id", "name", "createdAt") VALUES
(1, 'Fashion', NOW()),
(2, 'Beauty', NOW()),
(3, 'Technology', NOW()),
(4, 'Fitness', NOW()),
(5, 'Food', NOW()),
(6, 'Travel', NOW()),
(7, 'Gaming', NOW()),
(8, 'Education', NOW()),
(9, 'Entertainment', NOW()),
(10, 'Lifestyle', NOW());

-- 2. User table (no dependencies)
INSERT INTO "User" ("id", "firstName", "lastName", "email", "password", "createdAt") VALUES
('user-001', 'John', 'Smith', 'john.smith@example.com', '$2b$10$hashedpassword123', NOW() - INTERVAL '30 days'),
('user-002', 'Sarah', 'Johnson', 'sarah.johnson@example.com', '$2b$10$hashedpassword456', NOW() - INTERVAL '25 days'),
('user-003', 'Michael', 'Brown', 'michael.brown@example.com', '$2b$10$hashedpassword789', NOW() - INTERVAL '20 days');

-- 3. Influencer table (no dependencies)
INSERT INTO "Influencer" ("id", "email", "password", "fullName", "country", "gender", "birthday", "interests", "lastActiveAt", "createdAt", "onboarded", "fake") VALUES
('inf-001', 'emma.wilson@example.com', '$2b$10$hashedpassword123', 'Emma Wilson', 'United States', 'Female', '1995-03-15', ARRAY[1, 2, 4], NOW() - INTERVAL '2 hours', NOW() - INTERVAL '60 days', true, false),
('inf-002', 'alex.chen@example.com', '$2b$10$hashedpassword456', 'Alex Chen', 'Canada', 'Male', '1992-07-22', ARRAY[3, 7, 9], NOW() - INTERVAL '1 day', NOW() - INTERVAL '45 days', true, false),
('inf-003', 'maria.garcia@example.com', '$2b$10$hashedpassword789', 'Maria Garcia', 'Spain', 'Female', '1998-11-08', ARRAY[1, 5, 6], NOW() - INTERVAL '30 minutes', NOW() - INTERVAL '30 days', true, false);

-- 4. Brand table (no dependencies)
INSERT INTO "Brand" ("id", "name", "iconId", "iconProvider", "createdAt") VALUES
('brand-001', 'TechCorp Solutions', 'icon-001', 'R2', NOW() - INTERVAL '90 days'),
('brand-002', 'Fashion Forward', 'icon-002', 'R2', NOW() - INTERVAL '75 days'),
('brand-003', 'Healthy Living Co', 'icon-003', 'R2', NOW() - INTERVAL '60 days');

-- 5. BrandUser table (depends on User and Brand)
INSERT INTO "BrandUser" ("id", "brandId", "userId", "role", "createdAt") VALUES
(1, 'brand-001', 'user-001', 'OWNER', NOW() - INTERVAL '90 days'),
(2, 'brand-002', 'user-002', 'OWNER', NOW() - INTERVAL '75 days'),
(3, 'brand-003', 'user-003', 'OWNER', NOW() - INTERVAL '60 days');

-- 6. StorageFile table (depends on Influencer, Brand, User)
INSERT INTO "StorageFile" ("id", "influencerId", "brandId", "userId", "type", "mimeType", "bytes", "provider", "createdAt") VALUES
('file-001', 'inf-001', NULL, NULL, 'IMAGE', 'image/jpeg', 2048576, 'R2', NOW() - INTERVAL '10 days'),
('file-002', NULL, 'brand-001', NULL, 'IMAGE', 'image/png', 1536000, 'R2', NOW() - INTERVAL '15 days'),
('file-003', 'inf-002', NULL, NULL, 'VIDEO', 'video/mp4', 52428800, 'R2', NOW() - INTERVAL '5 days'),
('file-004', NULL, NULL, 'user-001', 'FILE', 'application/pdf', 1048576, 'R2', NOW() - INTERVAL '20 days'),
('file-005', 'inf-003', NULL, NULL, 'IMAGE', 'image/jpeg', 3072000, 'R2', NOW() - INTERVAL '8 days'),
('file-006', NULL, 'brand-002', NULL, 'IMAGE', 'image/png', 2048576, 'R2', NOW() - INTERVAL '12 days');

-- 7. SocialAccount table (depends on Influencer and StorageFile)
INSERT INTO "SocialAccount" ("id", "type", "active", "influencerId", "socialId", "refreshToken", "refreshTokenExpiresAt", "accessToken", "accessTokenExpiresAt", "lastInsightsFetchAt", "lastOAuthRefreshAt", "fullName", "username", "profilePictureId", "profilePictureProvider", "bio", "followers", "engagementRate", "averageViews", "medianViews", "createdAt", "audienceCountry1", "audienceCountry1Percentage", "audienceCountry2", "audienceCountry2Percentage", "audienceCountry3", "audienceCountry3Percentage", "audienceCountryOtherPercentage", "audienceMalePercentage", "audienceFemalePercentage", "audienceOtherPercentage", "audience18Percentage", "audience25Percentage", "audience35Percentage", "audience45Percentage", "audience55Percentage") VALUES
('social-001', 'TIKTOK', true, 'inf-001', 'tiktok_123456', 'refresh_token_1', NOW() + INTERVAL '30 days', 'access_token_1', NOW() + INTERVAL '2 hours', NOW() - INTERVAL '1 hour', NOW() - INTERVAL '1 day', 'Emma Wilson', '@emmawilson', 'file-001', 'R2', 'Fashion & Lifestyle Creator', 125000, 4.2, 85000, 75000, NOW() - INTERVAL '50 days', 'United States', 65.0, 'Canada', 15.0, 'United Kingdom', 10.0, 10.0, 25.0, 70.0, 5.0, 30.0, 40.0, 20.0, 8.0, 2.0),
('social-002', 'TIKTOK', true, 'inf-002', 'tiktok_789012', 'refresh_token_2', NOW() + INTERVAL '30 days', 'access_token_2', NOW() + INTERVAL '2 hours', NOW() - INTERVAL '2 hours', NOW() - INTERVAL '2 days', 'Alex Chen', '@alexchen', 'file-003', 'R2', 'Tech & Gaming Content', 89000, 3.8, 65000, 55000, NOW() - INTERVAL '40 days', 'Canada', 45.0, 'United States', 35.0, 'Australia', 10.0, 10.0, 60.0, 35.0, 5.0, 45.0, 35.0, 15.0, 4.0, 1.0),
('social-003', 'TIKTOK', true, 'inf-003', 'tiktok_345678', 'refresh_token_3', NOW() + INTERVAL '30 days', 'access_token_3', NOW() + INTERVAL '2 hours', NOW() - INTERVAL '30 minutes', NOW() - INTERVAL '1 day', 'Maria Garcia', '@mariagarcia', 'file-005', 'R2', 'Food & Travel Adventures', 156000, 4.5, 95000, 85000, NOW() - INTERVAL '25 days', 'Spain', 40.0, 'United States', 25.0, 'Mexico', 15.0, 20.0, 20.0, 75.0, 5.0, 25.0, 45.0, 20.0, 8.0, 2.0);

-- 8. Campaign table (depends on Brand)
INSERT INTO "Campaign" ("id", "brandId", "name", "status", "goal", "contentType", "creatorAmount", "creatorAgeRange", "audienceCountries", "creatorInterests", "audienceAgeDistribution", "audienceGenderDistribution", "minimumFollowers", "createdAt") VALUES
('camp-001', 'brand-001', 'Tech Product Launch', 'ACTIVE', 'AWARENESS', 'INFLUENCER', 5, ARRAY[25, 35], ARRAY['United States', 'Canada'], ARRAY[3, 7], '{"18-24": 0.25, "25-34": 0.45, "35-44": 0.20, "45+": 0.10}', '{"male": 0.60, "female": 0.35, "other": 0.05}', 50000, NOW() - INTERVAL '30 days'),
('camp-002', 'brand-002', 'Fashion Collection', 'ACTIVE', 'PROMOTION', 'UGC', 8, ARRAY[18, 30], ARRAY['United States', 'United Kingdom', 'Canada'], ARRAY[1, 2, 10], '{"18-24": 0.40, "25-34": 0.35, "35-44": 0.20, "45+": 0.05}', '{"male": 0.20, "female": 0.75, "other": 0.05}', 30000, NOW() - INTERVAL '20 days'),
('camp-003', 'brand-003', 'Health & Wellness', 'PENDING', 'SALES', 'INFLUENCER', 3, ARRAY[25, 45], ARRAY['United States', 'Canada', 'Australia'], ARRAY[4, 5, 10], '{"18-24": 0.20, "25-34": 0.35, "35-44": 0.30, "45+": 0.15}', '{"male": 0.35, "female": 0.60, "other": 0.05}', 40000, NOW() - INTERVAL '10 days');

-- 9. CampaignOffer table (depends on Campaign)
INSERT INTO "CampaignOffer" ("id", "campaignId", "status") VALUES
('offer-001', 'camp-001', 'PENDING'),
('offer-002', 'camp-001', 'ACCEPTED'),
('offer-003', 'camp-002', 'PENDING'),
('offer-004', 'camp-002', 'REJECTED'),
('offer-005', 'camp-003', 'PENDING'),
('offer-006', 'camp-003', 'PENDING');

-- 10. CampaignCreatorMatchmakingResult table (depends on Campaign, CampaignOffer, Influencer)
INSERT INTO "CampaignCreatorMatchmakingResult" ("id", "campaignId", "offerId", "influencerId", "overallScore", "interestScore", "influencerAgeScore", "audienceAgeScore", "audienceCountriesScore", "audienceGenderScore", "performanceMetricsScore", "createdAt") VALUES
('match-001', 'camp-001', 'offer-001', 'inf-002', 0.85, 0.90, 0.80, 0.85, 0.90, 0.75, 0.85, NOW() - INTERVAL '25 days'),
('match-002', 'camp-001', 'offer-002', 'inf-001', 0.78, 0.70, 0.85, 0.80, 0.85, 0.90, 0.75, NOW() - INTERVAL '20 days'),
('match-003', 'camp-002', 'offer-003', 'inf-001', 0.92, 0.95, 0.90, 0.85, 0.80, 0.95, 0.90, NOW() - INTERVAL '15 days'),
('match-004', 'camp-002', 'offer-004', 'inf-003', 0.65, 0.80, 0.70, 0.75, 0.60, 0.85, 0.70, NOW() - INTERVAL '12 days'),
('match-005', 'camp-003', 'offer-005', 'inf-003', 0.88, 0.85, 0.80, 0.90, 0.85, 0.80, 0.85, NOW() - INTERVAL '8 days'),
('match-006', 'camp-003', 'offer-006', 'inf-002', 0.72, 0.60, 0.85, 0.75, 0.80, 0.70, 0.75, NOW() - INTERVAL '5 days');

-- 11. Conversation table (depends on Influencer, Brand, Campaign, CampaignOffer)
INSERT INTO "Conversation" ("id", "influencerId", "brandId", "campaignId", "offerId", "deleted", "deletedAt", "createdAt") VALUES
('conv-001', 'inf-001', 'brand-002', 'camp-002', 'offer-003', false, NULL, NOW() - INTERVAL '15 days'),
('conv-002', 'inf-002', 'brand-001', 'camp-001', 'offer-001', false, NULL, NOW() - INTERVAL '25 days'),
('conv-003', 'inf-003', 'brand-003', 'camp-003', 'offer-005', false, NULL, NOW() - INTERVAL '8 days');

-- 12. Message table (depends on Conversation, Influencer, Brand, StorageFile)
INSERT INTO "Message" ("id", "conversationId", "influencerId", "brandId", "sender", "type", "message", "attachmentId", "read", "readAt", "deleted", "deletedAt", "createdAt") VALUES
('msg-001', 'conv-001', 'inf-001', 'brand-002', 'BRAND', 'TEXT', 'Hi Emma! We loved your content and would love to collaborate on our new fashion collection.', NULL, true, NOW() - INTERVAL '14 days', false, NULL, NOW() - INTERVAL '15 days'),
('msg-002', 'conv-001', 'inf-001', 'brand-002', 'INFLUENCER', 'TEXT', 'Thank you! I would love to work with you. Can you tell me more about the campaign?', NULL, true, NOW() - INTERVAL '13 days', false, NULL, NOW() - INTERVAL '14 days'),
('msg-003', 'conv-001', 'inf-001', 'brand-002', 'BRAND', 'TEXT', 'Absolutely! We are looking for authentic content creators to showcase our new summer collection.', NULL, true, NOW() - INTERVAL '12 days', false, NULL, NOW() - INTERVAL '13 days'),
('msg-004', 'conv-002', 'inf-002', 'brand-001', 'BRAND', 'TEXT', 'Hi Alex! Your tech content is amazing. Would you be interested in reviewing our new product?', NULL, true, NOW() - INTERVAL '24 days', false, NULL, NOW() - INTERVAL '25 days'),
('msg-005', 'conv-002', 'inf-002', 'brand-001', 'INFLUENCER', 'TEXT', 'Sounds interesting! What kind of product is it?', NULL, true, NOW() - INTERVAL '23 days', false, NULL, NOW() - INTERVAL '24 days'),
('msg-006', 'conv-003', 'inf-003', 'brand-003', 'BRAND', 'TEXT', 'Hi Maria! We love your food and travel content. Would you like to promote our healthy meal plans?', NULL, false, NULL, false, NULL, NOW() - INTERVAL '8 days');

-- 13. Notification table (depends on Influencer)
INSERT INTO "Notification" ("id", "influencerId", "message", "url", "iconId", "iconProvider", "createdAt") VALUES
('notif-001', 'inf-001', 'New campaign offer from Fashion Forward!', '/campaigns/camp-002', 'icon-002', 'R2', NOW() - INTERVAL '15 days'),
('notif-002', 'inf-001', 'Your content was featured in our latest campaign!', '/campaigns/camp-002', 'icon-002', 'R2', NOW() - INTERVAL '10 days'),
('notif-003', 'inf-002', 'New message from TechCorp Solutions', '/conversations/conv-002', 'icon-001', 'R2', NOW() - INTERVAL '25 days'),
('notif-004', 'inf-002', 'Campaign offer accepted!', '/campaigns/camp-001', 'icon-001', 'R2', NOW() - INTERVAL '20 days'),
('notif-005', 'inf-003', 'New campaign offer from Healthy Living Co!', '/campaigns/camp-003', 'icon-003', 'R2', NOW() - INTERVAL '8 days'),
('notif-006', 'inf-003', 'Welcome to Adwiseli! Complete your profile to get started.', '/onboarding', 'icon-003', 'R2', NOW() - INTERVAL '30 days');

-- 14. InfluencerVideo table (depends on SocialAccount and StorageFile)
INSERT INTO "InfluencerVideo" ("id", "postId", "platform", "socialAccountId", "caption", "shares", "saves", "share_url", "audience_countries", "impression_sources", "full_video_watched_rate", "total_time_watched", "embed_url", "reach", "video_duration", "thumbnail_url", "likes", "average_time_watched", "video_views", "comments", "thumbnailId", "thumbnailProvider", "videoId", "videoProvider", "downloaded", "downloadFailed", "isAdVideo", "createdAt") VALUES
('video-001', 'tiktok_123456_001', 'TIKTOK', 'social-001', 'Amazing fashion haul! #fashion #style #haul', 45, 120, 'https://tiktok.com/share/123456', 'United States,Canada', 'For You,Following', 0.75, 180.5, 'https://tiktok.com/embed/123456', 25000, 15.2, 'https://example.com/thumb1.jpg', 1200, 12.8, 18000, 89, 'file-001', 'R2', NULL, NULL, true, false, false, NOW() - INTERVAL '5 days'),
('video-002', 'tiktok_789012_001', 'TIKTOK', 'social-002', 'New tech review! This gadget is incredible #tech #review #gaming', 23, 67, 'https://tiktok.com/share/789012', 'Canada,United States', 'For You,Following', 0.82, 210.3, 'https://tiktok.com/embed/789012', 18000, 18.5, 'https://example.com/thumb2.jpg', 890, 15.2, 15000, 45, 'file-003', 'R2', NULL, NULL, true, false, false, NOW() - INTERVAL '3 days'),
('video-003', 'tiktok_345678_001', 'TIKTOK', 'social-003', 'Delicious pasta recipe! #food #recipe #cooking', 78, 234, 'https://tiktok.com/share/345678', 'Spain,United States,Mexico', 'For You,Following', 0.68, 165.7, 'https://tiktok.com/embed/345678', 32000, 12.8, 'https://example.com/thumb3.jpg', 2100, 10.5, 28000, 156, 'file-005', 'R2', NULL, NULL, true, false, false, NOW() - INTERVAL '1 day');

-- 15. Session table (depends on User and Influencer)
INSERT INTO "Session" ("id", "userId", "influencerId", "accessToken", "refreshToken", "expiresAt", "refreshTokenExpiresAt", "createdAt") VALUES
('session-001', 'user-001', NULL, 'access_token_user_001', 'refresh_token_user_001', NOW() + INTERVAL '2 hours', NOW() + INTERVAL '30 days', NOW() - INTERVAL '1 hour'),
('session-002', 'user-002', NULL, 'access_token_user_002', 'refresh_token_user_002', NOW() + INTERVAL '2 hours', NOW() + INTERVAL '30 days', NOW() - INTERVAL '30 minutes'),
('session-003', NULL, 'inf-001', 'access_token_inf_001', 'refresh_token_inf_001', NOW() + INTERVAL '2 hours', NOW() + INTERVAL '30 days', NOW() - INTERVAL '15 minutes'),
('session-004', NULL, 'inf-002', 'access_token_inf_002', 'refresh_token_inf_002', NOW() + INTERVAL '2 hours', NOW() + INTERVAL '30 days', NOW() - INTERVAL '45 minutes'),
('session-005', NULL, 'inf-003', 'access_token_inf_003', 'refresh_token_inf_003', NOW() + INTERVAL '2 hours', NOW() + INTERVAL '30 days', NOW() - INTERVAL '5 minutes'),
('session-006', 'user-003', NULL, 'access_token_user_003', 'refresh_token_user_003', NOW() + INTERVAL '2 hours', NOW() + INTERVAL '30 days', NOW() - INTERVAL '10 minutes');

-- Reset sequences for auto-incrementing columns
SELECT setval('"Interest_id_seq"', (SELECT MAX("id") FROM "Interest"));
SELECT setval('"BrandUser_id_seq"', (SELECT MAX("id") FROM "BrandUser")); 

-- 16. 
-- Mock data for BrandProfileClick
INSERT INTO "BrandProfileClick" ("brandId", "clicks", "createdAt") VALUES
('brand-001', 1150, NOW() - INTERVAL '5 days'),
('brand-002', 980, NOW() - INTERVAL '10 days'),
('brand-003', 1340, NOW() - INTERVAL '3 days');

-- Mock data for Earnings (influencer)
INSERT INTO "Earnings" ("influencerId", "amount", "currency", "createdAt") VALUES
('inf-001', 1545, 'DKK', NOW() - INTERVAL '7 days'),
('inf-002', 1120, 'DKK', NOW() - INTERVAL '10 days'),
('inf-003', 980, 'DKK', NOW() - INTERVAL '2 days');

-- Mock data for CampaignVideo
INSERT INTO "CampaignVideo" ("campaignId", "videoId", "createdAt") VALUES
('camp-001', 'video-001', NOW() - INTERVAL '5 days'),
('camp-001', 'video-002', NOW() - INTERVAL '4 days'),
('camp-002', 'video-003', NOW() - INTERVAL '3 days');

-- Mock data for PerformanceMetric (for graph)
INSERT INTO "PerformanceMetric" ("brandId", "metricType", "value", "recordedAt") VALUES
('brand-001', 'views', 87000, NOW() - INTERVAL '5 days'),
('brand-001', 'likes', 89000, NOW() - INTERVAL '5 days'),
('brand-001', 'shares', 578, NOW() - INTERVAL '5 days'),
('brand-001', 'comments', 1412, NOW() - INTERVAL '5 days'),
('brand-002', 'views', 123452, NOW() - INTERVAL '3 days'),
('brand-002', 'likes', 21569, NOW() - INTERVAL '3 days'),
('brand-002', 'shares', 578, NOW() - INTERVAL '3 days');
