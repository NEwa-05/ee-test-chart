import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  insecureSkipTLSVerify: true,
  discardResponseBodies: true,
  hosts: {
    "whoami-0.docker.localhost": "192.168.1.21",
    "whoami-1.docker.localhost": "192.168.1.21",
    "whoami-2.docker.localhost": "192.168.1.21",
    "whoami-3.docker.localhost": "192.168.1.21",
    "whoami-4.docker.localhost": "192.168.1.21",
    "whoami-5.docker.localhost": "192.168.1.21",
    "whoami-6.docker.localhost": "192.168.1.21",
    "whoami-7.docker.localhost": "192.168.1.21",
    "whoami-8.docker.localhost": "192.168.1.21",
    "whoami-9.docker.localhost": "192.168.1.21",
  },
  scenarios: {
    contacts: {
      executor: 'constant-arrival-rate',
      duration: '10m',
      rate: 1000,
      timeUnit: '1s',
      preAllocatedVUs: 5,
      maxVUs: 20,
    },
  },
};

export default function () {
  http.get('https://whoami-1.docker.localhost:18443/bench');
  sleep(0.5);
  http.get('https://whoami-2.docker.localhost:18443/');
  sleep(0.5);
  http.get('https://whoami-3.docker.localhost:18443/api');
  sleep(0.5);
  http.get('https://whoami-4.docker.localhost:18443/');
  sleep(0.5);
  http.get('https://whoami-5.docker.localhost:18443/');
  sleep(0.5);
  http.get('https://whoami-6.docker.localhost:18443/');
  sleep(0.5);
  http.get('https://whoami-7.docker.localhost:18443/');
  sleep(0.5);
  http.get('https://whoami-8.docker.localhost:18443/');
  sleep(0.5);
  http.get('https://whoami-9.docker.localhost:18443/');
  sleep(0.5);
}