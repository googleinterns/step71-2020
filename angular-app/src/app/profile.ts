export interface Profile {
  id: string;
  fullName: string;
  email: string;
  photoUrl: string;
  bio?: string;
  following: number;
  snippets?: string[];
  tags: string[];
}