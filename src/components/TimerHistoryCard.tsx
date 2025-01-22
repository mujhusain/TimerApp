import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface HistoryCardProps {
  name: string;
  completionTime: string;
}

const HistoryCard: React.FC<HistoryCardProps> = ({ name, completionTime }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{name}</Text>
      <Text>{`Completed At: ${completionTime}`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: "#fff",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
});

export default HistoryCard;