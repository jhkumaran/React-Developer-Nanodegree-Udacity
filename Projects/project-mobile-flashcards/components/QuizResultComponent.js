import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import { gray,blue,white} from '../utils/colors'
import { connect } from 'react-redux';
import { clearQuizScoreApi } from '../utils/api';
import { clearQuizScore } from '../actions';
import { clearLocalNotification, setLocalNotification } from '../utils/helpers';
import * as Device from 'expo-device';

export class QuizResultComponent extends Component {

    componentDidMount() {
        if (Device.isDevice && Device.brand !== null) {
          clearLocalNotification()
          .then(setLocalNotification)
        }
        else
        {
          console.log('Must use physical device for Local Notifications');
        }
      }
    onReStartQuiz = () => {
        const {deckItem,navigation,dispatch} = this.props;
        clearQuizScoreApi(deckItem.title).then(() => {
            dispatch(clearQuizScore(deckItem.title))
        });
        navigation.navigate('Quiz',{deckItem:deckItem,currentQuestionCount : 0})
    }

    render() {
        const {deckItem,navigation} = this.props
        return (
            <View style={styles.container}>
            <Text style={{ fontSize: 68, height: 100,}}>
                Quiz Result
            </Text>
            <Text style={{ fontSize: 38, height: 74,}}> 
                {deckItem.title}
            </Text>
            <Text style={{ fontSize: 25,height: 54,color:gray}}> 
                No of Question : {deckItem.questions.length}
            </Text>
            <Text style={{ fontSize: 25,height: 54,color:gray}}>
                Correct Answer : {deckItem.score}
            </Text>
            <Text style={{ fontSize: 25,height: 54,color:gray}}>
                Score  : {deckItem.score / deckItem.questions.length * 100} % 
            </Text>
            <TouchableOpacity style = {styles.button} onPress={this.onReStartQuiz} >
                <Text style ={{ color:white}}>ReStart Quiz</Text>
            </TouchableOpacity>
            <TouchableOpacity style = {styles.button} 
                onPress={ ()=> { navigation.navigate('DeckList') }} >
                <Text style ={{ color:white}}>Home</Text>
            </TouchableOpacity>
        </View>
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
    button: {
        alignItems: "center",
        justifyContent: 'center',
        width : 150,
        backgroundColor: blue,
        padding: 10,
        marginTop: 17,
        marginBottom: 17,
      },
  });

function mapStateToProps (state, { route }) {
    const {deckItem} = route.params
  return {
    deckItem: state[deckItem.title]
  }
}

export default connect(mapStateToProps)(QuizResultComponent)
