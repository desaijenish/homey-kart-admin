export interface Documents {
  image: any;
}

export interface DocumentId {
  id?: number | null | undefined
}

export interface DocumentsResponse {
  id: number
  static_file_path: string
  name: string
  status: number;
}
