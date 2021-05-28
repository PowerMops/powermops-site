<script>
	import { page } from '$app/stores';
</script>

<footer>
	<div class="corner">
	</div>

	<nav>
	</nav>

	<div class="corner">
		<a href="{'https://github.com/PowerMops/powermops-site/tree/master/src/routes' + ($page.path).substring(0, ($page.path).lastIndexOf('/'))}">Edit this page<a/>
	</div>
</footer>

<style>
	footer {
		display: flex;
		justify-content: space-between;
	}

	.corner {
		display: flex;
		align-items: flex-start;
	}
	.corner a {
		justify-content: right;
		font-weight: 300;
		font-size: 0.8rem;
		text-transform: uppercase;
		white-space: pre;
	}

	a:hover {
		color: var(--accent-color);
	}
</style>
