export interface ISong {
  id?: number;
  title?: string;
  difficulty?: string;
  capo?: number;
  progression?: string;
}

export class Song implements ISong {
  constructor(public id?: number, public title?: string, public difficulty?: string, public capo?: number, public progression?: string) {}
}
