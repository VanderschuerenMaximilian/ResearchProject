<script lang="ts">
import Header from "$lib/components/Header.svelte";
</script>

<svelte:head>
	<title>Karate Learn</title>
	<meta name="description" content="The landingpage of Karate Learn" />
</svelte:head>

<div class='font-body w-screen h-screen bg-gray-50 dark:bg-slate-800 text-black dark:text-slate-50'>
  <Header />
  <div class="space-y-4 max-w-2xl ml-[10%] pt-44">
    <h1 class="font-title font-bold text-7xl max-w-64">Karate Learn</h1>
    <p class="max-w-md">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi faucibus nec diam et accumsan. Nam condimentum dui a ligula blandit, nec luctus nibh dapibus. Donec ultricies, ante eget volutpat congue, turpis leo bibendum turpis, sagittis malesuada risus libero et nisl. Aliquam erat volutpat. Mauris a arcu quis lectus 
    </p>
    <div><a href="/learn"
      class="bg-red-700 hover:bg-red-800 dark:bg-red-600 dark:hover:bg-red-700 transform transition-colors duration-200 px-6 py-4 rounded-lg text-slate-50
      text-lg font-title shadow-lg">Learn now</a></div>
  </div>
</div>