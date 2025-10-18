export const dynamic = "force-dynamic";
import { getServerMe } from "@/lib/api/serverApi";
import css from "./ProfilePage.module.css";
import Image from "next/image";
import Link from "next/link";

export async function generateMetadata() {
  return {
    title: "Profile",
    description: "My profile page on NoteHub",
    openGraph: {
      title: "Profile",
      description: "My profile page on NoteHub",
      url: "https://notehub.com/profile",
      siteName: "NoteHub",
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          width: 1200,
          height: 630,
          alt: "Profile",
        },
      ],
      type: "article",
    },
  };
}

export default async function Profile() {
  const user = await getServerMe()
  return (
    <>
      <main className={css.mainContent}>
        <div className={css.profileCard}>
          <div className={css.header}>
            <h1 className={css.formTitle}>Profile Page</h1>
            <Link href="/profile/edit" className={css.editProfileButton}>
              Edit Profile
            </Link>
          </div>
          <div className={css.avatarWrapper}>
            <Image
              src="https://ac.goit.global/fullstack/react/default-avatar.jpg"
              alt="User Avatar"
              width={120}
              height={120}
              className={css.avatar}
              priority={true}
            />
          </div>
          <div className={css.profileInfo}>
            <p>Name: {user.username}</p>
            <p>Email: {user.email}</p>
          </div>
        </div>
      </main>
    </>
  );
}
