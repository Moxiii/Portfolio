export interface Project {
  id: number;
  title: string;
  description: string;
  presentation: ({ title?: string; list?: string[] })[];
  technologies: { name: string; icon: string }[];
  ended: boolean;
  deploy: boolean;
  links: { name: string; url: string }[];
  img: { src: string; title?: string }[];
}
