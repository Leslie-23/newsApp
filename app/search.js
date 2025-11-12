import { useState } from "react";
import {
  Alert,
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

  const handleSearch = async () => {
    if (!query.trim()) {
      Alert.alert("Error", "Please enter a search term");
      return;
    }

    try {
      setLoading(true);
      const data = await newsService.searchNews(query);
      setArticles(data.articles || []);
    } catch (error) {
      Alert.alert("Error", "Failed to search news");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleArticlePress = (article) => {
    Alert.alert("Article Selected", article.title);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for news..."
          placeholderTextColor="#999"
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>

      <NewsList
        articles={articles}
        onArticlePress={handleArticlePress}
        loading={loading}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingTop: 16,
  },
  searchContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    marginBottom: 16,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    backgroundColor: "white",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    fontSize: 16,
  },
  searchButton: {
    backgroundColor: "#1e40af",
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  searchButtonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
});
