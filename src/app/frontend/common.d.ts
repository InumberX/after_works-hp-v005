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
    description?: string;
    content?: string;
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

interface pagingInfo {
  pageUrl: string;
  currentPage: number;
  pageSize: number;
  pageCount: number;
}

interface lead {
  text: string;
}

interface qualification {
  name: string;
  url: string;
}

interface skill {
  text: string;
}

interface history {
  year: string;
  content: {
    from: number;
    to: number;
    title: string;
    text?: string;
  }[];
}
