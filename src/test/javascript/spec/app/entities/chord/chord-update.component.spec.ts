/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { Observable, of } from 'rxjs';

import { ChordProTestModule } from '../../../test.module';
import { ChordUpdateComponent } from 'app/entities/chord/chord-update.component';
import { ChordService } from 'app/entities/chord/chord.service';
import { Chord } from 'app/shared/model/chord.model';

describe('Component Tests', () => {
  describe('Chord Management Update Component', () => {
    let comp: ChordUpdateComponent;
    let fixture: ComponentFixture<ChordUpdateComponent>;
    let service: ChordService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ChordProTestModule],
        declarations: [ChordUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ChordUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ChordUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ChordService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Chord(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Chord();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
