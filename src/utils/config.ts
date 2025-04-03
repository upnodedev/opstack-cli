import os from "os";
import path from "path";

export const CONFIG = {
  DEPLOYMENT_REPO: 'https://github.com/zapper-95/optimism-package.git',
  DEPLOYMENT_REPO_HASH : '53bc8d9c4235ad00e0d0226e102d633c883ff82a',
};

export const WEBSITE = {
  ENDPOINT: "https://uproll-web.vercel.app/api/configs/[id]/yaml/"
}

const UPROLL_GLOBAL_DIR = path.join(os.homedir(), "UpRoll");


export const PATH_NAME = {
  DEPLOYMENT_REPO: path.join(UPROLL_GLOBAL_DIR, "optimism-package"),
  UPROLL_CLI: UPROLL_GLOBAL_DIR,
  PROJECTS: path.join(UPROLL_GLOBAL_DIR, "projects"),
  DEVNET_CONFIGS : path.join(UPROLL_GLOBAL_DIR, "devnet_configs"),
};


export const EL_IMAGES: {[key:string]:string} = {
  "op-geth": "us-docker.pkg.dev/oplabs-tools-artifacts/images/op-geth:latest",
  "op-reth": "ghcr.io/paradigmxyz/op-reth:latest",
  "op-erigon": "testinprod/op-erigon:latest",
  "op-nethermind": "nethermind/nethermind:latest",
  "op-besu": "ghcr.io/optimism-java/op-besu:latest",
}

export const CL_IMAGES: {[key:string]:string} = {
  "op-node": "us-docker.pkg.dev/oplabs-tools-artifacts/images/op-node:develop",
  "hildr": "ghcr.io/optimism-java/hildr:latest",
}