import { Modal, View, Text, Pressable, TextInput } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const JoinGameModal = ({
  visible,
  onClose,
  onSubmit,
  comment,
  setComment,
  adminName,
}) => (
  <Modal
    statusBarTranslucent
    animationType="slide"
    transparent={true}
    visible={visible}
    onRequestClose={() => onClose()}
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
          height: 450,
          backgroundColor: 'white',
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
          padding: 20,
        }}
      >
        <View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: '500',
                color: 'gray',
                paddingTop: 10,
              }}
            >
              Join Game
            </Text>
            <Pressable onPress={() => onClose()}>
              <AntDesign name="close" size={30} color="gray" />
            </Pressable>
          </View>

          <Text style={{ marginTop: 20, color: 'gray', fontSize: 18 }}>
            {adminName} has been putting efforts to
            organize this game. Please send the request if you are quite sure to
            attend.
          </Text>

          <View
            style={{
              borderColor: '#E0E0E0',
              borderWidth: 1,
              padding: 10,
              borderRadius: 10,
              height: 200,
              marginTop: 20,
            }}
          >
            <TextInput
              value={comment}
              onChangeText={text => setComment()}
              style={{
                fontFamily: 'Helvetica',
                fontSize: 18,
              }}
              placeholder="Send a message to the host along with your request!"
            />
          </View>
          <Pressable
            onPress={() => onSubmit()}
            style={{
              marginTop: 'auto',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 15,
              backgroundColor: 'green',
              borderRadius: 10,
              justifyContent: 'center',
              padding: 10,
            }}
          >
            <Text
              style={{
                color: 'white',
                textAlign: 'center',
                fontSize: 18,
                fontWeight: '500',
              }}
            >
              Send Request
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  </Modal>
);

export default JoinGameModal;
