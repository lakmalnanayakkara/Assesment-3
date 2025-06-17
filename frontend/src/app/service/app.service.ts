import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(private http: HttpClient) {}

  signInUser(data: any): Observable<any> {
    return this.http.post('https://localhost:7159/api/app/login', data);
  }

  saveUserLocations(locations: any[]): Observable<any> {
    return this.http.post(
      'https://localhost:7159/api/app/save-user-locations',
      locations
    );
  }
}
