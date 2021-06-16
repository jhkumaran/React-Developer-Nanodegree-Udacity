import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import QuestionListComponent from '../question/QuestionListComponent'
import './home.css'

export class HomeComponent extends Component {
    state = {
        answered: [],
        unanswered:[],
        selected: 0
    }

    componentDidMount(){
        this.updateQuestions();
    }

    componentDidUpdate(prevProps){
        if(prevProps.questions !== this.props.questions){
            this.updateQuestions();
        }
    }

    updateQuestions(){
        let user = this.props.users.find(t=> t.id === this.props.activeUser);
        console.log(user);
        if(user.answeredQuestions.length === 0){
            this.setState({
                answered: [],
                unanswered: this.props.questions
            }, () => console.log(this.state))
        }else{
            let answered = this.props.questions.filter(t=> user.answeredQuestions.find(a => a === t.id) !== undefined);
            let unanswered = this.props.questions.filter(t=> user.answeredQuestions.find(a=> a === t.id) === undefined);
            this.setState({
                answered,
                unanswered
            }, () => console.log(this.state))
        }
    }

    viewSection = (selected) => {
        this.setState({
            selected
        })
    }

    render() {
        const { answered, unanswered, selected } = this.state
        return (
            <div className='question-contatiner'>
                <div className='question-header'>
                    <div className={`question-section ${selected === 0 ? 'selected' : ''}`}
                        onClick={() => this.viewSection(0)}>
                        Unanswered Questions
                    </div>
                    <div className={`question-section ${selected === 1 ? 'selected' : ''}`}
                        onClick={() => this.viewSection(1)}>
                        Answered Questions
                    </div>
                </div>
                <div className='question-body'>
                    <QuestionListComponent questions={selected === 0 ? unanswered : answered}
                                        answered={selected === 1}/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    users: state.userReducer.users,
    activeUser: state.userReducer.activeUser,
    questions: state.questionsReducer.questions
  })
  
  const mapDispatchToProps = (dispatch) => 
    bindActionCreators(
      {
      },
      dispatch
  )

export default connect(mapStateToProps,mapDispatchToProps)(HomeComponent)
