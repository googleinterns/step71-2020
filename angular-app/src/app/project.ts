/**
 * Represents a single project. Owner and collaborators strings must be their UIDs (user ID) 
 * as set with Firebase authentication
 */
export interface Project {
  title: string;
  // mapping of uids to permission roles
  roles: object;
  tags: string[];
  files: string[];
  textDoc: string;
  docInfo: string;
}
