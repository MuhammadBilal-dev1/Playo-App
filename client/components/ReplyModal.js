import React, { useState } from 'react';
import { Modal, View, Text, TextInput, Pressable } from 'react-native';

const ReplyModal = ({ visible, onClose, onSubmit, selectedQuery }) => {
  const [reply, setReply] = useState('');

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.5)',
          justifyContent: 'center',
          padding: 20,
          marginTop: Platform.OS === 'android' ? 20 : 0,
        }}
      >
        <View
          style={{ backgroundColor: 'white', borderRadius: 12, padding: 20 }}
        >
          <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>
            Replying to: {selectedQuery?.senderId?.firstName} {selectedQuery?.senderId?.lastName}
          </Text>
          <Text
            style={{ fontStyle: 'italic', color: '#666', marginBottom: 15 }}
          >
            "{selectedQuery?.message}"
          </Text>

          <TextInput
            placeholder="Type your reply..."
            style={{
              borderWidth: 1,
              borderColor: '#DDD',
              padding: 10,
              borderRadius: 8,
              height: 80,
            }}
            multiline
            value={reply}
            onChangeText={setReply}
          />

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              marginTop: 15,
            }}
          >
            <Pressable onPress={onClose} style={{ marginRight: 15 }}>
              <Text style={{ color: 'red' }}>Cancel</Text>
            </Pressable>
            <Pressable
              onPress={() => {
                onSubmit(selectedQuery._id, reply);
                setReply('');
                onClose();
              }}
            >
              <Text style={{ color: '#07bc0c', fontWeight: 'bold' }}>
                Send Reply
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ReplyModal;
