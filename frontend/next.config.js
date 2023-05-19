const fs = require('fs');
const path = require('path');

// Create a symlink to .env file
const envFilePath = path.join(path.dirname(process.cwd()), '.env');
const envLocalFilePath = path.join(process.cwd(), '.env.local')
fs.symlink(envFilePath, envLocalFilePath, err => {
  if (err.code === 'EEXIST') {}
});

const nextConfig = {}
module.exports = nextConfig
