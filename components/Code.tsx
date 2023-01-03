import SyntaxHighlighter from "react-syntax-highlighter";
import {
  atomOneDark,
  atomOneLight,
} from "react-syntax-highlighter/dist/cjs/styles/hljs";
import { useTheme } from "../hooks/useTheme";

const LANGUAGE_MAP = {
  html: "htmlbars",
};

const STYLE_MAP = {
  light: atomOneLight,
  dark: atomOneDark,
};

export function Code({ node, ...props }) {
  const language = props.className?.split("-")[1] ?? "";
  const { themeName } = useTheme();

  if (props.inline) {
    return <code>{props.children}</code>;
  }

  return (
    <SyntaxHighlighter
      language={LANGUAGE_MAP[language] ?? language}
      style={STYLE_MAP[themeName]}
      wrapLongLines
    >
      {props.children}
    </SyntaxHighlighter>
  );
}
