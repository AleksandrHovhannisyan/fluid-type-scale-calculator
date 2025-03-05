<script>
	import Fieldset from '$lib/components/Fieldset.svelte';
	import Input from '$lib/components/Input.svelte';
	import Label from '$lib/components/Label.svelte';
	import Select from '$lib/components/Select.svelte';
	import { Param } from '$lib/schema/schema';
	import { toCommaSeparatedList } from '$lib/utils';
	import { useFormState } from '$lib/schema/schema.utils';

	const { form, errors, constraints } = useFormState();
</script>

<Fieldset
	title="Type scale"
	description="Provide a comma-separated list of names for each step in your type scale, in ascending order of font size. Use any convention you want. Be sure to also identify the name of your base step."
>
	<Label title="All steps" htmlFor={Param.allSteps}>
		<Input
			id={Param.allSteps}
			name={Param.allSteps}
			type="text"
			title="Comma-separated list"
			spellcheck={false}
			value={$form[Param.allSteps]}
			errors={$errors[Param.allSteps]}
			constraints={$constraints[Param.allSteps]}
			onInput={(e) => form.set({ ...$form, [Param.allSteps]: e.currentTarget.value })}
		/>
	</Label>
	<Label title="Baseline step" htmlFor={Param.baseStep}>
		<Select
			id={Param.baseStep}
			name={Param.baseStep}
			options={toCommaSeparatedList($form[Param.allSteps]).map((step) => ({ value: step }))}
			value={$form[Param.baseStep]}
			errors={$errors[Param.baseStep]}
			constraints={$constraints[Param.baseStep]}
			onInput={(e) => form.set({ ...$form, [Param.baseStep]: e.currentTarget.value })}
		/>
	</Label>
</Fieldset>
