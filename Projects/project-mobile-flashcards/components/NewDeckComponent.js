import React, { Component } from 'react'
import { View, Text, TextInput,StyleSheet, TouchableOpacity} from 'react-native'
import { addDeck } from '../actions';
import { addDeckApi } from '../utils/api';
import { blue,white} from '../utils/colors'
import { connect } from 'react-redux'

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
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
    },
});

export class NewDeckComponent extends Component {
    state = {
        text: ''
    }

    onAdd = (title) => {
        addDeckApi(title);
        this.props.dispatch(addDeck(title));
        this.setState({text : ''});
        this.props.navigation.navigate('Deck') 
    }
      
    render() {
        const {text} = this.state;
        return (
            <View style={styles.container}>
                <Text style={{padding: 10, fontSize: 22}}>
                    Deck Title :
                </Text>
                <TextInput
                    style={styles.input}
                    placeholder="please enter title !"
                    text = {text}
                    onChangeText={text => this.setState({text : text})}
                    defaultValue={text}
                />
                <TouchableOpacity 
                    style = {styles.button} 
                    disabled = {text === ''}
                    onPress={() => this.onAdd(text) } >
                    <Text style ={{ color:white}}>Add</Text>
                </TouchableOpacity>
                
            </View>
        )
    }
}

export default connect()(NewDeckComponent)
