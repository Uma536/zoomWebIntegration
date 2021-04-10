import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { from, Observable, throwError, BehaviorSubject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ZoomIntegrationService {
  constructor(private httpClient: HttpClient) {}
  zoomData = new BehaviorSubject<any>({});
  zommgetdata: any;
  apiBaseUrl = environment.apiBaseUrl;

  createtingMeetingApi(body: any) {
    const options = {responseType: 'text' as 'json'};
    const bodyString = JSON.parse(JSON.stringify(body || null ));
    return this.httpClient.post(`${this.apiBaseUrl}createmeeting`, bodyString, options).
        pipe(
           map((data: any) => {
            this.zoomData.next(data);
             // tslint:disable-next-line:align
             return data;
           }), catchError( error => {
             return throwError( 'Something went wrong!' );
           })
        );
    }

    // getMeetingDetails(){
    // return this.zoomData.next( this.zommgetdata);
    // }

}
