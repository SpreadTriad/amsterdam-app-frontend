export enum Environment {
  acceptance = 'Acceptance',
  custom = 'Custom',
  development = 'Development',
  production = 'Production',
}

export type EnvironmentConfig = {
  apiUrl: string
  atlasUrl: string
  bulkyWasteFormUrl: string
  modulesApiUrl: string
  signalsBaseUrl: string
}

enum ApiUrls {
  apiAcc = 'https://api-test-backend.luscinia-solutions.com/api/v1',
  apiCustomDefault = 'http://localhost:8000/api/v1',
  apiDev = 'https://api-dev-backend.luscinia-solutions.com/api/v1',
  apiProd = 'https://api-backend.luscinia-solutions.com/api/v1',
  modulesApiAcc = 'https://api-test-modules.luscinia-solutions.com/api/v1',
  modulesApiCustomDefault = 'http://localhost:9000/api/v1',
  modulesApiDev = 'https://api-dev-modules.luscinia-solutions.com/api/v1',
  modulesApiProd = 'https://api-modules.luscinia-solutions.com/api/v1',
}

enum ExternalApiUrls {
  atlasProd = 'https://api.data.amsterdam.nl/atlas',
  bulkyWasteFormProd = 'https://formulieren.amsterdam.nl/TriplEforms/Directregelen/formulier/nl-NL/evAmsterdam/grofafval.aspx',
  signalsBaseAcc = 'https://acc.app.meldingen.amsterdam.nl',
  signalsBaseProd = 'https://app.meldingen.amsterdam.nl',
}

export const environments: Record<Environment, EnvironmentConfig> = {
  [Environment.development]: {
    apiUrl: ApiUrls.apiDev,
    atlasUrl: ExternalApiUrls.atlasProd,
    bulkyWasteFormUrl: ExternalApiUrls.bulkyWasteFormProd,
    modulesApiUrl: ApiUrls.modulesApiDev,
    signalsBaseUrl: ExternalApiUrls.signalsBaseAcc,
  },
  [Environment.acceptance]: {
    apiUrl: ApiUrls.apiAcc,
    atlasUrl: ExternalApiUrls.atlasProd,
    bulkyWasteFormUrl: ExternalApiUrls.bulkyWasteFormProd,
    modulesApiUrl: ApiUrls.modulesApiAcc,
    signalsBaseUrl: ExternalApiUrls.signalsBaseAcc,
  },
  [Environment.production]: {
    apiUrl: ApiUrls.apiProd,
    atlasUrl: ExternalApiUrls.atlasProd,
    bulkyWasteFormUrl: ExternalApiUrls.bulkyWasteFormProd,
    modulesApiUrl: ApiUrls.modulesApiProd,
    signalsBaseUrl: ExternalApiUrls.signalsBaseProd,
  },
  [Environment.custom]: {
    apiUrl: ApiUrls.apiCustomDefault,
    atlasUrl: ExternalApiUrls.atlasProd,
    bulkyWasteFormUrl: ExternalApiUrls.bulkyWasteFormProd,
    modulesApiUrl: ApiUrls.modulesApiCustomDefault,
    signalsBaseUrl: ExternalApiUrls.signalsBaseAcc,
  },
}

export const getEnvironment = (
  environment: Environment,
  custom: Partial<EnvironmentConfig> = {},
) => {
  if (environment === Environment.custom) {
    return {...environments[environment], ...custom}
  }

  return environments[environment]
}
