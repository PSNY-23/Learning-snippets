import { create } from "zustand";

interface UserStore {
  user: {
    name: string;
    age: number;
    job: string;
    country: string;
  };
  changeName: (by: string) => void;
  changeAge: (by: number) => void;
  changeJob: (by: string) => void;
  changeCountry: (by: string) => void;
}

export const useUserStore = create<UserStore>()((set) => ({
  user: {
    name: "",
    age: 0,
    job: "",
    country: "",
  },
  changeName: (by) => set((state) => ({ user: { ...state.user, name: by } })),
  changeAge: (by) => set((state) => ({ user: { ...state.user, age: by } })),
  changeJob: (by) => set((state) => ({ user: { ...state.user, job: by } })),
  changeCountry: (by) => set((state) => ({ user: { ...state.user, country: by } })),
}));
