import {
  Text,
  View,
  SafeAreaView,
  FlatList,
  Image,
  Pressable,
} from 'react-native';
import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const PlayersScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { players, adminId } = route.params || { players: [] };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: Platform.OS === 'android' ? 45 : 0,
        backgroundColor: '#F8F9FA', // Thora sa light background
      }}
    >
      {/* Header */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 16,
          paddingVertical: 15,
        //   backgroundColor: 'white',
          backgroundColor: 'green',
          elevation: 2,
        }}
      >
        <Pressable onPress={() => navigation.goBack()} style={{ padding: 5 }}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </Pressable>
        <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#ffffff'}}>
          All Players ({players.length})
        </Text>
        <View style={{ width: 40 }} />
      </View>

      {/* List */}
      <FlatList
        data={players}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              backgroundColor: 'white',
              padding: 12,
              borderRadius: 12,
              marginBottom: 12,
              elevation: 1,
            }}
          >
            <View
              style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}
            >
              <Image
                source={{
                  uri:
                    item.image ||
                    'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
                }}
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 25,
                  backgroundColor: '#EEE',
                }}
              />
              <View style={{ marginLeft: 12 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text
                    style={{ fontSize: 16, fontWeight: '600', color: '#000' }}
                  >
                    {item.firstName} {item.lastName}
                  </Text>

                  {/* --- STEP 2: HOST BADGE LOGIC --- */}
                  {item._id === adminId && (
                    <View
                      style={{
                        backgroundColor: '#E8F5E9',
                        paddingHorizontal: 6,
                        paddingVertical: 2,
                        borderRadius: 4,
                        marginLeft: 8,
                        borderWidth: 0.5,
                        borderColor: '#4CAF50',
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 10,
                          fontWeight: '700',
                          color: '#2E7D32',
                        }}
                      >
                        HOST
                      </Text>
                    </View>
                  )}
                </View>
                <Text style={{ fontSize: 12, color: '#666', marginTop: 2 }}>
                  {item.role || 'Player'}
                </Text>
              </View>
            </View>

            <View
              style={{
                backgroundColor: '#FFF4E5',
                paddingHorizontal: 10,
                paddingVertical: 4,
                borderRadius: 6,
                borderWidth: 1,
                borderColor: '#FFD580',
              }}
            >
              <Text
                style={{ fontSize: 10, fontWeight: 'bold', color: '#E67E22' }}
              >
                {item.level || 'INTERMEDIATE'}
              </Text>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default PlayersScreen;
