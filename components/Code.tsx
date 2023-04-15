import { memo, ReactNode } from "react";
import { LightAsync as SyntaxHighlighter } from "react-syntax-highlighter";
import hybrid from "react-syntax-highlighter/dist/cjs/styles/hljs/hybrid";
import typescript from "react-syntax-highlighter/dist/esm/languages/hljs/typescript";
import javascript from "react-syntax-highlighter/dist/esm/languages/hljs/javascript";
import xml from "react-syntax-highlighter/dist/esm/languages/hljs/xml";
import scss from "react-syntax-highlighter/dist/esm/languages/hljs/scss";
import css from "react-syntax-highlighter/dist/esm/languages/hljs/css";
import json from "react-syntax-highlighter/dist/esm/languages/hljs/json";
import markdown from "react-syntax-highlighter/dist/esm/languages/hljs/markdown";
import { TextBody } from "./Text";

export type CodeProps = {
  inline?: boolean;
  className?: string;
  children: ReactNode;
};

SyntaxHighlighter.registerLanguage("typescript", typescript);
SyntaxHighlighter.registerLanguage("javascript", javascript);
SyntaxHighlighter.registerLanguage("xml", xml);
SyntaxHighlighter.registerLanguage("css", css);
SyntaxHighlighter.registerLanguage("scss", scss);
SyntaxHighlighter.registerLanguage("json", json);
SyntaxHighlighter.registerLanguage("markdown", markdown);

const LANGUAGE_MAP = {
  html: "xml",
  htmlbars: "xml",
  text: "xml",
};

export const Code = memo(function Code({
  className,
  inline,
  children,
}: CodeProps) {
  const language = className?.split("-")[1] ?? "";

  if (inline) {
    return <TextBody as="code">{children}</TextBody>;
  }

  return (
    <SyntaxHighlighter
      language={LANGUAGE_MAP[language] ?? language}
      style={hybrid}
      wrapLongLines
    >
      {children}
    </SyntaxHighlighter>
  );
});
