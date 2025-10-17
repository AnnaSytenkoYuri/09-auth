"use client";

import css from "./error.module.css";

interface Props {
  error: Error;
}
export default function ErrorMessage({ error }: Props) {
  return (
    <p className={css.text}>Could not fetch note details. {error.message}</p>
  );
}
