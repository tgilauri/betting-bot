import strSim from "string-similarity";
import {logger} from "./logger";
import {MAX_BID} from "../constants";
import {Member, Pair, Pairs} from "../types";

export const findPair = (pairs: Pairs, pairName: string, pairsToFindMatch: string[]): Pair | undefined => {
  const matchedName = strSim.findBestMatch(pairName, pairsToFindMatch).bestMatch.target;

  return pairs[matchedName];
}

export const getBiggerPriceMember = (m1: Member, m2: Member): Member => {
  return m1.price > m2.price ? m1 : m2;
}

export const getSmallerPriceMember = (m1: Member, m2: Member): Member => {
  return m1.price < m2.price ? m1 : m2;
}

export const getForks = (firstBetPairs: Pairs, secondBetPairs: Pairs) => {
  const secondBetPairsNames = Object.keys(secondBetPairs);

  return Object.values(firstBetPairs).reduce((result, pair) => {
    const {first: firstBetFirstMember, second: firstBetSecondMember} = pair.members;

    const matchedSecondBetPair = findPair(secondBetPairs, pair.fullName, secondBetPairsNames);

    if (!matchedSecondBetPair) {
      return result;
    }

    const {first: secondBetFirstMember, second: secondBetSecondMember} = matchedSecondBetPair.members;

    const isFirstBetFirstToSecondBetSecondForkExist = (1 / firstBetFirstMember.price + 1 / secondBetSecondMember.price) < 0;
    const isFirstBetSecondToSecondBetFirstForkExist = (1 / firstBetSecondMember.price + 1 / secondBetFirstMember.price) < 0;

    let biggerPriceMember;
    let smallerPriceMember;

    if (isFirstBetFirstToSecondBetSecondForkExist) {
      biggerPriceMember = getBiggerPriceMember(firstBetFirstMember, secondBetSecondMember);
      smallerPriceMember = getSmallerPriceMember(firstBetFirstMember, secondBetSecondMember);
    } else if (isFirstBetSecondToSecondBetFirstForkExist) {
      biggerPriceMember = getBiggerPriceMember(firstBetSecondMember, secondBetFirstMember);
      smallerPriceMember = getSmallerPriceMember(firstBetSecondMember, secondBetFirstMember);
    } else {
      return result;
    }

    const minBid = (smallerPriceMember.price * MAX_BID) / biggerPriceMember.price;

    result[pair.fullName] = {
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
