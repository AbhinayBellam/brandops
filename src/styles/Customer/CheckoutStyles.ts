import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  item: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  itemText: {
    fontSize: 16,
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 12,
  },
  input: {
    height: 80,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginTop: 16,
    padding: 12,
    textAlignVertical: 'top',
  },
  checkoutButton: {
    backgroundColor: '#007BFF',
    marginTop: 20,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  checkoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
