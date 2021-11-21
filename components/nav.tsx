import {FC} from "react";
import Link from "next/link";

export const Nav: FC = () => {
  return (
    <nav>
      <Link href="/">
        <a>Accueil</a>
      </Link>
      -
      <Link href="/tournament">
        <a>Les tournois</a>
      </Link>
      -
      <Link href="/blog">
        <a>La vie du club</a>
      </Link>
      -
      <Link href="/subscription">
        <a>S'inscrire</a>
      </Link>
      -
      <Link href="/contact">
        <a>Nous contacter</a>
      </Link>
      -
      <Link href="/authentication">
        <a>Se connecter</a>
      </Link>
    </nav>
  );
};

export default Nav;
