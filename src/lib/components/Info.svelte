<script>
	import Link from './Link.svelte';
</script>

<div class="switcher">
	<section class="rhythm">
		<h2>How it works</h2>
		<p>
			A <Link href="https://every-layout.dev/rudiments/modular-scale/">modular type scale</Link> consists
			of a baseline font size and proportionally smaller and larger font sizes. Traditionally, design
			systems used static type scales, where each step has a fixed font size at every viewport width.
		</p>
		<p>
			By contrast, in a fluid type scale, each modular step has a minimum, maximum, and variable
			font size. We can leverage <Link
				href="https://developer.mozilla.org/en-US/docs/Web/CSS/clamp()">CSS <code>clamp</code></Link
			> and viewport width (<code>vw</code>) units to generate a set of font size variables that
			scale linearly between their minimum and maximum sizes, with mathematical precision.
		</p>
		<p>
			This is done by solving the equation <code>y = mx + b</code>, which corresponds to the
			preferred value in a CSS <code>clamp</code> declaration.
		</p>
	</section>
	<section class="rhythm">
		<h2>Learn more</h2>
		<ul class="list">
			<li>
				<Link href="https://www.aleksandrhovhannisyan.com/blog/fluid-type-scale-with-css-clamp/">
					Creating a Fluid Type Scale with CSS Clamp
				</Link> by yours truly! A deep dive into the math behind this technique.
			</li>
			<li>
				<Link href="https://modern-fluid-typography.vercel.app/">
					Modern Fluid Typography Editor
				</Link>, a handy tool by Adrian Bece that allows you to visualize a CSS <code>clamp</code> declaration.
			</li>
			<li>
				<Link href="https://type-scale.com/">Type Scale - A Visual Calculator</Link> by Jeremy Church.
			</li>
			<li>
				<Link href="https://utopia.fyi/type/calculator/">Utopia Fluid Type Scale Calculator</Link> by
				James Gilyead and Trys Mudford.
			</li>
			<li>
				<Link href="https://css-tricks.com/consistent-fluidly-scaling-type-and-spacing/">
					Consistent, Fluidly Scaling Type and Spacing
				</Link> by Andy Bell.
			</li>
		</ul>
	</section>
</div>
