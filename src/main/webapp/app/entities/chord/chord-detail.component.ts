import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IChord } from 'app/shared/model/chord.model';

@Component({
  selector: 'jhi-chord-detail',
  templateUrl: './chord-detail.component.html'
})
export class ChordDetailComponent implements OnInit {
  chord: IChord;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ chord }) => {
      this.chord = chord;
    });
  }

  previousState() {
    window.history.back();
  }
}
