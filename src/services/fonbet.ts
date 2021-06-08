import {CheerioAPI} from "cheerio";
import {Pair, Pairs, Parser} from "../types";

export const parseFonbetTennisPairs: Parser = async ($: CheerioAPI): Promise<Pairs> => {
  const pairs = {};
  $("[class|='sport-base-event']").each(function () {
    const link = $(this).find('a');

    if (!link.length || !link?.text()?.length) {
      return;
    }

    const fullName = link.text() as string;
    const membersNames = fullName
        .replace(/[\u2013\u2014]/g, "-")
        .split('-')
        .map(name => name.trim());
    const membersPricesElements = $(this)
        .find("[class*='table-component-factor-value_single']:not([class*='_empty'])")
        .slice(0, 2);
    const membersPrices = membersPricesElements
        .map(function () {
          return +$(this).text()
        }).get();

    pairs[fullName] = {
      fullName,
      members: {
        first: {
          name: membersNames.shift(),
          price: membersPrices.shift(),
          company: 'fonbet'
        },
        second: {
          name: membersNames.shift(),
          price: membersPrices.shift(),
          company: 'fonbet'
        }
      }
    } as Pair;
  });
  return pairs;
}
