import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ConversationScreen from './ConversationScreen';
import ChatScreen from './ChatScreen';

const Stack = createStackNavigator();

export default Chat = () => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="ConversationScreen">
        <Stack.Screen
          name="ConversationScreen"
          component={ConversationScreen}
          options={{ title: 'Messages' }}
        />
        <Stack.Screen
          name="ChatScreen"
          component={ChatScreen}
          options={({ route }) => ({ title: route.params.conversation.name })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};


