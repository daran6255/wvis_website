import axios from "axios";
import {
  Newsletter,
  NewsletterPostData,
  NewsletterListResponse,
  NewsletterPostResponse,
} from "./model";

// Base URL can be empty if you're using a proxy in vite.config.ts
const API_BASE = "/api/newsletters";

/**
 * Fetch all newsletters
 */
export const getAllNewsletters = async (): Promise<Newsletter[]> => {
  const response = await axios.get<NewsletterListResponse>(`${API_BASE}/getall`);
  return response.data;
};

/**
 * Post a new newsletter (with FormData for file upload)
 */
export const postNewsletter = async (data: NewsletterPostData): Promise<NewsletterPostResponse> => {
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("description", data.description);
  if (data.image) formData.append("image", data.image);
  if (data.pdf) formData.append("pdf", data.pdf);

  const response = await axios.post<NewsletterPostResponse>(
    `${API_BASE}/postnewsletter`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};
