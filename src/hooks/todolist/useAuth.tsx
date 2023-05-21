import { makeAutoObservable } from 'mobx';

class Auth {
  shouldLogin: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  setShouldLoginStatus(status: boolean) {
    this.shouldLogin = status;
  }
}

export const todoListAuth = new Auth();
