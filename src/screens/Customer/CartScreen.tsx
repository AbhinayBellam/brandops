

// import React, { useMemo } from 'react';
// import {
//   View,
//   Text,
//   FlatList,
//   StyleSheet,
//   TouchableOpacity,
//   Alert,
// } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { useNavigation } from '@react-navigation/native';
// import { useCart } from '../../context/CartContext';

// import CartItem from '../../components/Customer/CartItem';
// import PriceSummaryCard from '../../components/Customer/PriceSummaryCard';

// import FranchisorHeader from '../../components/Franchisor/FranchisorHeader';
// import { colors } from '../../utils/colors';

// const CartScreen = () => {
//   const navigation = useNavigation<any>();
//   const { cartItems = [], increment, decrement, removeFromCart } = useCart();

//   const subtotal = useMemo(
//     () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
//     [cartItems]
//   );

//   const deliveryCharge = cartItems.length > 0 ? 50 : 0;
//   const discount = subtotal > 1000 ? 100 : 0;
//   const total = subtotal - discount + deliveryCharge;

//   const handleRemoveItem = (id: string) => {
//     Alert.alert('Remove Item', 'Are you sure you want to remove this item?', [
//       { text: 'Cancel', style: 'cancel' },
//       {
//         text: 'Remove',
//         style: 'destructive',
//         onPress: () => removeFromCart(id),
//       },
//     ]);
//   };

//   if (cartItems.length === 0) {
//     return (
//       <SafeAreaView style={styles.emptyContainer}>
//         //Header
//         <View style={{ padding: 20, backgroundColor: '#fff', alignItems: 'center' }}>
//           <Text style={styles.headerTitle}>My Cart</Text> 
//         </View>
//         <Text style={styles.emptyText}>Your cart is empty</Text>
//       </SafeAreaView>
//     );
//   }

//   return (
//     <SafeAreaView style={styles.container}>
//       <FranchisorHeader title="My Cart" />
//       <FlatList
//         data={cartItems}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <TouchableOpacity
//             onPress={() => navigation.navigate('ProductDetails', { productId: item.id })}
//           >
//             <CartItem
//               item={item}
//               onIncrease={() => increment(item.id)}
//               onDecrease={() => decrement(item.id)}
//               onRemove={() => handleRemoveItem(item.id)}
//             />
//           </TouchableOpacity>
//         )}
//         contentContainerStyle={{ paddingBottom: 20 }}
//       />

//       <PriceSummaryCard
//         subtotal={subtotal}
//         deliveryCharge={deliveryCharge}
//         discount={discount}
//         total={total}
//       />

//       <TouchableOpacity
//         style={styles.checkoutButton}
//         onPress={() => navigation.navigate('CheckOut', {
//               cartItems,
//             totalAmount: total,
//             franchiseId: 'some-franchise-id',    
//             })}
//       >
//         <Text style={styles.checkoutText}>Proceed to Checkout</Text>
//       </TouchableOpacity>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f9f9f9',
//     // padding: 10,
//   },
//   headerTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#2c3e50',
//   },
//   emptyContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   emptyText: {
//     fontSize: 18,
//     color: '#999',
//   },
//   checkoutButton: {
//     backgroundColor: colors.secondary,
//     padding: 14,
//     borderRadius: 10,
//     alignItems: 'center',
//     marginTop: 12,
//   },
//   checkoutText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });

// export default CartScreen;


import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import  Ionicons  from "react-native-vector-icons/MaterialCommunityIcons";
import {
  fetchCart,
  updateProductQuantity,
  removeProductFromCart,
  emptyCart,
} from "../../services/cartService";
import FranchisorHeader from "../../components/Franchisor/FranchisorHeader";
import CustomButton from "../../components/CustomButton";


interface CartItem {
  productId: {
    _id: string;
    name: string;
    price: number;
  };
  quantity: number;
}

const CartScreen: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigation = useNavigation();
  const loadCart = async () => {
    try {
      setLoading(true);
      const cart = await fetchCart();
      setCartItems(cart.items || []);
    } catch (error) {
      console.error("Error loading cart:", error);
      Alert.alert("Error", "Failed to load cart.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", loadCart);
    return unsubscribe;
  }, [navigation]);

  const handleQuantityChange = async (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemove(productId);
      return;
    }
    try {
      await updateProductQuantity(productId, newQuantity);
      loadCart();
    } catch (error) {
      Alert.alert("Error", "Failed to update quantity.");
    }
  };

  const handleRemove = async (productId: string) => {
    try {
      await removeProductFromCart(productId);
      loadCart();
    } catch (error) {
      Alert.alert("Error", "Failed to remove item.");
    }
  };

  const handleClearCart = async () => {
    Alert.alert("Confirm", "Are you sure you want to clear the cart?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Clear",
        style: "destructive",
        onPress: async () => {
          try {
            await emptyCart();
            loadCart();
          } catch (error) {
            Alert.alert("Error", "Failed to clear cart.");
          }
        },
      },
    ]);
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (sum, item) => sum + item.productId.price * item.quantity,
      0
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.centered}>
        <ActivityIndicator size="large" color="#000" />
      </SafeAreaView>
    );
  }

  if (cartItems.length === 0) {
    return (
      <SafeAreaView style={styles.centered}>
        <Text style={styles.emptyText}>Your cart is empty.</Text>
        <CustomButton
          title="Go Shopping"
          onPress={() => navigation.navigate("Home")}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FranchisorHeader title="My Cart" />
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.productId._id}
        renderItem={({ item }) => (
          <View style={styles.itemCard}>
            <View style={styles.itemInfo}>
              <Text style={styles.itemName}>{item.productId.name}</Text>
              <Text style={styles.itemPrice}>₹{item.productId.price}</Text>
              <Text style={styles.itemTotal}>
                Total: ₹{item.productId.price * item.quantity}
              </Text>
            </View>
            <View style={styles.quantityControls}>
              <TouchableOpacity
                onPress={() =>
                  handleQuantityChange(item.productId._id, item.quantity - 1)
                }
              >
                <Ionicons name="minus" size={28} />
              </TouchableOpacity>
              <Text style={styles.quantityText}>{item.quantity}</Text>
              <TouchableOpacity
                onPress={() =>
                  handleQuantityChange(item.productId._id, item.quantity + 1)
                }
              >
                <Ionicons name="plus" size={28}  />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleRemove(item.productId._id)}>
                <Ionicons name="trash-can" size={28}  />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <View style={styles.footer}>
        <Text style={styles.totalText}>Total: ₹{calculateTotal()}</Text>
        <CustomButton
          title="Proceed to Checkout"
          onPress={() => navigation.navigate("CheckOut", { cartItems})}
        />
        <TouchableOpacity onPress={handleClearCart}>
          <Text style={styles.clearCart}>Clear Cart</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CartScreen;



const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    // padding: 10,
     backgroundColor: "#fff" },
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
  emptyText: { fontSize: 18, fontWeight: "500", marginBottom: 20 },
  itemCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    marginVertical: 8,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    elevation: 2,
  },
  itemInfo: { flex: 1 },
  itemName: { fontSize: 16, fontWeight: "600" },
  itemPrice: { fontSize: 14, color: "#666" },
  itemTotal: { fontSize: 14, fontWeight: "500", marginTop: 4 },
  quantityControls: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginLeft: 10,
  },
  quantityText: { fontSize: 16, fontWeight: "500", marginHorizontal: 8 },
  footer: {
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    paddingTop: 12,
    marginTop: 12,
  },
  totalText: { fontSize: 18, fontWeight: "700", marginBottom: 10 },
  clearCart: { color: "red", textAlign: "center", marginTop: 10 },
});

