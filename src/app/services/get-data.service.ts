import { Injectable } from '@angular/core';
import { ApiRequestService } from './api-request.service';

@Injectable({
  providedIn: 'root'
})
export class GetDataService {

  constructor(private api: ApiRequestService) { }

  getSummary(){
    return this.api.get('summary')
  }

  getDateWiseCountryData(country: string, status: string){
    return this.api.get(`total/country/${country}/status/${status}`)
  }
}
