// register
// login
// logout
// checkSession
// getMe
// updateMe

import { Note } from "@/types/note";
import { nextServer } from "./api";
import { User } from "@/types/user";
// import { cookies } from "next/headers";

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
  const response = await nextServer.get<FetchNotesResponse>(
    "/notes",
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
  const response = await nextServer.post<Note>(
    "/notes",
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
  const response = await nextServer.delete<Note>(
    `/notes/${id}`,
    {
      headers: {
        Authorization: `Bearer ${myToken}`,
      },
    }
  );
  return response.data;
}

export async function fetchNoteById(id: string): Promise<Note> {
  const response = await nextServer.get<Note>(
    `/notes/${id}`,
    {
      headers: {
        Authorization: `Bearer ${myToken}`,
      },
    }
  );
  return response.data;
}

export interface RegisterRequest{
  userName: string;
  email: string;
  password: string;
  id?: string; 
};

export async function register(data: RegisterRequest){
  const res = await nextServer.post<User>('/auth/register', data);
  return res.data;
}

export interface LoginRequest {
  email: string;
  password: string;
};

export async function login(data: LoginRequest){
  const res = await nextServer.post<User>('/auth/login', data);
  return res.data;
}


interface SessionRequest{
  success: boolean;
}

export async function checkSession() {
  const res = await nextServer.get<SessionRequest>('/auth/session')
  return res.data.success
}


export async function getMe() {
  const {data} = await nextServer.get<User>('/users/me')
  return data
}

export async function logout():Promise<void> {
 await nextServer.post('/auth/logout')
}

