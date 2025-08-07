const axios = require('axios');

const API_URL = 'http://localhost:3001';

// Test function to check all API endpoints
async function testApiEndpoints() {
  try {
    console.log('Testing API endpoints...');
    
    // Test health endpoint
    console.log('\n1. Testing health endpoint...');
    const healthResponse = await axios.get(`${API_URL}/api/health`);
    console.log('Health check response:', healthResponse.data);
    
    // Test profile endpoint
    console.log('\n2. Testing profile endpoint...');
    const profileResponse = await axios.get(`${API_URL}/api/profile`);
    console.log('Profile data:', profileResponse.data);
    
    // Test social links endpoint
    console.log('\n3. Testing social links endpoint...');
    const socialLinksResponse = await axios.get(`${API_URL}/api/social-links`);
    console.log('Social links:', socialLinksResponse.data);
    
    console.log('\nAll tests completed successfully!');
  } catch (error) {
    console.error('Test failed:', error.message);
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
    }
  }
}

// Run the tests
console.log('Starting API tests...');
console.log('Make sure the API server is running on http://localhost:3001');
testApiEndpoints();

// Crafted With <3 By Bhaskar 