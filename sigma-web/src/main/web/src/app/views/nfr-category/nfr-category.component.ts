import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

import { NfrCategoryService } from './nfr-category.service';
import { INfrCategory } from '../../shared/model/nfr-category.model';
import { ThrowStmt } from '@angular/compiler';
import { PagerService } from '../../shared/service/pager.service';

@Component({
    selector: 'app-nfr-category',
    templateUrl: './nfr-category.component.html'
})
export class NfrCategoryComponent implements OnInit {
    currentAccount: any;
    totalNfrCategorys: INfrCategory[];
    nfrCategorys: INfrCategory[];
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
        protected nfrCategoryService: NfrCategoryService,
        protected activatedRoute: ActivatedRoute,
        private pagerService: PagerService,
        protected router: Router,
    ) {

    }

    loadAll() {
        this.nfrCategoryService
            .query({
                sort: this.sort()
            })
            .subscribe(
                (res: HttpResponse<INfrCategory[]>) => this.paginateNfrCategorys(res.body, res.headers),
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

    trackId(index: number, item: INfrCategory) {
        return item.id;
    }

    sort() {
        const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
        if (this.predicate !== 'id') {
            result.push('id');
        }
        return result;
    }

    protected paginateNfrCategorys(data: INfrCategory[], headers: HttpHeaders) {
        this.totalNfrCategorys = data;
        this.totalItems = this.totalNfrCategorys.length;
        this.itemsPerPage = 10;
        this.setPage(this.page);

    }

    deleteNfrCategory(id) {
        this.nfrCategoryService.delete(id).subscribe(result => {
            if (this.nfrCategorys.length === 1) {
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
        this.pager = this.pagerService.getPager(this.totalNfrCategorys.length, page);

        // get current page of items
        this.nfrCategorys = this.totalNfrCategorys.slice(this.pager.startIndex, this.pager.endIndex + 1);
    }

    protected onError(errorMessage: string) {
    }
}
