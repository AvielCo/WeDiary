import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Event } from '@events/event.model';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class EventsService {
  private readonly url = 'http://localhost:8080/api/event';
  constructor(private http: HttpClient) {}

  public async postEvent(event: Event) {
    return new Promise((resolve, reject) => {
      this.http.post(this.url, event, { responseType: 'text' }).subscribe(
        (res) => {
          resolve(res);
        },
        (error) => {
          if (error) {
            reject(error);
          }
        }
      );
    });
  }

  public fetchEvents() {
    return this.http.get<Event[]>(`${this.url}/all`).pipe(
      map((responseData) => {
        const eventList: Event[] = [];
        for (const key in responseData) {
          const event = responseData[key];
          eventList.push(event);
        }
        console.log(eventList);
        console.log(new Date(eventList[0].date));
        eventList.sort(
          (a: Event, b: Event) =>
            new Date(a.date).getTime() - new Date(b.date).getTime()
        );
        console.log(eventList);
        return eventList;
      })
    );
  }
}
