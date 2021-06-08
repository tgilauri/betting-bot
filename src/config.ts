import {config as loadEnv} from 'dotenv'

loadEnv();

export const getEnvVar = (varName: string) => {
  return process.env[varName];
}

export const config = {
  LOG_LEVEL: getEnvVar('LOG_LEVEL')
}
