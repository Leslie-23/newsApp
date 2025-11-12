import axios from "axios";
import { NEWS_API_BASE_URL, NEWS_API_KEY } from "../constants/config";

const newsApi = axios.create({
  baseURL: NEWS_API_BASE_URL,
  params: {
    apiKey: NEWS_API_KEY,
  },
});

export const newsService = {
  getTopHeadlines: async (country = "us") => {
    try {
      const response = await newsApi.get("/top-headlines", {
        params: { country },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching headlines:", error);
      throw error;
    }
  },

  getNewsByCategory: async (category, country = "us") => {
    try {
      const response = await newsApi.get("/top-headlines", {
        params: { country, category },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching category news:", error);
      throw error;
    }
  },

  searchNews: async (query, language = "en") => {
    try {
      const response = await newsApi.get("/everything", {
        params: { q: query, language, sortBy: "publishedAt" },
      });
      return response.data;
    } catch (error) {
      console.error("Error searching news:", error);
      throw error;
    }
  },
};
