import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'
import {Link} from 'react-router'
import setUpGames from '../actions/setup-games'
import createGame from '../actions/create-game'

class Lobby extends Component {
  componentDidMount() {
    this.props.setUpGames()
  }

  render() {
    const { games, signedIn, createGame } = this.props

    return (
      <div className="lobby">
        <RaisedButton label="Create Game" primary={ true } onClick={ createGame } />
        <ol>
          { games.map((game) => {
            return <li key={ game._id }>{ game._id } Game by: <Link className="Game" to={`/game/${game._id}`}>{game.createdBy && game.createdBy.name} ({game.createdAt})
            </Link></li>
          })}
        </ol>
      </div>
    )
  }
}

Lobby.propTypes = {
  games: PropTypes.array.isRequired,
}

const mapStateToProps = (state) => {
  return {
    games: state.games,
  }
}

export default connect(mapStateToProps, { setUpGames, createGame })(Lobby)
