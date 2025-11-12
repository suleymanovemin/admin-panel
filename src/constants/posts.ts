import type { Post } from "../types/types";


export const mockPosts: Post[] = [
  {
    id: '1',
    image: 'https://source.unsplash.com/random/100x100?tech',
    title: 'Getting Started with React',
    description: 'Learn the basics of React and build your first application',
    type: 'News',
    sharingTime: '2023-11-12T10:30:00',
    status: 'Active',
    publishStatus: 'Published',
    author: 'John Doe'
  },
  {
    id: '2',
    image: 'https://source.unsplash.com/random/100x100?programming',
    title: 'Advanced TypeScript Patterns',
    description: 'Explore advanced TypeScript patterns for better code quality',
    type: 'Announcement',
    sharingTime: '2023-11-10T14:45:00',
    status: 'Active',
    publishStatus: 'Draft',
    author: 'Jane Smith'
  },
  {
    id: '3',
    image: 'https://source.unsplash.com/random/100x100?coding',
    title: 'State Management in 2023',
    description: 'Comparing different state management solutions for React',
    type: 'News',
    sharingTime: '2023-11-05T09:15:00',
    status: 'Inactive',
    publishStatus: 'Scheduled',
    author: 'Mike Johnson'
  }
];
