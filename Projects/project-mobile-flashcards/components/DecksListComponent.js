import React, { Component } from 'react'
import { View, Text, StyleSheet, FlatList,TouchableOpacity } from 'react-native'
import { clearDecksApi, getDecksApi } from '../utils/api';
import {clearDeck, receiveDeckList} from '../actions/index'
import { connect } from 'react-redux'
import { blue, white } from '../utils/colors'
import RenderDeckListItem from './RenderDeckListItem';
import AppLoading from 'expo-app-loading'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        alignItems: "center",
        justifyContent: 'center',
        width : 150,
        backgroundColor: blue,
        padding: 10,
        marginTop: 17,
        marginBottom: 17,
    }
});

export class DecksListComponent extends Component {
    state = {
        ready: false
    }

    componentDidMount(){
        this.loadDecks();     
    }

    loadDecks = async() => {
        const { dispatch } = this.props;
        let decks = await getDecksApi();
        dispatch(receiveDeckList(decks));
        this.setState({ ready: true });
    }

    clearDecks = () => {
        clearDecksApi();
        this.props.dispatch(clearDeck());
    }

    render() {
        const { ready } = this.state;
        if (ready === false) {
          return <AppLoading />
        }

        const {deckList} = this.props
        return (
            <View style={styles.container}>
                <FlatList
                    data = {Object.keys(deckList)}
                    renderItem={({ item }) => (
                        <RenderDeckListItem  
                            deckItem ={deckList[item]} 
                            navigation={this.props.navigation} 
                        />
                    )}
                />
                <TouchableOpacity style = {styles.button} 
                            onPress={() => this.clearDecks() } >
                    <Text style ={{ color:white}}>Clear All</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

function mapStateToProps (state) {
    return {
      deckList : state
    }
  }
  

export default connect(mapStateToProps)(DecksListComponent)
