import { SCHEMA_DEFAULTS, schema, type Schema } from '$lib/schema/schema';
import type { Actions } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { valibot } from 'sveltekit-superforms/adapters';

// The /calculate route is strictly for link sharing and progressively enhanced form submissions. This allows the index route to be pre-rendered for SEO and performant page load.
export const prerender = false;

// Need this for POST to work
export const actions: Actions = {
	default: async () => {}
} ;

// Since this route is pre-rendered, this is essentially getStaticProps, i.e. it only runs once on build.
export const load = async ({ request, url }) => {
	let data: Schema | URLSearchParams | FormData = SCHEMA_DEFAULTS;
	// GET request
	if (request.method === 'GET') {
		// Form data optionally serialized in URL (for link sharing)
		if (url.searchParams.size) {
			data = url.searchParams;
		}
	}
	// POST request, for no-JS form submissions
	else if (request.method === 'POST') {
		data = await request.formData();
	}
	const form = await superValidate(data, valibot(schema));
	return { form };
};
