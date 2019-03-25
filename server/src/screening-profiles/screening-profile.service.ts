import { screeningProfiles } from "./screen-profiles-mock-response";

export class ScreeningProfileService {
    constructor() {
    }

    getScreeningProfiles() {
        return screeningProfiles;
    }
}

