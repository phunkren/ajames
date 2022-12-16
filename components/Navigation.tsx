import Link from "next/link";

export function Navigation() {
  return (
    <ul>
      <li>
        <Link href="/blog">Blog123</Link>
      </li>
      <li>
        <Link href="/cv">CV</Link>
      </li>
    </ul>
  );
}
