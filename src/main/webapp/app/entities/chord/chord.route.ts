import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Chord } from 'app/shared/model/chord.model';
import { ChordService } from './chord.service';
import { ChordComponent } from './chord.component';
import { ChordDetailComponent } from './chord-detail.component';
import { ChordUpdateComponent } from './chord-update.component';
import { ChordDeletePopupComponent } from './chord-delete-dialog.component';
import { IChord } from 'app/shared/model/chord.model';

@Injectable({ providedIn: 'root' })
export class ChordResolve implements Resolve<IChord> {
  constructor(private service: ChordService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IChord> {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id).pipe(
        filter((response: HttpResponse<Chord>) => response.ok),
        map((chord: HttpResponse<Chord>) => chord.body)
      );
    }
    return of(new Chord());
  }
}

export const chordRoute: Routes = [
  {
    path: '',
    component: ChordComponent,
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'chordProApp.chord.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ChordDetailComponent,
    resolve: {
      chord: ChordResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'chordProApp.chord.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ChordUpdateComponent,
    resolve: {
      chord: ChordResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'chordProApp.chord.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ChordUpdateComponent,
    resolve: {
      chord: ChordResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'chordProApp.chord.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const chordPopupRoute: Routes = [
  {
    path: ':id/delete',
    component: ChordDeletePopupComponent,
    resolve: {
      chord: ChordResolve
    },
    data: {
      authorities: ['ROLE_USER'],
      pageTitle: 'chordProApp.chord.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
