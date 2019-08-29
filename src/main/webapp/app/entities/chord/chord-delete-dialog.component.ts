import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IChord } from 'app/shared/model/chord.model';
import { ChordService } from './chord.service';

@Component({
  selector: 'jhi-chord-delete-dialog',
  templateUrl: './chord-delete-dialog.component.html'
})
export class ChordDeleteDialogComponent {
  chord: IChord;

  constructor(protected chordService: ChordService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.chordService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'chordListModification',
        content: 'Deleted an chord'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-chord-delete-popup',
  template: ''
})
export class ChordDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ chord }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(ChordDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.chord = chord;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/chord', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/chord', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
