# Hulchul 🚀

**Hulchul** is an advanced AI-powered simulation and evaluation engine designed to analyze, score, and visualize large-scale multi-agent interactions across diverse scenarios. Built with a focus on real-time narrative mutation and emotional cascades, Hulchul provides developers and researchers with a powerful dashboard to monitor AI alignment, divergence, and accuracy in complex environments.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)]()
[![AI Engine](https://img.shields.io/badge/AI-LLM_Powered-blue.svg)]()

---

## 📸 Screenshots

### 🖥️ Main Dashboard
*A high-level view of current simulation runs, showing global volatility and agent activity.*
![Dashboard Placeholder](https://via.placeholder.com/1200x600/0a0a0a/ffffff?text=Hulchul+Dashboard+Preview)

### 📊 Simulation Analytics
*Detailed breakdown of emotional cascades and narrative divergence indices.*
![Analytics Placeholder](https://via.placeholder.com/1200x600/0f0f0f/e0e0e0?text=Real-time+Analytics+and+Scoring)

### 🤖 Agent Interactions
*Live feed of agents communicating and evolving within the simulation environment.*
![Agents Placeholder](https://via.placeholder.com/1200x600/1a1a1a/cccccc?text=Multi-Agent+Interaction+Flow)

---

## ✨ Features

- **🚀 Real-Time Simulation Engine**: Stream thousands of agent interactions simultaneously using high-performance WebSocket connections.
- **🧠 Advanced LLM Scoring**: Leverage state-of-the-art Large Language Models to evaluate responses for accuracy, sentiment, and contextual relevance.
- **📈 Narrative Mutation Graph**: Visualize how individual personas evolve and drift from their baseline over time.
- **⚡ Dynamic Emotional Cascades**: Watch as individual agent sentiments trigger ripples across the entire network in a real-time reactive environment.
- **🛠️ Telemetry & Monitoring**: Track server load, messages per second, and global divergence indices via a sleek, modern dashboard.
- **🇮🇳 Culturally Aware Personas**: Engineered specifically to simulate and analyze Indian-centric personas and societal nuances.

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: [Next.js](https://nextjs.org/) (React 19)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **State Management**: React Hooks & Context API
- **Visualization**: Specialized components for real-time data streaming

### Backend
- **Framework**: [FastAPI](https://fastapi.tiangolo.com/) (Python 3.11+)
- **Networking**: WebSockets for live telemetry and data streaming
- **AI Integration**: Integration with LLM APIs for narrative mutation and evaluation
- **Concurrency**: Asynchronous processing with `asyncio`

---

## 📂 Project Structure

```bash
hulchul/
├── backend/                # FastAPI Application
│   ├── agents/             # Agent generation and persona logic
│   ├── core/               # Core simulation and mutation engines
│   ├── processing/         # Input processing and prompt engineering
│   ├── simulation/         # Simulation runner and LLM evaluation
│   └── main.py             # API entry point and WebSocket handlers
├── frontend/               # Next.js Application
│   ├── app/                # App router (Pages and Layouts)
│   ├── components/         # Reusable UI components (Chat, Sidebar, Header)
│   ├── lib/                # Utility functions and theme config
│   └── public/             # Static assets (Placeholders)
└── .gitignore              # Environment and build exclusions
```

---

## 🚀 Setup Instructions

Follow these steps to get a local development environment up and running.

### 📋 Prerequisites
- **Python 3.11 or higher**
- **Node.js 18 or higher**
- **npm** or **yarn**
- **Git**

### 1. Clone the Repository
```bash
git clone https://github.com/Harshit7013/hulchul.git
cd hulchul
```

### 2. Backend Setup
```bash
# Navigate to backend directory
cd backend

# Create a virtual environment
python -m venv .venv

# Activate the virtual environment
# On Windows:
.venv\Scripts\activate
# On macOS/Linux:
source .venv/bin/activate

# Install dependencies (ensure you are in the virtual environment)
pip install fastapi uvicorn pydantic-settings httpx
```

### 3. Frontend Setup
```bash
# Navigate to frontend directory (from the root)
cd ../frontend

# Install dependencies
npm install
```

### 4. Running the Project
#### Start the Backend
```bash
# In the backend directory
uvicorn main:app --reload --port 8000
```
*The backend will be available at `http://localhost:8000`*

#### Start the Frontend
```bash
# In the frontend directory
npm run dev
```
*The frontend will be available at `http://localhost:3000`*

---

## 🔮 Future Improvements

- **🛠️ Self-Correction Loops**: Automate agent re-alignment when divergence exceeds a specific threshold.
- **🌐 Decentralized Simulation**: Multi-server support to scale simulations to millions of concurrent active agents.
- **🧬 Multi-Modal Agents**: Enable agents to process and respond to images, audio, and live data feeds.
- **📊 Export Pro**: High-fidelity PDF and CSV report generation for simulation results.
- **🗺️ Geo-Spatial Visuals**: Map agent activity to real-world geographical regions for better demographic analysis.

---

## 👤 Author

**Harshit**
- GitHub: [@Harshit7013](https://github.com/Harshit7013)
- Project: [Hulchul](https://github.com/Harshit7013/hulchul)

---

Developed with ❤️ for the future of AI analysis.
