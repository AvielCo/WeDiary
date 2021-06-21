import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Event } from 'src/models/event.model';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class EventsService {
  private readonly url = 'http://localhost:8080/api/event';
  constructor(private http: HttpClient) {}

  public postEvent(event: Event) {
    return this.http.post(this.url, event, { withCredentials: true });
  }

  public fetchEvents() {
    return this.http
      .get<{ events: Event[]; accessToken: string }>(`${this.url}/all`, {
        withCredentials: true,
      })
      .pipe(
        map((responseData) => {
          const { events, accessToken } = responseData;
          if (accessToken) {
            window.localStorage.setItem('accessToken', accessToken);
          }
          const eventList: Event[] = [];
          for (const key in events) {
            const event = events[key];
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
