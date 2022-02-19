
/**
 *  project controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::project.project', ({strapi}) => ({
  async find(ctx){
    return strapi.query('project').find(ctx.query, ['student', 'level']);
  }
}));


// module.exports = createCoreController('api::project.project', ({ strapi }) => ({
//   async findOne(ctx) {
//     const { id: slug } = ctx.params;
//     const { query } = ctx;

//     if (!query.filters) query.filters = {}
//     query.filters.slug = { '$eq': slug }

//     const entity = await strapi.service('api::project.project').findOne(query);
//     const { results } = await this.sanitizeOutput(entity, ctx);

//     return this.transformResponse(results[0]);
//   }
// }));
// const { createCoreController } = require('@strapi/strapi').factories;
