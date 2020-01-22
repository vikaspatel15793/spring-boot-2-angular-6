import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { NfrCategoryService } from './nfr-category.service';
import { INfrCategory, NfrCategory } from '../../shared/model/nfr-category.model';
import { FocusAreaService } from '../focus-area';
import { IFocusArea } from '../../shared/model/focus-area.model';

@Component({
    selector: 'app-nfr-category-update',
    templateUrl: './nfr-category-update.component.html'
})
export class NfrCategoryUpdateComponent implements OnInit {
    nfrCategory: INfrCategory;
    isSaving: boolean;
    focusareas: IFocusArea[];

    constructor(protected nfrCategoryService: NfrCategoryService,
        protected focusAreaService: FocusAreaService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ nfrCategory }) => {
            this.nfrCategory = nfrCategory;
        });

        this.focusAreaService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IFocusArea[]>) => mayBeOk.ok),
                map((response: HttpResponse<IFocusArea[]>) => response.body)
            )
            .subscribe((res: IFocusArea[]) => (this.focusareas = res));
    }

    previousState() {
        window.history.back();
    }


    reset() {
        // window.history.back();
        this.nfrCategory = new NfrCategory();
    }

    save() {
        this.isSaving = true;
        if (this.nfrCategory.id !== undefined) {
            this.subscribeToSaveResponse(this.nfrCategoryService.update(this.nfrCategory));
        } else {
            this.subscribeToSaveResponse(this.nfrCategoryService.create(this.nfrCategory));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<INfrCategory>>) {
        result.subscribe((res: HttpResponse<INfrCategory>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
