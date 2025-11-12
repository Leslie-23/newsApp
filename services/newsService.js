import axios from "axios";
import { NEWS_API_BASE_URL, NEWS_API_KEY } from "../constants/config";

const newsApi = axios.create({
  baseURL: NEWS_API_BASE_URL,
});

export const newsService = {
  // ✅ Get Top Headlines - FIXED
  getTopHeadlines: async (country = "us") => {
    try {
      const response = await newsApi.get("/all", {
        params: {
          locale: country,
          language: "en",
          api_token: NEWS_API_KEY,
        },
      });
      return response.data.data; // The API nests results under "data"
    } catch (error) {
      console.error(
        "Error fetching top headlines:",
        error?.response?.data || error.message
      );
      throw error;
    }
  },

  // ✅ Get News by Category - FIXED
  getNewsByCategory: async (category, country = "us") => {
    try {
      const response = await newsApi.get("/all", {
        params: {
          locale: country,
          language: "en",
          categories: category,
          api_token: NEWS_API_KEY,
        },
      });
      return response.data.data;
    } catch (error) {
      console.error(
        "Error fetching category news:",
        error?.response?.data || error.message
      );
      throw error;
    }
  },

  // ✅ Search News - FIXED
  searchNews: async (query, options = {}) => {
    try {
      const {
        language = "en",
        categories = "",
        exclude_categories = "",
        limit = 50,
        published_after = "",
      } = options;

      const response = await newsApi.get("/all", {
        params: {
          api_token: NEWS_API_KEY,
          search: query,
          language,
          ...(categories && { categories }),
          ...(exclude_categories && { exclude_categories }),
          ...(published_after && { published_after }),
          limit,
        },
      });
      return response.data.data || [];
    } catch (error) {
      console.error(
        "Error searching news:",
        error?.response?.data || error.message
      );
      throw error;
    }
  },

  // ✅ Get search suggestions (popular searches)
  getSearchSuggestions: async () => {
    // This is a mock - you could implement actual trending searches
    const suggestions = [
      "Technology",
      "Sports",
      "Politics",
      "Entertainment",
      "Business",
      "Health",
      "Science",
      "Climate",
      "AI",
      "Bitcoin",
      "Space",
      "Travel",
    ];
    return suggestions;
  },

  // ✅ Get Headlines with specific categories - NEW
  getHeadlinesByCategories: async (categories = "general", country = "us") => {
    try {
      const response = await newsApi.get("/all", {
        params: {
          locale: country,
          language: "en",
          categories: categories,
          api_token: NEWS_API_KEY,
        },
      });
      return response.data.data;
    } catch (error) {
      console.error(
        "Error fetching headlines by categories:",
        error?.response?.data || error.message
      );
      throw error;
    }
  },
};
