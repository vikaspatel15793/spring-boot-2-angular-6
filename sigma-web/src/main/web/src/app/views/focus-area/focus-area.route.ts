import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { FocusAreaService } from './focus-area.service';
import { FocusAreaComponent } from './focus-area.component';
import { FocusAreaUpdateComponent } from './focus-area-update.component';
import { IFocusArea, FocusArea } from '../../shared/model/focus-area.model';

@Injectable({ providedIn: 'root' })
export class FocusAreaResolve implements Resolve<IFocusArea> {
    constructor(private service: FocusAreaService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IFocusArea> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<FocusArea>) => response.ok),
                map((focusArea: HttpResponse<FocusArea>) => focusArea.body)
            );
        }
        return of(new FocusArea());
    }
}


export const focusAreaRoute: Routes = [
    {
        path: '',
        component: FocusAreaComponent,
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'FocusAreas',
            title: 'Focus Area'
        },
        children: [

        ]
    },
    {
        path: 'new',
        component: FocusAreaUpdateComponent,
        resolve: {
            focusArea: FocusAreaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'FocusAreas',
            title: 'Focus Area'
        },
    },
    {
        path: ':id/edit',
        component: FocusAreaUpdateComponent,
        resolve: {
            focusArea: FocusAreaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'FocusAreas',
            title: 'Focus Area'
        },
    }
];

