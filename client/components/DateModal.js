import React from 'react';
import { Modal, View, Text, Pressable, ScrollView } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const DateModal = ({ visible, onClose, dates, onSelectDate }) => {
  return (
    <Modal
      animationType="none"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          backgroundColor: 'rgba(0,0,0,0.5)',
        }}
      >
        <View
          style={{
            width: '100%',
            padding: 20,
            backgroundColor: 'white',
            // borderRadius: 10,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            maxHeight: '60%', // Ye control karega modal ki height
            minHeight: '30%', // Taake kam content pe bhi acha dikhe
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
              Select a Date
            </Text>
            <Pressable onPress={onClose}>
              <AntDesign name="close" size={30} color="gray" />
            </Pressable>
          </View>
          <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 15,
                flexWrap: 'wrap',
                marginVertical: 20,
              }}
            >
              {dates.map(item => (
                <Pressable
                  key={item.id}
                  onPress={() => onSelectDate(item.displayDate)}
                  style={{
                    padding: 10,
                    borderRadius: 10,
                    borderColor: '#E0E0E0',
                    borderWidth: 1,
                    width: '30%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Text style={{ fontSize: 16 }}>{item.displayDate}</Text>
                  <Text style={{ color: 'gray', marginTop: 8, fontSize: 15 }}>
                    {item.dayOfWeek}
                  </Text>
                </Pressable>
              ))}
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default DateModal;
