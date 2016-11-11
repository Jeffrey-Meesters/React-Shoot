import BaseModel from 'feathersjs-redux-model/build/models/base-model'
import feathers from 'feathers-client'

class GameModel extends BaseModel {
  defaults() {
    return {
      players: [],
      started: false,
      winner: null,
      startedAt: Date.now,
      createdAt: Date.now,
      updatedAt: Date.now,
      draw: false,
      reactionTime: [],
    };
  }

  findParams() {
    return {
      query: {
        $sort: { createdAt: -1 },
        $limit: 10
      }
    };
  }

  constructor(dispatch, onError) {
    super('game', dispatch, onError);
    this.app.configure(feathers.authentication({
      type: 'local',
      storage: window.localStorage,
    }))
  }
}

const gameModel = new GameModel()

export default gameModel
