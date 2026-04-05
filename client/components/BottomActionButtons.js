import React from 'react';
import { View, Text, Pressable } from 'react-native';

const BottomActionButtons = ({
  isHost,
  userRequested,
  onJoinPress,
  onQueryPress,
  onCancelRequest, // cancel function bhi le lo props mein
}) => {
  return (
    <View
      style={{
        marginTop: 'auto',
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 12,
        backgroundColor: '#E8E8E8', // Grey background footer
      }}
    >
      {/* 1. Left Button: Hamesha SEND QUERY dikhayen gay (Host ke ilawa) */}
      {!isHost && (
        <Pressable
          onPress={() => onQueryPress()}
          style={{
            backgroundColor: 'white',
            marginBottom: 30,
            padding: 15,
            marginHorizontal: 10,
            borderRadius: 8,
            flex: 1,
          }}
        >
          <Text
            style={{
              textAlign: 'center',
              fontSize: 17,
              fontWeight: '500',
            }}
          >
            SEND QUERY
          </Text>
        </Pressable>
      )}

      {/* 2. Right Button: Condition ke mutabiq change hoga */}
      <Pressable
        onPress={() => {
          if (isHost) {
            // Chat logic
          } else if (userRequested) {
            onCancelRequest && onCancelRequest();
          } else {
            onJoinPress();
          }
        }}
        style={{
          backgroundColor: isHost ? '#07bc0c' : userRequested ? 'red' : '#07bc0c',
          marginBottom: 30,
          padding: 15,
          marginHorizontal: 10,
          borderRadius: 8,
          flex: 1,
        }}
      >
        <Text
          style={{
            textAlign: 'center',
            color: 'white',
            fontSize: 17,
            fontWeight: '500',
          }}
        >
          {isHost ? 'GAME CHAT' : userRequested ? 'CANCEL REQUEST' : 'JOIN GAME'}
        </Text>
      </Pressable>
    </View>
  );
};

export default BottomActionButtons;