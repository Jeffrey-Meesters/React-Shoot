import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import saveGame from '../actions/update-game'
import './Reaction.sass'

class Reaction extends Component {
// before mounting occurs set state of React to false
componentWillMount(){
  this.setState({ React: false })
}
// component mounted after max 7 sec set React to true
componentDidMount() {
  var thiz = this;

  setTimeout(function () {
    thiz.setState({ React: true });
  }, Math.random()*7000);
}

// everytime the game saves the component gets updated
componentDidUpdate(){
  const { game } = this.props

}

// as soon as the image renders store that time in p1Start or p2Start
getCreateLogo(event) {
  event.preventDefault()
  const { saveGame, game } = this.props
  const now = new Date().getTime()
  if(this.isPlayerOne()){
    saveGame(game, {p1Start: now })
  } else {
    saveGame(game, {p2Start: now })
  }
}

// defining player one
isPlayerOne(){
  const { game, currentUser } = this.props
  return game.players[0].userId === currentUser._id
}

// as soon as the image is clicked on store that time in p1Reaction or p2Reaction
getReaction(event) {
  event.preventDefault()
  const { saveGame, game } = this.props
  const now = new Date().getTime()
  if(this.isPlayerOne()){
    saveGame(game, { p1Reaction: now - game.p1Start })
  } else {
    saveGame(game, { p2Reaction: now - game.p2Start })
  }
}

render() {
  const { game, currentUser } = this.props

  // at default (state of React = false) render this content
  let content = <div className="Ready"> 'Get READY to click!' </div>;

// at state of React = true render the image content with onLoad and onClick
  if (this.state.React) {
    content = <img className="React-button" src = 'https://s3-us-west-2.amazonaws.com/chicagoview/icons/react-logo.png'
            onLoad={this.getCreateLogo.bind(this)}  onClick={this.getReaction.bind(this)} />;
  }

  return (
    <div>
      <div className="Random">
        {/*this is where the the content gets rendered (? text : image)  */}
        {content}
      </div>
      <div className="time" >
        {/* render reaction time and name of player 1 and player 2*/}
        Reaction time {game.players[0] ? game.players[0].name : 'Waiting for player...'}: { game.p1Reaction } ms <br/>
        Reaction time {game.players[1] ? game.players[1].name : 'Waiting for player...'}: { game.p2Reaction } ms
      </div>
      <div className="winner">
      winner is: {game.p2Reaction > game.p1Reaction ? game.players[1].name : game.players[0].name }
      </div>
    </div>
    );
  };
}

Reaction.propTypes = {
  game: PropTypes.object.isRequired
}


export default connect(null, { saveGame })(Reaction)
