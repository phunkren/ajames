import { HStack } from "./Layout";

export function Social() {
  return (
    <HStack as="ul" role="list" gap={2}>
      <li>
        <a href="/twitter">twitter</a>
      </li>
      <li>
        <a href="/github">Github</a>
      </li>
      <li>
        <a href="/youtube">youtube</a>
      </li>
      <li>
        <a href="/rss">RSS</a>
      </li>
    </HStack>
  );
}
