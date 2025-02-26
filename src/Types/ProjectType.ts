export interface Project {
  id: string;
  title: string;
  description: string;
  presentation: { title: string , list: string[] }[];
  techno: { name: string }[];
  ended: boolean;
  deploy: boolean;
  links: { name: string; url: string }[];
  img: {
    src: string;
  }[];
}
