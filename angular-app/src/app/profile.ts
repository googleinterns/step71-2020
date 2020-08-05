export interface Profile {
  id: string;
  displayName: string;
  email: string;
  photoUrl: string;
  bio: string;
  following: string[];
  snippets: string[];
  tags: string[];
}
