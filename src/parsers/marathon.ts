import {CheerioAPI} from "cheerio";
import {Pairs, Parser} from "../types";
import {createPair} from "../services/pairs";
import {prepareFullName} from "../services/utils";

export const parseMarathonTennisPairs: Parser = async ($: CheerioAPI): Promise<Pairs> => {
  const pairs = {};
  $('.coupon-row').each(function () {
    const fullName = prepareFullName($(this).data('eventName') as string);

    const prices = $(this).find(".price[data-market-type='RESULT_2WAY']")
        .map(function () {
          return +($(this).find("[data-selection-price]")
              .first()
              .data('selectionPrice'));
        }).get();

    pairs[fullName] = createPair('marathon', fullName, prices);
  });
  return pairs;
}
