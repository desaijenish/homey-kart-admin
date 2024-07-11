export interface Candidates {
  first_name: string;
  last_name?: string;
  email: string;
  password?: string | undefined;
  phone: string;
  skill: string[] | undefined;
  document_id: number | null;
  addr: string;
  city: string;
  state: string;
  english_proficiency: number | null;
  last_education: string;
  id?: number | undefined;
  static_file_path?: string | undefined;
}
export interface Candidate {
  items: Candidates[];
}
