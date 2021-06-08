import puppeteer from 'puppeteer';
import {pages} from "./pages";
import {Companies} from "./types";
import {getForks, logPairs} from "./services/pairs";
import {getPairsForPage} from "./services/browser";
import {parseFonbetTennisPairs} from "./services/fonbet";
import {parseMarathonTennisPairs} from "./services/marathon";

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

  logPairs('MARATHON', marathonPairs);
  logPairs('FONBET', fonbetPairs);

  browser.close();

  const forks = getForks(marathonPairs, fonbetPairs);

  console.log(Object.values(forks));
}

main();
