import model from '../models/game-model'

export default () => {
  console.log('bla')
  return (dispatch) => {
    model.dispatch = dispatch
    model.app.authenticate()
      .then((response) => {
        model.create()
      }).catch((error) => {
        console.error(error)
        dispatch(signOutUser())
      })
  }
}
