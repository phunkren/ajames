import Link from "next/link";
import { memo } from "react";

export const Navigation = memo(function Navigation() {
  return (
    <ul>
      <li>
        <Link href="/">Home</Link>
      </li>
      <li>
        <Link href="/blog">Blog</Link>
      </li>
      <li>
        <Link href="/cv">CV</Link>
      </li>
    </ul>
  );
});
