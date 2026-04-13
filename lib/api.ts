import axios from 'axios';
import { Note } from '@/types/note';

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
  page: number;
  perPage: number;
}

const TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

const api = axios.create({
  baseURL: 'https://notehub-public.goit.study/api', 
  headers: {
    ...(TOKEN && { Authorization: `Bearer ${TOKEN}` }),
    'Content-Type': 'application/json',
  },
});


export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
  page: number;
  perPage: number;
}

export interface FetchParams {
  page?: number;
  perPage?: number;
  search?: string;
  tag?: string;
}

export type CreateNoteData = {
  title: string;
  content: string;
  tag: string;
};

export const fetchNotes = async ({
  page = 1,
  perPage = 10,
  search = '',
  tag = '',
}: FetchParams = {}): Promise<FetchNotesResponse> => {
  // Створюємо об'єкт з базовими параметрами
  const params: any = { page, perPage };

  // Додаємо пошук, тільки якщо він не порожній
  if (search.trim()) {
    params.search = search;
  }

  // Додаємо тег, тільки якщо це не "all" і він не порожній
  if (tag && tag !== 'all') {
    params.tag = tag;
  }

  const response = await api.get<FetchNotesResponse>('/notes', { params });
  return response.data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const response = await api.get<Note>(`/notes/${id}`);
  return response.data;
};

export const createNote = async (noteData: CreateNoteData): Promise<Note> => {
  const response = await api.post<Note>('/notes', noteData);
  return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const response = await api.delete<Note>(`/notes/${id}`);
  return response.data;
};

export default api;