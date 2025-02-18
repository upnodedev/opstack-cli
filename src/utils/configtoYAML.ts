
export function configToYAML(postData: {[key: string]: any}) {
    const fs = require('fs');
    const YAML = require('yaml');
    console.log(postData);
    let data =  {
      "optimism_package": {
        "chains": [
          {
            "participants": [
              {
                "el_type": "op-geth",
                "el_log_level": "",
                "el_extra_env_vars": {},
                "el_extra_labels": {},
                "el_extra_params": [],
                "el_tolerations": [],
                "el_volume_size": 0,
                "el_min_cpu": 0,
                "el_max_cpu": 0,
                "el_min_mem": 0,
                "el_max_mem": 0,
                "cl_type": "op-node",
                "cl_log_level": "",
                "cl_extra_env_vars": {},
                "cl_extra_labels": {},
                "cl_extra_params": [],
                "cl_tolerations": [],
                "cl_volume_size": 0,
                "cl_min_cpu": 0,
                "cl_max_cpu": 0,
                "cl_min_mem": 0,
                "cl_max_mem": 0,
                "node_selectors": {},
                "tolerations": [],
                "count": 1
              }
            ],
            "network_params": {
              "network": "kurtosis",
              "network_id": "2151908",
              "seconds_per_slot": 2,
              "name": "op-kurtosis",
              "fjord_time_offset": 0,
              "granite_time_offset": 0,
              "fund_dev_accounts": true
            },
            "batcher_params": {
              "extra_params": []
            },
            "mev_params": {
              "builder_host": "",
              "builder_port": ""
            },
            "additional_services": []
          }
        ],
        "op_contract_deployer_params": {
          "image": "us-docker.pkg.dev/oplabs-tools-artifacts/images/op-deployer:v0.0.12",
          "l1_artifacts_locator": "https://storage.googleapis.com/oplabs-contract-artifacts/artifacts-v1-fffcbb0ebf7f83311791534a41e65ef90df47797f9ca8f86941452f597f7128c.tar.gz",
          "l2_artifacts_locator": "https://storage.googleapis.com/oplabs-contract-artifacts/artifacts-v1-fffcbb0ebf7f83311791534a41e65ef90df47797f9ca8f86941452f597f7128c.tar.gz"
        },
        "global_log_level": "info",
        "global_node_selectors": {},
        "global_tolerations": [],
        "persistent": false
      },
      "ethereum_package": {
        "participants": [
          {
            "el_type": "geth",
            "cl_type": "teku"
          }
        ],
        "network_params": {
          "preset": "minimal",
          "genesis_delay": 5,
          "additional_preloaded_contracts": " { \"0x4e59b44847b379578588920cA78FbF26c0B4956C\": { \"balance\": \"0ETH\", \"code\": \"0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe03601600081602082378035828234f58015156039578182fd5b8082525050506014600cf3\", \"storage\": {}, \"nonce\": \"1\" } } "
        }
      }
    };

    let yamlStr = YAML.stringify(data);
    fs.writeFileSync('data-out.yaml', yamlStr, 'utf8');
    
    // let yamlStr = yaml.safeDump(data);
    // fs.writeFileSync('data-out.yaml', yamlStr, 'utf8');

}