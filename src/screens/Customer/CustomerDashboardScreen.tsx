
import React, { useEffect, useState, useCallback } from 'react';
import {
  View, Text,StatusBar, FlatList, StyleSheet, TouchableOpacity,
  ActivityIndicator, Modal
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/MaterialCommunityIcons';

import { fetchCart, addProductToCart, updateProductQuantity, removeProductFromCart } from "../../services/cartService";

import SearchBar from '../../components/Customer/SearchBar';
import CategoryCard from '../../components/Customer/CategoryCard';
import ProductCard from '../../components/Customer/ProductCard';
import DropdownSelector from '../../components/Customer/DropdownSelector';
import ProfileModal from '../../components/ProfileModal';

import FranchisorHeader from '../../components/Franchisor/FranchisorHeader';

import { colors } from '../../utils/colors';

import {
  fetchRegions as fetchRegionsService,
  fetchFranchisesByRegion
} from '../../services/franchiseService';
import { ProductService } from '../../services/productService';

const STORAGE_KEYS = {
  SELECTED_REGION: 'selectedRegion',
  SELECTED_FRANCHISE: 'selectedFranchise'
};

const CustomerDashboardScreen = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState<string[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [regionModalVisible, setRegionModalVisible] = useState(false);

  const [regions, setRegions] = useState<string[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<string>('');
  const [franchises, setFranchises] = useState<any[]>([]);
  const [selectedFranchise, setSelectedFranchise] = useState<any>(null);

  const [modalVisible, setModalVisible] = useState(false);  

  // const { cartItems, addToCart, increment, decrement } = useCart();

  const [cartItems, setCartItems] = useState<any[]>([]);

  const itemCount = Array.isArray(cartItems)
    ? cartItems.reduce((sum, item) => sum + item.quantity, 0)
    : 0;

  // Load saved region/franchise on mount
  useEffect(() => {
    (async () => {
      try {
        const storedRegion = await AsyncStorage.getItem(STORAGE_KEYS.SELECTED_REGION);
        const storedFranchise = await AsyncStorage.getItem(STORAGE_KEYS.SELECTED_FRANCHISE);

        if (storedRegion) setSelectedRegion(storedRegion);
        if (storedFranchise) setSelectedFranchise(JSON.parse(storedFranchise));
      } catch (err) {
        console.error('Failed to load saved preferences', err);
      }
    })();

    fetchCategories();
    loadRegions();
  }, []);

  useEffect(() => {
    if (selectedRegion) {
      loadFranchisesByRegion(selectedRegion);
      AsyncStorage.setItem(STORAGE_KEYS.SELECTED_REGION, selectedRegion).catch(console.error);
    }
  }, [selectedRegion]);

  useEffect(() => {
    if (selectedFranchise) {
      AsyncStorage.setItem(
        STORAGE_KEYS.SELECTED_FRANCHISE,
        JSON.stringify(selectedFranchise)
      ).catch(console.error);
      fetchProductsByFranchise();
    }
  }, [searchQuery, selectedCategory, selectedFranchise]);

  const fetchCategories = async () => {
    try {
      const data = await ProductService.getCategories();
      setCategories(data || []);
    } catch (err) {
      console.error('Failed to fetch categories:', err);
    }
  };

  const loadRegions = async () => {
    try {
      const data = await fetchRegionsService();
      setRegions(data || []);
    } catch (err) {
      console.error('Failed to fetch regions:', err);
    }
  };

  const loadFranchisesByRegion = async (region: string) => {
    try {
      const data = await fetchFranchisesByRegion(region);
      setFranchises(data || []);
    } catch (err) {
      console.error('Failed to fetch franchises:', err);
    }
  };

  const fetchProductsByFranchise = async () => {
    if (!selectedFranchise?._id) return;

    setLoading(true);
    try {
      const data = await ProductService.getAvailableByFranchise(selectedFranchise._id);
      let filtered = data;
      if (searchQuery) {
        filtered = filtered.filter((p: any) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
      if (selectedCategory) {
        filtered = filtered.filter((p: any) => p.category === selectedCategory);
      }
      setProducts(filtered || []);
    } catch (err) {
      console.error('Failed to fetch products:', err);
    } finally {
      setLoading(false);
    }
  };
  

const loadCart = async () => {
  try {
    const data = await fetchCart();
    setCartItems(data?.items || []);
  } catch (err) {
    console.error("Failed to load cart", err);
  }
};

useEffect(() => {
  (async () => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      await loadCart();
    }
  })();
}, []);



  const handleProductPress = useCallback((product: any) => {
    navigation.navigate('ProductDetails', { product });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="ffffff" barStyle="dark-content" />

      
      <FranchisorHeader title="Customer Dashboard" />

      {/* Region & Franchise Selector */}
      <TouchableOpacity style={styles.infoBox} onPress={() => setRegionModalVisible(true)}>
        <Text style={styles.infoText}> Region: {selectedRegion || 'Select Region'}</Text>
        <Text style={styles.infoText}> Franchise: {selectedFranchise?.name || 'Select Franchise'}</Text>
      </TouchableOpacity>

      {/* Modal for Region + Franchise */}
      <Modal visible={regionModalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Select Region & Franchise</Text>
            <DropdownSelector
              label="Region"
              selectedValue={selectedRegion}
              onValueChange={setSelectedRegion}
              options={(regions || []).map(r => ({ label: r, value: r }))}
            />
            <DropdownSelector
              label="Franchise"
              selectedValue={selectedFranchise?._id || ''}
              onValueChange={(val) => {
                const found = franchises.find(f => f._id === val);
                setSelectedFranchise(found || null);
              }}
              options={(franchises || []).map(f => ({ label: f.name, value: f._id }))}
            />
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setRegionModalVisible(false)}
              disabled={!selectedRegion || !selectedFranchise}
            >
              <Text style={styles.modalButtonText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Search */}
      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Search products..."
      />

      {/* Categories */}
      <FlatList
        data={categories}
        horizontal
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <CategoryCard
            category={item}
            isSelected={item === selectedCategory}
            onPress={() => setSelectedCategory(item === selectedCategory ? '' : item)}
          />
        )}
        contentContainerStyle={styles.categoryList}
        showsHorizontalScrollIndicator={false}
      />

      {/* Products */}
      {loading ? (
        <ActivityIndicator size="large" color="#4C585B" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item, index) => item.id ? item.id.toString() : `fallback-${index}`}
          numColumns={2}
          renderItem={({ item }) => (

            <ProductCard
              product={item}
              quantity={cartItems.find(c => c.productId === item.id)?.quantity || 0}
              onAddToCart={async () => {
                await addProductToCart(selectedFranchise._id, item.id, 1);
                await loadCart(); // refresh cart after adding

              } }
              onViewCart={() => navigation.navigate("Cart")}
              onPress={() => handleProductPress(item)} 
              franchiseId={selectedFranchise._id}        />

          )}
          contentContainerStyle={styles.productList}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
};

export default CustomerDashboardScreen;

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    // padding: 10, 
    backgroundColor: colors.background },
  header: { 
    height: 60,
    paddingHorizontal: 15,
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    marginBottom: 10,
    backgroundColor: colors.primary,},
  headerTitle: { 
    fontSize: 20, 
    fontWeight: 'bold',
    color: '#fff' },
  infoBox: { 
    padding: 12, 
    marginBottom: 10, 
    elevation: 1 },
  infoText: { 
    fontSize: 16, 
    fontWeight: '500',
    color: '#333' },
  categoryList: { 
    paddingHorizontal: 10, 
    paddingBottom: 10, 
    marginBottom: 20,
  },
  productList: { 
    paddingBottom: 100,
    marginTop: 0,
     },
  badge: { 
    position: 'absolute', 
    top: -4, 
    right: -10, 
    backgroundColor: '#e53935', 
    borderRadius: 10, 
    paddingHorizontal: 6, 
    paddingVertical: 1 },
  badgeText: { 
    color: 'white', 
    fontSize: 10, 
    fontWeight: 'bold' },
  modalOverlay: { 
    flex: 1, 
    justifyContent: 'center', 
    padding: 20, 
    backgroundColor: 'rgba(0,0,0,0.3)' },
  modalBox: { 
    backgroundColor: '#fff', 
    padding: 20, 
    borderRadius: 10, 
    elevation: 5 },
  modalTitle: { 
    fontSize: 18, 
    fontWeight: '600', 
    marginBottom: 10 },
  modalButton: { 
    backgroundColor: colors.primary, 
    marginTop: 16, 
    paddingVertical: 10,
    borderRadius: 8 },
  modalButtonText: { 
    color: '#fff', 
    fontWeight: 'bold', 
    textAlign: 'center',
    fontSize: 16},
});


