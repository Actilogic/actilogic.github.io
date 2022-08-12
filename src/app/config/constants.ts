// Angular Modules
import { Injectable } from '@angular/core'; @Injectable()
export class Constants {
    public readonly API_ENDPOINT: string = 'domain/api';
    public readonly API_MOCK_ENDPOINT: string = 'mock-domain/api';

    public readonly fuelWatchURL: string = "https://www.fuelwatch.wa.gov.au/fuelwatch/fuelWatchRSS?";
    public readonly CORS_PROXY: string = "https://cors-anywhere.herokuapp.com/";
}