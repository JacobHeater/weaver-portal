import { ApiVersion } from './api-version';
import {
  Client,
} from '../../../../weaver-common/src/common/client';
import request from 'request-promise-native';

export class ApiManager {

  public get url(): string {
    return `${this._baseUrl}/api/v${ApiVersion[this._version]}`;
  }

  private _baseUrl: string;
  private _version: ApiVersion;
  constructor(baseUrl: string, version: ApiVersion = ApiVersion.V1) {
    this._version = version;
    this._baseUrl = baseUrl;
  }

  public async getConnectedClients(): Promise<Client[]> {
    const url = `${this.url}/clients`;
    const response = (await request.get(url)) as Client[];

    return response;
  }
}
