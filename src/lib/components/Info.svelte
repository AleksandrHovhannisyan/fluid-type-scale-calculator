<script>
	import Link from './Link.svelte';
</script>

<div class="switcher">
	<section class="rhythm">
		<h2>About this tool</h2>
		<p>
			Design systems traditionally used static type scales, where the steps in the scale are not
			dependent on the viewport or container width. This means that developers have to write media
			queries to switch font sizes at mobile, tablet, and desktop breakpoints. But in practice,
			there are innumerable device widths and orientations, so there are always going to be edge
			cases where your font sizes are either too large or too small.
		</p>
		<p>
			By contrast, in a fluid type scale, each step has a minimum, maximum, and variable
			(viewport-dependent) font size. We can use <Link
				href="https://developer.mozilla.org/en-US/docs/Web/CSS/clamp()">CSS <code>clamp</code></Link
			> and viewport width (<code>vw</code>) units to generate a set of font size variables that
			scale linearly. This means you no longer need to worry about fine-tuning your typography for
			discrete device widths: Just pick your minima and maxima, and the font sizes will scale
			fluidly in between.
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
