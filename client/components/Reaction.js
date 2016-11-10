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

  render() {
    let content = <div className="Ready"> 'READY?!' </div>;

    if (this.state.React) {
      content = <img className="React-button" src = 'https://s3-us-west-2.amazonaws.com/chicagoview/icons/react-logo.png' />;
    }
    return (
      <div >{content}</div>
    );
  }
};


export default Reaction
