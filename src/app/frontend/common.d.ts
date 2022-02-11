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

interface articleListInfos {
  id: string;
  attributes: {
    title: string;
    date: string;
    img: {
      data?: {
        id: string;
        attributes: {
          url: string;
        };
      };
    };
    tags: {
      data?: {
        id: string;
        attributes: {
          name: string;
        };
      }[];
    };
  };
}
