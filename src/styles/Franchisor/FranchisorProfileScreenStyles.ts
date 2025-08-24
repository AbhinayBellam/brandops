import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6fa',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    alignSelf: 'center',
    color: '#333',
  },
  profileItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginBottom: 15,
    padding: 15,
    borderRadius: 10,
    elevation: 1,
  },
  icon: {
    marginRight: 10,
  },
  label: {
    fontWeight: '600',
    marginRight: 5,
    fontSize: 15,
    color: '#666',
    width: 70,
  },
  value: {
    fontSize: 15,
    color: '#222',
    flexShrink: 1,
  },
  input: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 2,
    fontSize: 15,
    color: '#000',
  },
  button: {
    backgroundColor: '#3366FF',
    paddingVertical: 12,
    marginTop: 30,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
