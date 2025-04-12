import * as dotenv from 'dotenv';
import { defineConfig } from '@playwright/test';

dotenv.config();

export default defineConfig({
    testDir: 'src/tests',
    timeout: 30_000,
    retries: 0,
    outputDir: 'src/tests/results',
    use: {
        baseURL: process.env.BASE_URL,
        headless: true,
    },
});
