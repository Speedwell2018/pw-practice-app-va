import { defineConfig, devices } from '@playwright/test';
import type {TestOptions} from './test-options';
import dotenv from 'dotenv';


dotenv.config();


export default defineConfig<TestOptions>({
  

  use: {
    baseURL: 'http://localhost:4200',
    globalsQaUrl: 'https://www.globalsqa.com/demo-site/draganddrop/',
    
  },
  reporter: 'html',

  
  projects: [
    {
      name: 'chromium' },
  ]
  
});
