import axio from "axios"
import { screeningProfiles } from "./screen-profiles-mock-response";

describe('Screening Profile API Spec', () => {
    let server: any;
    const baseURL = 'http://localhost:3000';

    beforeAll(() => {
        const { startServer } = require('../server');
        server = startServer();
    });

    afterAll(() => {
        server.close()
    });

    describe('/', () => {
        it(`should respond with the message CryptoCurrency API`, async () => {
            const response = await axio.get(`${baseURL}/api/screeningProfiles`);
            expect(response.data).toEqual(screeningProfiles);
        });
    });
})