import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IChord } from 'app/shared/model/chord.model';

type EntityResponseType = HttpResponse<IChord>;
type EntityArrayResponseType = HttpResponse<IChord[]>;

@Injectable({ providedIn: 'root' })
export class ChordService {
  public resourceUrl = SERVER_API_URL + 'api/chords';

  constructor(protected http: HttpClient) {}

  create(chord: IChord): Observable<EntityResponseType> {
    return this.http.post<IChord>(this.resourceUrl, chord, { observe: 'response' });
  }

  update(chord: IChord): Observable<EntityResponseType> {
    return this.http.put<IChord>(this.resourceUrl, chord, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IChord>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IChord[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<any>> {
    return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
