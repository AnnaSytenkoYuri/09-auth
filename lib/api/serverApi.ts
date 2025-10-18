// fetchNotes
// fetchNoteById
// getMe
// checkSession.

"use server";
import { Note } from "@/types/note";
import { nextServer } from "./api";
import { FetchNotesResponse } from "./clientApi";
import { User } from "@/types/user";
import { cookies } from "next/headers";

export async function fetchServerNotes(
  page = 1,
  perPage = 12,
  search = "",
  tag?: string
): Promise<FetchNotesResponse> {
  const cookieStore = await cookies();
  const response = await nextServer.get<FetchNotesResponse>("/notes", {
    params: { page, perPage, search, tag },
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return response.data;
}

export async function fetchServerNoteById(id: string): Promise<Note> {
  const cookieStore = await cookies();
  const response = await nextServer.get<Note>(`/notes/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return response.data;
}

export async function checkServerSession() {
  const cookieStore = await cookies();
  const res = await nextServer.get("/auth/session", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res;
}

export async function getServerMe() {
  const cookieStore = await cookies();
  const { data } = await nextServer.get<User>("/users/me", {
    headers: { Cookie: cookieStore.toString() },
  });
  return data;
}
