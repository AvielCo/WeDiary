import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Event } from '@models/event.model';

@Injectable({ providedIn: 'root' })
export class EventsService {
  private readonly url = 'http://localhost:8080/api/event';
  constructor(private http: HttpClient) {}

  public postEvent(event: Event) {
    return this.http.post<{ at: { accessToken: string; expireDate: number } }>(
      this.url,
      event,
      {
        withCredentials: true,
      }
    );
  }

  public fetchEvents() {
    return this.http.get<{
      events: Event[];
      at: { accessToken: string; expireDate: number };
    }>(`${this.url}/all`, {
      withCredentials: true,
    });
  }

  public removeEvent(eventId: string) {
    return this.http.delete<{
      at: { accessToken: string; expireDate: number };
    }>(`${this.url}/${eventId}`, {
      withCredentials: true,
    });
  }

  public updateEvent(eventId: string, update: {}) {
    return this.http.put<{ at: { accessToken: string; expireDate: number } }>(
      `${this.url}/${eventId}`,
      update,
      { withCredentials: true }
    );
  }
}
