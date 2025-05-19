import inquirer from "inquirer";
import { colors } from "../utils/colors";


export async function getDaConfig(postData: { [key: string]: any }) {
    console.log(colors.fg.yellow, "Data Availability", colors.reset);
    const altda_deploy_config: {[key:string]:any} = {};
    const da_server_params: {[key:string]:any} = {};

    const dataAvailability = await inquirer.prompt([
      {
        type: "list",
        name: "da_type",
        message: "Select a Data Availability Type:",
        choices: ["auto", "blobs", "calldata", "custom"],
        default: "auto",
      },
      {
        type: "number",
        name: "da_batch_submission_frequency",
        message: "Enter the Batcher Submission Frequency (minutes):",
        validate: (input) => (input ? true : "Batcher Submission Frequency cannot be empty."),
        default: 1,
      }
    ]);
    
    altda_deploy_config["use_altda"] = false;
    altda_deploy_config["da_type"] = dataAvailability.da_type;
    altda_deploy_config["da_batch_submission_frequency"] = dataAvailability.da_batch_submission_frequency;
    
    if (altda_deploy_config["da_type"] === "custom") {
      // No da provider and alt da enabled if using custom

      altda_deploy_config["use_altda"] = true;
      const customDA = await inquirer.prompt([
        {
          type: "input",
          name: "server_endpoint",
          message: "Enter the DA Server Endpoint:",
          validate: (input) => (input ? true : "DA Server Endpoint cannot be empty."),
        },
        {
          type: "list",
          name: "commitment_type",
          message: "Select a Commitment Type:",
          choices: ["GenericCommitment", "KeccakCommitment"],
          default: "GenericCommitment",
        }
      ]);
   
    da_server_params["server_endpoint"] = customDA.server_endpoint;
    altda_deploy_config["da_commitment_type"] = customDA.commitment_type;
  
    if (altda_deploy_config["da_commitment_type"] === "GenericCommitment") {
      const genericCommitmentConfig = await inquirer.prompt([
      {
        type: "input",
        name: "da_challenge_contract_address",
        message: "Enter the DA Challenge Contract Address:",
        validate: (input) => (input ? true : "DA Challenge Contract Address cannot be empty."),
      },
      ]);
      altda_deploy_config["da_challenge_contract_address"] = genericCommitmentConfig.da_challenge_contract_address;
    }
  
    const daCustomConfig = await inquirer.prompt([
      {
      type: "number",
      name: "da_challenge_window",
      message: "Enter the DA Challenge Window:",
      validate: (input) => (input ? true : "DA Challenge Window cannot be empty."),
      default: 100,
      },
      {
      type: "number",
      name: "da_resolve_window",
      message: "Enter the DA Resolve Window:",
      validate: (input) => (input ? true : "DA Resolve Window cannot be empty."),
      default: 100,
      },
      {
      type: "number",
      name: "da_bond_size",
      message: "Enter the DA Bond Size:",
      validate: (input) => (input ? true : "DA Bond Size cannot be empty."),
      default: 10000,
      },
      {
      type: "number",
      name: "da_resolver_refund_percentage",
      message: "Enter the DA Refund Percentage:",
      validate: (input) => (Number(input) >= 0 && Number(input) <= 100 ? true : "DA Refund Percentage should be between 0 and 100."),
      default: 0,
      }
    ]);
    altda_deploy_config["da_challenge_window"] = daCustomConfig.da_challenge_window;
    altda_deploy_config["da_resolve_window"] = daCustomConfig.da_resolve_window;
    altda_deploy_config["da_bond_size"] = daCustomConfig.da_bond_size;
    altda_deploy_config["da_resolver_refund_percentage"] = daCustomConfig.da_resolver_refund_percentage;
    }
    postData.altda_deploy_config = altda_deploy_config;
    postData.da_server_params = da_server_params;
}