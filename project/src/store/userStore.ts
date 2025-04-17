import { create } from 'zustand';

interface UserProfile {
  id?: string;
  name: string;
  email: string;
  level: string;
  interests: string[];
  goals: string[];
  progress: {
    [key: string]: number;
  };
}

interface UserState {
  user: UserProfile | null;
  setUser: (user: UserProfile | null) => void;
  updateProgress: (topicId: string, progress: number) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  updateProgress: (topicId, progress) => 
    set((state) => ({
      user: state.user ? {
        ...state.user,
        progress: {
          ...state.user.progress,
          [topicId]: progress
        }
      } : null
    }))
}));