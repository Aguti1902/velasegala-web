// ===== TYPES DEL BACKEND =====

export interface Post {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  featuredImage: string | null;
  metaTitle: string | null;
  metaDescription: string | null;
  publishStatus: "DRAFT" | "PUBLISHED" | "SCHEDULED";
  publishAt: string | null;
  createdAt: string;
  updatedAt: string;
  author?: User | null;
  categories: Category[];
  tags: Tag[];
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
  _count?: {
    posts: number;
  };
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  _count?: {
    posts: number;
  };
}

export interface Treatment {
  id: string;
  title: string;
  slug: string;
  description: string;
  longDescription: string | null;
  featuredImage: string | null;
  icon: string | null;
  priceRange: string | null;
  duration: string | null;
  metaTitle: string | null;
  metaDescription: string | null;
  faqItems: FAQItem[] | null;
  order: number;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Page {
  id: string;
  title: string;
  slug: string;
  content: string;
  metaTitle: string | null;
  metaDescription: string | null;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

// ===== RESPONSE TYPES =====

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// ===== FORM TYPES =====

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  acceptPrivacy: boolean;
}

export interface AppointmentFormData {
  name: string;
  email: string;
  phone: string;
  preferredDate?: string;
  preferredTime?: string;
  treatment?: string;
  message?: string;
  acceptPrivacy: boolean;
}

// ===== SEO TYPES =====

export interface BreadcrumbItem {
  name: string;
  href: string;
}

export interface LocalBusinessData {
  name: string;
  description: string;
  telephone: string;
  email: string;
  address: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  geo: {
    latitude: number;
    longitude: number;
  };
  url: string;
  image: string;
  priceRange: string;
  openingHours: Array<{
    dayOfWeek: string;
    opens: string;
    closes: string;
  }>;
}


