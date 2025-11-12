import { useEffect, useState } from "react";
import { Alert, RefreshControl, StyleSheet, View } from "react-native";
import NewsList from "../../components/NewsList";
import { newsService } from "../../services/newsService";

export default function HomeScreen() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadHeadlines();
  }, []);

  const loadHeadlines = async () => {
    try {
      const data = await newsService.getTopHeadlines();
      setArticles(data.articles || []);
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
    Alert.alert("Article Selected", article.title);
  };

  return (
    <View style={styles.container}>
      <NewsList
        articles={articles}
        onArticlePress={handleArticlePress}
        loading={loading && !refreshing}
      />
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
});
