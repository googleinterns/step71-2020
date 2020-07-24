/**
 * Represents a single project.
 */
export interface Project {
  title: string;
  owner: string;
  collaborators: string[];
  tags: string[];
  files: string[];
  textDoc: string;
}