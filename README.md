# text-to-film

A tool for transforming text into film using AI agents that emulate film industry roles. Each agent is designed to either act like or assist people in specific film industry roles, providing insights and guidance for subsequent agents/models in the pipeline.

## 🎯 Current Scope

This tool is currently in early development, focusing on:
- Building the basic infrastructure for AI agent interactions
- Establishing the core text-to-film transformation pipeline
- Creating a simple interface for testing and validation

## Vision

Ultimately I think that AI should serve as a tool to empower artists. I want text to film, to allow any artist to fill the gaps in their abilities to let the ones they possess shine.

Filmmaking being a collaborative effort, multiple people should be able to pick out roles and have AI assistants instead of agents in the project. 

Version control and asset management is another big thing id like to add in the future.

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- Python 3.8+
- [uv](https://github.com/astral-sh/uv) - Fast Python package installer
  ```bash
  brew install uv
  ```

### Installation

1. Clone the repository
```bash
git clone https://github.com/ssalcedo00/text-to-film.git
cd text-to-film
```

2. Install frontend dependencies
```bash
cd frontend
npm install
```

3. Install backend dependencies
```bash
cd backend
uv venv
source .venv/bin/activate  # On Windows use: .venv\Scripts\activate
uv pip install -r requirements.txt
```

4. Start the development servers
```bash
# Terminal 1 - Frontend
cd frontend
npm start

# Terminal 2 - Backend
cd backend
source .venv/bin/activate  # If not already activated
uvicorn app.main:app --reload
```

## 🏗️ Architecture

The project uses a modern tech stack:

- **Frontend**: React, TailwindCSS, Material-UI
- **Backend**: FastAPI, Python
- **AI Integration**: Custom AI agents for different film roles
- **Database**: [Coming soon]

### System Overview
```mermaid
graph TB
    subgraph Frontend[Frontend App]
        UI[React UI] --> StateManagement[State Management]
        StateManagement --> Stages[Project Stages View]
        StateManagement --> DocEditor[Document Editor]
        StateManagement --> ImageViewer[Image Gallery/Viewer]
        StateManagement --> VideoPlayer[Video Player]
    end

    subgraph Backend[Backend Services]
        API[API Layer] --> Auth[Authentication]
        API --> ProjectMgmt[Project Management]
        API --> Storage[File Storage]
        API --> AIQueue[AI Generation Queue]
    end

    subgraph AIServices[AI Integration]
        AIQueue --> TextGen[Text Generation API]
        AIQueue --> ImageGen[Image Generation API]
        AIQueue --> VideoGen[Video Generation API]
    end
```

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

<p align="center">Made with ❤️ for the filmmakers like me!</p>