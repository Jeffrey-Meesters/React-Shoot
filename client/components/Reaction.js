import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import saveGame from '../actions/update-game'
import './Reaction.sass'

class Reaction extends Component {

componentWillMount(){
  this.setState({ React: false })
}

componentDidMount() {
  var thiz = this;

  setTimeout(function () {
    thiz.setState({ React: true });
  }, Math.random()*7000);
}

componentDidUpdate(){
  const { game } = this.props
  console.log("componentDidUpdate")
  // console.log(game.players[0].reactionTime, game)
}

getCreateLogo(Event) {
  event.preventDefault()
  const { saveGame, game } = this.props
  const now = new Date().getTime()
  if(this.isPlayerOne()){
    saveGame(game, {p1Start: now })
  } else {
    saveGame(game, {p2Start: now })
  }
}

isPlayerOne(){
  const { game, currentUser } = this.props
  return game.players[0].userId === currentUser._id
}

getReaction(event) {
  event.preventDefault()
  const { saveGame, game } = this.props
  const now = new Date().getTime()
  if(this.isPlayerOne()){
    saveGame(game, { p1Reaction: now - game.p1Start })
  } else {
    console.log('Saving p2')
    saveGame(game, { p2Reaction: now - game.p2Start })
  }
}

render() {
  const { game } = this.props
  let content = <div className="Ready"> 'Get READY to click!' </div>;

  if (this.state.React) {
    content = <img className="React-button" src = 'https://s3-us-west-2.amazonaws.com/chicagoview/icons/react-logo.png'
            onLoad={this.getCreateLogo.bind(this)}  onClick={this.getReaction.bind(this)} />;
  }

  return (
    <div>
      <div className="Random">
        {content}
      </div>
      <div className="time" >
        Reaction time p1: { game.p1Reaction } ms
        Reaction time p2: { game.p2Reaction } ms
      </div>
    </div>
    );
  }
};

Reaction.propTypes = {
  game: PropTypes.object.isRequired
}


export default connect(null, { saveGame })(Reaction)
