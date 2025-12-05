import { API_CONFIG } from "./constants";
import type {
  Post,
  Treatment,
  Category,
  Tag,
  PaginatedResponse,
} from "@/types";

/**
 * Cliente API para comunicarse con el backend
 */
class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async fetch<T>(
    endpoint: string,
    options?: RequestInit
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;

    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  // ===== POSTS =====

  async getPosts(params?: {
    page?: number;
    limit?: number;
    categorySlug?: string;
    tagSlug?: string;
  }): Promise<PaginatedResponse<Post>> {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.set("page", params.page.toString());
    if (params?.limit) queryParams.set("limit", params.limit.toString());
    if (params?.categorySlug) queryParams.set("category", params.categorySlug);
    if (params?.tagSlug) queryParams.set("tag", params.tagSlug);

    const query = queryParams.toString();
    return this.fetch<PaginatedResponse<Post>>(
      `/posts${query ? `?${query}` : ""}`
    );
  }

  async getPostBySlug(slug: string): Promise<Post> {
    return this.fetch<Post>(`/posts/${slug}`);
  }

  // ===== TREATMENTS =====

  async getTreatments(): Promise<Treatment[]> {
    return this.fetch<Treatment[]>("/treatments");
  }

  async getTreatmentBySlug(slug: string): Promise<Treatment> {
    return this.fetch<Treatment>(`/treatments/${slug}`);
  }

  // ===== CATEGORIES =====

  async getCategories(): Promise<Category[]> {
    return this.fetch<Category[]>("/categories");
  }

  async getCategoryBySlug(slug: string): Promise<Category> {
    return this.fetch<Category>(`/categories/${slug}`);
  }

  // ===== TAGS =====

  async getTags(): Promise<Tag[]> {
    return this.fetch<Tag[]>("/tags");
  }

  async getTagBySlug(slug: string): Promise<Tag> {
    return this.fetch<Tag>(`/tags/${slug}`);
  }

  // ===== CONTACT FORM =====

  async submitContactForm(data: {
    name: string;
    email: string;
    phone: string;
    message: string;
    acceptPrivacy: boolean;
  }): Promise<{ success: boolean; message: string }> {
    return this.fetch<{ success: boolean; message: string }>("/contact", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  // ===== APPOINTMENT FORM =====

  async submitAppointmentForm(data: {
    name: string;
    email: string;
    phone: string;
    preferredDate?: string;
    preferredTime?: string;
    treatment?: string;
    message?: string;
    acceptPrivacy: boolean;
  }): Promise<{ success: boolean; message: string }> {
    return this.fetch<{ success: boolean; message: string }>("/appointments", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }
}

// Instancia del cliente API
export const api = new ApiClient(API_CONFIG.baseUrl);


