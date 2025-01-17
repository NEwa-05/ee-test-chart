import http from 'k6/http';
    import { sleep } from 'k6';

    export const options = {
      vus: 10,
      duration: '10s',
    };

    export default function () {
        http.get('https://whoami-0.docker.localhost/');
        sleep(1);
        http.get('https://whoami-1.docker.localhost/bench');
        sleep(1);
        http.get('https://whoami-2.docker.localhost/');
        sleep(1);
        http.get('https://whoami-3.docker.localhost/api');
        sleep(1);
        http.get('https://whoami-4.docker.localhost/');
        sleep(1);
    }