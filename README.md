# FeathersJS + React + Webpack

## About

This project uses [Feathers](http://feathersjs.com). An open source web framework for building modern real-time applications.

## Getting Started

Getting up and running is as easy as 1, 2, 3.

1. Make sure you have [NodeJS](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed.
2. Install your dependencies

    ```
    cd path/to/project; npm install
    ```

3. Start your app

    ```
    npm start
    ```

## Testing

Simply run `npm test` and all your tests in the `test/` directory will be run.

## Scaffolding

Feathers has a powerful command line interface. Here are a few things it can do:

```
$ npm install -g feathers-cli             # Install Feathers CLI

$ feathers generate service               # Generate a new Service
$ feathers generate hook                  # Generate a new Hook
$ feathers generate model                 # Generate a new Model
$ feathers help                           # Show all commands
```

## Help

For more information on all the things you can do with Feathers visit [docs.feathersjs.com](http://docs.feathersjs.com).

----------------------------------------------------------------------------------------------------------------------------

#React Shooter

##Codaisseur week 6 - RealTime web with websockets

This week was about learning to use **React** in combination with:
- FeathersJs
- WebPack
- Redux

We were set-up with a starter-kit which include the above and user authentication.
On that we created our 2 player React Shooter app.

##The app

In our app you can create a game and join a game.
Once you joined a game an image gets rendered between 0 and 7 seconds.
You need to click on that image to have an reactiontime calculated.
The actual reactiontime has a delay of 100 to 200 miliseconds.


**Ready to click?**

![Image of GetReady]
(http://res.cloudinary.com/debyt5msz/image/upload/v1479894916/Schermafbeelding_2016-11-23_om_10.53.39_zzza4x.png)


**Click!**

![Image of Ready]
(http://res.cloudinary.com/debyt5msz/image/upload/v1479894998/Schermafbeelding_2016-11-23_om_10.54.25_xjinyg.png)

##The code of the Reaction component

```javascript
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
  let content = <div className="Ready"> Get ready to shoot! </div>;

// at state of React = true render the image content with onLoad and onClick
  if (this.state.React) {
    content = <img className="React-button" src = 'https://s3-us-west-2.amazonaws.com/chicagoview/icons/react-logo.png'
            onLoad={this.getCreateLogo.bind(this)}  onClick={this.getReaction.bind(this)}/>;
  }

  return (
    <div className="reaction">
    < img className="player-left" src = 'http://previews.123rf.com/images/antonbrand/antonbrand1402/antonbrand140200020/25989139-Cartoon-cowboy-drawing-guns-Isolated-on-white-Stock-Vector.jpg' />
      <div className="Random"><br/>
        {/*this is where the the content gets rendered (? text : image)  */}
        {content}<br/><br/>
      </div>
      <div className="time" >
        {/* render reaction time and name of player 1 and player 2*/}
        Reaction time {game.players[0] ? game.players[0].name : 'Waiting for player...'}: { game.p1Reaction } ms <br/>
         {game.players[1] ? `Reaction time ${game.players[1].name}: ${game.p2Reaction} ms` : 'Waiting for player...'}
      </div>
      <div className="winner">
      Winning time is: {game.p2Reaction > game.p1Reaction ? game.p1Reaction : game.p2Reaction}<br/>

      </div>Great job cowboy!<br/>
      < img className="player-right" src = 'http://previews.123rf.com/images/antonbrand/antonbrand1302/antonbrand130200018/18169122-Rugged-handsome-wild-west-cowboy-in-a-huge-hat-standing-poised-ready-to-draw-his-guns-in-a-gunfight--Stock-Vector.jpg' />
    </div>
    );
  };
}

Reaction.propTypes = {
  game: PropTypes.object.isRequired
}


export default connect(null, { saveGame })(Reaction)
```
#Confession to be made:
Allthough I love the concept of React I (Jeffrey) found it very hard to use it in this way (fullstack with FeathersJs).
I'd like to showcase this project here to show that I've worked with it, but I have a long way to go to fully understand this. From this project I learned that I understand the basic programming language (JavaScript) and make that work, but I needed a lot of help from @stofstik and @giuliogallerini to make it work as it does now.
