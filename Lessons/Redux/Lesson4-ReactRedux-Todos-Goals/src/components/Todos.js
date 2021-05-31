import React from 'react';
import List from './List';
import { handleAddTodo, handleDeleteTodo, handeToggleTodo} from '../actions/todos';
import { connect } from 'react-redux';

class Todos extends React.Component{
    addItem = (e) => {
        e.preventDefault();

        this.props.dispatch(handleAddTodo(
            this.input.value,
            () => this.input.value = ''
        ));
    }

    removeItem = (todo) => {
        this.props.dispatch(handleDeleteTodo(todo));
    }

    toggleItem = (id) => {
        this.props.dispatch(handeToggleTodo(id));
    }
    render(){
        return(
            <div>
                <h1>Todo List </h1>
                <input type='text'
                    placeholder='Add Todo'
                    ref={(input) => this.input = input}
                />
                <button onClick={this.addItem}>Add Todo </button>
                <List items={this.props.todos} toggle={this.toggleItem} remove={this.removeItem}/>
            </div>
        )
    }
}

export default connect((state) => ({
    todos: state.todos
}))(Todos);