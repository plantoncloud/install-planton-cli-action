import * as os from "os";
import * as path from "path";
import * as core from "@actions/core";
import * as tc from "@actions/tool-cache";
import { Octokit } from "@octokit/core";
import { Error, isError } from "./error";
import { HttpsProxyAgent } from "https-proxy-agent";

const versionPrefix = "v";

export async function getPlantonCLI(
    version: string,
    githubToken: string
): Promise<string | Error> {
  const binaryPath = tc.find("planton-cli", version, os.arch());
  if (binaryPath !== "") {
    core.info(`Found in cache @ ${binaryPath}`);
    return binaryPath;
  }

  core.info(`Resolving the download URL for the current platform...`);
  const downloadURL = await getDownloadURL(version, githubToken);
  if (isError(downloadURL)) {
    return downloadURL;
  }

  // ... the rest of the code to download and cache Planton CLI

  return cacheDir;
}

async function getDownloadURL(
    version: string,
    githubToken: string
): Promise<string | Error> {

  // Handle your specific architecture/platform/binaries as required...

  // Change the owner and repo to match the repository where Planton CLI is hosted
  const octokit = new Octokit({
    auth: githubToken,
    request: {
      agent: requestAgent,
    },
  });

  // Update the repository details to the correct owner and repository name
  const { data: releases } = await octokit.request(
      "GET /repos/{owner}/{repo}/releases",
      {
        owner: "your-github-username",
        repo: "planton-cli",
        per_page: 1,
      }
  );

  // The rest of the code to locate the appropriate asset and return the download URL...
}

function releaseTagForVersion(version: string): string {
  if (version.indexOf(versionPrefix) === 0) {
    return version;
  }
  return versionPrefix + version;
}
