import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Event } from 'src/models/event.model';
import { Guest } from 'src/models/guest.model';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class GuestsService {
  private readonly url = 'http://localhost:8080/api/guest';
  constructor(private http: HttpClient) {}

  public postGuest(eventId: string, guest: Guest) {
    return this.http.post<{ accessToken: string }>(
      `${this.url}/${eventId}`,
      guest,
      {
        withCredentials: true,
      }
    );
  }

  public fetchGuests(eventId: string) {
    return this.http.get<{ guests: Guest[]; accessToken: string }>(
      `${this.url}/all/${eventId}`,
      { withCredentials: true }
    );
  }

  updateGuest(
    eventId: string,
    guestId: string,
    update: {
      name?: string;
      howMany?: Number;
      howMuch?: Number;
      comment?: string;
    }
  ) {
    return this.http.put<{ accessToken: string }>(
      `${this.url}/${eventId}/${guestId}`,
      update,
      {
        withCredentials: true,
      }
    );
  }

  removeGuest(eventId: string, guestId: string) {
    return this.http.delete<{ accessToken: string }>(
      `${this.url}/${eventId}/${guestId}`,
      {
        withCredentials: true,
      }
    );
  }
}
