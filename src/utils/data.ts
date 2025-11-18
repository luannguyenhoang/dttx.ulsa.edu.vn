export interface CourseLayoutProps {
  category: string;
  title: string;
  description: string;
  featuredImage: string;
  title_1: string;
  title_2: string;
  title_3: string;
  courseDetails: {
    description: string;
    learningPoints: string[];
  };
  content: {
    title: string;
    lessons: {
      title: string;
      isLocked?: boolean;
    }[];
  }[];
}

export interface Post {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  formattedDate: string;
  category: string;
  featured_image: string;
  slug: string;
}

export interface Category {
  name: string;
  slug: string;
  count?: number;
  featured_image: string;
  description?: string;
}
