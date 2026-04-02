import { defineConfig, devices } from '@playwright/test';
import type {TestOptions} from './test-options';
import dotenv from 'dotenv';
import path from 'node:path';
import { json } from 'node:stream/consumers';


dotenv.config({ path: path.resolve(__dirname, '.env') });
const appPath = process.env.GITHUB_WORKSPACE 
  ? path.resolve(process.env.GITHUB_WORKSPACE, 'pw-practice-app')
  : path.resolve(__dirname, '../pw-practice-app');


export default defineConfig<TestOptions>({
  timeout:40000,

  expect:{
    timeout:2000
  },
  retries:1,
  
  reporter: [
    process.env.CI ? ["dot"] : ["list"],
    // Add Argos reporter.
    [
      "@argos-ci/playwright/reporter",
      {
        // Upload to Argos on CI only.
        uploadToArgos: !!process.env.CI,

        // Set your Argos token (required if not using GitHub Actions).
      
      }
    ],
    //['allure-playwright'],
  ['html'],
  ['json', { outputFile: 'test-results/test-results.json' }],
  ['junit', { outputFile: 'test-results/test-results.xml' }]],  

  use: {
    
     baseURL: process.env.DEV==='1' ? 'http://localhost:4201'
     :process.env.STAGE==='1' ? 'http://localhost:4202'
     :'http://localhost:4200',
     globalsQaUrl: 'https://www.globalsqa.com/demo-site/draganddrop/',
    trace: 'on-first-retry',
    video:'off',
    actionTimeout:20000,
    navigationTimeout:25000,
    screenshot: "only-on-failure",
    headless: true

  },
 webServer: {
  command: `sh -c "cd ${appPath} && npm install && npm start"`,
  url: 'http://localhost:4200',
  reuseExistingServer: !process.env.CI,
  timeout: 120000
},
  projects: [
    {
      name: 'dev',
      use: { 
        ...devices['Desktop Chrome']
      ,baseURL:'http://localhost:4201/' },
     },
    
    {
      name: 'stage',
      use: { ...devices['Desktop Chrome'],
      baseURL:'http://localhost:4202/' },
       },

    {
      name: 'chromium' },


    {
      name: 'firefox',
      use: { browserName: 'firefox' },
    },
    {
      name:'pageObjectFullScreen',
      testMatch:'usePageObjects.spec.ts',
      use:{
         viewport:{width:1920, height:1080}
        }

    },
    {
      name:'mobile',
      testMatch:'testMobile.spec.ts',
      use:{
         ...devices['iPhone 13 Pro'],
        }

    }
  ]
  
});
