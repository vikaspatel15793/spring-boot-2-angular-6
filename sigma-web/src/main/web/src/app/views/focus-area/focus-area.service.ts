import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';

import { IFocusArea } from '../../shared/model/focus-area.model';
import { SERVER_API_URL } from '../../app.constant';

type EntityResponseType = HttpResponse<IFocusArea>;
type EntityArrayResponseType = HttpResponse<IFocusArea[]>;

@Injectable({ providedIn: 'root' })
export class FocusAreaService {
    public resourceUrl = SERVER_API_URL + 'api/focus-areas';

    constructor(protected http: HttpClient) { }

    create(focusArea: IFocusArea): Observable<EntityResponseType> {
        return this.http.post<IFocusArea>(this.resourceUrl, focusArea, { observe: 'response' });
    }

    update(focusArea: IFocusArea): Observable<EntityResponseType> {
        return this.http.put<IFocusArea>(this.resourceUrl, focusArea, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IFocusArea>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IFocusArea[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }


}



export const createRequestOption = (req?: any): HttpParams => {
    let options: HttpParams = new HttpParams();
    if (req) {
        Object.keys(req).forEach(key => {
            if (key !== 'sort') {
                options = options.set(key, req[key]);
            }
        });
        if (req.sort) {
            req.sort.forEach(val => {
                options = options.append('sort', val);
            });
        }
    }
    return options;
};
