import { ScreeningProfile } from './ScreeningProfiles';

export class ScreeningProfileDetailViewModel {
    public id: string;
    public name: string;
    public created: Date;
    public modified: Date;
    public companyCheck: ProfileFields[] = [];
    public countryCheck: ProfileFields[] = [];
    public shipSanction: ProfileFields[] = [];
    public shipInspection: ProfileFields[] = [];
    public portVisitSeverity: string;
    public noAisPositionSeverity: string;
    public zoneSeverity: string;
    public expansionPanel: { panelHeader: string, panelItems: ProfileFields[] }[] = [];

    constructor(profile: ScreeningProfile) {
        this.id = profile.id;
        this.name = profile.name;
        this.created = profile.created;
        this.modified = profile.modified;
        this.expansionPanel = this.getExpansionPanel(profile);
        this.portVisitSeverity = profile.port_visit_severity;
        this.noAisPositionSeverity = profile.no_ais_position_severity;
        this.zoneSeverity = profile.zone_severity;
    }

    private getExpansionPanel(profile: ScreeningProfile) {
        return [{
            panelHeader: 'Company Check',
            panelItems: this.mapToProfileFields(profile, 'company_check')
        }, {
            panelHeader: 'Country Check',
            panelItems: this.mapToProfileFields(profile, 'country_check')
        }, {
            panelHeader: 'Ship Sanction',
            panelItems: this.mapToProfileFields(profile, 'ship_sanction')
        }, {
            panelHeader: 'Ship Inspection',
            panelItems: this.mapToProfileFields(profile, 'ship_inspection')
        }];
    }

    private mapToProfileFields(profile: ScreeningProfile, predicate: string) {
        const profileFields: ProfileFields[] = [];
        for (const key in profile) {
            if (profile.hasOwnProperty(key) && key.toLowerCase().includes(predicate.toLowerCase())) {
                profileFields.push(new ProfileFields(key.toUpperCase(), profile[key] ? profile[key] : 'Not Available'));
            }
        }
        return profileFields;
    }
}

class ProfileFields {
    constructor(public displayText: string, public value: string | number) {

    }
}
