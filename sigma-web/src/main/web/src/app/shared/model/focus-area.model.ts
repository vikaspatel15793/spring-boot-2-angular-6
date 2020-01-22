export interface IFocusArea {
    id?: number;
    focusArea?: string;
    focusAreaSummary?: string;
}

export class FocusArea implements IFocusArea {
    constructor(public id?: number, public focusArea?: string, public focusAreaSummary?: string) {}
}
