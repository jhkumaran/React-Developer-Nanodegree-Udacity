import React, { Component } from 'react'
import { connect } from 'react-redux'
import Tweet from './Tweet'
import NewTweet from './NewTweet'

export class TweetPage extends Component {
    render() {
        console.log(this.props);
        const {id, replies } = this.props;
        return (
            <div>
                <Tweet id={id}/>
                <NewTweet id={id}/>
                {replies.length > 0 && <h3 className='center'>Replies</h3>}
                <ul>
                    {
                        replies.map((replyId) => (
                            <li key={replyId}>
                                <Tweet id={replyId}/>
                            </li>
                        ))
                    }
                </ul>
            </div>
        )
    }
}

function mapStateToProps({authedUser, tweets, users}, props){
    const {id} = props.match.params;
    console.log(tweets[id]);
    return {
        id,
        replies: !tweets[id]
                ? []
                : tweets[id].replies.sort((a,b) => tweets[b].timestamp - tweets[a].timestamp)
    }
}

export default connect(mapStateToProps)(TweetPage)
