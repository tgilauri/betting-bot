import puppeteer from 'puppeteer';
import {pages} from "./config/pages";
import {Companies} from "./types";
import {getForks} from "./services/pairs";
import {getPairsForPage} from "./services/browser";
import {parseFonbetTennisPairs} from "./parsers/fonbet";
import {parseMarathonTennisPairs} from "./parsers/marathon";
import {logger} from "./services/logger";

const parseFonbetPairs = getPairsForPage(parseFonbetTennisPairs);
const parseMarathonPairs = getPairsForPage(parseMarathonTennisPairs);

async function main() {

  const browser = await puppeteer.launch({
    headless: false,
    timeout: 0
    //args: ['--proxy-server=socks5://127.0.0.1:9052']
  });

  const [marathonPairs, fonbetPairs] = await Promise.all([
    parseMarathonPairs(browser, pages[Companies.MARATHON].tennis),
    parseFonbetPairs(browser, pages[Companies.FONBET].tennis)
  ]);

  logger.info(`marathon pairs: ${Object.keys(marathonPairs).length}`);
  logger.info(`fonbet pairs: ${Object.keys(fonbetPairs).length}`);

  //logPairs('MARATHON', marathonPairs);
  //logPairs('FONBET', fonbetPairs);

  browser.close();

  const forks = getForks(marathonPairs, fonbetPairs);

  console.log(Object.values(forks));
}

main();
