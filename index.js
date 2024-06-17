const core = require('@actions/core');
const github = require('@actions/github');

(async() => {
    const octokit = github.getOctokit(core.getInput('token'));
    const sourceRepo = core.getInput('source-repo');
    const destRepo = core.getInput('dest-repo');
    const settings = core.getInput('settings');

    console.log(settings);
})();