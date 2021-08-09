import React, { Component } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';;
import { createStackNavigator } from '@react-navigation/stack';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import * as Device from 'expo-device';
import DecksListComponent from './components/DecksListComponent';
import { white,orange} from './utils/colors'
import reducer from './reducers';
import NewDeckComponent from './components/NewDeckComponent';
import DeckComponent from './components/DeckComponent';
import AddCardComponent from './components/AddCardComponent';
import QuizComponent from './components/QuizComponent';
import QuizResultComponent from './components/QuizResultComponent';

const Stack = createStackNavigator();
const DeckStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="DeckList" 
        component={DecksListComponent}
        options={{
          title: 'Deck List',
          headerTitleStyle: { alignSelf: 'center' }, 
          headerStyle: {backgroundColor: orange }, 
          headerTintColor: white
        }}
      />
      <Stack.Screen 
        name = "Deck" component={DeckComponent}        
        options={({ route }) => 
            ({ 
              title: route.params.deckItem.title, 
              headerStyle: {backgroundColor: orange,}, 
              headerTintColor: white  
            })} 
      />
      <Stack.Screen 
        name = "AddCard" component={AddCardComponent}        
        options={({ route }) => 
            ({ 
              title: 'Add Card', 
              headerStyle: {backgroundColor: orange,}, 
              headerTintColor: white  
            })} 
      />
      <Stack.Screen 
        name = "Quiz" component={QuizComponent}        
        options={({ route }) => 
            ({ 
              title: 'Quiz', 
              headerStyle: {backgroundColor: orange,}, 
              headerTintColor: white  
            })} 
      />
      <Stack.Screen 
        name = "QuizResult" component={QuizResultComponent}        
        options={({ route }) => 
            ({ 
              title: 'Quiz Result', 
              headerStyle: {backgroundColor: orange,}, 
              headerTintColor: white  
            })} 
      />
    </Stack.Navigator>
  )
}

const Tab = createMaterialTopTabNavigator();
export class App extends Component {
  render() {
    return (
      <Provider store={createStore(reducer)}>
        <NavigationContainer>
          <Tab.Navigator>
            <Tab.Screen 
              name="Deck"
              component={DeckStack}
              initialRouteName="Deck"
            />
            <Tab.Screen 
              name="New Deck"
              component={NewDeckComponent}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </Provider>
    )
  }
}

export default App
