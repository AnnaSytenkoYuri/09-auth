import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import NotesClient from "./Notes.client";
import { Metadata } from "next";
import { fetchNotes } from "@/lib/api/clientApi";

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const rawTag = (await params).slug?.[0] ?? "All";
  const tag = rawTag === "All" ? undefined : rawTag;

  const title = tag ? `Note: ${tag}` : "All notes";
  const description = tag
    ? `View notes filtered by tag '${tag}' on NoteHub.`
    : "View all available notes on NoteHub.";
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://notehub.com/notes/filter/${rawTag}`,
      siteName: "NoteHub",
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: tag ? `NoteHub: ${tag}` : "All Notes on NoteHub",
        },
      ],
      type: "article",
    },
  };
}

export default async function NotesPage({ params }: PageProps) {
  const rawTag = (await params).slug?.[0] ?? "All";
  const tag = rawTag === "All" ? undefined : rawTag;

  const queryClient = new QueryClient();

  const page = 1;
  const search = "";
  const perPage = 12;

  await queryClient.prefetchQuery({
    queryKey: ["notes", page, perPage, search, tag],
    queryFn: () => fetchNotes(page, perPage, search, tag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient noteClientTag={tag} />
    </HydrationBoundary>
  );
}
