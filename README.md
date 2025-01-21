# ee-test-chart

ee chart test on k3d

## Create k3d cluster

### start k3d cluster

```bash
k3d cluster create ee --port 18080:18080@loadbalancer --port 18443:18443@loadbalancer --k3s-arg "--disable=traefik@server:0" --volume $(pwd)/pv-controller:/pv-controller --volume  $(pwd)/pv-registry:/pv-registry
```

### set pvc

```bash
envsubst < pv.yaml | kubectl apply -f -
```

## Deploy traefikee

### Create Namespace

```bash
kubectl create ns traefikee
```

### Set License

```bash
kubectl create secret generic $CLUSTERNAME-license --from-literal=license="${TRAEFIKEE_LICENSE}" -n traefikee
```

### Set static configuration

```bash
kubectl create configmap $CLUSTERNAME-static-config --from-file static.yaml -o yaml --dry-run=client -n traefikee | kubectl apply -f -
```

### Deploy ee from local helm chart

```bash
helm upgrade --install traefikee ~/Documents/traefik/git/traefikee-helm-chart/traefikee --values values.yaml --namespace traefikee --set cluster=${CLUSTERNAME} --set controller.staticConfig.configMap.name=${CLUSTERNAME}-static-config
```

## deploy app

```bash
for i in {0..9}; do
  export nsnumber=${i}
  envsubst < apps/whoami.yaml | kubectl apply -f -
done


## deploy k6

```bash
git clone https://github.com/grafana/k6-operator && cd k6-operator
make deploy
cd ..
```

```bash
kubectl create configmap k6-script --from-file apps/script.js -o yaml --dry-run=client | kubectl apply -f -
kubectl apply -f apps/k6.yaml
```
