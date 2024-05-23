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
	title="Maximum (Desktop)"
	description={`At this maximum ${
		$form.useContainerWidth ? 'container' : 'viewport'
	} width, all font sizes in your type scale are computed as the base font size times a power of your chosen ratio.`}
>
	<Label>
		Base font size (px)
		<Input
			type="number"
			inputmode="decimal"
			name={Param.maxFontSize}
			value={$form[Param.maxFontSize]}
			errors={$errors[Param.maxFontSize]}
			constraints={$constraints[Param.maxFontSize]}
			onInput={(e) =>
				form.set({ ...$form, [Param.maxFontSize]: e.currentTarget.valueAsNumber })}
		/>
	</Label>
	<Label>
		{$form.useContainerWidth ? 'Container' : 'Screen'} width (px)
		<Input
			type="number"
			inputmode="decimal"
			name={Param.maxWidth}
			value={$form[Param.maxWidth]}
			errors={$errors[Param.maxWidth]}
			constraints={$constraints[Param.maxWidth]}
			onInput={(e) =>
				form.set({ ...$form, [Param.maxWidth]: e.currentTarget.valueAsNumber })}
		/>
	</Label>
	<TypeScalePicker
		name={Param.maxRatio}
		value={$form[Param.maxRatio]}
		errors={$errors[Param.maxRatio]}
		constraints={$constraints[Param.maxRatio]}
		onInput={(e) => form.set({ ...$form, [Param.maxRatio]: e.currentTarget.valueAsNumber })}
	/>
</Fieldset>
