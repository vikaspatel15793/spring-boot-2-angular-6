import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { FocusAreaService } from './focus-area.service';
import { IFocusArea } from '../../shared/model/focus-area.model';
import { ThrowStmt } from '@angular/compiler';
import { PagerService } from '../../shared/service/pager.service';

@Component({
    selector: 'app-focus-area',
    templateUrl: './focus-area.component.html'
})
export class FocusAreaComponent implements OnInit {
    currentAccount: any;
    totalFocusAreas: IFocusArea[];
    focusAreas: IFocusArea[];
    error: any;
    success: any;
    eventSubscriber: Subscription;
    routeData: any;
    links: any;

    predicate: any;

    page = 1;
    totalItems: any;
    itemsPerPage: any;
    currentPage: any;
    reverse: any;

    // pager object
    pager: any = {};


    constructor(
        protected focusAreaService: FocusAreaService,
        protected activatedRoute: ActivatedRoute,
        private pagerService: PagerService,
        protected router: Router,
    ) {

    }

    loadAll() {
        this.focusAreaService
            .query({
                sort: this.sort()
            })
            .subscribe(
                (res: HttpResponse<IFocusArea[]>) => this.paginateFocusAreas(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    clear() {
        this.router.navigate([
            '/focus-area',
            {
                sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
            }
        ]);
        this.loadAll();
    }

    ngOnInit() {
        this.predicate = 'id';
        this.loadAll();
    }

    trackId(index: number, item: IFocusArea) {
        return item.id;
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    protected paginateFocusAreas(data: IFocusArea[], headers: HttpHeaders) {
        this.totalFocusAreas = data;
        this.totalItems = this.totalFocusAreas.length;
        this.itemsPerPage = 10;
        this.setPage(this.page);

    }

    deleteFocusArea(id) {
        this.focusAreaService.delete(id).subscribe(result => {
            if (this.focusAreas.length === 1) {
                this.page = this.page - 1;
            }
            this.loadAll();
        });
    }

    setPage(page: number) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
        this.page = page;

        // get pager object from service
        this.pager = this.pagerService.getPager(this.totalFocusAreas.length, page);

        // get current page of items
        this.focusAreas = this.totalFocusAreas.slice(this.pager.startIndex, this.pager.endIndex + 1);
    }

    protected onError(errorMessage: string) {
    }
}
