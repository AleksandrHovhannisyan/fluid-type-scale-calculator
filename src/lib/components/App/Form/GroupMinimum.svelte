<script>
	import Fieldset from '$lib/components/Fieldset.svelte';
	import Input from '$lib/components/Input.svelte';
	import Label from '$lib/components/Label.svelte';
	import TypeScalePicker from '$lib/components/TypeScalePicker.svelte';
	import { Param } from '$lib/schema/schema';
	import { useFormState } from '$lib/schema/schema.utils';

	const { form, errors, constraints } = useFormState();
</script>

<Fieldset
	title="Minimum (Mobile)"
	description={`At this minimum ${
		$form.useContainerWidth ? 'container' : 'viewport'
	} width, all font sizes in your type scale are computed as the base font size times a power of your chosen ratio.`}
>
	<Label title="Base font size (px)" htmlFor={Param.minFontSize}>
		<Input
			id={Param.minFontSize}
			name={Param.minFontSize}
			type="number"
			inputmode="decimal"
			value={$form[Param.minFontSize]}
			errors={$errors[Param.minFontSize]}
			constraints={$constraints[Param.minFontSize]}
			onInput={(e) => form.set({ ...$form, [Param.minFontSize]: e.currentTarget.valueAsNumber })}
		/>
	</Label>
	<Label
		title={`${$form.useContainerWidth ? 'Container' : 'Screen'} width (px)`}
		htmlFor={Param.minWidth}
	>
		<Input
			id={Param.minWidth}
			name={Param.minWidth}
			type="number"
			inputmode="decimal"
			value={$form[Param.minWidth]}
			errors={$errors[Param.minWidth]}
			constraints={$constraints[Param.minWidth]}
			onInput={(e) => form.set({ ...$form, [Param.minWidth]: e.currentTarget.valueAsNumber })}
		/>
	</Label>
	<TypeScalePicker
		id={Param.minRatio}
		name={Param.minRatio}
		value={$form[Param.minRatio]}
		errors={$errors[Param.minRatio]}
		constraints={$constraints[Param.minRatio]}
		onInput={(e) => form.set({ ...$form, [Param.minRatio]: e.currentTarget.valueAsNumber })}
	/>
</Fieldset>
