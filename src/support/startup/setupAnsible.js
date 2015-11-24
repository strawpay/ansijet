"use strict";


var _ = require('lodash'),
  debug = require('debug')('ansijet-startup-ansible'),
  fs = require('then-fs'),
  path = require('path'),
  thunkify = require('thunkify'),
  waigo = require('waigo');

var exec = waigo.load('support/exec-then');


/**
 * Setup Ansible playbooks.
 *
 * @param {Object} app The application.
 */
module.exports = function*(app) {
  debug('Finding ansible-playbook binary');

  try {
    var result = yield exec('which ansible-playbook');

    app.config.ansiblePlaybookBin = (result.stdout || '').trim();

    if ('' === app.config.ansiblePlaybookBin) {
      throw new Error('Not found');
    }
  } catch (err) {
    throw new Error('Unable to find ansible-playbook binary', err);
  }

  app.logger.info('Ansible playbook binary: ' + app.config.ansiblePlaybookBin);

  debug('Loading Ansible playbooks');

  var files = yield fs.readdir(app.config.playbooks);

  for (var i = 0; files.length > i; ++i) {
    var file = files[i];

    // assume all .yml/.yaml files in this folder are playbooks
    var ext = path.extname(file).toLowerCase()
    if ('.yml' === ext || '.yaml' === ext) {
      var name = path.basename(file, ext);

      debug('Playbook found: ' + name);

      var obj = yield app.models.Playbook.findOne({name: name}).exec();

      if (!obj) {
        debug('Adding to db: ' + name);

        obj = new app.models.Playbook({
          name: name,
          path: path.join(app.config.playbooks, file)
        });        

        yield thunkify(obj.save).call(obj);
      }
    }
  }
};
