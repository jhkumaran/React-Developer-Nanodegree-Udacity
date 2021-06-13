import React, { Component } from 'react';
import './dropdown.css';

class UsersDropdown extends Component {
  constructor(props){
    super(props);
    this.itemsRef = React.createRef();
  }
  state = {
    items: this.props.items || [],
    showItems: false,
    selectedItem: this.props.selectedItem
  };

  componentDidUpdate(prevProps){
    if(this.props.items !== prevProps.items){
      this.setState({ items: this.props.items });
    }
  }

  toggleShow = (e) => {
    if(this.itemsRef !== null && this.itemsRef.current.contains(e.target) && this.state.showItems){
      this.setState(prevState => ({
        showItems: false
      }));
    }
    else{
      this.setState(prevState => ({
        showItems: !prevState.showItems
      }));
    }
  };

  selectItem = item => {
    this.setState({
      selectedItem: item,
      showItems: false
    }, () => {
      this.props.handleChange(this.state.selectedItem);
    });
  };

  showPlaceHolder = () => {
    return (
      <div className='placeHolder'>
        Select User
      </div>
    )
  }

  render() {
    return (
      <div className='select-box--box'>
        <div className='select-box--container' onClick={(e) => this.toggleShow(e)}>
          <div className='select-box--selected-item'>
            {this.state.selectedItem !== undefined ? this.state.selectedItem.name : this.showPlaceHolder()}
          </div>
          <div className='select-box--arrow'>
            <span
              className={`${
                this.state.showItems
                  ? 'select-box--arrow-up'
                  : 'select-box--arrow-down'
              }`}
            />
          </div>

          <div ref={this.itemsRef}
            className={`select-box--items ${this.state.showItems? 'show' :''}`}
          >
            {this.state.items.map(item => (
              <div
                key={item.id}
                onClick={() => this.selectItem(item)}
                className={this.state.selectedItem === item ? 'selected' : ''}
              >
                <div className='select-box--item'>
                  <img src={item.avatarURL}
                    alt={`Avatar of ${item.name}`}
                    className='avatar'/>
                  <div className='name'>{item.name}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default UsersDropdown;
