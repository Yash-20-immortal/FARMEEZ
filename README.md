# FARMEEZ

An AI-powered educational farming simulation platform that teaches sustainable agriculture through interactive gameplay, seasonal farming, intelligent guidance, and real-world agricultural concepts.

---

## Project Overview

FARMEEZ is a web-based, gamified educational simulator designed to teach modern, sustainable agricultural practices. Developed as a solution for the Smart India Hackathon, the platform enables students, urban gardeners, and aspiring agriculturalists to manage a virtual farm in a low-risk, interactive environment.

Agriculture is the backbone of many global economies, yet modern sustainable farming methodologies remain largely theoretical to the general public. FARMEEZ translates scientific principles of crop cycles, soil compatibility, water conservation, and seasonal variations into gameplay mechanics. By embedding education directly within a 3D simulation loop and reinforcing learning with micro-courses and quizzes, FARMEEZ transforms agricultural education from passive reading into active problem-solving.

---

## Problem Statement

Traditional agricultural education suffers from a practical engagement gap:
* **Passive Learning:** Students are introduced to complex topics like soil nitrogen management, crop rotation, and water optimization solely through static textbooks.
* **No Real-world Context:** Learners rarely experience the dynamic consequences of their farming decisions, such as incorrect seasonal planting leading to crop failure or excessive irrigation depleting local ecosystems.
* **Lack of Mentorship:** Budding agricultural enthusiasts lack direct access to personalized agronomic advice to guide their decision-making process.

FARMEEZ bridges this educational gap by offering a comprehensive virtual sandbox paired with an intelligent tutor to provide immediate, contextual feedback.

---

## Solution

FARMEEZ addresses these challenges through a unified interactive learning loop:
* **Interactive 3D Farming:** A WebGL-rendered farm plot sandbox where players actively plant, water, monitor, and harvest crops.
* **Seasonal Crop Management:** A system that simulates Spring, Summer, Autumn, and Winter, requiring players to study crop preferences before sowing.
* **Dynamic Crop Failure:** Incompatibility warnings and failed harvest mechanics that demonstrate the real-world consequences of poor seasonal planning.
* **Integrated Learning Modules:** Structured micro-lessons and interactive quizzes focused on sustainable practices.
* **Fluctuating Marketplace:** A crop trading system with dynamic pricing influenced by seasonal supply and demand.
* **Seed Economy & Supply Store:** Resource management constraints requiring players to invest capital in seeds rather than relying on infinite supplies.
* **Financial Analytics Dashboard:** A reporting interface tracking yield, crop-specific revenue, seasonal profitability, and capital efficiency.
* **Agri Mentor AI:** An on-demand agricultural advisor powered by large language models, analyzing real-time gameplay state to provide contextual advice.

---

## Features

| Feature Group | Component | Description |
|---|---|---|
| Landing Experience | Landing Page | Clean, responsive homepage introducing features, gameplay steps, and project purpose. |
| Authentication | Local Login System | Multi-user login supporting registration, custom display names, profile avatars, and session retention. |
| User Profile | Multi-user Profiles | Tracks individual level, progression, lifetime statistics, and achievements. |
| Guided Onboarding | Interactive Onboarding | A multi-stage introductory flow guiding users through the dashboard interface. |
| Narrative | Story Introduction | Establishes the gameplay context of inheriting a farm plot and building a sustainable legacy. |
| Simulation | 3D Farm Simulation | An interactive 3D WebGL scene displaying physical plots, structures, vegetation, and weather effects. |
| Interaction | Crop Planting | Selecting and sowing seeds from the player's personal seed inventory. |
| Resource Management | Watering | Sowing moisture control that visualizes plant watering effects. |
| Economy | Harvesting | Gathering fully-grown crops, updating inventory balances, and earning experience points. |
| Environment | Season System | Spring, Summer, Autumn, and Winter cycles affecting crop viability and market demands. |
| Knowledge Base | Crop Encyclopedia | Comprehensive database containing crop-specific details, soil types, and water requirements. |
| Education | Crop Information Cards | In-game modals containing educational descriptions and parameters for each crop. |
| Validation | Wrong Season Detection | Warning modals preventing incorrect planting or highlighting season mismatches. |
| Feedback | Crop Failure System | Simulates harvest failure when crops are neglected or planted out of season. |
| Trade | Marketplace | Interface to trade harvested yields based on dynamic seasonal pricing. |
| Supply | Farm Supply Store | Commerce portal to purchase seed packs using earned coins. |
| Progression | Seed Economy | Limits planting options based on seed quantities purchased from the store. |
| Curriculum | Learning Courses | Multi-chapter micro-lessons covering water preservation and agro-ecology. |
| Assessment | Quiz System | Interactive tests validating course knowledge to reward player experience points. |
| Leveling | XP & Level Progression | Level-up triggers unlocking higher-grade, highly-profitable crops. |
| Milestones | Achievements | Unlockable badges rewarding milestones like harvests, coin balances, and levels. |
| Incidents | Random Farming Events | Dynamic ecological crises and opportunities requiring sustainable resolutions. |
| Reporting | Financial Analytics | Interactive charts visualizing sales data, cash flow, and crop-specific profits. |
| Artificial Intelligence | Agri Mentor AI | Context-aware advisor analyzing player metrics to offer strategic guidance. |
| Configuration | Settings | Custom controls managing local user accounts and saving data resets. |
| Persistence | Persistent Save System | Automatically serializes game progress into localized storage. |

---

## Technology Stack

| Layer | Technology | Purpose |
|---|---|---|
| Frontend | React 18.2.0 | Reactive component-based user interface |
| Routing | React Router DOM 6.22.3 | Client-side routing and layout rendering |
| State Management | React Context API | Global state provider for gameplay and AI context |
| 3D Rendering | Three.js / React Three Fiber | WebGL 3D environment rendering and interaction |
| Graphics Utilities | React Three Drei | Camera controls and HTML overlay positioning |
| Design & Styling | Tailwind CSS / Vanilla CSS | Responsive layouts, glassmorphism UI, and styling |
| Icons | Lucide React | Visual iconography across pages and lists |
| Backend Server | Express 5.2.1 | Local Node.js API hosting the AI integration |
| LLM Integration | Groq SDK 1.5.0 | High-performance inference client for LLM API |
| Inference Engine | LLaMA 3.3 70B Versatile | Large Language Model generating agricultural insights |
| Local Storage | Web Storage API | Client-side serialization for local save persistence |
| Build Tool | Vite 5.2.0 | Hot-reloading bundler and frontend server |
| Development | Node.js | Server runtimes and package management |

---

## System Architecture

The FARMEEZ architecture is organized to process state updates locally while delegating cognitive reasoning tasks to a lightweight backend.

```
[ Frontend: React UI ] 
        │
        ▼
[ Context Layer: Game & Season Providers ] ──► [ Local Storage: Save Manager ]
        │
        ▼
[ 3D WebGL Layer: React Three Fiber ]
        │
        ▼
[ API Client: services/agriMentorService ]
        │
        ▼
[ Backend: Express Server ]
        │
        ▼
[ Groq SDK ] ──► [ LLaMA 3.3 Inference ]
```

* **React UI Layer:** Renders the dashboard, store, learning modules, marketplace, and profile statistics.
* **Context Layer:** Manages active gameplay variables (coins, XP, level, inventory, seed stock, current season) and exposes mutation functions (`plantCrop`, `buySeeds`, `harvestCrop`).
* **WebGL Engine:** Controls the 3D scene representation, crop mesh growth animations, interactive raycasting, particle systems, and sky/lighting states corresponding to the active season.
* **Save Manager:** Handles JSON serialization and state validation to persist profile records within browser local storage.
* **Express Backend:** Hosts stateless HTTP post routes to handle the payload verification and prompt compilation.
* **Groq Integration Service:** Packages the compiled state payload with specialized prompts, executes LLaMA inference, sanitizes the JSON response structures, and forwards them to the client.

---

## Gameplay Loop

FARMEEZ structures its user experience around a repeating cycle of growth, investment, and education:

```
[ Purchase Seeds ] ──► [ Plant Seeds ] ──► [ Water Plots ] ──► [ Grow Crops ]
       ▲                                                             │
       │                                                             ▼
[ Unlock Crops ] ◄── [ Complete Quizzes ] ◄── [ Sell Yields ] ◄── [ Harvest Crops ]
```

1. **Farm Supply:** Visit the Farm Supply store and purchase crop seeds matching the active season.
2. **Plant:** Select an empty farm plot and sow a matching seed, decrementing the seed inventory.
3. **Water:** Hydrate the soil to progress the crop through growth stages.
4. **Harvest:** Collect mature crops to earn experience points and add produce to the inventory.
5. **Sell:** Check the Marketplace for seasonal supply demands, sell surplus produce, and earn coins.
6. **Learn:** Consume learning modules and complete quizzes to earn bonus experience.
7. **Unlock:** Reach new experience levels to unlock advanced seeds and increase farming efficiency.

---

## Educational Features

FARMEEZ turns real-world agronomy concepts into gameplay constraints:
* **Crop Encyclopedia:** Integrates detailed parameters (ideal soil types, water requirements, difficulty categories) for 20 real crops (from beginner Wheat to advanced Coconut trees).
* **Course Modules:** Interactive textbooks detailing sustainable techniques such as drip irrigation, composting, organic pest management, and conservation tillage.
* **Assessment Quizzes:** Validates student learning outcomes at the end of each module before letting them apply these techniques in gameplay.
* **Season System education:** Teaches crop rotation and seasonal compatibility by penalizing out-of-season planting with reduced yields or crop failure.

---

## Agri Mentor AI

The Agri Mentor is an AI assistant that serves as an interactive agricultural advisor:
* **Real-time State Analysis:** Analyzes the player's level, cash reserves, crop inventory, seed supplies, active events, and current season.
* **Contextual Suggestions:** Tells the player which seeds to buy for the next season, flags when resources are depleted, and suggests learning modules.
* **Interactive Chat:** Allows players to type free-form questions. The backend injects the player's current farm statistics directly into the prompt context, allowing the AI to answer specifically (e.g., "You currently have 0 tomato seeds but summer is starting; purchase some from the Farm Supply store").

---

## Financial Analytics

To teach resource planning and financial literacy, FARMEEZ includes a premium reporting dashboard under the player's profile:
* **Revenue and Profit:** Tracks total sales and gross margins from crop production.
* **Crop Performance:** Visualizes which crops generate the highest yields and financial returns.
* **Seasonal Breakdown:** Highlights the most profitable farming seasons.
* **Resource Efficiency:** Compares seed purchase costs against eventual market gains to calculate return on investment.

---

## Folder Structure

```
FARMEEZ/
├── server/
│   ├── routes/
│   │   └── agriMentor.js
│   ├── services/
│   │   └── agriMentorService.js
│   ├── .env.example
│   └── index.js
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── 3d/
│   │   │   ├── Crop.jsx
│   │   │   ├── FarmPlot.jsx
│   │   │   └── Scene.jsx
│   │   ├── cards/
│   │   │   ├── AgriMentorCard.jsx
│   │   │   └── StatisticsCard.jsx
│   │   ├── layout/
│   │   │   ├── MainLayout.jsx
│   │   │   └── Navbar.jsx
│   │   ├── modals/
│   │   │   ├── AgriMentorPanel.jsx
│   │   │   └── CropEducationalModal.jsx
│   │   ├── onboarding/
│   │   │   ├── DashboardTour.jsx
│   │   │   └── StoryIntro.jsx
│   │   ├── profile/
│   │   │   └── analytics/
│   │   │       ├── FinancialAnalytics.jsx
│   │   │       └── RevenueChart.jsx
│   │   ├── ui/
│   │   │   └── Button.jsx
│   │   ├── AgriMentorContext.jsx
│   │   ├── GameContext.jsx
│   │   └── SeasonContext.jsx
│   ├── data/
│   │   ├── coursesData.js
│   │   ├── cropDatabase.js
│   │   └── marketData.js
│   ├── managers/
│   │   ├── AchievementManager.js
│   │   ├── SaveManager.js
│   │   └── StatsManager.js
│   ├── pages/
│   │   ├── Dashboard.jsx
│   │   ├── Farm.jsx
│   │   ├── Landing.jsx
│   │   ├── Marketplace.jsx
│   │   ├── Profile.jsx
│   │   └── Store.jsx
│   ├── services/
│   │   └── agriMentorService.js
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .gitignore
├── package.json
├── tailwind.config.js
└── vite.config.js
```

---

## Installation

### Prerequisites
- Node.js (version 18.0.0 or higher)
- npm (version 9.0.0 or higher)

### Setup Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/farmeez.git
   cd farmeez
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables (see below).

4. Start the frontend development server:
   ```bash
   npm run dev
   ```

5. Start the backend Express server:
   ```bash
   npm run server:dev
   ```

To access the platform, open your browser and navigate to `http://localhost:5173`.

---

## Environment Variables

The backend Express server requires connection parameters and API credentials. Create a file named `.env` in the `server` directory:

```env
# server/.env
GROQ_API_KEY=your_groq_api_key_here
PORT=5000
```

*Note: The frontend does not require direct environment variables for AI inference, as all prompts and keys are securely encapsulated in the Express backend.*

---

## Future Scope

* **Real-time Weather Integration:** Connect weather APIs to dynamically alter watering requirements based on active regional conditions.
* **Live Market Indexes:** Sync crop selling prices with real agricultural commodities markets.
* **Hardware IoT Links:** Connect actual soil moisture sensors to update the digital farm plots.
* **Drone Monitoring Visuals:** Add aerial thermal maps to check crop stress levels.
* **Cloud Saves:** Transition local storage saves to secure cloud databases.
* **Mobile Port:** Optimize layout controls for native Android and iOS applications.

---

## Screenshots

[Landing Page Screenshot Placeholder]
*Placeholder: Visual overview of the initial landing layout introducing the platform.*

[Dashboard Screenshot Placeholder]
*Placeholder: Overview of the user dashboard showing stats, progression cards, and menu structures.*

[3D Farm Screenshot Placeholder]
*Placeholder: Renders of the active WebGL scene demonstrating crop growth and watering interactions.*

[Marketplace Screenshot Placeholder]
*Placeholder: Interface showcasing trading, crop pricing, and market demand indices.*

[Agri Mentor Chat Screenshot Placeholder]
*Placeholder: Showcase of the Agri Mentor conversational UI displaying dynamic context-based answers.*

[Financial Analytics Screenshot Placeholder]
*Placeholder: Visualizing charts, yield breakdowns, and cash flow reports.*

---

## Team

* **K Yashwanth Choudhary** - Lead Software Engineer

*[Additional Team Member Placeholders]*

---

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## Acknowledgements

* **React** - Component-driven UI framework
* **Three.js** - Native WebGL rendering engine
* **React Three Fiber / Drei** - Three.js abstractions for React architectures
* **Groq SDK** - High-speed LLaMA inference pipeline
* **Lucide** - Modern, clean SVG icon sets
* **Vite** - High-performance bundler
* **Tailwind CSS** - CSS utility framework
* **Open Source Community** - Open source libraries and tools

---

FARMEEZ demonstrates how immersive simulations and AI-powered mentorship can transform agricultural education into an engaging learning experience.
