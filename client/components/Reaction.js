import React, {Component} from 'react'
import {connect} from 'react-redux'
import saveGame from '../actions/update-game'
import './Reaction.sass'

class Reaction extends Component {
  constructor() {
    super();
    this.state = { React: false };
  }

  componentDidMount() {
    var thiz = this;

    setTimeout(function () {
      thiz.setState({ React: true });
    }, Math.random()*7000);
  }

getReactionTime(event) {
  let reactionTime = localStorage.setItem('reactDate', Date.now());
  let reactionTime2 = localStorage.getItem('reactDate');
  console.log(reactionTime2);
}

getCreate(event) {
  let create = localStorage.setItem('createDate', Date.now());
  let create2 = localStorage.getItem('createDate');
  console.log(create2);
}



  render() {
    let content = <div className="Ready"> 'Get READY to click!' </div>;
    let start = this.getCreate.bind(this)
    let reaction = this.getReactionTime.bind(this)
// ik heb dit getypt en hij doet iets
    const {timePlayer} = (localStorage.getItem('reactDate') - localStorage.getItem('createDate')).saveGame

    if (this.state.React) {
      content = <img className="React-button" src = 'https://s3-us-west-2.amazonaws.com/chicagoview/icons/react-logo.png'
                onClick={reaction} onLoad={start} />;
    }
    return (
      <div>
        <div className="Random">
          {content}
        </div>
        <div className="time" >
        Reaction time: {timePlayer} ms
        </div>
      </div>
      );
  }
};

const mapStateToProps = (state) => {
  return {
    timePlayer: state.currentUser.timePlayer,
  }
}

export default connect(mapStateToProps, { saveGame })(Reaction)
