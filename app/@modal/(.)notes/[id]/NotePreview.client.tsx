"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import LoadingIndicator from "@/app/loading";

import css from "./NotePreview.module.css";
import Modal from "@/components/Modal/Modal";
import ErrorMessage from "@/app/(private routes)/notes/[id]/error";
import { fetchNoteById } from "@/lib/api/clientApi";

interface NotePreviewProps {
  noteId: string;
}
export default function NotePreview({ noteId }: NotePreviewProps) {
  const router = useRouter();

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["note", noteId],
    queryFn: () => fetchNoteById(noteId),
    refetchOnMount: false,
  });

  const handleGoBack = () => {
    router.back();
  };

  if (isLoading) return <LoadingIndicator />;
  if (isError) return <ErrorMessage error={error as Error} />;

  if (!data) return <p className={css.text}>Something went wrong.</p>;

  const formattedDate = data.updatedAt
    ? `Updated at: ${data.updatedAt}`
    : `Created at: ${data.createdAt}`;

  return (
    <Modal onClose={handleGoBack}>
      <div className={css.container}>
        <div className={css.item}>
          <div className={css.header}>
            <h2>{data.title}</h2>
          </div>
          <p className={css.content}>{data.content}</p>
          <p className={css.date}>{formattedDate}</p>
          <button className={css.backBtn} onClick={handleGoBack}>
            Back
          </button>
        </div>
      </div>
    </Modal>
  );
}
