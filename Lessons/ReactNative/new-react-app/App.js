import React from 'react';
import { 
  View, StyleSheet, Text
} from 'react-native';
import AddEntry from './components/AddEntry'
import History from './components/History'
import { createStore } from 'redux'
import {Provider} from 'react-redux'
import reducer from './reducers'

export default class App extends React.Component {
  componentDidMount(){
    console.log('Before');
    console.log('After');
  }

  state = {
    value: 0
  }

  handlePress = () => {
    alert('Hello');
  }

  render(){
    return (
      <Provider store={createStore(reducer)}>
        <View style={{flex: 1}}>
          <View style={{height: 20}}/>
          <History/>
        </View>
      </Provider>
      
    );
  }
}
