export interface Subdomain {
  id: number;
  title: string;
  path: string;
}

export interface NavLinkItem {
  id: number;
  title: string;
  path: string;
  icon: string;
  subdomains?: Subdomain[];
}

export interface FiltersType {
  [key: string]: string;
}

export type AlertType = "SUCCESS" | "DELETE";

export interface Post  {
  id: string;
  image: string;
  title: string;
  content: string;
  type: string;
  date: string;
  status: 'Active' | 'Inactive';
  publishStatus: 'Scheduled' | 'Published' | 'Draft';
  author: string;
}

export interface PostsTableProps {
  posts: Post[];
  onDelete: (id: string) => void;
  setAlert: (open: boolean, type?: AlertType) => void;
  onOpenEdit?: (post: Post) => void;
}

export interface PaginationProps {
  totalPosts: number;
  postsPerPage: number;
  setPostsPerPage: (value: number) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

export interface LanguageFormValues {
  title: string;
  slug: string;
  category: string;
  htmlContent: string;
  coverImage: File | null;
}

export interface PostData {
  AZ: LanguageFormValues;
  EN: LanguageFormValues;
  multipleImages: File[];
}

export interface UserProfileType  {
  name: string;
  username?: string;
  avatarSrc?: string;
  className?: string;
};