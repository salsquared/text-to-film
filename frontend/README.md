# 🎬 text-to-film

An open-source tool that uses AI agents to assist in film production by emulating specific film industry roles. Users can focus on their preferred creative roles and over see AI agents handling other aspects of production through a coordinated pipeline.

## 🎯 Core Concept

- Users select which film production roles they want to handle personally
- AI agents are generated to fill remaining roles
- Agents coordinate through a pipeline architecture
- Each agent provides input/feedback for downstream processes
- Results can be iteratively refined through user-agent interaction

## 🚧 Current Development Focus

- Agent interaction infrastructure
- Role-specific AI model integration
- Pipeline communication patterns
- Basic UI for testing agent interactions
- Core transformation primitives

## 🏗️ Technical Architecture

### 🎨 Frontend
- React + TailwindCSS
- Material UI components
- State management via React Context
- File handling and media playback
- Real-time agent interaction UI

### ⚙️ Backend
- FastAPI for API layer
- Python-based agent coordination
- Redis for job queues
- JWT authentication
- File storage abstraction

### 🤖 AI Integration
- Text generation for scripts/planning
- Image generation for storyboards/concepts
- Video synthesis for scene composition
- Agent communication protocol
- Pipeline orchestration

## 📊 System Overview

````

startLine: 62
endLine: 84
````

## 🚀 Getting Started

### 📋 Requirements
- Node.js v18+
- Python 3.8+
- Git
- Redis (optional, for queue management)

### ⚡ Setup

1. Clone repository
````

git clone https://github.com/yourusername/text-to-film.git
cd text-to-film
````

2. Install dependencies
````

# Frontend
cd frontend
npm install

# Backend
cd ../backend
pip install -r requirements.txt
````

3. Start development servers
````

# Terminal 1: Frontend
cd frontend
npm start

# Terminal 2: Backend
cd backend
uvicorn app.main:app --reload
````

## 🤝 Contributing

This is an early-stage development project. Contributions welcome in:

- AI model integration
- Agent communication protocols
- Pipeline optimization
- UI/UX improvements
- Documentation
- Testing

See CONTRIBUTING.md for development guidelines.

## 📝 License

MIT License - See LICENSE for details