interface meta {
  title: string;
  description: string;
  ogImage: string;
  canonical: string;
}

interface breadcrumbInfos {
  url?: string;
  text: string;
}

interface cardListInfos {
  title: string;
  iconClassName?: string;
  texts: string[];
  url?: string;
  linkText?: string;
}
