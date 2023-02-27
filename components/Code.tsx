import { memo, ReactNode } from "react";
import { LightAsync as SyntaxHighlighter } from "react-syntax-highlighter";
import atomOneDark from "react-syntax-highlighter/dist/cjs/styles/hljs/atom-one-dark";
import atomOneLight from "react-syntax-highlighter/dist/cjs/styles/hljs/atom-one-light";
import typescript from "react-syntax-highlighter/dist/esm/languages/hljs/typescript";
import javascript from "react-syntax-highlighter/dist/esm/languages/hljs/javascript";
import htmlbars from "react-syntax-highlighter/dist/esm/languages/hljs/htmlbars";
import markup from "react-syntax-highlighter/dist/esm/languages/prism/markup";
import scss from "react-syntax-highlighter/dist/esm/languages/hljs/scss";
import css from "react-syntax-highlighter/dist/esm/languages/hljs/css";
import json from "react-syntax-highlighter/dist/esm/languages/hljs/json";
import markdown from "react-syntax-highlighter/dist/esm/languages/hljs/markdown";
import { useTheme } from "../hooks/useTheme";
import { TextBody } from "./Text";

export type CodeProps = {
  inline?: boolean;
  className?: string;
  children: ReactNode;
};

SyntaxHighlighter.registerLanguage("typescript", typescript);
SyntaxHighlighter.registerLanguage("javascript", javascript);
SyntaxHighlighter.registerLanguage("htmlbars", htmlbars);
SyntaxHighlighter.registerLanguage("markup", markup);
SyntaxHighlighter.registerLanguage("css", css);
SyntaxHighlighter.registerLanguage("scss", scss);
SyntaxHighlighter.registerLanguage("json", json);
SyntaxHighlighter.registerLanguage("markdown", markdown);

const LANGUAGE_MAP = {
  text: "markup",
};

const STYLE_MAP = {
  light: atomOneLight,
  dark: atomOneDark,
};

export const Code = memo(function Code({
  className,
  inline,
  children,
}: CodeProps) {
  const language = className?.split("-")[1] ?? "";

  const { themeName } = useTheme();

  if (inline) {
    return <TextBody as="code">{children}</TextBody>;
  }

  return (
    <SyntaxHighlighter
      language={LANGUAGE_MAP[language] ?? language}
      style={STYLE_MAP[themeName]}
      wrapLongLines
    >
      {children}
    </SyntaxHighlighter>
  );
});
