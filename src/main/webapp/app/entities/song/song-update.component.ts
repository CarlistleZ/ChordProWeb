import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ISong, Song } from 'app/shared/model/song.model';
import { SongService } from './song.service';

@Component({
  selector: 'jhi-song-update',
  templateUrl: './song-update.component.html'
})
export class SongUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    title: [],
    difficulty: [],
    capo: [],
    progression: []
  });

  constructor(protected songService: SongService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ song }) => {
      this.updateForm(song);
    });
  }

  updateForm(song: ISong) {
    this.editForm.patchValue({
      id: song.id,
      title: song.title,
      difficulty: song.difficulty,
      capo: song.capo,
      progression: song.progression
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const song = this.createFromForm();
    if (song.id !== undefined) {
      this.subscribeToSaveResponse(this.songService.update(song));
    } else {
      this.subscribeToSaveResponse(this.songService.create(song));
    }
  }

  private createFromForm(): ISong {
    const entity = {
      ...new Song(),
      id: this.editForm.get(['id']).value,
      title: this.editForm.get(['title']).value,
      difficulty: this.editForm.get(['difficulty']).value,
      capo: this.editForm.get(['capo']).value,
      progression: this.editForm.get(['progression']).value
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISong>>) {
    result.subscribe((res: HttpResponse<ISong>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
