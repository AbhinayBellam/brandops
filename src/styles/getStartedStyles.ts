import { StyleSheet } from 'react-native';
import { colors } from '../utils/colors'; 

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary, 
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: colors.background1,
    textAlign: 'center',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    color: colors.background1,
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 24,
  },
  button: {
    backgroundColor: colors.accent,
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 30,
    elevation: 3,
  },
  buttonText: {
    color: colors.text, 
    fontWeight: 'bold',
    fontSize: 20,
  },
});
