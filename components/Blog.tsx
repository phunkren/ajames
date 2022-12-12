import { Children, memo, ReactNode } from "react";
import { BlogPost } from "../types/notion";

type ContainerProps = {
  children: ReactNode;
};

type PreviewProps = {
  post: BlogPost;
};

export const Container = memo(function Container({ children }: ContainerProps) {
  return (
    <ul>
      {Children.map(children, (child) => (
        <li>{child}</li>
      ))}
    </ul>
  );
});

export const Preview = memo(function Preview(post: PreviewProps) {
  return <div>{JSON.stringify(post)}</div>;
});
