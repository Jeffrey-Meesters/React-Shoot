import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
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
  }, Math.random()*6000);
}

componentDidUpdate(){
  const { game } = this.props
  console.log(game.players[0].reactionTime, game)
  console.log(game.players[1].reactionTime, game)
}
getCreateLogo(Event) {
  event.preventDefault()
  const { saveGame, game } = this.props
  let startedAt = Date.now()
  saveGame(game, {startedAt: startedAt })
}

otherPlayer(){
  const { currentPlayer, game } = this.props
  return game.players.filter((player) => {
    return player._id !== currentPlayer._id
  })[0]
}
getReaction(Event) {
  event.preventDefault()
  const { saveGame, game, currentPlayer } = this.props
  let reaction = Date.now() - game.startedAt
  const player2 = this.otherPlayer.bind(this)()

  !player2 ?
    saveGame(game, {players: [Object.assign({}, currentPlayer, { reactionTime: reaction })]}) :
    saveGame(game, {players: [player2].concat(Object.assign({}, currentPlayer, { reactionTime: reaction }))})
}


render() {
  const { currentPlayer,  game } = this.props
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
      Reaction time: {currentPlayer.reactionTime} ms
      </div>
    </div>
    );
  }
};

Reaction.propTypes = {
  game: PropTypes.object.isRequired,
  currentPlayer: PropTypes.object.isRequired,
}


export default connect(null, { saveGame })(Reaction)
