/**
 * Represents a single project. Owner and collaborators strings must be their UIDs (user ID) 
 * as set with Firebase authentication
 */
export interface Project {
  title: string;
  roles: Map<string, string>;
  tags: string[];
}
