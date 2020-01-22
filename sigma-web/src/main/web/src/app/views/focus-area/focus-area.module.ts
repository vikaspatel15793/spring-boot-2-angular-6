import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
    FocusAreaComponent,
    FocusAreaUpdateComponent,
    focusAreaRoute,
} from './';


const ENTITY_STATES = [...focusAreaRoute];

@NgModule({
    imports: [CommonModule, FormsModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        FocusAreaComponent,
        FocusAreaUpdateComponent,
    ],
    entryComponents: [FocusAreaComponent, FocusAreaUpdateComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SigmaFocusAreaModule { }
