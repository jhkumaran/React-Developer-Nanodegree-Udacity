import React, { Component } from 'react'
import { View,Text, TouchableOpacity, TextInput, StyleSheet, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux';
import { blue,white,purple} from '../utils/colors'
import { CommonActions } from '@react-navigation/native';
import { addCardToDeckApi } from '../utils/api';
import { addCardToDeck } from '../actions';

export class AddCardComponent extends Component {
    state = {
        question: '',
        answer: '',
    }

    onSubmitQuestion = async() => {
      const { dispatch, title, navigation } = this.props;
      const { question, answer } = this.state;
      await addCardToDeckApi(title, {question, answer});
      dispatch(addCardToDeck(title, {question, answer}));
      navigation.dispatch(CommonActions.goBack());
    }

    render() {
        const { question, answer } = this.state
        return (
            <KeyboardAvoidingView behavior='padding' style={styles.container}>
                <Text style={styles.titleText}> {this.props.title}</Text>

                <TextInput  style={styles.input}  placeholder="enter a question here..."
                    onChangeText={(text) => this.setState(() => ({question: text}))}  value={this.state.question} />
      
                <TextInput  style={styles.input} placeholder="enter the answer here..."
                    onChangeText={(text) => this.setState(() => ({answer: text}))} value={this.state.answer} />
      
                <TouchableOpacity style={styles.button} onPress={this.onSubmitQuestion} disabled = { question === '' || answer ==='' }>
                    <Text  style ={{ color:white}}>SUBMIT</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
          )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 22,
      alignItems: 'center',
      justifyContent: 'center',
     },
    input: {
      height: 40,
      width: 240,
      margin: 12,
      borderWidth: 1,
    },
    titleText: {
      fontSize: 40,
      color : purple,
      margin: 12,
      fontWeight: "bold"
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
    checkboxContainer: {
      flexDirection: "row",
      marginBottom: 20,
    },
    checkbox: {
      alignSelf: "center",
    },
    label: {
      margin: 8,
    },
});
  
function mapStateToProps (state, { route }) {
    const {deckItem} = route.params
    return {
      title: deckItem.title
    }
}

export default connect(mapStateToProps)(AddCardComponent)
