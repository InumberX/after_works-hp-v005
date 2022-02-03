'use strict';

/**
 *  top-service controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::top-service.top-service');
