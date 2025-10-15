import { Note } from "@/types/note";
import axios from "axios";

const myToken = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

export interface FetchNotesResponse {
  notes: Note[];
  page: number;
  totalPages: number;
}

interface CreateNoteDto {
  title: string;
  content: string;
  tag: string;
}

export async function fetchNotes(
  page = 1,
  perPage = 12,
  search = "",
  tag?: string
): Promise<FetchNotesResponse> {
  const response = await axios.get<FetchNotesResponse>(
    "https://notehub-public.goit.study/api/notes",
    {
      params: { page, perPage, search, tag },
      headers: {
        Authorization: `Bearer ${myToken}`,
      },
    }
  );
  return response.data;
}

export async function createNote(noteData: CreateNoteDto): Promise<Note> {
  const response = await axios.post<Note>(
    "https://notehub-public.goit.study/api/notes",
    noteData,
    {
      headers: {
        Authorization: `Bearer ${myToken}`,
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
}

export async function deleteNote(id: string): Promise<Note> {
  const response = await axios.delete<Note>(
    `https://notehub-public.goit.study/api/notes/${id}`,
    {
      headers: {
        Authorization: `Bearer ${myToken}`,
      },
    }
  );
  return response.data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const response = await axios.get<Note>(
    `https://notehub-public.goit.study/api/notes/${id}`,
    {
      headers: {
        Authorization: `Bearer ${myToken}`,
      },
    }
  );
  return response.data;
}
