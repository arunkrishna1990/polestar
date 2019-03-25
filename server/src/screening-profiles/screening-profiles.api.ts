import { Router } from "express";
import { ScreeningProfileService } from "./screening-profile.service";

export const routes = Router();

const screeningProfileService = new ScreeningProfileService();
routes.get('/', (req, res) => {
    res.send(screeningProfileService.getScreeningProfiles());
});