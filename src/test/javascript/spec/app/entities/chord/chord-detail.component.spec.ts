/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { ChordProTestModule } from '../../../test.module';
import { ChordDetailComponent } from 'app/entities/chord/chord-detail.component';
import { Chord } from 'app/shared/model/chord.model';

describe('Component Tests', () => {
  describe('Chord Management Detail Component', () => {
    let comp: ChordDetailComponent;
    let fixture: ComponentFixture<ChordDetailComponent>;
    const route = ({ data: of({ chord: new Chord(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [ChordProTestModule],
        declarations: [ChordDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ChordDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ChordDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should call load all on init', () => {
        // GIVEN

        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.chord).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
