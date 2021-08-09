import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { receiveEntries, addEntry } from '../actions'
import { timeToString, getDailyReminderValue } from '../utils/helpers'
import { fetchCalendarResults } from '../utils/api'
import UdaciFitnessCalendar from 'udacifitness-calendar'

export class History extends Component {
    componentDidMount(){
        const { dispatch } = this.props;
        fetchCalendarResults()
        .then((entries) => dispatch(receiveEntries(entries)))
        .then(({entries}) => {
            if(!entries[timeToString]){
                dispatch(addEntry({
                    [timeToString]: getDailyReminderValue()
                }))
            }
        })
    }

    renderItem = ({today, ...metrics}, formattedDate, key) => {
        <View>
            {
                today ? <Text>{JSON.stringify(today)}</Text> :
                <Text>{JSON.stringify(metrics)}</Text>
            }
        </View>
    }

    renderEmptyDate (formattedDate){
        return (
            <View>
                <Text>Np Data for this day</Text>
            </View>
        )
    }

    render() {
        const { entries } = this.props;
        return (
            <View>
                <UdaciFitnessCalendar 
                    items={entries}
                    renderItem={this.renderItem}
                    renderEmptyDate={this.renderEmptyDate}/>
            </View>
        )
    }
}

function mapStateToProps(entries) {
    return {
        entries
    }
}

export default connect(mapStateToProps)(History)
