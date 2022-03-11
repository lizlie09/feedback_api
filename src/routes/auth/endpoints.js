'use strict';
var Handlers = require('./handlers'), internals = {};

internals.endpoints = [

  // ADMIN ----------

  {
    method: ['GET'],
    path: '/MXnGLyYy9qk2a38F',
    handler: Handlers.add,
    config: {
      auth: {
        strategy: 'session',
      },
    }
  },

  {
    method: ['POST'],
    path: '/register-admin',
    options: {
      payload: {
        output: 'file',
        parse: true,
        multipart: true
      },
      handler: Handlers.register_admin,
      auth: {
        strategy: 'session',
      }
    },
  },

  {
    method: ['GET'],
    path: '/admin-login',
    handler: Handlers.adminlogin,
    config: {
      auth: {
        strategy: 'session',
        mode: 'try'
      }
    }
  },

  {
    method: ['POST'],
    path: '/admin-login',
    handler: Handlers.authenticate_admin,
    config: {
      auth: false
    }
  },

  {
    method: ['GET'],
    path: '/sign-out/admin',
    handler: Handlers.sign_out_admin,
    config: {
      auth: false
    }
  },

  // CUSTOMER ADMIN ----------

  {
    method: ['GET'],
    path: '/customer-admin-login',
    handler: Handlers.customeradminlogin,
    config: {
      auth: {
        strategy: 'session',
        mode: 'try'
      }
    }
  },

  {
    method: ['POST'],
    path: '/customer-admin-login',
    handler: Handlers.authenticate_customeradmin,
    config: {
      auth: false
    }
  },

  {
    method: ['GET'],
    path: '/sign-out',
    handler: Handlers.sign_out,
    config: {
      auth: false
    }
  },

];

module.exports = internals;
