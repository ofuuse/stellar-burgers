import { defineConfig } from 'cypress';
import fs from 'fs';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:4000',
    setupNodeEvents(on, config) {
      on('task', {
        saveToFile({ filename, data }) {
          fs.writeFileSync(filename, JSON.stringify(data, null, 2), 'utf-8');
          console.log(`Saved file: ${filename}`);
          return null;
        }
      });
    }
  }
});
