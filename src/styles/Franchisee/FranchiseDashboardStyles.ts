import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    logoutButton: {
  backgroundColor: '#dc2626', // red-600
  flexDirection: 'row',
  alignItems: 'center',
  paddingHorizontal: 10,
  paddingVertical: 6,
  borderRadius: 8,
  marginLeft: 8,
},
logoutButtonText: {
  color: '#fff',
  marginLeft: 5,
  fontWeight: 'bold',
},

  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  stockButton: {
    flexDirection: 'row',
    backgroundColor: '#4b5563',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  stockButtonText: {
    color: '#fff',
    marginLeft: 8,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    width: '48%',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  cardValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardDescription: {
    fontSize: 12,
    color: '#6b7280',
  },
  section: {
    marginVertical: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  sectionSubtitle: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 8,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f9fafb',
    padding: 10,
    borderRadius: 6,
    marginBottom: 8,
  },
  listTitle: {
    fontWeight: '600',
  },
  listSubtitle: {
    fontSize: 12,
    color: '#6b7280',
  },
  redText: {
    color: '#dc2626',
    fontWeight: '600',
  },
  green: { color: '#16a34a' },
  yellow: { color: '#ca8a04' },
  blue: { color: '#2563eb' },
  amount: {
    fontWeight: '600',
  },
  status: {
    fontSize: 12,
    textTransform: 'capitalize',
  },
  button: {
    backgroundColor: '#4b5563',
    padding: 10,
    borderRadius: 6,
    marginTop: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  quickGrid: {
    gap: 12,
  },
});


