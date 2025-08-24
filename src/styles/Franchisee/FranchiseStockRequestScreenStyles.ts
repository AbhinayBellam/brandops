// styles/FranchiseStockRequestScreenStyles.ts
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F6FA',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  inputRow: {
    flexDirection: 'row',
    marginBottom: 10,
    gap: 10,
  },
  dropdown: {
    flex: 2,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  dropdownItem: {
    padding: 10,
    backgroundColor: '#eee',
    borderRadius: 8,
    marginRight: 8,
  },
  dropdownItemSelected: {
    backgroundColor: '#BDE0FE',
  },
  quantityBox: {
    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  addButton: {
    backgroundColor: '#2E86DE',
    paddingVertical: 10,
    borderRadius: 10,
    marginBottom: 12,
  },
  addButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 16,
  },
  itemList: {
    marginBottom: 20,
  },
  itemRow: {
    backgroundColor: '#fff',
    padding: 12,
    marginBottom: 8,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    elevation: 1,
  },
  itemText: {
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: '#27AE60',
    paddingVertical: 12,
    borderRadius: 12,
  },
  submitButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
