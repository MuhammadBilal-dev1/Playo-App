import React from 'react';
import { View, Text, Pressable } from 'react-native';

const QueryList = ({ queries, isAdmin, onReplyPress }) => {
  console.log('Is Admin:', isAdmin);
  return (
    <View
      style={{
        marginHorizontal: 15,
        backgroundColor: 'white',
        padding: 12,
        borderRadius: 6,
      }}
    >
      <Text style={{ fontSize: 20, fontWeight: '600' }}>
        Queries ({queries.length})
      </Text>

      <View style={{ marginVertical: 12 }}>
        {queries.length > 0 ? (
          queries.map((q, index) => (
            <View
              key={index}
              style={{
                padding: 10,
                borderBottomWidth: 0.5,
                borderColor: '#EEE',
              }}
            >
              <Text style={{ fontWeight: 'bold', fontSize: 14 }}>
                {q.senderId?.firstName} {q.senderId?.lastName}
              </Text>
              <Text style={{ fontSize: 13, color: '#444' }}>{q.message}</Text>

              {q.reply ? (
                <View
                  style={{
                    backgroundColor: '#F9F9F9',
                    padding: 8,
                    marginTop: 8,
                    borderRadius: 5,
                    borderLeftWidth: 3,
                    borderLeftColor: '#07bc0c',
                  }}
                >
                  <Text
                    style={{
                      fontSize: 12,
                      fontWeight: 'bold',
                      color: '#07bc0c',
                    }}
                  >
                    Host Reply:
                  </Text>
                  <Text style={{ fontSize: 13, color: '#555' }}>{q.reply}</Text>
                </View>
              ) : (
                isAdmin &&
                !q.reply && (
                  <Pressable
                    onPress={() => {
                      onReplyPress(q);
                      console.log('Reply Pressed for:', q._id);
                    }}
                    style={{ marginTop: 8, alignItems: 'flex-end' }}
                  >
                    <Text style={{ color: '#07bc0c', fontWeight: 'bold' }}>
                      REPLY
                    </Text>
                  </Pressable>
                )
              )}
            </View>
          ))
        ) : (
          <Text style={{ textAlign: 'center', color: '#999', marginTop: 20 }}>
            There are no queries yet! Queries sent by players will be shown here
          </Text>
        )}
      </View>
    </View>
  );
};

export default QueryList;
