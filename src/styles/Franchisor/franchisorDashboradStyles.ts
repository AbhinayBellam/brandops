import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#395375',
    // paddingTop: 42,
  },

// 
header: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingHorizontal: 16,
  paddingVertical: 12,
  backgroundColor: '#fff',
  elevation: 4,
  zIndex: 10, // ensure it's above
}
,
                
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
  row: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  paddingHorizontal: 10,
},

card: {
  backgroundColor: '#f5f5f5',
  padding: 16,
  borderRadius: 10,
  margin: 10,
  flex: 1,
},

salesSection: {
  backgroundColor: '#e0f7fa',
  padding: 16,
  margin: 10,
  borderRadius: 10,
},

salesTitle: {
  fontWeight: 'bold',
  marginBottom: 8,
},

});
