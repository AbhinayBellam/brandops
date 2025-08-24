import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation, DrawerActions, NavigationProp } from '@react-navigation/native';
import { Menu } from 'react-native-paper';
import { useUser } from '../../context/UserContext';
import LogoutButton from './LogoutButton';
import { AppStackParamList } from '../../navigation/AppNavigator'; 


type CustomHeaderProps = {
  title: string;
  navigation: NavigationProp<AppStackParamList>;
};

const CustomHeader = ({ title, navigation }: CustomHeaderProps) => {
  // const navigation = useNavigation();
  const [menuVisible, setMenuVisible] = useState(false);

  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);
  const { user } = useUser();
  const userInitial = user?.name?.charAt(0)?.toUpperCase() || 'U';

  const handleProfile = () => {
    closeMenu();
    navigation.navigate('FranchisorProfile');
  };

  return (
    <View style={styles.container}>
      {/* Left - Drawer Menu */}
      <TouchableOpacity
        style={styles.leftIcon}
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
      >
        <Icon name="menu" size={28} color="#000" />
      </TouchableOpacity>

      {/* Center - Title */}
      <Text style={styles.title}>{title}</Text>

      {/* Right - Profile Avatar with Dropdown */}
      <Menu
        visible={menuVisible}
        onDismiss={closeMenu}
        anchor={
          <TouchableOpacity onPress={openMenu} style={styles.profileCircle}>
            <Text style={styles.profileText}>{userInitial}</Text>
          </TouchableOpacity>
        }
      >
        <Menu.Item onPress={handleProfile} title="Profile" />
        <LogoutButton navigation={navigation}  />
      </Menu>
    </View>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  container: {
    height: 56,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    elevation: 4,
    justifyContent: 'space-between',
  },
  leftIcon: {
    padding: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
    marginRight: 40,
  },
  profileCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FF7F50',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
