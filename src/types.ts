import {CheerioAPI} from "cheerio";

export const Sports = {
  TENNIS: 'tennis',
} as const;

export const Companies = {
  MARATHON: 'marathon',
  FONBET: 'fonbet',
} as const;

export type Pages = Record<Company, SportConfig>

export type Sport = (typeof Sports)[keyof typeof Sports];

export type Company = (typeof Companies)[keyof typeof Companies];

export type SportConfig = Record<Sport, CompanySportConfig>;

export interface CompanySportConfig {
  url: string;
  options: ParseOptions;
}

export interface ParseOptions {
  skipPairs?: boolean
}

export type Pairs = Record<string, Pair>;

export interface Pair {
  fullName: string;
  members: {
    first: Member
    second: Member;
  }
}

export interface Member {
  name: string;
  price: number;
  company: Company;
}

export interface Ellipsis {
  content: {
    text: string
  }
}

export type Parser = ($: CheerioAPI) => Promise<Pairs>;
