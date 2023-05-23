export interface SingletonAbstract {
  apolloClient?: any
}

export class Singleton {
  static instance: SingletonAbstract = {
    apolloClient: null
  };

  static getInstance() {
    return Singleton.instance
  }

  static setInstance(instance: SingletonAbstract) {
    Singleton.instance = instance;
  }
}
