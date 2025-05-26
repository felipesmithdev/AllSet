require('dotenv').config();

module.exports = {
    baseUrl: process.env.JIRA_BASE_URL,
    authJira: {
        Authorization: `Basic ${Buffer.from(`${process.env.JIRA_EMAIL}:${process.env.JIRA_TOKEN}`).toString('base64')}`,
        Accept: 'application/json'
    }
};
