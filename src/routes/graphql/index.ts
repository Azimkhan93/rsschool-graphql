import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema, schemaql } from './schemas.js';
import { graphql, parse, validate } from 'graphql';
import depthLimit from 'graphql-depth-limit';

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  const { prisma } = fastify;
  fastify.route({
    url: '/',
    method: 'POST',
    schema: {
      ...createGqlResponseSchema,
      response: {
        200: gqlResponseSchema,
      },
    },
    async handler(req) {
      const { query, variables } = req.body;
      const errorsVal = validate(schemaql, parse(query), [depthLimit(5)]);

      if (errorsVal.length) {
        return { errors: errorsVal };
      }

      const { data, errors } = await graphql({
        schema: schemaql,
        source: query,
        variableValues: variables,
        contextValue: {
          prisma
        }
      });
      
      return { data, errors };
    },
  });
};

export default plugin;
