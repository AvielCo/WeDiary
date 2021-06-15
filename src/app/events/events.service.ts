import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Event } from './event.model';

@Injectable({ providedIn: 'root' })
export class EventsService {
  private readonly url = 'http://localhost:8080/api/event';
  constructor(private http: HttpClient) {}

  public postEvent(event: Event) {
    this.http.post(this.url, event, { responseType: 'text' }).subscribe(
      (res) => {
        console.log(res);
      },
      (error) => {
        if (error) {
          console.log(error);
        }
      },
      () => {}
    );
  }

  fetchEvents() {
    this.http.get(this.url).subscribe((res) => {
      console.log(res);
    });
  }
}
