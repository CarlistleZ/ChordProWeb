import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IChord, Chord } from 'app/shared/model/chord.model';
import { ChordService } from './chord.service';

@Component({
  selector: 'jhi-chord-update',
  templateUrl: './chord-update.component.html'
})
export class ChordUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    name: [],
    key: [],
    type: [],
    fret: []
  });

  constructor(protected chordService: ChordService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ chord }) => {
      this.updateForm(chord);
    });
  }

  updateForm(chord: IChord) {
    this.editForm.patchValue({
      id: chord.id,
      name: chord.name,
      key: chord.key,
      type: chord.type,
      fret: chord.fret
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const chord = this.createFromForm();
    if (chord.id !== undefined) {
      this.subscribeToSaveResponse(this.chordService.update(chord));
    } else {
      this.subscribeToSaveResponse(this.chordService.create(chord));
    }
  }

  private createFromForm(): IChord {
    const entity = {
      ...new Chord(),
      id: this.editForm.get(['id']).value,
      name: this.editForm.get(['name']).value,
      key: this.editForm.get(['key']).value,
      type: this.editForm.get(['type']).value,
      fret: this.editForm.get(['fret']).value
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IChord>>) {
    result.subscribe((res: HttpResponse<IChord>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
