import { Component, OnInit } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IAlbum, Album } from 'app/shared/model/album.model';
import { AlbumService } from './album.service';

@Component({
  selector: 'jhi-album-update',
  templateUrl: './album-update.component.html'
})
export class AlbumUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    title: [],
    genre: [],
    year: []
  });

  constructor(protected albumService: AlbumService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ album }) => {
      this.updateForm(album);
    });
  }

  updateForm(album: IAlbum) {
    this.editForm.patchValue({
      id: album.id,
      title: album.title,
      genre: album.genre,
      year: album.year
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const album = this.createFromForm();
    if (album.id !== undefined) {
      this.subscribeToSaveResponse(this.albumService.update(album));
    } else {
      this.subscribeToSaveResponse(this.albumService.create(album));
    }
  }

  private createFromForm(): IAlbum {
    const entity = {
      ...new Album(),
      id: this.editForm.get(['id']).value,
      title: this.editForm.get(['title']).value,
      genre: this.editForm.get(['genre']).value,
      year: this.editForm.get(['year']).value
    };
    return entity;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAlbum>>) {
    result.subscribe((res: HttpResponse<IAlbum>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
