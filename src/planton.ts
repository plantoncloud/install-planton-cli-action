import * as os from 'os';
import * as path from 'path';
import * as core from '@actions/core';
import * as tc from '@actions/tool-cache';
import * as fs from "fs";

export async function getPlantonCLI(version: string): Promise<string | Error> {
  const binaryName = `planton-cli-${version}-${os.platform()}`;
  const binaryPath = tc.find("planton", version, os.arch());

  if (binaryPath !== '') {
    core.info(`Found in cache @ ${binaryPath}`);
    return binaryPath;
  }

  core.info(`Resolving the download URL for the current platform...`);

  const downloadURL = `https://storage.googleapis.com/planton-cli/${version}/${binaryName}`;

  core.info(`Downloading planton-cli from '${downloadURL}' ...`);

  const downloadedPath = await tc.downloadTool(downloadURL);

  const cacheDir = await tc.cacheDir(path.dirname(downloadedPath), "planton", version, os.arch());

  const downloadedFilePath = path.join(cacheDir, binaryName);
  const plantonFilePath = path.join(cacheDir, "planton");

  // Rename the downloaded binary to "planton"
  fs.renameSync(downloadedFilePath, plantonFilePath);

  // Change permissions of the binary file to be executable
  fs.chmodSync(plantonFilePath, '755');

  core.info(`Successfully cached downloaded planton-cli at '${plantonFilePath}'`)

  return cacheDir;
}
