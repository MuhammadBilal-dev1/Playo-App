import {
  View,
  SafeAreaView,
  ScrollView,
  Image,
} from 'react-native';
import React, { useContext, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { AuthContext } from '../AuthContext';
import { jwtDecode } from 'jwt-decode';

// CUSTOM HOOKS
import { useGameLogic } from '../hooks/useGameLogic';

// COMPONENTS
import QueryModal from '../components/QueryModal';
import QueryList from '../components/QueryList';
import ReplyModal from '../components/ReplyModal';
import GameHeader from '../components/GameHeader';
import ExpenseCard from '../components/ExpenseCard';
import BottomActionButtons from '../components/BottomActionButtons';
import JoinGameModal from '../components/JoinGameModal';
import PlayerSection from '../components/PlayerSection';

const GameSetUpScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const gameData = route?.params?.item;
  console.log("gameData", gameData.adminId);
  const gameId = gameData?._id;
  const { token } = useContext(AuthContext);
  const {
    currentUserId,
    setCurrentUserId,
    modalVisible,
    setModalVisible,
    comment,
    setComment,
    matchFull,
    requests,
    players,
    venues,
    isQueryModalVisible,
    setQueryModalVisible,
    queries,
    isReplyModalVisible,
    setIsReplyModalVisible,
    selectedQuery,
    setSelectedQuery,
    sendJoinRequest,
    toggleMatchFullStatus,
    handleSendQuery,
    handleReplyQuery,
  } = useGameLogic(gameId, gameData);

  const isHost = gameData?.adminId === currentUserId;

  const userRequested = gameData?.requests.some(
    request => request.userId === currentUserId,
  );

  const venue = venues?.find(item => item?.name == gameData?.area);

  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      setCurrentUserId(decodedToken.userId);
    }
  }, [token]);

  const [startTime, endTime] = route?.params?.item?.time
    ?.split(' - ')
    .map(time => time.trim());

    
    

  return (
    <>
      <SafeAreaView
        style={{
          flex: 1,
          paddingTop: Platform.OS === 'android' ? 45 : 0,
        }}
      >
        <ScrollView>
          <GameHeader
            navigation={navigation}
            sport={gameData?.sport}
            matchFull={matchFull}
            isHost={isHost}
            gameData={gameData}
            venue={venue}
            startTime={startTime}
            endTime={endTime}
            toggleStatus={() => toggleMatchFullStatus(gameId)}
            
          />
          <ExpenseCard />

          <View style={{ marginHorizontal: 15 }}>
            <Image
              style={{
                width: '100%',
                height: 220,
                borderRadius: 10,
                resizeMode: 'cover',
              }}
              source={{
                uri: 'https://playo.gumlet.io/OFFERS/PlayplusSpecialBadmintonOfferlzw64ucover1614258751575.png',
              }}
            />
          </View>

          <PlayerSection
            players={players}
            gameData={gameData}
            isHost={isHost}
            requests={requests}
            currentUserId={currentUserId}
            navigation={navigation}
          />

          <QueryList
            queries={queries}
            isAdmin={isHost}
            onReplyPress={q => {
              setSelectedQuery(q);
              setIsReplyModalVisible(true);
            }}
          />

          <ReplyModal
            visible={isReplyModalVisible}
            selectedQuery={selectedQuery}
            onClose={() => setIsReplyModalVisible(false)}
            onSubmit={handleReplyQuery}
          />
        </ScrollView>

        <QueryModal
          visible={isQueryModalVisible}
          onClose={() => setQueryModalVisible(false)}
          onSubmit={handleSendQuery}
        />
      </SafeAreaView>

      <BottomActionButtons
        isHost={isHost}
        userRequested={userRequested}
        onQueryPress={() => setQueryModalVisible(true)}
        onJoinPress={() => setModalVisible(!modalVisible)}
      />

      <JoinGameModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={() => sendJoinRequest(gameData?._id)}
        comment={comment}
        setComment={setComment}
        adminName={gameData?.adminName}
      />
    </>
  );
};

export default GameSetUpScreen;
