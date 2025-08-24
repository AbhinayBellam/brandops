import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChangeText, placeholder }) => {
  return (
    <View style={styles.container}>
      <Icon name="magnify" size={25} color="#7E99A3" style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder={placeholder || 'Search...'}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 8,
    alignItems: 'center',
    marginVertical: 10,
  },
  icon: {
    marginRight: 10,
    marginLeft: 5,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
});

export default SearchBar;
