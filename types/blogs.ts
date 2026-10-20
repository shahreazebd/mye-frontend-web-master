export type BlogResponse = {
  total: number;
  page: number;
  next_page: boolean;
  prev_page: boolean;
  data: Blog[];
};

export type Blog = {
  content: string;
  id: number;
  title: string;
  slug: string;
  tag: null | string;
  author: string;
  img_path: null | string;
  meta_keyword: string;
  meta_description: string;
  created_by: string;
  updated_by: null | string;
  created_at: Date;
  updated_at: Date | null;
  channel: Channel;
  published_at: Date;
};

export type Channel = {
  name: string;
  domain: string;
  status: boolean;
};
