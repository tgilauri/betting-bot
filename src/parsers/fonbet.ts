import {CheerioAPI} from "cheerio";
import {Pairs, Parser} from "../types";
import {createPair} from "../services/pairs";
import {prepareFullName} from "../services/utils";

export const parseFonbetTennisPairs: Parser = async ($: CheerioAPI): Promise<Pairs> => {
  const pairs = {};
  $("[class|='sport-base-event']").each(function () {
    const link = $(this).find('a');

    if (!link.length || !link?.text()?.length) {
      return;
    }

    const fullName = prepareFullName(link.text() as string);
    const prices = $(this)
        .find("[class*='table-component-factor-value_single']:not([class*='_empty'])")
        .slice(0, 2)
        .map(function () {
          return +$(this).text()
        }).get();

    pairs[fullName] = createPair('fonbet', fullName, prices);
  });
  return pairs;
}
