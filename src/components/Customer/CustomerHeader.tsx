import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation, DrawerActions } from '@react-navigation/native';

interface Props {
  title: string;
  cartCount?: number;
}

const CustomerHeader: React.FC<Props> = ({ title, cartCount = 0 }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      {/* Drawer Toggle */}
      <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}>
        <Icon name="menu" size={28} color="#fff" />
      </TouchableOpacity>

      {/* Title */}
      <Text style={styles.title}>{title}</Text>

      {/* Cart Icon */}
      <TouchableOpacity onPress={() => 
        // navigation.navigate('Cart')}>
        console.log('Navigate to Cart')}>
        <Icon name="cart" size={26} color="#fff" />
        {cartCount > 0 && (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{cartCount}</Text>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 60,
    backgroundColor: '#4CAF50',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    elevation: 4,
  },
  title: {
    fontSize: 20,
    color: '#fff',
    fontWeight: '700',
  },
  badge: {
    position: 'absolute',
    top: -5,
    right: -10,
    backgroundColor: '#e53935',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 1,
    minWidth: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
});

export default CustomerHeader;
