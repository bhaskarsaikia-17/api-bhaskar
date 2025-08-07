const fs = require('fs');
const path = require('path');

// Paths
const rootDbDir = path.join(__dirname, '..', 'db');
const apiDbDir = path.join(__dirname, 'db');

// Ensure the api-service/db directory exists
if (!fs.existsSync(apiDbDir)) {
  fs.mkdirSync(apiDbDir, { recursive: true });
  console.log('Created db directory in api-service');
}

// Copy profile_data.json if it exists
const profileDataPath = path.join(rootDbDir, 'profile_data.json');
const apiProfileDataPath = path.join(apiDbDir, 'profile_data.json');

if (fs.existsSync(profileDataPath)) {
  fs.copyFileSync(profileDataPath, apiProfileDataPath);
  console.log('Copied profile_data.json to api-service/db');
} else {
  console.log('profile_data.json not found in root db directory');
}

// Copy social_links.json if it exists
const socialLinksPath = path.join(rootDbDir, 'social_links.json');
const apiSocialLinksPath = path.join(apiDbDir, 'social_links.json');

if (fs.existsSync(socialLinksPath)) {
  fs.copyFileSync(socialLinksPath, apiSocialLinksPath);
  console.log('Copied social_links.json to api-service/db');
} else {
  console.log('social_links.json not found in root db directory');
}

console.log('Database setup complete!');

// Crafted With <3 By Bhaskar 