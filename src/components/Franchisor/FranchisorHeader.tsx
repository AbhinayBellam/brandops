

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import  Ionicons from 'react-native-vector-icons/MaterialCommunityIcons'
import ProfileModal from '../ProfileModal';
import { colors } from '../../utils/colors';

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
          <Ionicons name="account-circle" size={30} color="#0f2a49ff" />
        </TouchableOpacity>
      </View>

      <ProfileModal visible={modalVisible} onClose={() => setModalVisible(false)} />
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 60,
    marginTop: 10,
    paddingHorizontal: 15,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 3,
    marginBottom : 6,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: colors.primary, 
  },
});

export default FranchisorHeader;
