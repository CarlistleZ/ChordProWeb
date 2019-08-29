import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ChordProSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective } from './';

@NgModule({
  imports: [ChordProSharedCommonModule],
  declarations: [JhiLoginModalComponent, HasAnyAuthorityDirective],
  entryComponents: [JhiLoginModalComponent],
  exports: [ChordProSharedCommonModule, JhiLoginModalComponent, HasAnyAuthorityDirective],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ChordProSharedModule {
  static forRoot() {
    return {
      ngModule: ChordProSharedModule
    };
  }
}
