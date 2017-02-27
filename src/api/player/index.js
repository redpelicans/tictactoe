export default class Player {
  constructor(player) {
    this.username = player;
    this.isReady = false;
  }

  unsetReady = () => (this.isReady = false);

  setReady = () => (this.isReady = true);
}
