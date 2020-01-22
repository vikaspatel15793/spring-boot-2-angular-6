import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { INfrCategory } from '../../shared/model/nfr-category.model';
import { SERVER_API_URL } from '../../app.constant';


type EntityResponseType = HttpResponse<INfrCategory>;
type EntityArrayResponseType = HttpResponse<INfrCategory[]>;

@Injectable({ providedIn: 'root' })
export class NfrCategoryService {
    public resourceUrl = SERVER_API_URL + 'api/nfr-categories';

    constructor(protected http: HttpClient) {}

    create(nfrCategory: INfrCategory): Observable<EntityResponseType> {
        return this.http.post<INfrCategory>(this.resourceUrl, nfrCategory, { observe: 'response' });
    }

    update(nfrCategory: INfrCategory): Observable<EntityResponseType> {
        return this.http.put<INfrCategory>(this.resourceUrl, nfrCategory, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<INfrCategory>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<INfrCategory[]>(this.resourceUrl, { params: options, observe: 'response' });
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
