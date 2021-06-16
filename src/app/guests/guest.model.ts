export class Guest {
  constructor(
    public editable: boolean = false,
    public name: string,
    public howMany: Number,
    public howMuch?: Number,
    public _id?: string
  ) {}

  public equal(other: Guest) {
    return (
      this.name == other.name &&
      this.howMany == other.howMany &&
      this.howMuch == other.howMuch
    );
  }
}
