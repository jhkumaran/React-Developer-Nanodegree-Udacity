import React, { Component } from 'react'

let isMouseEntered = false;
export class StarRating extends Component {
    state = {
        stars: [
            {checked:false, value: 1},
            {checked:false, value: 2},
            {checked:false, value: 3},
            {checked:false, value: 4},
            {checked:false, value: 5}
        ],
        rating : 0
    }

    componentDidMount(){
        this.setState({ rating: this.props.rating}, () => {
            this.highlightRating(this.state.rating)
        })
    }

    mouseEnter = (index) => {
        isMouseEntered = true;
        this.highlightRating(index);
    }

    mouseLeave = () => {
        if(!isMouseEntered) return;
        isMouseEntered = false;
        this.highlightRating(this.state.rating);
    }

    mouseClick = (index) => {
        isMouseEntered = false;
        this.setState({ rating : index }, () => {
            this.highlightRating(this.state.rating);
            this.props.updateRating(this.state.rating);
        })
    }

    highlightRating = (rating) => {
        let stars = [...this.state.stars];
        stars.map((star) => star.checked = false);
        stars.filter((star) => star.value <= rating).map((s) => s.checked = true);
        this.setState({ stars : stars});
    }
    render() {
        return (
            <div style={{display: 'flex'}}
                onMouseLeave={() => this.mouseLeave()}
            >
                {
                    this.state.stars.map((star, index) => (
                        <div key={index} className={`clip-star ${star.checked ? 'checked': ''}`}
                            onMouseEnter={() => this.mouseEnter(star.value)}
                            onClick={() => this.mouseClick(star.value)}/>
                    ))
                }
            </div>
        )
    }
}

export default StarRating
