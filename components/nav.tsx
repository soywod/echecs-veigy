import {FC} from "react";
import Link from "next/link";

export const Nav: FC = () => {
  return (
    <nav>
      <Link href="/">
        <a>Accueil</a>
      </Link>
      -
      <Link href="/competition">
        <a>Compétition</a>
      </Link>
      -
      <Link href="/inscription">
        <a>Inscription</a>
      </Link>
      -
      <Link href="/contact">
        <a>Contact</a>
      </Link>
    </nav>
  );
};

export default Nav;
