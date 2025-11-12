import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import NewsList from "../components/NewsList";
import { newsService } from "../services/newsService";

export default function SearchScreen() {
  const [query, setQuery] = useState("");
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);

  useEffect(() => {
    loadSearchSuggestions();
    loadRecentSearches();
  }, []);

  const loadSearchSuggestions = async () => {
    try {
      const data = await newsService.getSearchSuggestions();
      setSuggestions(data);
    } catch (error) {
      console.error("Error loading suggestions:", error);
    }
  };

  const loadRecentSearches = () => {
    // In a real app, you might load this from AsyncStorage
    const recent = ["Technology", "Sports", "AI News"];
    setRecentSearches(recent);
  };

  const handleSearch = async (searchQuery = query) => {
    if (!searchQuery.trim()) {
      Alert.alert("Error", "Please enter a search term");
      return;
    }

    try {
      setLoading(true);
      Keyboard.dismiss();
      setShowSuggestions(false);

      const data = await newsService.searchNews(searchQuery);
      setArticles(data || []);

      // Add to search history
      if (searchQuery && !searchHistory.includes(searchQuery)) {
        const updatedHistory = [searchQuery, ...searchHistory.slice(0, 4)];
        setSearchHistory(updatedHistory);
      }
    } catch (error) {
      Alert.alert(
        "Search Failed",
        "Unable to fetch news. Please check your connection and try again."
      );
      console.error("Search error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickSearch = (quickQuery) => {
    setQuery(quickQuery);
    handleSearch(quickQuery);
  };

  const clearSearch = () => {
    setQuery("");
    setArticles([]);
    setShowSuggestions(true);
  };

  const handleArticlePress = (article) => {
    Alert.alert(
      article.title || "No Title",
      article.description || "No description available",
      [
        { text: "OK", style: "default" },
        { text: "View Details", style: "cancel" },
      ]
    );
  };

  const renderSearchSuggestions = () => (
    <View style={styles.suggestionsContainer}>
      {/* Recent Searches */}
      {searchHistory.length > 0 && (
        <View style={styles.suggestionSection}>
          <Text style={styles.suggestionTitle}>Recent Searches</Text>
          {searchHistory.map((item, index) => (
            <TouchableOpacity
              key={`recent-${index}`}
              style={styles.suggestionItem}
              onPress={() => handleQuickSearch(item)}
            >
              <Ionicons name="time-outline" size={18} color="#64748b" />
              <Text style={styles.suggestionText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {/* Popular Suggestions */}
      <View style={styles.suggestionSection}>
        <Text style={styles.suggestionTitle}>Popular Topics</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.chipContainer}>
            {suggestions.slice(0, 8).map((suggestion, index) => (
              <TouchableOpacity
                key={`suggestion-${index}`}
                style={styles.chip}
                onPress={() => handleQuickSearch(suggestion)}
              >
                <Text style={styles.chipText}>{suggestion}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Search Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Search News</Text>
        <Text style={styles.subtitle}>
          Discover the latest stories from around the world
        </Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Ionicons
            name="search"
            size={20}
            color="#64748b"
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Search for news, topics, or keywords..."
            placeholderTextColor="#94a3b8"
            value={query}
            onChangeText={setQuery}
            onSubmitEditing={() => handleSearch()}
            onFocus={() => setShowSuggestions(true)}
            returnKeyType="search"
            clearButtonMode="while-editing"
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
              <Ionicons name="close-circle" size={20} color="#94a3b8" />
            </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity
          style={[
            styles.searchButton,
            !query.trim() && styles.searchButtonDisabled,
          ]}
          onPress={() => handleSearch()}
          disabled={!query.trim()}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#ffffff" />
          ) : (
            <Text style={styles.searchButtonText}>Search</Text>
          )}
        </TouchableOpacity>
      </View>

      {/* Content Area */}
      {showSuggestions &&
        articles.length === 0 &&
        !loading &&
        renderSearchSuggestions()}

      {/* Search Results */}
      {articles.length > 0 && (
        <View style={styles.resultsHeader}>
          <Text style={styles.resultsTitle}>Search Results for "{query}"</Text>
          <Text style={styles.resultsCount}>
            {articles.length} {articles.length === 1 ? "article" : "articles"}{" "}
            found
          </Text>
        </View>
      )}

      {/* News List */}
      <View style={styles.newsContainer}>
        <NewsList
          articles={articles}
          onArticlePress={handleArticlePress}
          loading={loading}
          refreshing={false}
          onRefresh={() => handleSearch()}
        />
      </View>

      {/* Empty State */}
      {articles.length === 0 && !loading && !showSuggestions && (
        <View style={styles.emptyState}>
          <Ionicons name="search-outline" size={64} color="#cbd5e1" />
          <Text style={styles.emptyStateTitle}>No Search Results</Text>
          <Text style={styles.emptyStateText}>
            Try searching for different keywords or browse popular topics
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  header: {
    backgroundColor: "#ffffff",
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#34bb78",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: "#64748b",
  },
  searchContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
    gap: 12,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8fafc",
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#e2e8f0",
    paddingHorizontal: 16,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#34bb78",
    paddingVertical: 14,
  },
  clearButton: {
    padding: 4,
  },
  searchButton: {
    backgroundColor: "#34bb78",
    borderRadius: 16,
    paddingHorizontal: 24,
    paddingVertical: 14,
    justifyContent: "center",
    alignItems: "center",
    minWidth: 80,
  },
  searchButtonDisabled: {
    backgroundColor: "#cbd5e1",
  },
  searchButtonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
  suggestionsContainer: {
    flex: 1,
    padding: 20,
  },
  suggestionSection: {
    marginBottom: 24,
  },
  suggestionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#475569",
    marginBottom: 12,
  },
  suggestionItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
  },
  suggestionText: {
    fontSize: 16,
    color: "#475569",
    marginLeft: 12,
  },
  chipContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  chip: {
    backgroundColor: "#f1f5f9",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  chipText: {
    fontSize: 14,
    color: "#475569",
    fontWeight: "500",
  },
  resultsHeader: {
    backgroundColor: "#ffffff",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
  },
  resultsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#34bb78",
    marginBottom: 4,
  },
  resultsCount: {
    fontSize: 14,
    color: "#64748b",
  },
  newsContainer: {
    flex: 1,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#475569",
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 16,
    color: "#64748b",
    textAlign: "center",
    lineHeight: 22,
  },
});
