'use strict';

/**
 * top-service service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::top-service.top-service');
