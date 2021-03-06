import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton';
import {Link} from 'react-router'
import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
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
        <List>
        { games.map((game) => {
            return <ListItem
              style={{width: '15%'}}
              key={ game._id }
              primaryText={ `${ game.createdBy.name }'s Game` }
              leftAvatar={<Avatar src={ game.createdBy.avatar }/> }
              rightToggle={
                  <Link to={ `/game/${game._id}` }>
                    <FlatButton label="Join" />
                  </Link>
                } />
              })}
        </List>
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
