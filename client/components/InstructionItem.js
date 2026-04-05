import { Text, View } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const InstructionItem = ({ icon, label, iconColor }) => (
  <View
    style={{
      marginVertical: 5,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    }}
  >
    {icon}
    <Text style={{ flex: 1, fontWeight: '500', fontSize: 17 }}>{label}</Text>
    <FontAwesome name="check-square" size={26} color="green" />
  </View>
);

export default InstructionItem;
