import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { FocusAreaService } from './focus-area.service';
import { IFocusArea, FocusArea } from '../../shared/model/focus-area.model';

@Component({
    selector: 'app-focus-area-update',
    templateUrl: './focus-area-update.component.html'
})
export class FocusAreaUpdateComponent implements OnInit {
    focusArea: IFocusArea;
    isSaving: boolean;

    constructor(protected focusAreaService: FocusAreaService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ focusArea }) => {
            this.focusArea = focusArea;
        });
    }

    previousState() {
        window.history.back();
    }


    reset() {
        // window.history.back();
        this.focusArea = new FocusArea();
    }

    save() {
        this.isSaving = true;
        if (this.focusArea.id !== undefined) {
            this.subscribeToSaveResponse(this.focusAreaService.update(this.focusArea));
        } else {
            this.subscribeToSaveResponse(this.focusAreaService.create(this.focusArea));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IFocusArea>>) {
        result.subscribe((res: HttpResponse<IFocusArea>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
