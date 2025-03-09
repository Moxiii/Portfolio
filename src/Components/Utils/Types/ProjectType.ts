export interface Project {
  id: string;
  title: string;
  description: string;
  presentation: { title: string; list: string[] }[];
  techno: { name: string; icon?: string }[];
  ended: boolean;
  deploy: boolean;
  links: { name: string; url: string }[];
  img: {
    src: string;
  }[];
}
