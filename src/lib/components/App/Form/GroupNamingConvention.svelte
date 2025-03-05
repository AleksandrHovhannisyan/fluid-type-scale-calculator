<script>
	import Input from '$lib/components/Input.svelte';
	import Label from '$lib/components/Label.svelte';
	import { Param } from '$lib/schema/schema';
	import { useFormState } from '$lib/schema/schema.utils';

	const { form, errors, constraints } = useFormState();
</script>

<Label
	title="Variable prefix"
	description="Use your preferred naming convention for the output CSS variables. Allowed characters: a-z,A-Z,0-9,_,-"
	layout="to-horizontal"
	htmlFor={Param.namingConvention}
>
	<Input
		id={Param.namingConvention}
		name={Param.namingConvention}
		type="text"
		value={$form.prefix}
		errors={$errors.prefix}
		constraints={$constraints.prefix}
		onInput={(e) => form.set({ ...$form, prefix: e.currentTarget.value })}
	/>
</Label>
