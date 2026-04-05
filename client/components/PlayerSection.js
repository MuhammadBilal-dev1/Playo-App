import { View, Text, Image, Pressable } from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const PlayerSection = ({
  players,
  gameData,
  isHost,
  requests,
  currentUserId,
  navigation,
}) => {
  return (
    <View
      style={{
        marginVertical: 20,
        marginHorizontal: 15,
        backgroundColor: 'white',
        padding: 12,
      }}
    >
      {/* Header Section */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Text style={{ fontSize: 19, fontWeight: '600' }}>
          Players ({players.length})
        </Text>

        <Ionicons name="earth" size={28} color="gray" />
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 20,
        }}
      >
        <Text style={{ fontSize: 19, fontWeight: '500' }}>
          ❤️ You are not covered 🙂
        </Text>

        <Text style={{ fontWeight: '500', fontSize: 17 }}>Learn More</Text>
      </View>

      {/* Admin/Host Info Card */}
      <View style={{ marginVertical: 12, flexDirection: 'row', gap: 10 }}>
        <View>
          <Image
            style={{ width: 60, height: 60, borderRadius: 30 }}
            source={{ uri: gameData?.adminUrl }}
          />
        </View>

        <View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10,
            }}
          >
            <Text style={{ fontSize: 18 }}>
              {gameData?.adminName}
            </Text>
            <View
              style={{
                alignSelf: 'flex-start',
                paddingHorizontal: 10,
                paddingVertical: 6,
                backgroundColor: '#E0E0E0',
                borderRadius: 8,
              }}
            >
              <Text style={{ fontSize: 15 }}>HOST</Text>
            </View>
          </View>

          <View
            style={{
              paddingHorizontal: 10,
              paddingVertical: 5,
              marginTop: 10,
              borderRadius: 20,
              borderColor: 'orange',
              borderWidth: 1,
              alignSelf: 'flex-start',
            }}
          >
            <Text style={{ fontSize: 16 }}>INTERMEDIATE</Text>
          </View>
        </View>
      </View>

      {/* Conditional Rendering: Host vs Player View */}
      {isHost ? (
        <View>
          <Divider />
          <ActionRow
            icon="https://cdn-icons-png.flaticon.com/128/343/343303.png"
            label="Add Co-Host"
            showChevron
          />

          <Divider />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <IconButton
              icon="https://cdn-icons-png.flaticon.com/128/1474/1474545.png"
              label="Add"
            />
            <IconButton
              icon="https://cdn-icons-png.flaticon.com/128/7928/7928637.png"
              label={`Manage (${requests?.length})`}
              onPress={() =>
                navigation.navigate('Manage', {
                  requests,
                  userId: currentUserId,
                  gameId: gameData?._id,
                })
              }
            />
          </View>
          <Divider />

          <ActionRow
            icon="https://cdn-icons-png.flaticon.com/128/1511/1511847.png"
            label="Not on Playo? Invite"
            subLabel="Earn 100 Karma points by referring your friend"
          />
        </View>
      ) : (
        <Pressable
          onPress={() =>
            navigation.navigate('Players', {
              players,
              adminId: gameData?.adminId,
            })
          }
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            borderTopColor: '#E0E0E0',
            borderTopWidth: 1,
            borderBottomColor: '#E0E0E0',
            borderBottomWidth: 1,
            marginBottom: 20,
          }}
        >
          <View
            style={{
              width: 50,
              height: 50,
              borderRadius: 25,
              padding: 10,
              borderColor: '#E0E0E0',
              borderWidth: 1,
              justifyContent: 'center',
              alignItems: 'center',
              marginVertical: 12,
            }}
          >
            <MaterialCommunityIcons
              name="chevron-right"
              size={35}
              color="black"
            />
          </View>
          <Text style={{ marginBottom: 12, fontWeight: '600', fontSize: 18 }}>
            All Players
          </Text>
        </Pressable>
      )}
    </View>
  );
};

// Helper Components for Internal Use (Code Reusability)
const Divider = () => (
  <View
    style={{
      height: 1,
      borderWidth: 0.5,
      borderColor: '#E0E0E0',
      marginVertical: 12,
    }}
  />
);

const ActionRow = ({ icon, label, subLabel, showChevron }) => (
  <Pressable
    style={{
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    }}
  >
    <View
      style={{
        width: 60,
        height: 60,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Image
        style={{ width: 40, height: 40, resizeMode: 'contain' }}
        source={{ uri: icon }}
      />
    </View>
    <View style={{ flex: 1 }}>
      <Text style={{ fontSize: 19, fontWeight: '500' }}>{label}</Text>
      {subLabel && (
        <Text style={{ marginTop: 6, color: 'gray', fontSize: 16, width: '80%', }}>
          {subLabel}
        </Text>
      )}
    </View>
    {showChevron && (
      <MaterialCommunityIcons
        name="chevron-right"
        style={{ textAlign: 'center' }}
        size={35}
        color="black"
      />
    )}
  </Pressable>
);

const IconButton = ({ icon, label, onPress }) => (
  <Pressable onPress={onPress} style={{ alignItems: 'center' }}>
    <View
      style={{
        width: 60,
        height: 60,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Image
        style={{ width: 40, height: 40, resizeMode: 'contain' }}
        source={{ uri: icon }}
      />
    </View>
    <Text
      style={{
        marginTop: 8,
        fontWeight: '500',
        textAlign: 'center',
        fontSize: 17,
      }}
    >
      {label}
    </Text>
  </Pressable>
);

export default PlayerSection;
