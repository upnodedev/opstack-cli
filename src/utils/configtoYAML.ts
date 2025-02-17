

export function configToYAML(postData: {[key: string]: any}) {
    const fs = require('fs');
    const yaml = require('js-yaml');
    console.log(postData);
    let data =  {
        "optimism_package": {
          "observability": {
            "enabled": true,
            "prometheus_params": {
              "storage_tsdb_retention_time": "1d",
              "storage_tsdb_retention_size": "512MB",
              "min_cpu": 10,
              "max_cpu": 1000,
              "min_mem": 128,
              "max_mem": 2048,
              "image": "prom/prometheus:latest"
            },
            "grafana_params": {
              "dashboard_sources": [],
              "min_cpu": 10,
              "max_cpu": 1000,
              "min_mem": 128,
              "max_mem": 2048,
              "image": "grafana/grafana:latest"
            }
          },
          "interop": {
            "enabled": false,
            "supervisor_params": {
              "image": "",
              "dependency_set": "",
              "extra_params": []
            }
          },
          "altda_deploy_config": {
            "use_altda": false,
            "da_commitment_type": "KeccakCommitment",
            "da_challenge_window": 100,
            "da_resolve_window": 100,
            "da_bond_size": 0,
            "da_resolver_refund_percentage": 0
          },
          "chains":
            {
              "participants":
                {
                  "el_type": "op-geth",
                  "el_image": "",
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
                  "cl_image": "",
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
                  "el_builder_type": "",
                  "el_builder_image": "",
                  "cl_builder_type": "",
                  "cl_builder_image": "",
                  "node_selectors": {},
                  "tolerations": [],
                  "count": 1
                }
              ,
              "network_params": {
                "network": "kurtosis",
                "network_id": "2151908",
                "seconds_per_slot": 2,
                "name": "op-kurtosis",
                "fjord_time_offset": 0,
                "granite_time_offset": 0,
                "holocene_time_offset": "",
                "isthmus_time_offset": "",
                "interop_time_offset": "",
                "fund_dev_accounts": true
              },
              "batcher_params": {
                "image": "",
                "extra_params": []
              },
              "challenger_params": {
                "image": "",
                "extra_params": [],
                "cannon_prestates_path": "static_files/prestates",
                "cannon_prestates_url": ""
              },
              "proposer_params": {
                "image": "",
                "extra_params": [],
                "game_type": 1,
                "proposal_internal": "10m"
              },
              "mev_params": {
                "rollup_boost_image": "",
                "builder_host": "",
                "builder_port": ""
              },
              "additional_services": [],
              "da_server_params": {
                "image": "us-docker.pkg.dev/oplabs-tools-artifacts/images/da-server:latest",
                "cmd": [
                  "da-server",
                  "--file.path=/home",
                  "--addr=0.0.0.0",
                  "--port=3100",
                  "--log.level=debug"
                ]
              }
            }
          ,
          "op_contract_deployer_params": {
            "image": "us-docker.pkg.dev/oplabs-tools-artifacts/images/op-deployer:v0.0.11",
            "l1_artifacts_locator": "https://storage.googleapis.com/oplabs-contract-artifacts/artifacts-v1-c193a1863182092bc6cb723e523e8313a0f4b6e9c9636513927f1db74c047c15.tar.gz",
            "l2_artifacts_locator": "https://storage.googleapis.com/oplabs-contract-artifacts/artifacts-v1-c193a1863182092bc6cb723e523e8313a0f4b6e9c9636513927f1db74c047c15.tar.gz"
          },
          "global_log_level": "info",
          "global_node_selectors": {},
          "global_tolerations": [],
          "persistent": false
        },
        "ethereum_package": {
          "network_params": {
            "preset": "minimal",
            "genesis_delay": 5,
            "additional_preloaded_contracts": " { \"0x4e59b44847b379578588920cA78FbF26c0B4956C\": { \"balance\": \"0ETH\", \"code\": \"0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe03601600081602082378035828234f58015156039578182fd5b8082525050506014600cf3\", \"storage\": {}, \"nonce\": \"1\" } } "
          }
        }
      };

    let yamlStr = yaml.safeDump(data);
    fs.writeFileSync('data-out.yaml', yamlStr, 'utf8');

}