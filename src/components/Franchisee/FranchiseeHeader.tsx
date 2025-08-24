import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import  Ionicons from 'react-native-vector-icons/MaterialCommunityIcons'
import ProfileModal from '../ProfileModal';

interface Props {
  title: string;
}

const FranchisorHeader: React.FC<Props> = ({ title }) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Ionicons name="account-circle" size={30} />
        </TouchableOpacity>
      </View>

      <ProfileModal visible={modalVisible} onClose={() => setModalVisible(false)} />
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 60,
    paddingHorizontal: 16,
    backgroundColor: '#f0f0f0',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
  },
});

export default FranchisorHeader;
