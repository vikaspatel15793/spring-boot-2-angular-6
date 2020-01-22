import { IFocusArea } from 'app/shared/model/focus-area.model';

export interface INfrCategory {
    id?: number;
    nfrCategory?: string;
    nfrCategorySummary?: string;
    guidance?: string;
    simpleUserStory?: string;
    simpleAcceptanceCriteria?: string;
    focusArea?: IFocusArea;
}

export class NfrCategory implements INfrCategory {
    constructor(
        public id?: number,
        public nfrCategory?: string,
        public nfrCategorySummary?: string,
        public guidance?: string,
        public simpleUserStory?: string,
        public simpleAcceptanceCriteria?: string,
        public focusArea?: IFocusArea
    ) {}
}
