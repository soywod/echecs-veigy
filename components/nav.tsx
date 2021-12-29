import {FC} from "react";
import Link from "next/link";
import Img from "next/image";
import {useRouter} from "next/router";
import cn from "classnames";

import logo from "../images/logo.png";
import cs from "./nav.module.scss";

type NavLinkProps = {
  path: string;
};

const NavLink: FC<NavLinkProps> = ({path, children}) => {
  const router = useRouter();
  return (
    <Link href={path}>
      <a className={cn(cs.link, {[cs.active]: router.pathname === path})}>{children}</a>
    </Link>
  );
};

export const Nav: FC = () => {
  return (
    <nav className={cs.nav}>
      <div className={cs.logo}>
        <Img src={logo} />
      </div>
      <NavLink path="/">Accueil</NavLink>
      <NavLink path="/about">À propos</NavLink>
      <NavLink path="/competition">Compétition</NavLink>
      <NavLink path="/registration">Inscription</NavLink>
      <NavLink path="/contact">Contact</NavLink>
    </nav>
  );
};

export default Nav;
