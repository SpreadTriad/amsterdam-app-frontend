enum Environment {
  Development,
  Acceptance,
  Production,
}

type EnvironmentConfig = {
  allowClearingAsyncStorage: Boolean
  apiUrl: string
  bulkyWasteFormUrl: string
  name: 'development' | 'acceptance' | 'production'
  signalsBaseUrl: string
}

const environments: Record<Environment, EnvironmentConfig> = {
  [Environment.Development]: {
    allowClearingAsyncStorage: true,
    apiUrl: 'http://localhost:8000/api/v1',
    bulkyWasteFormUrl:
      'https://formulieren.amsterdam.nl/TriplEforms/Directregelen/formulier/nl-NL/evAmsterdam/grofafval.aspx',
    name: 'development',
    signalsBaseUrl: 'https://acc.app.meldingen.amsterdam.nl',
  },
  [Environment.Acceptance]: {
    allowClearingAsyncStorage: false,
    apiUrl: 'https://api.backend.luscinia-solutions.com/api/v1',
    bulkyWasteFormUrl:
      'https://formulieren.amsterdam.nl/TriplEforms/Directregelen/formulier/nl-NL/evAmsterdam/grofafval.aspx',
    name: 'acceptance',
    signalsBaseUrl: 'https://acc.app.meldingen.amsterdam.nl',
  },
  [Environment.Production]: {
    apiUrl: 'https://api.backend.luscinia-solutions.com/api/v1',
    allowClearingAddress: false,
    bulkyWasteFormUrl:
      'https://formulieren.amsterdam.nl/TriplEforms/Directregelen/formulier/nl-NL/evAmsterdam/grofafval.aspx',
    name: 'production',
    signalsBaseUrl: 'https://app.meldingen.amsterdam.nl',
  },
}

export const getEnvironment = () => {
  return environments[environment]
}

const environment: Environment = Environment.Acceptance
