# HYF Final Project: Collaboration with Adwiseli

# 🎯 Influencer & Brand Analytics Dashboard

A modern web platform that provides **real-time analytics** for **influencers** and **brands** to help monitor performance, engagement, and audience insights.

![Dashboard Influencer Figma](https://www.figma.com/design/XpadL1FGUrjZOXCLn9X74W/Adwiseli_dashboard_influencer?node-id=0-1&t=wUwZEFVIBeSAyRRX-0)
![Dashboard Brand Figma](https://www.figma.com/design/98LkP6Aj1MjKmSEdWGAPTS/Adwiseli_dashboard?node-id=0-1&p=f&m=draw)

---

## 📌 Overview

This project includes two custom dashboards:

-   🧑‍💼 **Influencer Dashboard** – Tracks views, likes, shares, engagement rate, audience breakdown, and earnings.
-   🏢 **Brand Dashboard** – Shows impressions, video performance, engagement, profile clicks, and audience data.

Built to deliver clear and visual analytics for performance optimization in marketing campaigns.

---

## ✨ Features

-   📊 Real-time performance metrics (views, likes, comments, shares, etc.)
-   💰 Earnings overview (DKK)
-   🌍 Demographic breakdown (age, gender, country)
-   📈 Engagement rate calculations
-   🔝 Top campaign display
-   📆 Performance graph (time-series data)
-   🧠 Backend data modeling using PostgreSQL + Prisma
-   💻 API-based dashboard rendering

---

## 🧪 Demo

👉 **Live Preview:**  
[🔗 Influencer Dashboard Design](link)  
[🔗 Brand Dashboard Design](link)

🖼️ **Screenshots:**

---

### Influencer Dashboard

![Influencer Dashboard](img)

---

### Brand Dashboard

![Brand Dashboard](img)

---

## 🛠️ Tech Stack

| Technology            | Purpose                                |
| --------------------- | -------------------------------------- |
| **Next.js**           | Frontend framework (React-based)       |
| **Node.js + Express** | Backend / API development              |
| **PostgreSQL**        | Relational database                    |
| **Prisma**            | ORM for database modeling              |
| **TypeScript**        | Type-safe backend & frontend logic     |
| **Figma**             | UI/UX design and dashboard prototyping |

---

## 📁 Project Structure

```
hyf-adwiseli/
├── api/
│ └── src/
│ └── routes/
│ ├── brand/
│ │ ├── [brandId]/
│ │ │ └── dashboard/
│ │ │ └── index.ts
│ │ └── index.ts
│ └── influencer/
│ └── dashboard/
│ └── index.ts
├── brand/
│ └── src/
│ ├── components/
│ │ └── organisms/
│ │ └── Dashboard/
│ │ ├── DashboardCard.tsx
│ │ └── DashboardContainer.tsx
│ ├── hooks/
│ │ └── useDashboardData.ts
│ └── queries/
│ └── brand/
│ └── fetchBrandData.ts
└── influencer/
└── src/
├── components/
│ └── organisms/
│ └── Dashboard/
│ ├── DashboardCard.tsx
│ └── DashboardContainer.tsx
├── hooks/
│ └── useDashboardData.ts
└── queries/
└── influencer/
└── fetchInfluencerData.ts
```

## 🧑‍💻👩‍💻 Team & Contributions

### 🙋‍♀️ [Ruslana Onyshchuk]

-   👩‍🏫 **Scrum Master** – Facilitated regular team stand-ups (2–3 times per week), sprint planning, retrospectives, and maintained team workflow and communication.
-   👩‍💻 **Backend Developer**
    -   Designed and implemented SQL database schema:
        `BrandProfileClick`, `Earnings`, `CampaignVideo`, `PerformanceMetric`
    -   Created PostgreSQL mock data scripts using `INSERT` statements and time-based values (`NOW() - INTERVAL`)
    -   Built API route to fetch brand and campaign performance data
    -   Implemented logic to calculate average `performanceMetricsScore` and derive `engagementRate`
    -   Ensured backend data flow consistency with frontend dashboard components

### 🙋‍♀️ [Güzide Güzelbey Esengün]

-   👩‍🏫 **Design Leader**
-   👩‍💻 **Frontend Developer**

### 🙋‍♀️ [Jianxin Zhao]

-   👩‍🏫 **Communication Manager**
-   👩‍💻 **Frontend Developer**

### 🙋‍♂️ [Andrii Khandohii]

-   👨‍🏫 **Deployment Specialist**
-   👨‍💻 **Frontend Developer**

### 🙋‍♀️ [Seyedeh Najmeh Ghasemi]

-   👩‍🏫 **Dependency Manager**
-   👩‍💻 **Frontend Developer**

### 🙋‍♀️ [Seyedeh Parisa Mousaviamiri]

-   👩‍🏫 **Git Specialist**
-   👩‍💻 **Frontend Developer**

### 🙋‍♂️ [Hossin Saadatpour]

-   👨‍🏫 **Testing Lead (QA)**
-   👨‍💻 **Frontend Developer**

### 🙋‍♂️ [Ayman B.]

-   👨‍🏫 **Deployment Specialist**
-   👨‍💻 **Frontend Developer**
