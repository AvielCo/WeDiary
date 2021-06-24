import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Event } from 'src/models/event.model';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class EventsService {
  private readonly url = 'http://localhost:8080/api/event';
  constructor(private http: HttpClient) {}

  public postEvent(event: Event) {
    return this.http.post<{ accessToken: string }>(this.url, event, {
      withCredentials: true,
    });
  }

  public fetchEvents() {
    return this.http.get<{ events: Event[]; accessToken: string }>(
      `${this.url}/all`,
      {
        withCredentials: true,
      }
    );
  }

  public removeEvent(eventId: string) {
    return this.http.delete<{ accessToken: string }>(`${this.url}/${eventId}`, {
      withCredentials: true,
    });
  }

  public updateEvent(eventId: string, update: {}) {
    return this.http.put<{ accessToken: string }>(
      `${this.url}/${eventId}`,
      update,
      { withCredentials: true }
    );
  }
}
