/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { ChordProTestModule } from '../../../test.module';
import { ChordComponent } from 'app/entities/chord/chord.component';
import { ChordService } from 'app/entities/chord/chord.service';
import { Chord } from 'app/shared/model/chord.model';

describe('Component Tests', () => {
  describe('Chord Management Component', () => {
    let comp: ChordComponent;
    let fixture: ComponentFixture<ChordComponent>;
    let service: ChordService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ChordProTestModule],
        declarations: [ChordComponent],
        providers: []
      })
        .overrideTemplate(ChordComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ChordComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ChordService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Chord(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.chords[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
