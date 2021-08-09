import React from 'react'
import { Text, StyleSheet,TouchableOpacity } from 'react-native'

const styles = StyleSheet.create({
    item: {
        backgroundColor: '#fff',
        borderRadius: 22,
        padding: 10,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 17,
        justifyContent: 'center',
        alignItems: 'center',
        shadowRadius: 13,
        shadowOpacity: 0.8,
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: {
          width: 0,
          height: 3
        },
      },
  });

const onDeckPress = (deckItem,navigation) =>{
    navigation.navigate('Deck',{deckItem:deckItem})
}

const RenderDeckListItem = (props) =>{
    const {deckItem,navigation} = props
    return(
        <TouchableOpacity style={styles.item} onPress={() => onDeckPress(deckItem,navigation)}>
            <Text style={{ fontSize: 28, height: 44,}}> {deckItem.title}</Text>
            <Text style={{ fontSize: 15}}> No of Cards : {deckItem.questions.length}</Text>
        </TouchableOpacity>
    )
}

export default RenderDeckListItem;