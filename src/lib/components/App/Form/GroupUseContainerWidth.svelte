<script>
	import Checkbox from '$lib/components/Checkbox.svelte';
	import Label from '$lib/components/Label.svelte';
	import { Param } from '$lib/schema/schema';
	import { useFormState } from '$lib/schema/schema.utils';

	const { form, errors, constraints } = useFormState();
	let name = Param.shouldUseContainerWidth;
</script>

<Label
	title="Use container inline size (cqi) instead of viewport width"
	description="Note: Container queries may not be supported by all browsers."
	layout="horizontal"
>
	<Checkbox
		name={name}
		checked={$form[name]}
		errors={$errors[name]}
		constraints={$constraints[name]}
		onInput={(e) =>
			form.set({
				...$form,
				[name]: e.currentTarget.checked
			})}
	/>
</Label>
