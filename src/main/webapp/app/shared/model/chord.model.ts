export interface IChord {
  id?: number;
  name?: string;
  key?: string;
  type?: string;
  fret?: number;
}

export class Chord implements IChord {
  constructor(public id?: number, public name?: string, public key?: string, public type?: string, public fret?: number) {}
}
