import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FormsModule } from '@angular/forms';

import {
    NfrCategoryComponent,
    NfrCategoryUpdateComponent,
    nfrCategoryRoute,
} from './';
import { CommonModule } from '@angular/common';

const ENTITY_STATES = [...nfrCategoryRoute];

@NgModule({
    imports: [CommonModule, FormsModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        NfrCategoryComponent,
        NfrCategoryUpdateComponent,
    ],
    entryComponents: [NfrCategoryComponent, NfrCategoryUpdateComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SigmaNfrCategoryModule { }
