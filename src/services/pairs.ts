import strSim from "string-similarity";
import {logger} from "./logger";
import {Company, ForkPair, Member, Pair, Pairs} from "../types";
import {MAX_BID, MIN_MATCH_RATING, MIN_MATCH_THRESHOLD} from "../constants";
import {prepareFullName} from "./utils";

export const createPair = (company: Company, fullName: string, prices: number[]): Pair => {
  const names = fullName.split(' - ').map(name => name.trim());

  const [firstName, secondName] = names;
  const [firstPrice, secondPrice] = prices;
  const firstMember = {
    name: firstName,
    price: firstPrice,
    company: company
  };

  const secondMember = {
    name: secondName,
    price: secondPrice,
    company: company
  }

  const [smaller, bigger] = [firstMember, secondMember].sort((a, b) => (a.price < b.price ? -1 : 1));

  return {
    fullName,
    members: {
      smaller,
      bigger
    }
  } as Pair;
}

export const isForkExists = (price1: number, price2: number) => {
  return ((1 / price1) + (1 / price2)) < 1;
}

export const findForkPair = (firstPair: Pair, secondPair: Pair): ForkPair | undefined => {
  const {smaller: firstBetSmaller, bigger: firstBetBigger} = firstPair.members;
  const {smaller: secondBetSmaller, bigger: secondBetBigger} = secondPair.members;

  if (isForkExists(firstBetSmaller.price, secondBetBigger.price)) {
    return {
      smaller: firstBetSmaller,
      bigger: secondBetBigger
    }
  }
  if (isForkExists(secondBetSmaller.price, firstBetBigger.price)) {
    return {
      smaller: secondBetSmaller,
      bigger: firstBetBigger
    }
  }
}

export const findPairName = (pair: Pair, pairsToFindMatch: string[]): string => {
  const possibleMatches = Object.values(pair.members)
      .map(member => {
        return strSim.findBestMatch(member.name, pairsToFindMatch);
      })
      .sort((a, b) => a.bestMatch.rating > b.bestMatch.rating ? -1 : 1);

  if (possibleMatches.length > 0) {
    const minMatch = possibleMatches[possibleMatches.length - 1];

    if (minMatch.bestMatch.rating > MIN_MATCH_THRESHOLD) {
      return possibleMatches.find(match => match.bestMatch.rating >= MIN_MATCH_RATING)?.bestMatch.target;
    }
  }
}

export const getMinBid = (smallerPriceMember: Member, biggerPriceMember: Member) => {
  return (smallerPriceMember.price * MAX_BID) / biggerPriceMember.price;
}

export const createForkPair = (smallerPriceMember: Member, biggerPriceMember: Member, minBid: number) => {
  return {
    minBid,
    smallerBid: {
      bid: minBid,
      name: biggerPriceMember.name,
      company: biggerPriceMember.company,
    },
    biggerBid: {
      bid: MAX_BID,
      name: smallerPriceMember.name,
      company: smallerPriceMember.company,
    }
  }

}


export const getForks = (firstBetPairs: Pairs, secondBetPairs: Pairs) => {
  const secondBetPairsNames = Object.keys(secondBetPairs).map(prepareFullName);

  return Object.values(firstBetPairs).reduce((result, firstBetPair) => {
    const secondBetPairName = findPairName(firstBetPair, secondBetPairsNames);

    if (secondBetPairName) {
      const secondBetPair = secondBetPairs[secondBetPairName];

      const forkPair = findForkPair(firstBetPair, secondBetPair);

      if (forkPair) {
        const minBid = getMinBid(forkPair.smaller, forkPair.bigger);
        result[firstBetPair.fullName] = createForkPair(forkPair.smaller, forkPair.bigger, minBid);
      }
    }

    return result;
  }, {});
}

export const logPairs = (label: string, pairs: Pairs) => {
  logger.info(`======== ${label} PAIRS ========`);
  logger.info(`Total amount: ${Object.keys(pairs).length}`);

  Object.values(pairs).forEach(pair => {
    logger.info('pair name: ', pair.fullName);
    console.table(pair.members);
  })
}
