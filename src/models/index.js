// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { VersesAppData } = initSchema(schema);

export {
  VersesAppData
};