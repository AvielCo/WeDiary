import { Guest } from './guest.model';
import { Person } from './person.model';

export class Event {
  constructor(
    public date: Date,
    public location: string,
    public firstPerson: Person,
    public secondPerson: Person,
    public _id?: string,
    public guests?: [Guest]
  ) {}
}
