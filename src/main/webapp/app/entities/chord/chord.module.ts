import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { ChordProSharedModule } from 'app/shared';
import {
  ChordComponent,
  ChordDetailComponent,
  ChordUpdateComponent,
  ChordDeletePopupComponent,
  ChordDeleteDialogComponent,
  chordRoute,
  chordPopupRoute
} from './';

const ENTITY_STATES = [...chordRoute, ...chordPopupRoute];

@NgModule({
  imports: [ChordProSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [ChordComponent, ChordDetailComponent, ChordUpdateComponent, ChordDeleteDialogComponent, ChordDeletePopupComponent],
  entryComponents: [ChordComponent, ChordUpdateComponent, ChordDeleteDialogComponent, ChordDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ChordProChordModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
