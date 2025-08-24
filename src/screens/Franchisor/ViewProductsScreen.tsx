


import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, Alert, ActivityIndicator, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Provider, Menu } from 'react-native-paper';
import LogoutButton from '../../components/Franchisor/LogoutButton';
import ProductCard from '../../components/Franchisor/ProductCard';
import { ProductService } from '../../services/productService';
import FranchisorHeader from '../../components/Franchisor/FranchisorHeader';
import { colors } from '../../utils/colors';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
}

const ViewProductsScreen: React.FC = () => {
  const navigation = useNavigation();
  const [menuVisible, setMenuVisible] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', price: '', description: '', category: '' });
  const [editId, setEditId] = useState<string | null>(null);

  const load = async () => {
    try {
      const data = await ProductService.getAll();
      const normalized = data.map((item: any) => ({
      ...item,
      id: item._id, // Map MongoDB _id to id
    }));
    setProducts(normalized);
    } catch {
      Alert.alert('Error', 'Failed loading products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const saveProduct = async () => {
    const { name, price, description, category } = form;
    if (!name||!price||!description||!category) return Alert.alert('All fields required');
    try{
      if(editId){
        await ProductService.update(editId, { name, description, price: Number(price), category });
      } else {
        await ProductService.create({ name, description, price: Number(price), category });
      }
      load(); setForm({name:'',price:'',description:'',category:''}); setEditId(null); setShowForm(false);
    }catch{
      Alert.alert('Error','Save failed');
    }
  };

  const removeProduct = (id: string) => {
  if (!id) {
    Alert.alert('Error', 'Invalid product ID');
    return;
  }

  Alert.alert('Delete Product', 'Are you sure you want to delete this product?', [
    {
      text: 'Cancel',
      style: 'cancel',
    },
    {
      text: 'Delete',
      style: 'destructive',
      onPress: async () => {
        try {
          await ProductService.delete(id);
          Alert.alert('Success', 'Product deleted successfully');
          load(); // Reload the product list
        } catch (error: any) {
          console.error('Delete error:', error);
          Alert.alert('Error', 'Failed to delete product. Please try again.');
        }
      },
    },
  ]);
};

const startEdit = (p: Product) => {
  setForm({
    name: p.name,
    price: String(p.price),
    description: p.description,
    category: p.category,
  });
  setEditId(p.id); // make sure it's the mapped 'id'
  setShowForm(true);
};

  if(loading) return <View style={s.loader}><ActivityIndicator size="large" color="#4CAF50" /></View>

  return (
  <Provider>
    <SafeAreaView style={s.container}>
      <FranchisorHeader title="Products" />

      <TouchableOpacity style={s.addBtn} onPress={()=>{setShowForm(!showForm); setEditId(null)}}>
        <Text style={s.addBtnText}>
        {showForm ? (editId ? 'Cancel Editing' : 'Cancel') : editId ? 'Edit Product' : 'Add Product'}
      </Text>
      </TouchableOpacity>

      {showForm && (
        <KeyboardAvoidingView behavior={Platform.OS==='ios'?'padding':undefined} style={s.form}>
          {(['name','price','description','category'] as const).map(field=>(
            <TextInput key={field} placeholder={field} keyboardType={field==='price'?'numeric':'default'}
              style={s.input} value={(form as any)[field]} 
              onChangeText={text=>setForm(prev=>({...prev,[field]:text}))}/>
          ))}
          <TouchableOpacity
        style={[s.saveBtn, (!form.name || !form.price || !form.description || !form.category) && { backgroundColor: '#ccc' }]}
        onPress={saveProduct}
       disabled={!form.name || !form.price || !form.description || !form.category}
        >
       <Text style={s.saveBtnText}>{editId ? 'Update' : 'Save'} Product</Text>
       </TouchableOpacity>

        </KeyboardAvoidingView>
      )}

      <FlatList data={products} keyExtractor={i=>i.id} numColumns={2} contentContainerStyle={s.list}
        renderItem={({item})=>(
          <ProductCard product={item} onEdit={()=>startEdit(item)} 
                       onDelete={()=>removeProduct(item.id)}/>
        )}
        ListEmptyComponent={<Text style={s.empty}>No products yet</Text>}
      />
    </SafeAreaView>
  </Provider>
  );
};

const s=StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#F8F8F8'
  },

  avatarText:{
    color:'#fff',
    fontWeight:'bold'
  },
  addBtn:{
    backgroundColor:colors.primary,
    margin:12,
    padding:10,
    borderRadius:6,
    alignItems:'center'
  },
  addBtnText:{
    color:'#fff',
    fontWeight:'bold'
  },
  form:{
    backgroundColor:'#fff',
    marginHorizontal:12,
    padding:12,
    borderRadius:6,
    elevation:2
  },
  input:{
    borderBottomWidth:1,
    borderColor:'#ccc',
    marginBottom:10,
    paddingVertical:6
  },
  saveBtn:{
    backgroundColor:colors.background,
    borderColor: colors.primary,
    borderWidth: 1,
    padding:10,
    borderRadius:6,
    alignItems:'center'
  },
  saveBtnText:{
    color: colors.text,
    fontWeight:'bold'
  },
  list:{
    paddingHorizontal:6,
    paddingBottom:20
  },
  empty:{
    textAlign:'center',
    color:'#888',
    marginTop:20
  },
  loader:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
});

export default ViewProductsScreen;
