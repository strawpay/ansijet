"use strict";



var debug = require('debug')('ansijet-startup-template-helpers'),
  moment = require('moment');


/**
 * Load trigger types.
 *
 * This will set `app.triggerTypes`.
 *
 * @param {Object} app The application.
 */
module.exports = function*(app) {
  debug('Setting template helpers');

  app.locals = {
    _: require('lodash'),

    /**
     * Pretty-print a timestamp.
     * @param {Date|String} date The date
     */
    prettyPrintTimestamp: function(date) {
      return moment(date).format('YYYY-MMM-D HH:mm:ss');
    },

  };
};

