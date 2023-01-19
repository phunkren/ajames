import { StaticImageData } from "next/image";

export type Project = {
  id: string;
  name: string;
  url: string;
  description: string;
  src: StaticImageData;
};
