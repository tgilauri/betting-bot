import {Companies, Pages, Sports} from "../types";

export const pages: Pages = {
  [Companies.MARATHON]: {
    [Sports.TENNIS]: {
      url: 'https://www.marathonbet.ru/su/popular/Tennis',
      options: {
        skipPairs: true
      }
    }
  },
  [Companies.FONBET]: {
    [Sports.TENNIS]: {
      url: 'https://www.fonbet.ru/sports/tennis',
      options: {
        skipPairs: true
      }
    }
  },
};
