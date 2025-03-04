# Text-to-Film Architecture

## Table of Contents
- [1. System Overview](#1-system-overview)
- [2. Component Architecture](#2-component-architecture)
  - [2.1 Frontend Architecture](#21-frontend-architecture)
  - [2.2 Backend Architecture](#22-backend-architecture)
  - [2.3 AI Agent Architecture](#23-ai-agent-architecture)
- [3. Data Architecture](#3-data-architecture)
  - [3.1 Database Schema](#31-database-schema)
- [4. Deployment Architecture](#4-deployment-architecture)
- [5. Security Architecture](#5-security-architecture)
- [6. Communication Flow](#6-communication-flow)
- [7. Technology Stack](#7-technology-stack)
  - [7.1 Frontend](#71-frontend)
  - [7.2 Backend](#72-backend)
  - [7.3 Database & Storage](#73-database--storage)
  - [7.4 DevOps](#74-devops)
  - [7.5 AI Integration](#75-ai-integration)

## 1. System Overview

Text-to-Film is a web application with a modern client-server architecture, designed to transform text into film using AI agents that emulate film industry roles.

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

    Frontend <--> Backend
    Backend <--> AIServices
    Backend <--> Database[(PostgreSQL)]
    Backend <--> Cache[(Redis)]
```

## 2. Component Architecture

### 2.1 Frontend Architecture

The frontend is built using React with a component-based architecture:

```mermaid
graph TD
    App --> Router
    Router --> AuthPages[Authentication Pages]
    Router --> Dashboard
    Router --> ProjectEditor
    
    Dashboard --> ProjectList
    Dashboard --> UserProfile
    
    ProjectEditor --> TextEditor
    ProjectEditor --> StoryboardViewer
    ProjectEditor --> AssetGallery
    ProjectEditor --> VideoPreview
    ProjectEditor --> AIAgentPanel
    
    subgraph SharedComponents
        UIKit[UI Component Kit]
        ErrorBoundary
        LoadingStates
        Notifications
    end
    
    AuthPages --> SharedComponents
    Dashboard --> SharedComponents
    ProjectEditor --> SharedComponents
```

#### Key Frontend Components:
- **React**: Core UI library (v19.0.0)
- **Material-UI**: Component library for consistent design (v6.3.0)
- **TailwindCSS**: Utility-first CSS framework for styling
- **Tanstack Router**: For client-side routing
- **Axios**: For API communication
- **Supabase Client**: For authentication and storage

### 2.2 Backend Architecture

The backend is built using FastAPI with a service-oriented architecture:

```mermaid
graph TD
    FastAPI[FastAPI Application] --> Routers
    
    Routers --> AuthRouter[Authentication Routes]
    Routers --> ProjectRouter[Project Routes]
    Routers --> AssetRouter[Asset Routes]
    Routers --> AIRouter[AI Agent Routes]
    
    subgraph Middleware
        AuthMiddleware[Authentication Middleware]
        ErrorHandling[Error Handling]
        Logging[Logging Middleware]
        RateLimiting[Rate Limiting]
    end
    
    FastAPI --> Middleware
    
    subgraph Services
        AuthService[Authentication Service]
        ProjectService[Project Management Service]
        StorageService[File Storage Service]
        AIService[AI Orchestration Service]
        QueueService[Queue Management Service]
    end
    
    AuthRouter --> AuthService
    ProjectRouter --> ProjectService
    AssetRouter --> StorageService
    AIRouter --> AIService
    
    Services --> DatabaseLayer[Database Layer]
    AIService --> QueueService
    
    DatabaseLayer --> PostgreSQL[(PostgreSQL)]
    QueueService --> Redis[(Redis)]
```

#### Key Backend Components:
- **FastAPI**: Modern, high-performance web framework
- **SQLAlchemy**: ORM for database interactions
- **Pydantic**: Data validation and settings management
- **Python-Jose**: JWT token handling for authentication
- **Redis**: For queue management and caching
- **PostgreSQL**: Primary database

### 2.3 AI Agent Architecture

The AI agent system follows a pipeline architecture:

```mermaid
graph LR
    Input[Text Input] --> Preprocessor[Text Preprocessor]
    
    subgraph AgentPipeline[AI Agent Pipeline]
        Screenwriter[Screenwriter Agent]
        Director[Director Agent]
        Cinematographer[Cinematographer Agent]
        Editor[Editor Agent]
        SoundDesigner[Sound Designer Agent]
    end
    
    Preprocessor --> Screenwriter
    Screenwriter --> Director
    Director --> Cinematographer
    Cinematographer --> Editor
    Editor --> SoundDesigner
    
    SoundDesigner --> OutputGenerator[Output Generator]
    OutputGenerator --> FinalOutput[Final Video Output]
    
    subgraph FeedbackLoops
        QualityControl[Quality Control]
        RevisionRequests[Revision Requests]
    end
    
    AgentPipeline <--> FeedbackLoops
```

## 3. Data Architecture

### 3.1 Database Schema

```mermaid
erDiagram
    USERS {
        uuid id PK
        string email
        string hashed_password
        datetime created_at
        datetime last_login
    }
    
    PROJECTS {
        uuid id PK
        uuid user_id FK
        string title
        string description
        datetime created_at
        datetime updated_at
        json metadata
    }
    
    TEXT_ASSETS {
        uuid id PK
        uuid project_id FK
        string content
        string asset_type
        datetime created_at
        json metadata
    }
    
    VISUAL_ASSETS {
        uuid id PK
        uuid project_id FK
        string file_path
        string asset_type
        datetime created_at
        json metadata
    }
    
    AI_GENERATIONS {
        uuid id PK
        uuid project_id FK
        string generation_type
        string status
        datetime created_at
        datetime completed_at
        json input_parameters
        json output_metadata
    }
    
    USERS ||--o{ PROJECTS : creates
    PROJECTS ||--o{ TEXT_ASSETS : contains
    PROJECTS ||--o{ VISUAL_ASSETS : contains
    PROJECTS ||--o{ AI_GENERATIONS : requests
```

## 4. Deployment Architecture

The application is containerized using Docker and can be deployed in various environments:

```mermaid
graph TD
    subgraph Development
        DockerCompose[Docker Compose]
        DockerCompose --> DevFrontend[Frontend Container]
        DockerCompose --> DevBackend[Backend Container]
        DockerCompose --> DevDB[PostgreSQL Container]
        DockerCompose --> DevRedis[Redis Container]
    end
    
    subgraph Production
        Orchestrator[Kubernetes/Cloud Orchestration]
        
        Orchestrator --> FrontendService[Frontend Service]
        Orchestrator --> BackendService[Backend Service]
        Orchestrator --> DBService[Database Service]
        Orchestrator --> CacheService[Cache Service]
        Orchestrator --> AIService[AI Service]
        
        FrontendService --> FrontendPods[Frontend Pods]
        BackendService --> BackendPods[Backend Pods]
        DBService --> DBCluster[Database Cluster]
        CacheService --> CacheCluster[Cache Cluster]
        AIService --> AIPods[AI Processing Pods]
    end
```

## 5. Security Architecture

```mermaid
graph TD
    Client[Client Browser/App] --> HTTPS[HTTPS Encryption]
    HTTPS --> WAF[Web Application Firewall]
    WAF --> LoadBalancer[Load Balancer]
    
    LoadBalancer --> APIGateway[API Gateway]
    
    APIGateway --> AuthN[Authentication]
    AuthN --> AuthZ[Authorization]
    AuthZ --> RateLimit[Rate Limiting]
    
    RateLimit --> Services[Backend Services]
    
    Services --> DataEncryption[Data Encryption]
    DataEncryption --> Database[(Database)]
```

## 6. Communication Flow

```mermaid
sequenceDiagram
    actor User
    participant Frontend
    participant Backend
    participant AIService
    participant Database
    
    User->>Frontend: Input text for film creation
    Frontend->>Backend: Send text with project parameters
    Backend->>Database: Create project record
    Database-->>Backend: Return project ID
    
    Backend->>AIService: Queue text processing job
    Backend-->>Frontend: Return job status
    Frontend-->>User: Display processing status
    
    AIService->>AIService: Process through agent pipeline
    AIService->>Backend: Return generated assets
    Backend->>Database: Store asset references
    
    Backend-->>Frontend: Update with new assets
    Frontend-->>User: Display generated film assets
```

## 7. Technology Stack

### 7.1 Frontend
- **Framework**: React 19.0.0
- **UI Libraries**: Material-UI 6.3.0, TailwindCSS
- **State Management**: React Context/Hooks
- **Routing**: Tanstack Router
- **API Communication**: Axios
- **Build Tools**: React Scripts, PostCSS

### 7.2 Backend
- **Framework**: FastAPI
- **ORM**: SQLAlchemy
- **Authentication**: JWT (python-jose)
- **Data Validation**: Pydantic
- **File Handling**: Python-multipart
- **Image Processing**: Pillow

### 7.3 Database & Storage
- **Primary Database**: PostgreSQL 16
- **Caching/Queue**: Redis
- **File Storage**: Local filesystem (development), Cloud storage (production)

### 7.4 DevOps
- **Containerization**: Docker
- **Orchestration**: Docker Compose (development)
- **CI/CD**: [To be determined]

### 7.5 AI Integration
- **Text Generation**: [To be determined]
- **Image Generation**: [To be determined]
- **Video Generation**: [To be determined] 