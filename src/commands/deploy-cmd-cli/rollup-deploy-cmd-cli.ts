import { getProjectDetails, getRemoveExistingEnclave } from '../../configs/project';
import { configToYAML, rollupNameToYAML } from '../../configs/to-yaml';
import { removeEnclave, saveChainInfo } from '../../utils/kurtosis';
import { deployCompleteLog, deployFailedLog, rollupConfigLog } from '../../utils/log';
import { createProjectDirectory, getProjectConfig } from '../../utils/project-manage';
import { getDockerCompose, getKurtosis, runKurtosisCommand } from '../../utils/system';
import { GetRollupConfig } from "./get-rollup-config";

export async function RollupdeployCommandCLI() {

  console.clear();
  rollupConfigLog();

  try{
    const dockerComposeTest = await getDockerCompose();
    if (!dockerComposeTest.isDockerComposeInstalled) throw('Docker Compose is not installed');

    const kurtosisTest = await getKurtosis();
    if (!kurtosisTest.isKurtosisInstalled) throw("Kurtosis is not installed");

    const projectDetails = await getProjectDetails();

    // make a directory with the project name in a project folder
    await createProjectDirectory(projectDetails.projectName);
    
    const {removeEnclaveResponse} = await getRemoveExistingEnclave();
    if (removeEnclaveResponse){
      await removeEnclave(projectDetails.projectName);
    }
  
    if (projectDetails.networkType === "devnet"){
      await deployDevnet(projectDetails);
    }
    else{ // Testnet
      await deployTestnet(projectDetails);
    }

    // save relevant chain info to the project directory
    await saveChainInfo(projectDetails.projectName);
    deployCompleteLog();
  }catch(error){ 
    deployFailedLog(String(error));
  }
}

/**
 * @internal
 */
export async function deployDevnet(projectDetails: {projectName: string, networkType: string}, signal?: AbortSignal){
  console.log("Runnning with default devnet config");
  
  // makes yaml so enclave named after rollup
  await rollupNameToYAML(projectDetails.projectName); 
  const configFile = getProjectConfig(projectDetails.projectName);



  return runKurtosisCommand(
    'kurtosis',
    [
      'run',
      './optimism-package',
      '--args-file',
      configFile,
      '--enclave', 
      projectDetails.projectName
    ],
    true,
    signal
  )
}

async function deployTestnet(projectDetails: {projectName: string, networkType: string}){

    // Get the testnet details from the user
    const postData = await GetRollupConfig(projectDetails.projectName);

    // Convert the testnet details to a YAML file
    await configToYAML(postData);


    const configFile = getProjectConfig(projectDetails.projectName);
    // Run Kurtosis using the testnet config
    return runKurtosisCommand(
      'kurtosis',
      [
        'run',
        './optimism-package',
        '--args-file',
        configFile,
        '--enclave',
        projectDetails.projectName,
      ]
    )
}
