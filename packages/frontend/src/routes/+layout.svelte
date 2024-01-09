<script>
	import Header from './Header.svelte';
	import '../app.css';
</script>

<div class="flex flex-col min-h-screen font-body">
	<!-- <Header /> -->

	<main class="flex-1 flex flex-col w-full my-0 mx-auto box-border">
		<slot />
	</main>

	<!-- <footer class="w-full flex justify-center">
		<p>no special footer</p>
	</footer> -->
</div>