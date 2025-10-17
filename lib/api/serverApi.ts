// fetchNotes
// fetchNoteById
// getMe
// checkSession.

'use server';
import { Note } from "@/types/note";
import { nextServer } from "./api";
import { FetchNotesResponse } from "./clientApi";
import { User } from "@/types/user";
import { cookies } from "next/headers";


const myToken = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

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

// interface SessionRequest{
//     success: boolean;
// }

export async function checkServerSession() {
    const cookieStore = await cookies();
    const res = await nextServer.get('/auth/session', {
        headers : {
            Cookie : cookieStore.toString(),
        }
    });
    return res
}


export async function getServerMe() {
    const cookieStore =  await cookies();
    const {data} = await nextServer.get<User>('/users/me', {headers: {Cookie: cookieStore.toString()}})
    return data
}


