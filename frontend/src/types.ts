// Типи відповідей API. Те саме повертають і CMS (cms/src/endpoints.ts),
// і тестовий backend (backend/server.ts).

export interface Img {
  src: string;
  alt: string;
}

export interface Button {
  text: string;
  link: string;
  variant: "primary" | "secondary";
}

export interface MenuItem {
  label: string;
  link: string;
}

export interface Settings {
  siteName: string;
  menu: MenuItem[];
  footer: { text: string };
}

interface BlockBase {
  anchor?: string;
}

export interface HeroBlock extends BlockBase {
  type: "hero";
  size?: "full" | "compact";
  badge?: string;
  title: string;
  subtitle?: string;
  image?: Img;
  buttons?: Button[];
}

export interface FeaturesBlock extends BlockBase {
  type: "features";
  title: string;
  items: { icon: string; title: string; text?: string }[];
}

export interface StatsBlock extends BlockBase {
  type: "stats";
  title?: string;
  items: { value: string; label: string }[];
}

export interface ProductsBlock extends BlockBase {
  type: "products";
  title: string;
  subtitle?: string;
  items: {
    icon?: string;
    image?: Img;
    category?: string;
    name: string;
    description?: string;
    price: number;
  }[];
  button?: { text: string; link: string };
}

export interface RolesBlock extends BlockBase {
  type: "roles";
  title: string;
  items: { title: string; subtitle?: string; points: { text: string }[] }[];
}

export interface ContactsBlock extends BlockBase {
  type: "contacts";
  title: string;
  text?: string;
  phone?: string;
  email?: string;
  address?: string;
  button?: { text: string; link: string };
}

export interface TextBlock extends BlockBase {
  type: "text";
  title: string;
  text: string;
}

export interface CtaBlock extends BlockBase {
  type: "cta";
  title: string;
  button: { text: string; link: string };
}

export type Block =
  | HeroBlock
  | TextBlock
  | CtaBlock
  | FeaturesBlock
  | StatsBlock
  | ProductsBlock
  | RolesBlock
  | ContactsBlock;

export type BlockType = Block["type"];

export interface Page {
  path: string;
  title: string;
  blocks: Block[];
}
