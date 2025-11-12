import { StyleSheet, Text, View } from "react-native";

export default function BookmarksScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bookmarks</Text>
      <Text style={styles.subtitle}>Your saved articles will appear here</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#1e293b",
  },
  subtitle: {
    fontSize: 16,
    color: "#64748b",
    textAlign: "center",
    lineHeight: 22,
  },
});
