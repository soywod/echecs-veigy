import {FC} from "react";

import cs from "./component.module.scss";

export type TitleProps = {
  //
};

export const Title: FC<TitleProps> = props => {
  return <h1 className={cs.title}>{props.children}</h1>;
};

export default Title;
