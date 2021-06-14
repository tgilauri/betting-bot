import {createPair, findPairName, findForkPair, isForkExists} from "./pairs";
import {Pair} from "../types";

describe('#isForkExists', () => {
  it('should correctly indicate that fork exists', () => {
    expect(isForkExists(5.4, 2.1)).toBeTruthy();
    expect(isForkExists(5.0, 2)).toBeTruthy();
  })
})

describe('#findForkPair', () => {
  it('should correctly find fork', () => {
    const firstCompany = 'fonbet';
    const firstPrices = [5.4, 2.1];
    const firstFullName = 'федеррер - андреев';
    const firstPair = createPair(firstCompany, firstFullName, firstPrices);

    const secondCompany = 'fonbet';
    const secondPrices = [5, 2];
    const secondFullName = 'федеррер роджер - андреев сергей';
    const secondPair = createPair(secondCompany, secondFullName, secondPrices);

    const forkPair = findForkPair(firstPair, secondPair);

    expect(forkPair).not.toBeUndefined();
  })
})


describe('#createPair', () => {
  it('should correctly create pair', () => {
    const company = 'fonbet';
    const prices = [1, 2];
    const fullName = 'bla - foo';
    const pair = createPair(company, fullName, prices);

    expect(pair.fullName).toEqual(fullName);
    expect(pair.members.smaller.name).toEqual('bla');
    expect(pair.members.bigger.name).toEqual('foo');
    expect(pair.members.smaller.price).toEqual(1);
    expect(pair.members.bigger.price).toEqual(2);
  })
})


describe('#findPairName', () => {
  it('should correctly find pair name by simple name', () => {
    const pair = <Pair>{
      fullName: 'федеррер р. - андреев с.',
      members: {
        smaller: {
          name: 'федеррер р.',
          price: 1.4,
          company: 'marathon'
        },
        bigger: {
          name: 'андреев с.',
          price: 2.6,
          company: 'marathon'
        }
      }
    }
    const pairNames = ['джокович - надаль', 'федеррер - андреев', 'сафин - паредес'];
    const pairName = findPairName(pair, pairNames);

    expect(pairName).toEqual('федеррер - андреев');
  })

  it('should correctly find pair name by complex name', () => {
    const pair = <Pair>{
      fullName: 'федеррер роджер - андреев сергей',
      members: {
        smaller: {
          name: 'федеррер роджер',
          price: 1.4,
          company: 'marathon'
        },
        bigger: {
          name: 'андреев сергей',
          price: 2.6,
          company: 'marathon'
        }
      }
    }
    const pairNames = ['джокович - надаль', 'федеррер - андреев', 'сафин - паредес'];
    const pairName = findPairName(pair, pairNames);

    expect(pairName).toEqual('федеррер - андреев');
  })

  it('should correctly find complex pair name by simple name', () => {
    const pair = <Pair>{
      fullName: 'федеррер р. - андреев с.',
      members: {
        smaller: {
          name: 'федеррер р.',
          price: 1.4,
          company: 'marathon'
        },
        bigger: {
          name: 'андреев с.',
          price: 2.6,
          company: 'marathon'
        }
      }
    }
    const pairNames = ['роберт джокович - рафаель надаль', 'роджер федеррер - сергей андреев', 'марат сафин - михаил паредес'];
    const pairName = findPairName(pair, pairNames);

    expect(pairName).toEqual('роджер федеррер - сергей андреев');
  })

  it('should correctly find complex pair name by complex name', () => {
    const pair = <Pair>{
      fullName: 'федеррер роджер - андреев сергей',
      members: {
        smaller: {
          name: 'федеррер роджер',
          price: 1.4,
          company: 'marathon'
        },
        bigger: {
          name: 'андреев сергей',
          price: 2.6,
          company: 'marathon'
        }
      }
    }
    const pairNames = ['роберт джокович - рафаель надаль', 'роджер федеррер - сергей андреев', 'марат сафин - михаил паредес'];
    const pairName = findPairName(pair, pairNames);

    expect(pairName).toEqual('роджер федеррер - сергей андреев');
  })
})
