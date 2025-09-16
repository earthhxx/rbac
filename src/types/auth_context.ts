import { User } from "@/types/cookies"; 

export interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void
  open: boolean;
  setOpen: (value: boolean) => void;
}