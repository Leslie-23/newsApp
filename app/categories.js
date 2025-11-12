import { useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import NewsList from "../components/NewsList";
import { newsService } from "../services/newsService";

const categories = [
  "business",
  "entertainment",
  "general",
  "health",
  "science",
  "sports",
  "technology",
];

export default function CategoriesScreen() {
  const [selectedCategory, setSelectedCategory] = useState("technology");
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCategoryNews("technology");
  }, []);

  const loadCategoryNews = async (category) => {
    try {
      setLoading(true);
      setSelectedCategory(category);
      const data = await newsService.getNewsByCategory(category);
      setArticles(data.articles || []);
    } catch (error) {
      Alert.alert("Error", `Failed to load ${category} news`);
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
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesContainer}
        contentContainerStyle={styles.categoriesContent}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryButton,
              selectedCategory === category && styles.categoryButtonSelected,
            ]}
            onPress={() => loadCategoryNews(category)}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === category && styles.categoryTextSelected,
              ]}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.newsContainer}>
        <NewsList
          articles={articles}
          onArticlePress={handleArticlePress}
          loading={loading}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  categoriesContainer: {
    backgroundColor: "white",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e5e5",
  },
  categoriesContent: {
    paddingHorizontal: 12,
    paddingVertical: 16,
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: "#f8fafc",
    marginHorizontal: 6,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  categoryButtonSelected: {
    backgroundColor: "#1e40af",
    borderColor: "#1e40af",
  },
  categoryText: {
    fontSize: 14,
    color: "#64748b",
    fontWeight: "500",
  },
  categoryTextSelected: {
    color: "white",
    fontWeight: "600",
  },
  newsContainer: {
    flex: 1,
  },
});
