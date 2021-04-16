export interface Entry {
  id?: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  diaryId: string;
}

export interface Diary {
  id?: string;
  title: string;
  type: "Private" | "Public";
  createdAt: string;
  updatedAt: string;
  entryIds: string[];
  userId: string;
}

export interface User {
  id?: string;
  username: string;
  password: string;
  email: string;
  diaryIds: string[];
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface initStateAuth {
  token: string | null;
  isAuthenticated: boolean | null;
}

export interface initStateEditor {
  canEdit: boolean;
  activeDiaryId: string | null;
  currentlyEditing: Entry | null;
}
