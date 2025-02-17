export interface Project {
  id: string;
  title: string;
  description: string;
  presentation: (string | { titre: string } | { liste: string[] })[];
  techno: { name: string }[];
  ended: boolean;
  deploy: boolean;
  links: { name: string; url: string }[];
  img: {
    isMock: boolean;
    src: string;
  }[];
}
