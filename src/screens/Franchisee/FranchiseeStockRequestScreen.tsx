
// screens/Franchisee/StockRequestScreen.tsx
import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FranchisorHeader from "../../components/Franchisor/FranchisorHeader";
import { Button } from "react-native-paper";

interface StockRequest {
  id: string;
  productName: string;
  quantity: number;
  status: "Pending" | "Approved" | "Rejected";
  date: string;
}

const StockRequestScreen: React.FC = () => {
  const [requests] = useState<StockRequest[]>([
    {
      id: "1",
      productName: "Product A",
      quantity: 10,
      status: "Pending",
      date: "2025-08-18",
    },
    {
      id: "2",
      productName: "Product B",
      quantity: 5,
      status: "Approved",
      date: "2025-08-17",
    },
    {
      id: "3",
      productName: "Product C",
      quantity: 20,
      status: "Rejected",
      date: "2025-08-15",
    },
  ]);

  const renderItem = ({ item }: { item: StockRequest }) => (
    <View style={styles.card}>
      <Text style={styles.productName}>{item.productName}</Text>
      <Text>Quantity: {item.quantity}</Text>
      <Text>Status: <Text style={[styles.status, styles[item.status.toLowerCase()]]}>{item.status}</Text></Text>
      <Text>Date: {item.date}</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>View Details</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>  
     <FranchisorHeader title="Stock Request" />
    <View style={styles.container}>
     
      <FlatList
        data={requests}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
    </SafeAreaView>
  );
};

export default StockRequestScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 12,
  },
  card: {
    backgroundColor: "#f9f9f9",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
  },
  productName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 6,
  },
  status: {
    fontWeight: "bold",
  },
  pending: {
    color: "orange",
  },
  approved: {
    color: "green",
  },
  rejected: {
    color: "red",
  },
  button: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#007bff",
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
