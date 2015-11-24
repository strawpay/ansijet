"use strict";

module.exports = function(config) {
    /** Path to folder containg Ansible playbooks */
    config.playbooks = '/playbooks';


    /** If using the ansible vault, set the path to the vault password file */
    config.vaultPasswordFile = '/root/.vault-password';

    /** Max no. of jobs to execute in parallel. Should match no. of CPU cores. */
    config.jobsInParallel = 1;
};
