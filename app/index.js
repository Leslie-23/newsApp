import { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import NewsList from "../components/NewsList";
import { newsService } from "../services/newsService";

export default function HomeScreen() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadHeadlines();
  }, []);

  const loadHeadlines = async () => {
    try {
      const data = await newsService.getHeadlinesByCategories(
        "general,business,tech"
      );
      setArticles(data || []);
    } catch (error) {
      Alert.alert("Error", "Failed to load news headlines");
      console.error(error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadHeadlines();
  };

  const handleArticlePress = (article) => {
    Alert.alert("Article Selected", article.title || "No title available");
  };

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.title}>Top Stories</Text>
        <Text style={styles.subtitle}>Latest news from around the world</Text>
        <View style={styles.statsContainer}>
          <Text style={styles.statsText}>
            {articles.length} {articles.length === 1 ? "story" : "stories"}{" "}
            loaded
          </Text>
        </View>
      </View>

      <NewsList
        articles={articles}
        onArticlePress={handleArticlePress}
        loading={loading}
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
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
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#34bb78",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#64748b",
    marginBottom: 12,
  },
  statsContainer: {
    backgroundColor: "#f1f5f9",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    alignSelf: "flex-start",
  },
  statsText: {
    fontSize: 14,
    color: "#475569",
    fontWeight: "500",
  },
});
