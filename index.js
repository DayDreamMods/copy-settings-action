const core = require('@actions/core');
const github = require('@actions/github');

(async() => {
    const octokit = github.getOctokit(core.getInput('token'));
    const sourceRepo = core.getInput('source-repo');
    const destRepo = core.getInput('dest-repo');
    const settings = core.getInput('settings');

    const [sourceOwner, sourceRepoName] = sourceRepo.split('/');
    const [destOwner, destRepoName] = destRepo.split('/');
    
    const sourceRequest = await octokit.rest.repos.get({
        owner: sourceOwner, repo: sourceRepoName
    });
    if (sourceRequest.status != 200)
        throw new Exception('Bad API response: ' + sourceRequest.status);

    console.log("Obtained request data: \n" + JSON.stringify(sourceRequest.data));

    const refinedSettings = [];
    for (const setting of settings.split('\n')) {
        if (setting.length == 0) continue;

        const elem = sourceRequest.data[setting];
        if (elem == null) continue;
        refinedSettings.push({ name: setting, value: elem });
    }
    console.log(refinedSettings);
})();