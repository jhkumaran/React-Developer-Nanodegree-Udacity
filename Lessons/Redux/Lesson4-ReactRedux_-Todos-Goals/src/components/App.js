import React from 'react';
import Goals from './Goals';
import Todos from './Todos';
import { handleInitialData } from '../actions/shared';
import { connect } from 'react-redux';

class App extends React.Component {
  componentDidMount(){
      const { dispatch } = this.props;
      dispatch(handleInitialData());               
  }
  render(){
      if(this.props.loading){
          return <h3>loading</h3>
      }
      return (
          <div>
              APP
              <Todos/>
              <Goals/>
          </div>
      )
  }
}
export default connect((state) => ({
  loading: state.loading
}))(App);
