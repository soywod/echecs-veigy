import {FC} from "react";
import Link from "next/link";
import Img from "next/image";

import logo from "./logo.png";
import cs from "./nav.module.scss";

export const Nav: FC = () => {
  return (
    <nav className={cs.nav}>
      <div className={cs.logo}>
        <Img src={logo} />
      </div>
      <div className={cs.links}>
        <Link href="/">
          <a className={cs.link}>Accueil</a>
        </Link>
        <Link href="/a-propos">
          <a className={cs.link}>À propos</a>
        </Link>
        <Link href="/competition">
          <a className={cs.link}>Compétition</a>
        </Link>
        <Link href="/inscription">
          <a className={cs.link}>Inscription</a>
        </Link>
        <Link href="/contact">
          <a className={cs.link}>Contact</a>
        </Link>
      </div>
      <footer className={cs.footer}>FOOTER</footer>
    </nav>
  );
};

export default Nav;
