import React, { useState } from 'react';
import { Modal, View, Text, TextInput, Pressable, KeyboardAvoidingView, Platform } from 'react-native';

const QueryModal = ({ visible, onClose, onSubmit }) => {
  const [query, setQuery] = useState('');

  return (
    <Modal visible={visible} animationType="fade" transparent={true}>
      <View style={{ 
        flex: 1, 
        backgroundColor: 'rgba(0,0,0,0.5)', 
        justifyContent: 'center', 
        padding: 20,
        marginTop: Platform.OS === 'android' ? 20 : 0,
      }}>
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ 
            backgroundColor: 'white', 
            borderRadius: 15, 
            padding: 20, 
            elevation: 5 
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10, color: '#000' }}>
            Ask a Question to Host
          </Text>
          <Text style={{ fontSize: 13, color: '#666', marginBottom: 15 }}>
            Specify any doubts about the game, equipment, or timing.
          </Text>
          
          <TextInput
            style={{ 
              borderWidth: 1, 
              borderColor: '#DDD', 
              borderRadius: 8, 
              padding: 12, 
              height: 100, 
              textAlignVertical: 'top',
              backgroundColor: '#F9F9F9',
              color: '#000'
            }}
            placeholder="Type your query here..."
            placeholderTextColor="#999"
            multiline
            numberOfLines={4}
            value={query}
            onChangeText={setQuery}
          />

          <View style={{ flexDirection: 'row', justifyContent: 'flex-end', marginTop: 20 }}>
            <Pressable 
              style={{ marginRight: 15, paddingVertical: 10 }} 
              onPress={() => {
                setQuery('');
                onClose();
              }}
            >
              <Text style={{ color: '#666', fontWeight: '600' }}>Cancel</Text>
            </Pressable>
            
            <Pressable 
              style={{ 
                backgroundColor: '#00B32C', 
                paddingHorizontal: 20, 
                paddingVertical: 10, 
                borderRadius: 8,
                opacity: query.trim() ? 1 : 0.5 
              }} 
              onPress={() => {
                if(query.trim()){
                  onSubmit(query);
                  setQuery('');
                }
              }}
            >
              <Text style={{ color: 'white', fontWeight: 'bold' }}>Send Query</Text>
            </Pressable>
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
};

export default QueryModal;