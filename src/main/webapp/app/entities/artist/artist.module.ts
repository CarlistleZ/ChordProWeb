import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { ChordProSharedModule } from 'app/shared';
import {
  ArtistComponent,
  ArtistDetailComponent,
  ArtistUpdateComponent,
  ArtistDeletePopupComponent,
  ArtistDeleteDialogComponent,
  artistRoute,
  artistPopupRoute
} from './';

const ENTITY_STATES = [...artistRoute, ...artistPopupRoute];

@NgModule({
  imports: [ChordProSharedModule, RouterModule.forChild(ENTITY_STATES)],
  declarations: [ArtistComponent, ArtistDetailComponent, ArtistUpdateComponent, ArtistDeleteDialogComponent, ArtistDeletePopupComponent],
  entryComponents: [ArtistComponent, ArtistUpdateComponent, ArtistDeleteDialogComponent, ArtistDeletePopupComponent],
  providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ChordProArtistModule {
  constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
    this.languageHelper.language.subscribe((languageKey: string) => {
      if (languageKey !== undefined) {
        this.languageService.changeLanguage(languageKey);
      }
    });
  }
}
