import { Metadata } from "next";
import css from "./home.module.css";

export const metadata: Metadata = {
  title: "Not-found",
  description: "No such page exists",
  openGraph: {
    title: "Not-found",
    description: "No such page exists",
    url: 'https://notehub.com/not-found', // need to add production not found page link 
    images: [
      {
        url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',     
          width: 1200,
          height: 630,
          alt: "NoteHub",
      },
    ],
    type: 'article',
  }
};

export default function NotFound() {
  return (
    <div>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  );
}