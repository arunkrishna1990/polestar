import { Router } from 'express';
import { routes as ScreeningProfilesAPI } from './screening-profiles/screening-profiles.api'

export const routes = Router();
routes.use('/screeningProfiles', ScreeningProfilesAPI);