import { memo } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import {
  atomOneDark,
  atomOneLight,
} from "react-syntax-highlighter/dist/cjs/styles/hljs";
import { useTheme } from "../hooks/useTheme";
import { CodeProps } from "../types/code";

const LANGUAGE_MAP = {
  html: "htmlbars",
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
    return <code>{children}</code>;
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
