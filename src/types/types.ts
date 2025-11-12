export interface Subdomain  {
  id: number;
  title: string;
  path: string;
};

export interface NavLinkItem  {
  id: number;
  title: string;
  path: string;
  icon: string;
  subdomains?: Subdomain[];
};

export interface FiltersType  {
  [key: string]: string;
};

export interface Post  {
  id: string;
  image: string;
  title: string;
  description: string;
  type: string;
  sharingTime: string;
  status: 'Active' | 'Inactive';
  publishStatus: 'Scheduled' | 'Published' | 'Draft';
  author: string;
}

export interface PostsTableProps {
  posts: Post[];
  onEdit: (post: Post) => void;
  onDelete: (id: string) => void;
}
