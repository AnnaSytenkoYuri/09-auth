import Link from "next/link";
import css from "./Header.module.css";
import TagsMenu from "../TagsMenu/TagsMenu";


export default async function Header() {
  
  return (
    <header className={css.header}>
      <Link href="/" aria-label="Home">
        NoteHub
      </Link>
      <nav aria-label="Main Navigation">
        <ul className={css.navigation}>
          <li>
            <Link href="/">Home</Link>
          </li>
          {/* <li>
            <Link href='/notes/filter/all'>All notes</Link>
          </li> */}
          <li>
            <TagsMenu />
          </li>
        </ul>
      </nav>
    </header>
  );
}
