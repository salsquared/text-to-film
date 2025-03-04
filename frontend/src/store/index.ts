// Using Zustand (lighter than Redux, easier to use)
import { create } from 'zustand'
import { Project, Scene } from '../types'

interface ProjectState {
  currentProject: Project | null
  scenes: Scene[]
  activeScene: string
  setCurrentProject: (project: Project) => void
  setScenes: (scenes: Scene[]) => void
  setActiveScene: (sceneId: string) => void
}

const useStore = create<ProjectState>((set) => ({
  currentProject: null,
  scenes: [],
  activeScene: '',
  setCurrentProject: (project) => set({ currentProject: project }),
  setScenes: (scenes) => set({ scenes }),
  setActiveScene: (sceneId) => set({ activeScene: sceneId }),
}))

export default useStore 