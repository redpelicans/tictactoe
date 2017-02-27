import initServer from './server';
import createOrganizer from './organizer';
import config from '../../config';
import { loginfo } from './util';

const organizer = createOrganizer();
initServer(organizer, config)
  .then(port => loginfo(`application started on port ${port}`));
