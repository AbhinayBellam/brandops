


import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import ProductCard from '../../components/Franchisee/FranchiseProductCard';
import { SafeAreaView } from 'react-native-safe-area-context';
import FranchiseeHeader from '../../components/Franchisee/FranchiseeHeader';
import { fetchInventoryByFranchise } from '../../services/inventoryService';
import { fetchMyFranchise } from '../../services/franchiseService';
import stockRequestService from '../../services/stockRequestService';
import Toast from 'react-native-toast-message';

const FranchiseeProductsScreen = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [franchiseId, setFranchiseId] = useState<string | null>(null);
  const [addingProductId, setAddingProductId] = useState<string | null>(null);

  useEffect(() => {
    const getFranchise = async () => {
      try {
        const myFranchise = await fetchMyFranchise();
        setFranchiseId(myFranchise._id);
      } catch (err) {
        console.error('Failed to load franchise:', err);
        Toast.show({ type: 'error', text1: 'Error', text2: 'Unable to load franchise details.' });
      }
    };

    getFranchise();
  }, []);

  const loadProducts = async () => {
    try {
      if (!franchiseId) return;

      const data = await fetchInventoryByFranchise(franchiseId);
      const formatted = data.map((item: any) => ({
        ...item.productId,
        quantity: item.quantity,
      }));

      setProducts(formatted);
    } catch (error) {
      console.error('Failed to fetch inventory:', error);
      Toast.show({ type: 'error', text1: 'Error', text2: 'Failed to fetch products.' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, [franchiseId]);

  // Quick Add to Stock Request handler
  const handleQuickAdd = async (productId: string) => {
    if (!franchiseId) {
      Toast.show({ type: 'error', text1: 'Error', text2: 'Franchise not loaded yet.' });
      return;
    }

    try {
      setAddingProductId(productId);
      await stockRequestService.quickAddStockRequest({
        franchiseId,
        productId,
        quantity: 1, // default quantity for quick add
      });

      Toast.show({
        type: 'success',
        text1: 'Added!',
        text2: 'Product added to stock request.',
      });
    } catch (err: any) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: err.message || 'Failed to add to stock request.',
      });
    } finally {
      setAddingProductId(null);
    }
  };

  const renderItem = ({ item }: { item: any }) => (
    <ProductCard
      product={item}
      quantity={item.quantity}
      onPress={() => setSelectedProduct(item)}
      onQuickAdd={() => handleQuickAdd(item._id)}
      loading={addingProductId === item._id}
    />
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <FranchiseeHeader title="Products" />
      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator size="large" color="#2196f3" />
        ) : (
          <FlatList
            data={products}
            keyExtractor={(item) => item._id}
            renderItem={renderItem}
            numColumns={2}
            contentContainerStyle={styles.grid}
          />
        )}

        <Modal
          visible={!!selectedProduct}
          animationType="slide"
          transparent
          onRequestClose={() => setSelectedProduct(null)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>{selectedProduct?.name}</Text>
              <Text style={styles.modalPrice}>Price: ₹{selectedProduct?.price}</Text>
              <Text style={styles.modalDesc}>{selectedProduct?.description}</Text>
              <Text style={styles.modalDesc}>Category: {selectedProduct?.category}</Text>
              {selectedProduct?.quantity !== undefined && (
                <Text style={styles.modalPrice}>
                  Available Quantity: {selectedProduct.quantity}
                </Text>
              )}

              <Pressable
                onPress={() => setSelectedProduct(null)}
                style={styles.closeBtn}
              >
                <Text style={styles.closeText}>✖ Close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
      <Toast />
    </SafeAreaView>
  );
};

export default FranchiseeProductsScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f2f2f2' },
  grid: { padding: 10 },
  modalOverlay: {
    flex: 1,
    backgroundColor: '#00000099',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    width: '100%',
  },
  modalTitle: { fontSize: 20, fontWeight: 'bold' },
  modalPrice: { marginVertical: 10, fontSize: 16, color: '#333' },
  modalDesc: { fontSize: 14, color: '#555' },
  closeBtn: { alignSelf: 'flex-end', marginTop: 16 },
  closeText: { fontSize: 16, color: '#e53935', fontWeight: 'bold' },
});
