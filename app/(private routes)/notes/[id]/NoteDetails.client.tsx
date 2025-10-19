"use client";

import { useQuery } from "@tanstack/react-query";
import css from "./NoteDetails.module.css";

import ErrorMessage from "../filter/[...slug]/error";
import { useParams } from "next/navigation";
import { fetchNoteById } from "@/lib/api/clientApi";
import LoadingIndicator from "@/app/loading";

export default function NoteDetailsClient() {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  if (isLoading) return <LoadingIndicator />;
  if (isError) return <ErrorMessage error={error as Error} />;

  if (!data) return <p className={css.text}>Something went wrong.</p>;

  const formattedDate = data.updatedAt
    ? `Updated at: ${data.updatedAt}`
    : `Created at: ${data.createdAt}`;

  return (
    <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{data.title}</h2>
        </div>
        <p className={css.content}>{data.content}</p>
        <p className={css.date}>{formattedDate}</p>
      </div>
    </div>
  );
}
