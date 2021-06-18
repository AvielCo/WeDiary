export class Guest {
  constructor(
    public name: string,
    public howMany: Number,
    public comment: string = '',
    public howMuch?: Number,
    public _id?: string
  ) {}

  public equal(
    other:
      | Guest
      | { name?: string; howMany?: Number; howMuch?: Number; comment?: string }
  ) {
    if (!other.name) {
      other.name = this.name;
    }
    if (!other.howMany) {
      other.howMany = this.howMany;
    }
    if (!other.howMuch) {
      other.howMuch = this.howMuch;
    }
    if (!other.comment) {
      other.comment = this.comment;
    }
    return (
      this.name == other.name &&
      this.howMany == other.howMany &&
      this.howMuch == other.howMuch &&
      this.comment == other.comment
    );
  }
}
