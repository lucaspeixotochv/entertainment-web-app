export interface User {
  id: number;
  name: string;
}

export interface AuthState {
  currentUser: User | null;
}

export interface AuthContextProps {
  currentUser: User | null;
  dispatch: React.Dispatch<any>;
}
