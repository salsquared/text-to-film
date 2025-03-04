export interface Scene {
    id: string;
    name: string;
    content: string;
    // Add other scene properties as needed
}

export interface Project {
    id: string;
    title: string;
    scenes: Scene[];
    // Add other project properties as needed
} 