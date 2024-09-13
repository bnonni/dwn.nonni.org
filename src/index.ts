import packageJson from '../package.json' assert { type: 'json' };
import { DwnServer } from '@web5/dwn-server';
import bytes from 'bytes';

const server = new DwnServer({
  config : {
    serverName                            : packageJson.name,
    baseUrl                               : process.env.DWN_BASE_URL || 'http://localhost:8080',
    port                                  : parseInt('8080'),
    ttlCacheUrl                           : process.env.DWN_TTL_CACHE_URL || 'sqlite://',
    packageJsonPath                       :  process.env.npm_package_json ||  process.env.DWN_SERVER_PACKAGE_JSON || '/dwn-server/package.json',
    maxRecordDataSize                     : bytes(process.env.MAX_RECORD_DATA_SIZE || '1gb'),
    webSocketSupport                      : { on: true, off: false }[process.env.DS_WEBSOCKET_SERVER] ?? true,
    eventStreamPluginPath                 : process.env.DWN_EVENT_STREAM_PLUGIN_PATH,
    messageStore                          : process.env.DWN_STORAGE_MESSAGES || process.env.DWN_STORAGE || 'level://data',
    dataStore                             : process.env.DWN_STORAGE_DATA || process.env.DWN_STORAGE || 'level://data',
    eventLog                              : process.env.DWN_STORAGE_EVENTS || process.env.DWN_STORAGE || 'level://data',
    resumableTaskStore                    : process.env.DWN_STORAGE_RESUMABLE_TASKS || process.env.DWN_STORAGE || 'level://data',
    registrationStoreUrl                  : process.env.DWN_REGISTRATION_STORE_URL || process.env.DWN_STORAGE,
    registrationProofOfWorkSeed           : process.env.DWN_REGISTRATION_PROOF_OF_WORK_SEED,
    registrationProofOfWorkEnabled        : process.env.DWN_REGISTRATION_PROOF_OF_WORK_ENABLED === 'true',
    registrationProofOfWorkInitialMaxHash : process.env.DWN_REGISTRATION_PROOF_OF_WORK_INITIAL_MAX_HASH,
    termsOfServiceFilePath                : process.env.DWN_TERMS_OF_SERVICE_FILE_PATH,

    logLevel : process.env.DWN_SERVER_LOG_LEVEL || 'INFO',
  }
});
server.start();