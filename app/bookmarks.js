import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

export default function BookmarksScreen() {
  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.title}>Bookmarks</Text>
        <Text style={styles.subtitle}>
          Your saved articles and favorite stories
        </Text>
      </View>

      {/* Empty State Content */}
      <View style={styles.emptyState}>
        <View style={styles.iconContainer}>
          <Ionicons name="bookmark-outline" size={80} color="#cbd5e1" />
        </View>

        <Text style={styles.emptyStateTitle}>No Bookmarks Yet</Text>

        <Text style={styles.emptyStateText}>
          Save interesting articles by tapping the bookmark icon while reading.
          They will appear here for quick access later.
        </Text>

        {/* Tips Section */}
        <View style={styles.tipsContainer}>
          <Text style={styles.tipsTitle}>How to save articles:</Text>
          <View style={styles.tipItem}>
            <Ionicons name="bookmark" size={16} color="#34bb78" />
            <Text style={styles.tipText}>
              Tap the bookmark icon on any article
            </Text>
          </View>
          <View style={styles.tipItem}>
            <Ionicons name="folder" size={16} color="#34bb78" />
            <Text style={styles.tipText}>Organize your saved articles</Text>
          </View>
          <View style={styles.tipItem}>
            <Ionicons name="download" size={16} color="#34bb78" />
            <Text style={styles.tipText}>Access them offline anytime</Text>
          </View>
        </View>
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
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
  },
  iconContainer: {
    backgroundColor: "#f8fafc",
    padding: 24,
    borderRadius: 50,
    marginBottom: 24,
    borderWidth: 2,
    borderColor: "#e2e8f0",
    borderStyle: "dashed",
  },
  emptyStateTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#475569",
    marginBottom: 16,
    textAlign: "center",
  },
  emptyStateText: {
    fontSize: 16,
    color: "#64748b",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 32,
  },
  tipsContainer: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    width: "100%",
  },
  tipsTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#34bb78",
    marginBottom: 16,
  },
  tipItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    paddingVertical: 4,
  },
  tipText: {
    fontSize: 14,
    color: "#475569",
    marginLeft: 12,
    flex: 1,
  },
});
