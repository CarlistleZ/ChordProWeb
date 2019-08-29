/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { ChordProTestModule } from '../../../test.module';
import { ChordDeleteDialogComponent } from 'app/entities/chord/chord-delete-dialog.component';
import { ChordService } from 'app/entities/chord/chord.service';

describe('Component Tests', () => {
  describe('Chord Management Delete Component', () => {
    let comp: ChordDeleteDialogComponent;
    let fixture: ComponentFixture<ChordDeleteDialogComponent>;
    let service: ChordService;
    let mockEventManager: any;
    let mockActiveModal: any;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ChordProTestModule],
        declarations: [ChordDeleteDialogComponent]
      })
        .overrideTemplate(ChordDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ChordDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ChordService);
      mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
      mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));
    });
  });
});
