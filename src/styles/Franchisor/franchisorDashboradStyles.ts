import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#395375',
    marginTop: 24,
  },
  header: {
    height: 60,
    backgroundColor: '#fff',
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 4,
    zIndex: 999
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
    marginLeft: -30, // to visually center due to left icon
  },
  profileCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#4e91fc',
    alignItems: 'center',
    justifyContent: 'center'
  },
  profileText: {
    color: '#fff',
    fontWeight: 'bold'
  },
  scrollContainer: {
    padding: 16
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 12,
    borderRadius: 10,
    elevation: 2
  },
  salesSection: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    elevation: 2
  },
  salesTitle: {
    fontWeight: 'bold',
    marginBottom: 8
  }
});
