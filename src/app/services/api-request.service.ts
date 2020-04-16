import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiRequestService {

  readonly ROOT_URL;
  constructor(private http: HttpClient) { 
    this.ROOT_URL = 'https://api.covid19api.com'
  }

  get(uri: string){
    return this.http.get(`${this.ROOT_URL}/${uri}`)
  }
}
