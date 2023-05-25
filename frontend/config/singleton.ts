import { ApolloClient, NormalizedCacheObject } from '@apollo/client';

export interface SingletonAbstract {
  apolloClient?: ApolloClient<NormalizedCacheObject>
}

export class Singleton {
  static instance: SingletonAbstract = {
    apolloClient: undefined
  };

  static getInstance() {
    return Singleton.instance
  }

  static setInstance(instance: SingletonAbstract) {
    Singleton.instance = instance;
  }
}
