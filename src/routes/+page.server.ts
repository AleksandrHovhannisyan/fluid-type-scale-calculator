import { SCHEMA_DEFAULTS, schema } from '$lib/schema/schema';
import { superValidate } from 'sveltekit-superforms';
import { valibot } from 'sveltekit-superforms/adapters';

// Pre-render the index route for performance, faster load times, and to save Netlify function invocation bandwidth.
export const prerender = true;

// All we need to do for this loader is init the form with the defaults
export const load = async () => {
	const form = await superValidate(SCHEMA_DEFAULTS, valibot(schema));
	return { form };
};
