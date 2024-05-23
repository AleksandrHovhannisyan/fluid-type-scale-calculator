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
	<Label>
		Base font size (px)
		<Input
			type="number"
			inputmode="decimal"
			name={Param.minFontSize}
			value={$form[Param.minFontSize]}
			errors={$errors[Param.minFontSize]}
			constraints={$constraints[Param.minFontSize]}
			onInput={(e) => form.set({ ...$form, [Param.minFontSize]: e.currentTarget.valueAsNumber })}
		/>
	</Label>
	<Label>
		{$form.useContainerWidth ? 'Container' : 'Screen'} width (px)
		<Input
			type="number"
			inputmode="decimal"
			name={Param.minWidth}
			value={$form[Param.minWidth]}
			errors={$errors[Param.minWidth]}
			constraints={$constraints[Param.minWidth]}
			onInput={(e) => form.set({ ...$form, [Param.minWidth]: e.currentTarget.valueAsNumber })}
		/>
	</Label>
	<TypeScalePicker
		name={Param.minRatio}
		value={$form[Param.minRatio]}
		errors={$errors[Param.minRatio]}
		constraints={$constraints[Param.minRatio]}
		onInput={(e) => form.set({ ...$form, [Param.minRatio]: e.currentTarget.valueAsNumber })}
	/>
</Fieldset>
