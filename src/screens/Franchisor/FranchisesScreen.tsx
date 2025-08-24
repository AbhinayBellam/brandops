


import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Alert,
  RefreshControl,
  Modal,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FranchiseCard from '../../components/Franchisor/FranchiseCard';
import {
  fetchFranchises,
  updateFranchise,
  removeFranchise,
} from '../../services/franchiseService';
import { Franchise } from '../../types/franchise';
import FranchisorHeader from '../../components/Franchisor/FranchisorHeader';

const FranchisesScreen = () => {
  const [franchises, setFranchises] = useState<Franchise[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);

  // Edit Modal State
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editData, setEditData] = useState<Partial<Franchise>>({});

  const loadFranchises = async () => {
    try {
      setLoading(true);
      const data = await fetchFranchises();
      setFranchises(data);
    } catch (err) {
      console.error('Error fetching franchises:', err);
      Alert.alert('Error', 'Failed to load franchises.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleDelete = (id: string) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this franchise?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await removeFranchise(id);
              await loadFranchises();
            } catch (err) {
              console.error('Delete failed:', err);
              Alert.alert('Error', 'Failed to delete franchise.');
            }
          },
        },
      ]
    );
  };

  const handleEdit = (franchise: Franchise) => {
    setEditData(franchise);
    setEditModalVisible(true);
  };

  const saveEdit = async () => {
    if (!editData._id ) {
      Alert.alert('Validation Error', 'Franchise ID is missing.');
      return;
    }
    try {
    const payload: Partial<Franchise> = {};
    if (editData.name) payload.name = editData.name;
    if (editData.region) payload.region = editData.region;
    if (editData.commissionRate !== undefined) payload.commissionRate = Number(editData.commissionRate);

    await updateFranchise(editData._id, payload);
    setEditModalVisible(false);
    await loadFranchises();
  } catch (err) {
    console.error('Update failed:', err);
    Alert.alert('Error', 'Failed to update franchise.');
  }
};

  useEffect(() => {
    loadFranchises();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <FranchisorHeader title="Franchises" />

      {loading ? (
        <ActivityIndicator size="large" color="#4CAF50" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={franchises}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <FranchiseCard
              franchise={item}
              onDelete={handleDelete}
              onEdit={() => handleEdit(item)}
            />
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={loadFranchises} />
          }
          contentContainerStyle={{ padding: 16 }}
        />
      )}

      {/* Edit Franchise Modal */}
      <Modal visible={editModalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Edit Franchise</Text>

            <TextInput
              style={styles.input}
              placeholder="Franchise Name"
              value={editData.name || ''}
              onChangeText={(val) => setEditData((prev) => ({ ...prev, name: val }))}
            />
            <TextInput
              style={styles.input}
              placeholder="Region"
              value={editData.region || ''}
              onChangeText={(val) => setEditData((prev) => ({ ...prev, region: val }))}
            />
            <TextInput
              style={styles.input}
              placeholder="Commission Rate (%)"
              keyboardType="numeric"
              value={editData.commissionRate?.toString() || ''}
              onChangeText={(val) =>
                setEditData((prev) => ({ ...prev, commissionRate: Number(val) }))
              }
            />

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={() => setEditModalVisible(false)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.saveButton]}
                onPress={saveEdit}
              >
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default FranchisesScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#E6F7FF' },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 20,
  },
  modalBox: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  modalTitle: { fontSize: 18, fontWeight: '600', marginBottom: 10 },
  input: {
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  modalActions: { flexDirection: 'row', justifyContent: 'flex-end', marginTop: 10 },
  button: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 6, marginLeft: 8 },
  cancelButton: { backgroundColor: '#ccc' },
  saveButton: { backgroundColor: '#4CAF50' },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});
