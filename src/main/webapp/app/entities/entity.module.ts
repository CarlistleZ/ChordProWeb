import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'song',
        loadChildren: './song/song.module#ChordProSongModule'
      },
      {
        path: 'album',
        loadChildren: './album/album.module#ChordProAlbumModule'
      },
      {
        path: 'artist',
        loadChildren: './artist/artist.module#ChordProArtistModule'
      },
      {
        path: 'chord',
        loadChildren: './chord/chord.module#ChordProChordModule'
      }
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ])
  ],
  declarations: [],
  entryComponents: [],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ChordProEntityModule {}
