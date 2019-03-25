import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ScreeningProfile, IScreeningProfileHttpResponse } from '../models/ScreeningProfiles';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getProfiles(): Observable<ScreeningProfile[]> {
    return this.http.get(`${environment.host}/api/screeningProfiles`).pipe(
      map((response: { results: IScreeningProfileHttpResponse[] }) =>
        response.results.map(item => new ScreeningProfile(item)))
    );
  }
}
