import type { TypeScale } from '$lib/types';
import { clamp, toCommaSeparatedList } from '$lib/utils';
import { getContext, setContext } from 'svelte';
import { type Schema, type SchemaSuperform, FORM_CONTEXT_KEY, schema } from './schema';
import { superForm, type SuperValidated } from 'sveltekit-superforms';
import { valibot } from 'sveltekit-superforms/adapters';

export const useFormState = () => getContext<SchemaSuperform>(FORM_CONTEXT_KEY);

/** Given a form state representing user input for the various parameters, returns
 * the corresponding type scale mapping each step to its min/max/preferred font sizes.
 */
export const getTypeScale = (state: Schema): TypeScale => {
	/** Appends the correct unit to a unitless value. */
	const withUnit = (unitlessValue: number) => `${unitlessValue}${state.useRems ? 'rem' : 'px'}`;

	/** Rounds the given value to a fixed number of decimal places, according to the user's specified value. */
	const round = (val: number) => Number(val.toFixed(state.decimals));

	/** If we're using rems, converts the pixel arg to rems. Else, keeps it in pixels. */
	const convertToDesiredUnit = (px: number) => (state.useRems ? px / state.remValue : px);

	const allSteps = toCommaSeparatedList(state.steps);

	// Get the index of the base modular step to compute exponents relative to the base index (up/down)
	const baseStepIndex = allSteps.indexOf(state.baseStep);

	// Reshape the data so we map each step name to a config describing its fluid font sizing values.
	// Do this on every render because it's essentially derived state; no need for a useEffect.
	// Note that some state variables are not necessary for this calculation, but it's simple enough that it's not expensive.
	const typeScale = allSteps.reduce((steps, step, i) => {
		const min = {
			fontSize: state.minFontSize * Math.pow(state.minRatio, i - baseStepIndex),
			breakpoint: state.minWidth
		};
		const max = {
			fontSize: state.maxFontSize * Math.pow(state.maxRatio, i - baseStepIndex),
			breakpoint: state.maxWidth
		};
		const slope = (max.fontSize - min.fontSize) / (max.breakpoint - min.breakpoint);
		const slopeVw = `${round(slope * 100)}${state.useContainerWidth ? 'cqi' : 'vi'}`;
		const intercept = min.fontSize - slope * min.breakpoint;

		steps.set(step, {
			min: withUnit(round(convertToDesiredUnit(min.fontSize))),
			max: withUnit(round(convertToDesiredUnit(max.fontSize))),
			preferred: `${slopeVw} + ${withUnit(round(convertToDesiredUnit(intercept)))}`,
			getFontSizeAtScreenWidth: (width: number) => {
				let preferredFontSize = width * slope + intercept;
				preferredFontSize = clamp({
					value: preferredFontSize,
					min: min.fontSize,
					max: max.fontSize
				});
				return withUnit(round(convertToDesiredUnit(preferredFontSize)));
			}
		});
		return steps;
		// NOTE: Using a Map instead of an object to preserve key insertion order.
	}, new Map() as TypeScale);

	return typeScale;
};

/** Initializes client-side form context. */
export const initClientSideForm = (form: SuperValidated<Schema>) => {
	const superform = superForm(form, {
		validators: valibot(schema),
		validationMethod: 'auto',
		errorSelector: 'input[aria-invalid="true"]',
		// Doesn't seem to work, but docs here: https://superforms.rocks/concepts/error-handling#autofocusonerror
		autoFocusOnError: true
	});
	setContext<SchemaSuperform>(FORM_CONTEXT_KEY, superform);
};
