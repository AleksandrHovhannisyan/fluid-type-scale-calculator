<script>
	import Checkbox from '$lib/components/Checkbox.svelte';
	import Input from '$lib/components/Input.svelte';
	import Label from '$lib/components/Label.svelte';
	import { Param } from '$lib/schema/schema';
	import { useFormState } from '$lib/schema/schema.utils';

	const { form, errors, constraints } = useFormState();
</script>

<Label
	title="Use rems instead of pixels for font size"
	description="It's recommended that you use rems for font size to respect user preferences in browser settings."
	layout="horizontal"
	htmlFor={Param.shouldUseRems}
>
	<Checkbox
		id={Param.shouldUseRems}
		name={Param.shouldUseRems}
		checked={$form[Param.shouldUseRems]}
		errors={$errors[Param.shouldUseRems]}
		constraints={$constraints[Param.shouldUseRems]}
		onInput={(e) => form.set({ ...$form, [Param.shouldUseRems]: e.currentTarget.checked })}
	/>
</Label>
<Label
	title="Rem value (pixels)"
	description="The pixel value of 1rem. Defaults to 16px in all browsers but can be changed with CSS. For example, if you set your root font size to 62.5%, then 1rem equals 10px."
	layout="to-horizontal"
	isHidden={!$form.useRems}
	htmlFor={Param.remValueInPx}
>
	<Input
		id={Param.remValueInPx}
		name={Param.remValueInPx}
		type="number"
		step={1}
		value={$form[Param.remValueInPx]}
		errors={$errors[Param.remValueInPx]}
		constraints={$constraints[Param.remValueInPx]}
		onInput={(e) => form.set({ ...$form, [Param.remValueInPx]: e.currentTarget.valueAsNumber })}
	/>
</Label>
