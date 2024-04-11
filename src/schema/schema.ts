import { z } from 'zod';
import typeScaleRatios from '../data/typeScaleRatios.json';
import { WithFonts } from '../types';
import { toCommaSeparatedList } from '../utils';
import { QueryParamId } from './schema.types';
import { preprocessBoolean } from './schema.utils';

/** Schema for validating and parsing all query parameters recognized by the app. Used on the server side to read query params on the /calculate route. */
export const schema = z
  .object({
    [QueryParamId.minFontSize]: z.coerce.number().min(1).default(16),
    [QueryParamId.minWidth]: z.coerce.number().min(1).default(400),
    [QueryParamId.minRatio]: z.coerce.number().min(0.1).default(typeScaleRatios.majorThird.ratio),
    [QueryParamId.maxFontSize]: z.coerce.number().min(1).default(19),
    [QueryParamId.maxWidth]: z.coerce.number().min(1).default(1280),
    [QueryParamId.maxRatio]: z.coerce
      .number()
      .min(0.1)
      .default(typeScaleRatios.perfectFourth.ratio),
    [QueryParamId.allSteps]: z.preprocess(
      // Array query params come in as strings, but we need them as runtime arrays, so preprocess split if not undefined
      (value) => (typeof value === 'undefined' ? undefined : toCommaSeparatedList(String(value))),
      z.string().array().min(1).default(['sm', 'base', 'md', 'lg', 'xl', 'xxl', 'xxxl'])
    ),
    [QueryParamId.baseStep]: z.coerce.string().min(1).default('base'),
    [QueryParamId.namingConvention]: z.coerce.string().min(1).default('fs'),
    [QueryParamId.shouldUseContainerWidth]: z.preprocess(
      preprocessBoolean,
      z.boolean().default(false)
    ),
    [QueryParamId.shouldIncludeFallbacks]: z.preprocess(
      preprocessBoolean,
      z.boolean().default(false)
    ),
    [QueryParamId.shouldUseRems]: z.preprocess(preprocessBoolean, z.boolean().default(false)),
    [QueryParamId.remValueInPx]: z.coerce.number().min(1).default(16),
    [QueryParamId.roundingDecimalPlaces]: z.coerce.number().min(0).max(10).default(2),
    [QueryParamId.previewFont]: z.coerce.string().min(1).default('Inter'),
    [QueryParamId.previewText]: z.coerce
      .string()
      .min(1)
      .default('Almost before we knew it, we had left the ground'),
    [QueryParamId.previewWidth]: z.coerce.number().min(1).default(1280),
  })
  .refine((schema) => schema[QueryParamId.minFontSize] < schema[QueryParamId.maxFontSize], {
    message: 'Min font size must be less than max font size',
    path: [QueryParamId.minFontSize],
  })
  .refine((schema) => schema[QueryParamId.minWidth] < schema[QueryParamId.maxWidth], {
    message: 'Min screen width must be less than max screen width',
    path: [QueryParamId.minWidth],
  })
  .refine((schema) => schema[QueryParamId.allSteps].includes(schema[QueryParamId.baseStep]), {
    message: 'Base font size step must appear in the list of all steps',
    path: [QueryParamId.baseStep],
  });

/** Returns all the default values for the schema. NOTE: Only works if every param has a default value. */
export const SCHEMA_DEFAULTS = schema.parse({});

/** Returns a fully refined schema, once we have additional information that is not statically available. */
export const getSchema = (data: WithFonts) => {
  return schema.refine((schema) => data.fonts.includes(schema[QueryParamId.previewFont]), {
    message: 'Unrecognized Google Font',
    path: [QueryParamId.previewFont],
  });
};

export type Schema = typeof schema | ReturnType<typeof getSchema>;
