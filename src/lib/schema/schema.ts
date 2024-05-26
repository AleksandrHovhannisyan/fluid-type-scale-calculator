import {
	type Input,
	object,
	string,
	number,
	minValue,
	boolean,
	regex,
	minLength,
	optional,
	maxValue,
	custom,
	forward,
	integer
} from 'valibot';
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
export const schema = object(
	{
		[Param.minFontSize]: number([minValue(1)]),
		[Param.minWidth]: number([minValue(1)]),
		[Param.minRatio]: number([minValue(Number.MIN_VALUE, "Expected positive number")]),
		[Param.maxFontSize]: number([minValue(1)]),
		[Param.maxWidth]: number([minValue(1)]),
		[Param.maxRatio]: number([minValue(Number.MIN_VALUE, "Expected positive number")]),
		[Param.allSteps]: string([
			regex(COMMA_SEPARATED_LIST_REGEX, 'Expected comma-separated list of names')
		]),
		[Param.baseStep]: string([minLength(1, "Expected non-empty value")]),
		[Param.namingConvention]: string([
			minLength(1, "Expected non-empty value"),
			regex(CSS_VARIABLE_REGEX, 'Invalid characters used')
		]),
		// IMPORTANT: Checkboxes must be marked optional because form submissions omit unchecked inputs from the POSTed FormData
		[Param.shouldUseContainerWidth]: optional(boolean()),
		[Param.shouldIncludeFallbacks]: optional(boolean()),
		[Param.shouldUseRems]: optional(boolean()),
		[Param.remValueInPx]: number([minValue(1)]),
		[Param.roundingDecimalPlaces]: number([minValue(0), maxValue(10), integer()]),
		[Param.previewFont]: string([minLength(1, "Expected non-empty value")]),
		[Param.previewText]: string([minLength(1, "Expected non-empty value")]),
		[Param.previewWidth]: number([minValue(Number.MIN_VALUE, "Expected positive number")])
	},
	[
		forward(
			custom(
				(schema) => schema[Param.minFontSize] < schema[Param.maxFontSize],
				'Min font size must be less than max font size'
			),
			[Param.minFontSize]
		),
		forward(
			custom(
				(schema) => schema[Param.minWidth] < schema[Param.maxWidth],
				'Min width must be less than max width'
			),
			[Param.minWidth]
		),
		forward(
			custom(
				(schema) => schema[Param.minRatio] < schema[Param.maxRatio],
				'Min ratio must be less than max ratio'
			),
			[Param.minRatio]
		),
		forward(
			custom((schema) => {
				const steps = toCommaSeparatedList(schema[Param.allSteps]);
				return steps.includes(schema[Param.baseStep]);
			}, 'Base step must appear in the list of all steps'),
			[Param.baseStep]
		),
		forward(
			custom((schema) => {
				const steps = toCommaSeparatedList(schema[Param.allSteps]);
				return new Set(steps).size === steps.length;
			}, 'Cannot have duplicate step names'),
			[Param.allSteps]
		),
		forward(
			custom((schema) => fonts.includes(schema[Param.previewFont]), 'Unrecognized Google font'),
			[Param.previewFont]
		)
	]
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

export type Schema = Input<typeof schema>;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type SchemaSuperform = SuperForm<Schema, any>;
export type SchemaErrors = ValidationErrors<Schema>[keyof ValidationErrors<Schema>];
export type SchemaConstraints = InputConstraints<Schema>[keyof InputConstraints<Schema>];
