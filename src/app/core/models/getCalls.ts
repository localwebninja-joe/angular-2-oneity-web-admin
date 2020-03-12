import { Settings, userRegistrationFields, Countries, Languages, Roles } from '@app/core/models/index';

export interface Calls {
    success: boolean,
    data: (userRegistrationFields | Countries | Languages | Roles | [])
}