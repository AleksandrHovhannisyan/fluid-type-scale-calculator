<script>
	import Input from '$lib/components/Input.svelte';
	import Label from '$lib/components/Label.svelte';
	import { Param } from '$lib/schema/schema';
	import { useFormState } from '$lib/schema/schema.utils';

	const { form, errors, constraints } = useFormState();
</script>

<Label
	title="Rounding"
	description="The maximum number of decimal places in the output."
	layout="to-horizontal"
>
	<Input
		name={Param.roundingDecimalPlaces}
		type="number"
		step={1}
		value={$form.decimals}
		errors={$errors.decimals}
		constraints={$constraints.decimals}
		onInput={(e) => form.set({ ...$form, decimals: e.currentTarget.valueAsNumber })}
	/>
</Label>
