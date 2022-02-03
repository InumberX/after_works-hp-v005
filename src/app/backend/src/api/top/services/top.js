'use strict';

/**
 * top service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::top.top');
