import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { NfrCategoryService } from './nfr-category.service';
import { NfrCategoryComponent } from './nfr-category.component';
import { NfrCategoryUpdateComponent } from './nfr-category-update.component';
import { INfrCategory, NfrCategory } from '../../shared/model/nfr-category.model';

@Injectable({ providedIn: 'root' })
export class NfrCategoryResolve implements Resolve<INfrCategory> {
    constructor(private service: NfrCategoryService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<INfrCategory> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<NfrCategory>) => response.ok),
                map((nfrCategory: HttpResponse<NfrCategory>) => nfrCategory.body)
            );
        }
        return of(new NfrCategory());
    }
}

export const nfrCategoryRoute: Routes = [
    {
        path: '',
        component: NfrCategoryComponent,
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'NfrCategorys',
            title: 'NFR Category'
        },
    },
    {
        path: 'new',
        component: NfrCategoryUpdateComponent,
        resolve: {
            nfrCategory: NfrCategoryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'NfrCategorys',
            title: 'NFR Category'
        },
    },
    {
        path: ':id/edit',
        component: NfrCategoryUpdateComponent,
        resolve: {
            nfrCategory: NfrCategoryResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'NfrCategorys',
            title: 'NFR Category'
        },
    }
];

