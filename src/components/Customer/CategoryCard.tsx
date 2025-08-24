

import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors } from '../../utils/colors';

interface CategoryCardProps {
  category: string;
  isSelected: boolean;
  onPress?: () => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, isSelected, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.card, isSelected && styles.selectedCard]}
  >
    <Text
      style={[styles.text, isSelected && styles.selectedText]}
      numberOfLines={1}
      ellipsizeMode="tail"
    >
      {category}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: {
    height: 40,                 
    paddingHorizontal: 15,     
    justifyContent: 'center',  
    backgroundColor: '#eee',
    borderRadius: 10,
    marginRight: 10,
    maxWidth: 120,            
    alignItems: 'center', 
    borderWidth: 1,
    borderColor: colors.primary,     
  },
  selectedCard: {
    backgroundColor: colors.primary,
  },
  text: {
    color: '#333',
    fontSize: 14,
  },
  selectedText: {
    color: '#fff',
  },
});

export default CategoryCard;

