import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  baseUrl: string = 'https://localhost:7159/api/app';
  constructor(private http: HttpClient) {}

  signInUser(data: any) {
    return this.http.get(this.baseUrl + 'login', data);
  }
}
