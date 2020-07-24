export interface Profile {
  id: string;
  fullName: string;
  email: string;
  bio?: string;
  following: number;
  snippets?: string[];
  tags: string[];
}