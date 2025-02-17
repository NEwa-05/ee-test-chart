#!/bin/bash

## random pod delete task
delpod () {
    IFS=$'\n' podlist=( $(kubectl get po -A |grep whoami |awk -F" " '{print $2}') )
    randpodid=$(( $RANDOM % ${#podlist[@]} ))
    kubectl delete -n $(echo ${podlist[$randpodid]}|awk -F"-" '{print $1"-"$2}') pod ${podlist[$randpodid]} 
}

## random deployment restart
rolldep () {
    IFS=$'\n' deplist=( $(kubectl get deploy -A |grep whoami |awk -F" " '{print $2}') )
    randdepid=$(( $RANDOM % ${#deplist[@]} ))
    kubectl wait --for=condition=available --timeout=60s deployment/${deplist[$randdepid]} -n $(echo ${deplist[$randdepid]}|awk -F"-" '{print $1"-"$2}')
    kubectl rollout restart -n $(echo ${deplist[$randdepid]}|awk -F"-" '{print $1"-"$2}') deployment/${deplist[$randdepid]}
}

while true; do
  sleep 1; delpod &
  sleep 1; rolldep &
done
