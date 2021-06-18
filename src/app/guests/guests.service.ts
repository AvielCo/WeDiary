import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Event } from '@events/event.model';
import { Guest } from '@guests/guest.model';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class GuestsService {
  private readonly url = 'http://localhost:8080/api/guest';
  constructor(private http: HttpClient) {}

  public async postGuest(event: Event, guest: Guest) {
    return new Promise((resolve, reject) => {
      this.http
        .post(`${this.url}/${event._id}`, guest, { responseType: 'text' })
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

  public fetchGuests(event: Event) {
    return this.http.get<Guest[]>(`${this.url}/all/${event._id}`).pipe(
      map((responseData) => {
        const guestsList: Guest[] = [];
        for (const key in responseData) {
          const guest = responseData[key];
          guestsList.push(
            new Guest(
              guest.name,
              guest.howMany,
              guest.comment,
              guest.howMuch,
              guest._id
            )
          );
        }
        guestsList.sort((a: Guest, b: Guest) => {
          if (a.name < b.name) {
            return -1;
          } else if (b.name < a.name) {
            return 1;
          }
          return 0;
        });
        return guestsList;
      })
    );
  }

  updateGuest(
    event: Event,
    guest: Guest,
    update: { name?: string; howMany?: Number; howMuch?: Number }
  ) {
    return new Promise((resolve, reject) => {
      this.http
        .put(`${this.url}/${event._id}/${guest._id}`, update, {
          responseType: 'text',
        })
        .subscribe(
          (res) => resolve(res),
          (error) => {
            if (error) reject(error);
          }
        );
    });
  }

  deleteGuest(event: Event, guest: Guest) {
    return new Promise((resolve, reject) => {
      this.http
        .delete(`${this.url}/${event._id}/${guest._id}`, {
          responseType: 'text',
        })
        .subscribe(
          (res) => resolve(res),
          (error) => reject(error)
        );
    });
  }
}
