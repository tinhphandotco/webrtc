import request from '../Request';
import Normalize from './Normalize';

const PlayerAPI = {
  getListPlayers(params) {
    return request()
      .get('/getPlayerData', { params })
      .then(response => response.data && Promise.resolve(Normalize.getListPlayers(response.data)))
      .catch(Promise.reject);
  }
};

export default PlayerAPI;