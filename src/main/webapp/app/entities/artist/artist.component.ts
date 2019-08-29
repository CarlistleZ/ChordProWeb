import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IArtist } from 'app/shared/model/artist.model';
import { AccountService } from 'app/core';
import { ArtistService } from './artist.service';

@Component({
  selector: 'jhi-artist',
  templateUrl: './artist.component.html'
})
export class ArtistComponent implements OnInit, OnDestroy {
  artists: IArtist[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected artistService: ArtistService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.artistService
      .query()
      .pipe(
        filter((res: HttpResponse<IArtist[]>) => res.ok),
        map((res: HttpResponse<IArtist[]>) => res.body)
      )
      .subscribe(
        (res: IArtist[]) => {
          this.artists = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInArtists();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IArtist) {
    return item.id;
  }

  registerChangeInArtists() {
    this.eventSubscriber = this.eventManager.subscribe('artistListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
