import { View, Text, Pressable } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';

const AccessSelector = ({ selected, setSelected }) => {
  const options = [
    {
      id: 'Public',
      label: 'Public',
      icon: (
        <Ionicons
          name="earth"
          size={26}
          color={selected === 'Public' ? 'white' : 'black'}
        />
      ),
    },
    {
      id: 'invite only',
      label: 'Invite Only',
      icon: (
        <AntDesign
          name="lock1"
          size={25}
          color={selected === 'invite only' ? 'white' : 'black'}
        />
      ),
    },
  ];

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
         marginTop: 7,
        marginVertical: 15,
      }}
    >
      <Feather name="activity" size={30} color="black" />
      <View>
        <Text style={{ marginBottom: 10, fontSize: 20, fontWeight: '500' }}>
          Activity Access
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {options.map(opt => (
            <Pressable
              key={opt.id}
              onPress={() => setSelected(opt.id)}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 8,
                width: 140,
                justifyContent: 'center',
                borderRadius: 7,
                padding: 10,
                backgroundColor: selected === opt.id ? '#07bc0c' : 'white',
              }}
            >
              {opt.icon}
              <Text
                style={{
                  color: selected === opt.id ? 'white' : 'black',
                  fontWeight: 'bold',
                  fontSize: 17,
                }}
              >
                {opt.label}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>
    </View>
  );
};

export default AccessSelector;