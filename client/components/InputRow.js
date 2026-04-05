import React from 'react';
import { Pressable, View, Text, TextInput, Platform } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const InputRow = ({
  icon,
  label,
  value,
  placeholder,
  onPress,
  onChangeText,
  editable = true,
}) => {
  const rightArrowName = Platform.OS === 'web' ? 'arrow-right' : 'arrowright';

  return (
    <>
      <Pressable
        onPress={onPress}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 20,
          marginVertical: 15,
        }}
      >
        {icon}
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 18, fontWeight: '500' }}>{label}</Text>
          <TextInput
            value={value}
            onChangeText={onChangeText}
            editable={editable}
            placeholder={placeholder}
            placeholderTextColor="gray"
            style={{ marginTop: 3, fontSize: 16, color: 'black' }}
          />
        </View>
        <AntDesign name={rightArrowName} size={24} color="gray" />
      </Pressable>
      <View style={{ borderColor: '#E0E0E0', borderWidth: 0.7, height: 1 }} />
    </>
  );
};

export default InputRow;
