
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TextInput,
  Alert,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { fetchCart } from "../../services/cartService";
import { OrderService } from "../../services/orderService";
import { STORAGE_KEYS } from "../../utils/storageKeys";
import { useUser } from "../../context/UserContext";
import CustomButton from "../../components/CustomButton";
import FranchisorHeader from "../../components/Franchisor/FranchisorHeader";

interface CartItem {
  productId: {
    _id: string;
    name: string;
    price: number;
  };
  quantity: number;
}

const CheckoutScreen = () => {
  const navigation = useNavigation();
  const { user } = useUser();

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [franchiseId, setFranchiseId] = useState<string | null>(null);

  const [paymentMethod, setPaymentMethod] = useState("");
  const [shippingAddress, setShippingAddress] = useState({
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch cart
        const cart = await fetchCart();
        setCartItems(cart && cart.items ? cart.items : []);

        // Fetch franchiseId from storage
        const storedFranchise = await AsyncStorage.getItem(
          STORAGE_KEYS.SELECTED_FRANCHISE
        );
        if (storedFranchise) {
          const parsed = JSON.parse(storedFranchise);
          if (parsed && parsed._id) {
            setFranchiseId(parsed._id);
          }
        }
      } catch (error) {
        console.error("Failed to fetch cart/franchise:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  if (!cartItems.length) {
    return (
      <View style={styles.center}>
        <Text>Your cart is empty.</Text>
      </View>
    );
  }

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.productId.price * item.quantity,
    0
  );

  const handleCheckout = async () => {
    if (!user?._id) {
      Alert.alert("Error", "User not found. Please login again.");
      return;
    }

    if (!paymentMethod || !shippingAddress.street || !franchiseId) {
      Alert.alert("Error", "Please complete all fields.");
      return;
    }

    const orderPayload = {
      customerId: user._id,
      franchiseId,
      items: cartItems.map((item) => ({
        productId: item.productId._id,
        quantity: item.quantity,
        price: item.productId.price,
      })),
      totalAmount,
      paymentMethod,
      shippingAddress,
    };

    try {
      setLoading(true);
      console.log("Order Payload:", orderPayload);
      await OrderService.create(orderPayload);
      Alert.alert("Success", "Order placed successfully!");
      navigation.navigate("CustomerDashboard", { screen: "Orders" });
    } catch (error: any) {
      console.error("Checkout error:", error);
      Alert.alert(
        "Error",
        error?.response?.data?.message || "Failed to place order."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <FranchisorHeader title="Checkout" />
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Text style={styles.heading}>Order Summary</Text>
        <FlatList
          data={cartItems}
          keyExtractor={(item) => item.productId._id}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text>{item.productId.name}</Text>
              <Text>Qty: {item.quantity}</Text>
              <Text>₹{item.productId.price * item.quantity}</Text>
            </View>
          )}
        />

        <Text style={styles.total}>Total: ₹{totalAmount}</Text>

        {/* Payment Method */}
        <Text style={styles.heading}>Payment Method</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g., UPI / Card / COD"
          value={paymentMethod}
          onChangeText={setPaymentMethod}
        />

        {/* Shipping Address */}
        <Text style={styles.heading}>Shipping Address</Text>
        {["street", "city", "state", "zipCode", "country"].map((field) => (
          <TextInput
            key={field}
            placeholder={field}
            style={styles.input}
            value={shippingAddress[field as keyof typeof shippingAddress]}
            onChangeText={(text) =>
              setShippingAddress((prev) => ({ ...prev, [field]: text }))
            }
          />
        ))}

        {/* Place Order */}
        <CustomButton
          title={loading ? "Placing Order..." : "Place Order"}
          onPress={handleCheckout}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default CheckoutScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 8,
    padding: 8,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
    marginTop: 16,
  },
  total: { fontSize: 18, fontWeight: "bold", marginVertical: 12 },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginTop: 12,
    paddingHorizontal: 12,
    backgroundColor: "#f9f9f9",
  },
});

