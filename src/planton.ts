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

  // Change permissions of the downloaded binary file to be executable
  fs.chmodSync(downloadedPath, '755');

  const cacheDir = await tc.cacheDir(path.dirname(downloadedPath), "planton", version, os.arch());

  return path.join(cacheDir, binaryName);
}
