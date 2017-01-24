import server from './server';
import config from '../config';

const port = config.devApi.port;

server.listen(port, () => {
  console.log(`application started on port ${port}`); // eslint-disable-line no-console
});
