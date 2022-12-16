import { Children, ReactNode } from "react";
import { BlogPost } from "../types/notion";

type ContainerProps = {
  children: ReactNode;
};

type PreviewProps = {
  post: BlogPost;
};

export function Container({ children }: ContainerProps) {
  return (
    <ul>
      {Children.map(children, (child, i) => (
        <li key={i}>{child}</li>
      ))}
    </ul>
  );
}

export function Preview(post: PreviewProps) {
  return <div>{JSON.stringify(post)}</div>;
}
