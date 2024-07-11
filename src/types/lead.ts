export interface Lead {
  first_name: string;
  last_name?: string;
  email: string;
  phone: string;
  addr: string;
  city: string;
  state: string;
  message: string;
  active_stage: string | undefined;
  id?: number | undefined;
  is_dump: boolean;
  media: Media[] | undefined;
  stage: Stage[] | undefined;
  lead_documentL: LeadDocument[] | undefined;
}

export interface Stage {
  stage: string;
  message: string;
  is_completed: boolean;
  completed_date_time: string;
}

export interface Media {
  name: string;
  url: string;
}

export interface LeadDocument {
  document_id: number;
  static_file_path: string;
  name: string;
}
