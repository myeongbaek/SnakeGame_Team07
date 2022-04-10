import MainScreen from "./MainScreen.js";

export default class App {
  constructor({ $target }) {
    this.state = {};
    this.mainScreen = new MainScreen({
      $target,
      initialState: "",
    });
  }
  setState = (nextState) => {};
}
