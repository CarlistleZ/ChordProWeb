import { IAlbum } from 'app/shared/model/album.model';

export interface IArtist {
  id?: number;
  name?: string;
  genre?: string;
  label?: string;
  year?: number;
  albums?: IAlbum[];
}

export class Artist implements IArtist {
  constructor(
    public id?: number,
    public name?: string,
    public genre?: string,
    public label?: string,
    public year?: number,
    public albums?: IAlbum[]
  ) {}
}
