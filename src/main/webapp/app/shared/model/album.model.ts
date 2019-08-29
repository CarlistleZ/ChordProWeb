import { ISong } from 'app/shared/model/song.model';

export interface IAlbum {
  id?: number;
  title?: string;
  genre?: string;
  year?: number;
  songs?: ISong[];
}

export class Album implements IAlbum {
  constructor(public id?: number, public title?: string, public genre?: string, public year?: number, public songs?: ISong[]) {}
}
