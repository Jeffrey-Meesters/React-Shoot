import React, {Component} from 'react'
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
    }, Math.random()*5000);
  }

getReactionTime(event) {
  let reactionTime = Date.now();
  console.log(reactionTime);
  return reactionTime;
}

getCreate(event) {
  let create = Date.now();
  console.log(create);
  return create;

}

reactionTimePlayer() {
  let timePlayer = getReactionTime() - getCreate();
  console.log(timePlayer);
  return timePlayer;
}

  render() {
    let content = <div className="Ready"> 'READY?!' </div>;

    if (this.state.React) {
      content = <img className="React-button" src = 'https://s3-us-west-2.amazonaws.com/chicagoview/icons/react-logo.png'
                onClick={this.getReactionTime.bind(this)} onLoad={this.getCreate.bind(this)} />;
    }
    return (
      <div>
        <div className="Random">
          {content}
        </div>
        <div className="time" >
          Time: {this.reactionTimePlayer.bind(this)}
        </div>
      </div>
      );

  }
};


export default Reaction
