import MainScreen from "./MainScreen.js";

export default class App {
  constructor({ $target }) {
    this.mainScreen = new MainScreen({
      $target,
    });
  }
}
