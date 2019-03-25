export class ScreeningProfileDataTable {
    constructor(
        public id: string,
        public name: string,
        public created: Date,
        public modified: Date,
        public country_check_severity: string) {

    }
}
