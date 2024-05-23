<script>
	import Checkbox from '$lib/components/Checkbox.svelte';
	import Label from '$lib/components/Label.svelte';
	import { Param } from '$lib/schema/schema';
	import { useFormState } from '$lib/schema/schema.utils';

	const { form, errors, constraints } = useFormState();
	let name = Param.shouldIncludeFallbacks;
</script>

<Label
	title="Include fallback CSS"
	description="Fall back to media queries if the browser doesn't support clamp."
	layout="horizontal"
>
	<Checkbox
		name={name}
		checked={$form[name]}
		errors={$errors[name]}
		constraints={$constraints[name]}
		onInput={(e) => form.set({ ...$form, [name]: e.currentTarget.checked })}
	/>
</Label>
