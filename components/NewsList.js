import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import NewsCard from "./NewsCard";

export default function NewsList({
  articles,
  onArticlePress,
  loading = false,
}) {
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#1e40af" />
      </View>
    );
  }

  if (!articles || articles.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.noResults}>No articles found</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={articles}
      keyExtractor={(item) => item.url + item.publishedAt}
      renderItem={({ item }) => (
        <NewsCard article={item} onPress={() => onArticlePress(item)} />
      )}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.listContent}
    />
  );
}

const styles = StyleSheet.create({
  listContent: {
    paddingVertical: 8,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noResults: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
});
