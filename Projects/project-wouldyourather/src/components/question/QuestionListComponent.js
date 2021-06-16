import React, { Component } from 'react'
import ViewQuestionComponent from './ViewQuestionComponent'

export class QuestionListComponent extends Component {
    render() {
        console.log(this.props.questions);
        return this.props.questions.length > 0 ? (
            this.props.questions.map((question) => (
                <ViewQuestionComponent question={question} key={question.id}
                                    answered={this.props.answered}/>
            )) 
        ): (
            <div>
                No Questions in this section
            </div>
        )
    }
}

export default QuestionListComponent
