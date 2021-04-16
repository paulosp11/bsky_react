export interface Diary {
    id?: string;
    subject : string | null;
    title: string;
    type: 'private' | 'public';
    createdAt?: string;
    updatedAt?: string;
    userId?: string | null;
    entryIds: string[] | null;
  }
  