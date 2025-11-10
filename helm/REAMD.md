kubectl create namespace besu

helm install genesis ./charts/besu-genesis --namespace besu --create-namespace --values ./values/genesis-besu.yml


helm install bootnode-1 ./charts/besu-node --namespace besu --values ./values/bootnode.yml
helm install bootnode-2 ./charts/besu-node --namespace besu --values ./values/bootnode.yml


helm install validator-1 ./charts/besu-node --namespace besu --values ./values/validator.yml
helm install validator-2 ./charts/besu-node --namespace besu --values ./values/validator.yml
helm install validator-3 ./charts/besu-node --namespace besu --values ./values/validator.yml
helm install validator-4 ./charts/besu-node --namespace besu --values ./values/validator.yml


helm install rpc-1 ./charts/besu-node --namespace besu --values ./values/reader.yml
helm upgrade rpc-1 ./charts/besu-node --namespace besu --values ./values/reader.yml


kubectl create ns blockscout

helm install blockscout-visualizer ./charts/blockscout-visualizer --namespace blockscout

helm install blockscout ./charts/blockscout --namespace blockscout 

helm install blockscout-stats ./charts/blockscout-stats --namespace blockscout

helm install blockscout-frontend ./charts/blockscout-frontend --namespace blockscout



