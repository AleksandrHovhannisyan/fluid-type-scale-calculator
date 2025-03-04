import * as v from 'valibot';
import fonts from '../data/fonts.json';
import typeScaleRatios from '../data/typeScaleRatios.json';
import { COMMA_SEPARATED_LIST_REGEX, CSS_VARIABLE_REGEX } from '$lib/constants';
import { toCommaSeparatedList } from '$lib/utils';
import type { InputConstraints, SuperForm, ValidationErrors } from 'sveltekit-superforms';

export const FORM_CONTEXT_KEY = 'form-state';

/** A recognized query param ID. Also used on the front end by form inputs to set their `name` attribute to the corresponding query param. */
export enum Param {
	minFontSize = 'minFontSize',
	minWidth = 'minWidth',
	minRatio = 'minRatio',
	maxFontSize = 'maxFontSize',
	maxWidth = 'maxWidth',
	maxRatio = 'maxRatio',
	allSteps = 'steps',
	baseStep = 'baseStep',
	namingConvention = 'prefix',
	shouldUseRems = 'useRems',
	shouldUseContainerWidth = 'useContainerWidth',
	shouldIncludeFallbacks = 'includeFallbacks',
	remValueInPx = 'remValue',
	roundingDecimalPlaces = 'decimals',
	previewFont = 'previewFont',
	previewText = 'previewText',
	previewWidth = 'previewWidth'
}

/** Schema for validating and parsing all query parameters recognized by the app. Used on the server side to read query params on the /calculate route. */
export const schema = v.pipe(
	v.object({
		[Param.minFontSize]: v.pipe(v.number(), v.minValue(1)),
		[Param.minWidth]: v.pipe(v.number(), v.minValue(1)),
		[Param.minRatio]: v.pipe(v.number(), v.minValue(Number.MIN_VALUE, 'Expected positive number')),
		[Param.maxFontSize]: v.pipe(v.number(), v.minValue(1)),
		[Param.maxWidth]: v.pipe(v.number(), v.minValue(1)),
		[Param.maxRatio]: v.pipe(v.number(), v.minValue(Number.MIN_VALUE, 'Expected positive number')),
		[Param.allSteps]: v.pipe(
			v.string(),
			v.regex(COMMA_SEPARATED_LIST_REGEX, 'Expected comma-separated list of names')
		),
		[Param.baseStep]: v.pipe(v.string(), v.minLength(1, 'Expected non-empty value')),
		[Param.namingConvention]: v.pipe(
			v.string(),
			v.minLength(1, 'Expected non-empty value'),
			v.regex(CSS_VARIABLE_REGEX, 'Invalid characters used')
		),
		// IMPORTANT: Checkboxes must be marked optional because form submissions omit unchecked inputs from the POSTed FormData
		[Param.shouldUseContainerWidth]: v.pipe(v.optional(v.boolean())),
		[Param.shouldIncludeFallbacks]: v.pipe(v.optional(v.boolean())),
		[Param.shouldUseRems]: v.pipe(v.optional(v.boolean())),
		[Param.remValueInPx]: v.pipe(v.number(), v.minValue(1, 'Value must be >= 1')),
		[Param.roundingDecimalPlaces]: v.pipe(v.number(), v.minValue(0), v.maxValue(10), v.integer()),
		[Param.previewFont]: v.pipe(v.string(), v.minLength(1, 'Expected non-empty value')),
		[Param.previewText]: v.pipe(v.string(), v.minLength(1, 'Expected non-empty value')),
		[Param.previewWidth]: v.pipe(
			v.number(),
			v.minValue(Number.MIN_VALUE, 'Expected positive number')
		)
	}),
	v.forward(
		v.partialCheck(
			[[Param.minFontSize], [Param.maxFontSize]],
			(schema) => schema[Param.minFontSize] < schema[Param.maxFontSize],
			'Min font size must be less than max font size'
		),
		[Param.minFontSize]
	),
	v.forward(
		v.partialCheck(
			[[Param.minWidth], [Param.maxWidth]],
			(schema) => schema[Param.minWidth] < schema[Param.maxWidth],
			'Min width must be less than max width'
		),
		[Param.minWidth]
	),
	v.forward(
		v.partialCheck(
			[[Param.minRatio], [Param.maxRatio]],
			(schema) => schema[Param.minRatio] < schema[Param.maxRatio],
			'Min ratio must be less than max ratio'
		),
		[Param.minRatio]
	),
	v.forward(
		v.partialCheck(
			[[Param.minFontSize], [Param.maxFontSize]],
			(schema) => schema[Param.minFontSize] < schema[Param.maxFontSize],
			'Max font size must be greater than min font size'
		),
		[Param.maxFontSize]
	),
	v.forward(
		v.partialCheck(
			[[Param.minWidth], [Param.maxWidth]],
			(schema) => schema[Param.minWidth] < schema[Param.maxWidth],
			'Max width must be greater than min width'
		),
		[Param.maxWidth]
	),
	v.forward(
		v.partialCheck(
			[[Param.minRatio], [Param.maxRatio]],
			(schema) => schema[Param.minRatio] < schema[Param.maxRatio],
			'Max ratio must be greater than min ratio'
		),
		[Param.maxRatio]
	),
	v.forward(
		v.partialCheck(
			[[Param.allSteps], [Param.baseStep]],
			(schema) => {
				const steps = toCommaSeparatedList(schema[Param.allSteps]);
				return steps.includes(schema[Param.baseStep]);
			},
			'Base step must appear in the list of all steps'
		),
		[Param.baseStep]
	),
	v.forward(
		v.partialCheck(
			[[Param.allSteps]],
			(schema) => {
				const steps = toCommaSeparatedList(schema[Param.allSteps]);
				return new Set(steps).size === steps.length;
			},
			'Cannot have duplicate step names'
		),
		[Param.allSteps]
	),
	v.forward(
		v.partialCheck(
			[[Param.previewFont]],
			(schema) => fonts.includes(schema[Param.previewFont]),
			'Unrecognized Google font'
		),
		[Param.previewFont]
	)
);

/** Returns all the default values for the schema. */
export const SCHEMA_DEFAULTS: Schema = {
	[Param.minFontSize]: 16,
	[Param.minWidth]: 400,
	[Param.minRatio]: typeScaleRatios.majorThird.ratio,
	[Param.maxFontSize]: 19,
	[Param.maxWidth]: 1280,
	[Param.maxRatio]: typeScaleRatios.perfectFourth.ratio,
	[Param.allSteps]: 'sm,base,md,lg,xl,xxl,xxxl',
	[Param.baseStep]: 'base',
	[Param.namingConvention]: 'fs',
	[Param.shouldUseContainerWidth]: false,
	[Param.shouldIncludeFallbacks]: false,
	[Param.shouldUseRems]: true,
	[Param.remValueInPx]: 16,
	[Param.roundingDecimalPlaces]: 2,
	[Param.previewFont]: 'Inter',
	[Param.previewText]: 'Almost before we knew it, we had left the ground',
	[Param.previewWidth]: 1280
};

/** The default font family used by the app and shown in font pickers. */
export const DEFAULT_FONT_FAMILY = SCHEMA_DEFAULTS['previewFont'];

export type Schema = v.InferInput<typeof schema>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type SchemaSuperform = SuperForm<Schema, any>;
export type SchemaErrors = ValidationErrors<Schema>[keyof ValidationErrors<Schema>];
export type SchemaConstraints = InputConstraints<Schema>[keyof InputConstraints<Schema>];
