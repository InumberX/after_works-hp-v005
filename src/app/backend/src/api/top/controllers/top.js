'use strict';

/**
 *  top controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::top.top');
