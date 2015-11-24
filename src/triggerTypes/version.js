"use strict";


var _ = require('lodash'),
  URL = require('url'),
  util = require('util');


var waigo = require('waigo'),
  TriggerType = waigo.load('support/triggerType'),
  urlUtils = waigo.load('support/urlUtils');



var Version = module.exports = function() {
  TriggerType.call(this, 'Trigger deployments to Version');
};
util.inherits(Version, TriggerType);



/**
 * @override
 */
Version.prototype.ansibleVariables = function() {
  return {
    expected_inventory: {
      type: 'config',
      desc: 'The the inventory file relative to /playbooks',
      value: '$INVENTORY'
    },
    version: {
      type: 'query',
      desc: 'A version variable to be used by the playbook'
    },
    inventory: {
      type: 'query',
      desc: 'The the inventory file relative to /playbooks must match expected_inventory',
      value: '$INVENTORY'
    }
  };
};




/**
 * Process given request.
 *
 * @override
 */
Version.prototype.process = function*(configParams, queryParams) {
  queryParams = _.extend({}, queryParams);

  if (configParams.expected_inventory !== queryParams.inventory) {
    return {
      proceed: false,
      msg: 'Wrong inventory, expected ' + configParams.expected_inventory + ' got ' + queryParams.inventory
    };
  }

  return {
    proceed: true,
    ansibleVars: {
      inventory: configParams.expected_inventory,
      version: queryParams.version,
    }
  };
};







