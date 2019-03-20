import { uuidv4, mapByIds } from 'utils/common';

const Normalize = {
  getListPlayers(response) {
    const avatars = response.playerAvatars.split(',')
    const birthYears = response.playerBirthYears.split(',');
    const levels = response.playerLevels.split(',');
    const items = response.data.split(',').map((name, index) => ({
      id: index,
      name,
      avatar: Number(avatars[index] - 1) + '.png',
      birthYear: birthYears[index],
      topic: levels[index]
    }));

    return {
      byId: mapByIds(items),
      allIds: items.map(item => item.id)
    };
  }
}

export default Normalize;