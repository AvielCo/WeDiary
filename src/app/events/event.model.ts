import { Guest } from './guest.model';
import { Person } from './person.model';

export class Event {
  constructor(
    public date: Date,
    public location: string,
    public firstPersonDetails: Person,
    public secondPersonDetails: Person,
    public guests?: [Guest]
  ) {}
}
