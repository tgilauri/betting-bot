import puppeteer from "puppeteer";
import cheerio from "cheerio";
import {logger} from "./logger";
import {CompanySportConfig, Parser} from "../types";

export const getPageContent = async (browser: puppeteer.Browser, config: CompanySportConfig) => {
  logger.debug('Getting content form page')
  const page = await browser.newPage();

  await page.goto(config.url, {
    waitUntil: 'networkidle0',
  });

  const content = await page.content();

  page.close();

  return content;
}

export const getPairsForPage = (parser: Parser) => async (browser: puppeteer.Browser, config: CompanySportConfig) => {
  const {options} = config;

  let content = '';
  try {
    content = await getPageContent(browser, config);
  } catch (e) {
    console.error(e.message);
    console.error('Error while loading page. Exit');
    process.exit(1);
  }

  const $ = cheerio.load(content);

  let result = await parser($);

  if (options?.skipPairs) {
    for (const key in result) {
      if (result.hasOwnProperty(key)) {
        if (key.includes('/')) {
          delete result[key];
        }
      }
    }
  }

  return result;
}
