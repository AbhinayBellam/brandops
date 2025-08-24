// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';

// interface StatusBadgeProps {
//   status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
// }

// const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
//   const colorMap = {
//     Processing: '#f1c40f',
//     Shipped: '#3498db',
//     Delivered: '#2ecc71',
//     Cancelled: '#e74c3c',
//   };

//   return (
//     <View style={[styles.badge, { backgroundColor: colorMap[status] }]}>
//       <Text style={styles.text}>{status}</Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   badge: {
//     paddingHorizontal: 10,
//     paddingVertical: 4,
//     borderRadius: 20,
//     alignSelf: 'flex-start',
//   },
//   text: {
//     color: '#fff',
//     fontSize: 12,
//     fontWeight: '600',
//   },
// });

// export default StatusBadge;

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'pending':
      return '#f39c12';
    case 'shipped':
      return '#3498db';
    case 'delivered':
      return '#2ecc71';
    case 'cancelled':
      return '#e74c3c';
    default:
      return '#7f8c8d';
  }
};

const StatusBadge = ({ status }: { status: string }) => {
  const color = getStatusColor(status);

  return (
    <View style={[styles.badge, { backgroundColor: color }]}>
      <Text style={styles.text}>{status}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
});

export default StatusBadge;
