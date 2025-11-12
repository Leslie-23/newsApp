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
  { id: "business", name: "Business" },
  { id: "entertainment", name: "Entertainment" },
  { id: "general", name: "General" },
  { id: "health", name: "Health" },
  { id: "science", name: "Science" },
  { id: "sports", name: "Sports" },
  { id: "technology", name: "Tech" },
];

export default function CategoriesScreen() {
  const [selectedCategory, setSelectedCategory] = useState("technology");
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadCategoryNews("technology");
  }, []);

  const loadCategoryNews = async (category) => {
    try {
      setLoading(true);
      setSelectedCategory(category);
      const data = await newsService.getNewsByCategory(category);
      setArticles(data || []);
    } catch (error) {
      Alert.alert(
        "Error",
        `Failed to load ${category} news. Please try again.`
      );
      console.error("Category news error:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadCategoryNews(selectedCategory);
  };

  const handleArticlePress = (article) => {
    Alert.alert(
      article.title || "No Title",
      article.description || "No description available"
    );
  };

  return (
    <View style={styles.container}>
      {/* Categories Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Categories</Text>
        <Text style={styles.subtitle}>Explore news by category</Text>
      </View>

      {/* Categories Scroll */}
      <View style={styles.categoriesWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContent}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryButton,
                selectedCategory === category.id &&
                  styles.categoryButtonSelected,
              ]}
              onPress={() => loadCategoryNews(category.id)}
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === category.id &&
                    styles.categoryTextSelected,
                ]}
                numberOfLines={1}
              >
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Selected Category Header */}
      <View style={styles.selectedCategoryHeader}>
        <Text style={styles.selectedCategoryText}>
          {categories.find((cat) => cat.id === selectedCategory)?.name} News
        </Text>
        <Text style={styles.articleCount}>
          {articles.length} {articles.length === 1 ? "article" : "articles"}
        </Text>
      </View>

      {/* News List */}
      <View style={styles.newsContainer}>
        <NewsList
          articles={articles}
          onArticlePress={handleArticlePress}
          loading={loading}
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      </View>
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
    paddingBottom: 16,
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
  categoriesWrapper: {
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  categoriesContent: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  categoryButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
    backgroundColor: "#f1f5f9",
    marginHorizontal: 6,
    borderWidth: 2,
    borderColor: "transparent",
    minWidth: 100,
    alignItems: "center",
  },
  categoryButtonSelected: {
    backgroundColor: "#34bb78",
    borderColor: "#34bb78",
    shadowColor: "#34bb78",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  categoryText: {
    fontSize: 15,
    color: "#475569",
    fontWeight: "600",
    textAlign: "center",
  },
  categoryTextSelected: {
    color: "#ffffff",
    fontWeight: "700",
  },
  selectedCategoryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#ffffff",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
  },
  selectedCategoryText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#34bb78",
  },
  articleCount: {
    fontSize: 14,
    color: "#64748b",
    fontWeight: "500",
  },
  newsContainer: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
});
