import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IChord } from 'app/shared/model/chord.model';
import { AccountService } from 'app/core';
import { ChordService } from './chord.service';

@Component({
  selector: 'jhi-chord',
  templateUrl: './chord.component.html'
})
export class ChordComponent implements OnInit, OnDestroy {
  chords: IChord[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected chordService: ChordService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.chordService
      .query()
      .pipe(
        filter((res: HttpResponse<IChord[]>) => res.ok),
        map((res: HttpResponse<IChord[]>) => res.body)
      )
      .subscribe(
        (res: IChord[]) => {
          this.chords = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInChords();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IChord) {
    return item.id;
  }

  registerChangeInChords() {
    this.eventSubscriber = this.eventManager.subscribe('chordListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
