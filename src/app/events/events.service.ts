import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Event } from 'src/models/event.model';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class EventsService {
  private readonly url = 'http://localhost:8080/api/event';
  constructor(private http: HttpClient) {}

  public async postEvent(event: Event) {
    return new Promise((resolve, reject) => {
      this.http
        .post(this.url, event, { responseType: 'text', withCredentials: true })
        .subscribe(
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
    return this.http
      .get<Event[]>(`${this.url}/all`, { withCredentials: true })
      .pipe(
        map((responseData) => {
          const eventList: Event[] = [];
          for (const key in responseData) {
            const event = responseData[key];
            eventList.push(
              new Event(
                event.date,
                event.location,
                event.firstPerson,
                event.secondPerson,
                event._id,
                event.guests
              )
            );
          }
          eventList.sort(
            (a: Event, b: Event) =>
              new Date(a.date).getTime() - new Date(b.date).getTime()
          );
          return eventList;
        })
      );
  }
}
