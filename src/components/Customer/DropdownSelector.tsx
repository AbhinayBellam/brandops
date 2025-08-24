import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

interface DropdownSelectorProps<T> {
  label: string;
  selectedValue: T | undefined;
  onValueChange: (itemValue: T, itemIndex: number) => void;
  options: { label: string; value: T }[];
  placeholder?: string;
}

function DropdownSelector<T extends string | number>({
  label,
  selectedValue,
  onValueChange,
  options,
  placeholder = 'Select an option',
}: DropdownSelectorProps<T>) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={selectedValue}
          onValueChange={onValueChange}
          style={styles.picker}
        >
          <Picker.Item label={placeholder} value="" />
          {options.map((option, index) => (
            <Picker.Item key={index} label={option.label} value={option.value} />
          ))}
        </Picker>
      </View>
    </View>
  );
}

export default DropdownSelector;

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontWeight: '600',
    marginBottom: 4,
    fontSize: 16,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  picker: {
    height: 48,
    width: '100%',
  },
});
