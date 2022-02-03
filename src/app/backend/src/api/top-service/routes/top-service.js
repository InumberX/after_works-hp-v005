'use strict';

/**
 * top-service router.
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::top-service.top-service');
