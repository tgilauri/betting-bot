import {CheerioAPI} from "cheerio";
import {Ellipsis, Pair, Pairs, Parser} from "../types";
import {logger} from "./logger";

export const parseMarathonTennisPairs: Parser = async ($: CheerioAPI): Promise<Pairs> => {
  const pairs = {};
  $('.coupon-row').each(function () {
    const fullName = $(this).data('eventName') as string;

    const members = $(this).find("[class*='member-name'][data-ellipsis]")

    const membersNames = members.map(function () {
      let ellipsis = $(this).data('ellipsis') as Ellipsis;

      if (typeof ellipsis === 'string') {
        try {
          ellipsis = JSON.parse(ellipsis);
        } catch (e) {
          logger.error(e.message);
          return '';
        }
      }
      return ellipsis.content.text;
    }).get();

    const membersPrices = $(this).find(".price[data-market-type='RESULT_2WAY']")
        .map(function () {
          return +($(this).find("[data-selection-price]")
              .first()
              .data('selectionPrice'));
        }).get();

    pairs[fullName] = {
      fullName,
      members: {
        first: {
          name: membersNames.shift(),
          price: membersPrices.shift(),
          company: 'marathon'
        },
        second: {
          name: membersNames.shift(),
          price: membersPrices.shift(),
          company: 'marathon'
        }
      }
    } as Pair;
  });
  return pairs;
}
