'use strict';

const hooks = require('./hooks');

class Service {
  find(params) {
    return Promise.resolve({
      method: 'find',
      params,
    });
  }
  get(id, params) {
    return Promise.resolve({
      method: 'get',
    });
  }
  create(data, params) {
    return Promise.resolve({
      method: 'create',
      data,
      params,
    });
  }
  update(id, data, params) {
    return Promise.resolve({
      method: 'update',
      id,
      data,
      params,
    });
  }
  patch(id, data, params) {
    return Promise.resolve({
      method: 'patch',
      id,
      data,
      params
    });
  }
  remove(id, params) {
    return Promise.resolve({
      method: 'remove',
      id,
      params,
    });
  }
  setup(app, path) {
    console.log('setup', path);
  }
}

module.exports = function(){
  const app = this;

  // Initialize our service with any options it requires
  app.use('/messages', new Service());

  // Get our initialize service to that we can bind hooks
  const messagesService = app.service('/messages');

  // Set up our before hooks
  messagesService.before(hooks.before);

  // Set up our after hooks
  messagesService.after(hooks.after);
};

module.exports.Service = Service;
