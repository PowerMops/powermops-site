<script>
	import { page } from '$app/stores';
	import logo from './Logo.png';
</script>

<header>
	<div class="corner">
		<div>
			<a href="/"><img src={logo} alt="Powermops"></a>
		</div>
		<div>
			<h1>Mops</h1>
			{#if ($page.path).startsWith('/pmops/')}
			<h2>Powermops</h2>
			{:else if ($page.path).startsWith('/amops/')}
			<h2>aMops</h2>
			{:else}
			<h2>aMops, iMops, Powermops</h2>
			{/if}
		</div>
	</div>

	<nav>
	</nav>

	<div class="corner">
		<nav>
			<ul>
				<li class:active={$page.path === '/'}><a sveltekit:prefetch href="/">Home</a></li>
				<li class:active={false}><a href="http://wiki.powermops.org/">Powermops wiki</a></li>
				<li class:active={false}><a href="https://SourceForge.net/projects/powermops/">SourceForge</a></li>
			</ul>
		</nav>
	</div>
</header>

<style>
	header {
		display: flex;
		justify-content: space-between;
	}

	.corner {
		display: flex;
		align-items: flex-start;
	}
	.corner a {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
	}

	.corner h1, .corner h2 {
		text-align: left;
		margin: 0;
	}
	.corner img {
		width: 5em;
		height: 5em;
		object-fit: contain;
		margin-right: 2em;
	}

	nav {
		display: flex;
		justify-content: center;
		--background: rgba(255, 255, 255, 0.7);
	}

	ul {
		position: relative;
		padding: 0;
		margin: 0;
		height: 3em;
		display: flex;
		justify-content: center;
		align-items: center;
		list-style: none;
		background: var(--background);
		background-size: contain;
	}

	li {
		position: relative;
		height: 100%;
	}

	li.active::before {
		--size: 6px;
		content: '';
		width: 0;
		height: 0;
		position: absolute;
		top: 0;
		left: calc(50% - var(--size));
		border: var(--size) solid transparent;
		border-top: var(--size) solid var(--accent-color);
	}

	nav a {
		display: flex;
		height: 100%;
		align-items: center;
		padding: 0 1em;
		color: var(--heading-color);
		font-weight: 700;
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 10%;
		text-decoration: none;
		transition: color 0.2s linear;
	}

	a:hover {
		color: var(--accent-color);
	}
</style>
