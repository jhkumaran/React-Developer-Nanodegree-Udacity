import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity,Button,Animated } from 'react-native'
import { blue,white,orange,lightPurple,pink} from '../utils/colors'
import { connect } from 'react-redux';
import { saveQuizScore } from '../actions';
import { saveQuizScoreApi } from '../utils/api';

export class QuizComponent extends Component {
    state = {
        onAnswerCard: false,
        frontInterpolate: null,
        backInterpolate: null
    }

    componentDidMount(){
        this.animatedValue = new Animated.Value(0);
        this.value = 0;
        this.animatedValue.addListener(({ value }) => {
          this.value = value;
        })
        let frontInterpolate = this.animatedValue.interpolate({
          inputRange: [0,180],
          outputRange: ['0deg', '180deg'],
        })
        let backInterpolate = this.animatedValue.interpolate({
          inputRange: [0,180],
          outputRange: ['180deg', '360deg'],
        })
        this.setState({ frontInterpolate, backInterpolate});
    }

    onShowAnswer = () =>{
        if (this.value >= 90) {
            this.setState({onAnswerCard : false})
            Animated.timing(this.animatedValue,{
                toValue: 0,
                friction: 8,
                tension: 10,
                useNativeDriver: true
            }).start();
        } else {
            this.setState({onAnswerCard : true})
            Animated.timing(this.animatedValue,{
                toValue: 180,
                friction: 8,
                tension: 10,
                useNativeDriver: true
            }).start();
        }
    }

    navigate = () => {
        const {navigation,deckItem,total,currentQuestionCount} = this.props
        if(total === currentQuestionCount+1)
        {
            navigation.navigate('QuizResult',{deckItem:deckItem})
        }
        else
        {
            navigation.push('Quiz',{deckItem:deckItem,currentQuestionCount : currentQuestionCount+1})
        }
    }

    validateAnswer = (answer) => {
        const {dispatch,deckItem,currentQuestionCount} = this.props
        const currentQuestion  = deckItem.questions[currentQuestionCount]
        if (answer === 'correct')
        {
            deckItem.score =  deckItem.score + 1
            console.log('Correct Answer - ' + deckItem.score)
        }
        else 
        {
            console.log('Wrong Answer - ' + + deckItem.score) 
        }
        saveQuizScoreApi(deckItem.title, deckItem.score).then(() => {
            dispatch(saveQuizScore(deckItem.title, deckItem.score))
        });
        return deckItem.score
    }

    onCorrect = () => {
        const {deckItem} = this.props
        deckItem.score  = this.validateAnswer('correct')
        
        this.navigate();
    }

    onInCorrect = () => {
        const {deckItem} = this.props
        deckItem.score  = this.validateAnswer('incorrect')
        this.navigate();
    }

    render() {
        const { frontInterpolate, backInterpolate } = this.state;
        const {deckItem,total,currentQuestionCount} = this.props;
        const frontAnimatedStyle = {
            transform: [
                { rotateY: frontInterpolate }
            ]
        };
        const backAnimatedStyle = {
            transform: [
                { rotateY: backInterpolate }
            ]
        };
        return (
            <View style={styles.container}>
            
            <View>
                <Text style ={{fontSize: 20,height: 54,color:orange}}>{(currentQuestionCount+1)} of {total}</Text>
            </View>
            <View>
                <Animated.View style={[styles.flipCard, frontAnimatedStyle]}>
                    <Text style={{fontSize: 25,height: 74,}}>
                        Question: {deckItem.questions[currentQuestionCount].question}
                    </Text>
                </Animated.View>
                <Animated.View style={[backAnimatedStyle, styles.flipCard, styles.flipCardBack]}>
                    <Text style={{fontSize: 20,height: 54,}}>
                        Answer: {deckItem.questions[currentQuestionCount].answer}
                    </Text>
                </Animated.View>
            </View>
             <TouchableOpacity onPress={this.onShowAnswer} >
                <Text style ={{ color:orange,fontSize: 16,}}>
                    {this.state.onAnswerCard ? 'Show Question' : 'Show Answer' }
                </Text>
            </TouchableOpacity>
            
            <TouchableOpacity style = {[styles.button,{backgroundColor:lightPurple}]} onPress={this.onCorrect}>
                <Text style ={{ color:white}}>Correct</Text>
            </TouchableOpacity>

            <TouchableOpacity style = {[styles.button,{backgroundColor:pink}]} onPress={this.onInCorrect}>
                     <Text style ={{ color:white}}>InCorrect</Text>
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
    flipCard: {
        width: 300,
        height: 300,
        paddingTop: 22,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: white,
        backfaceVisibility: 'hidden',
    },
    flipCardBack: {
        backgroundColor: white,
        position: 'absolute',
        top: 0,
    },
});

function mapStateToProps (state, { route }) {
    const {deckItem,currentQuestionCount} = route.params
  return {
    deckItem: state[deckItem.title],
    total : deckItem.questions.length,
    currentQuestionCount : currentQuestionCount ?? 0
  }
}

export default connect(mapStateToProps)(QuizComponent)
