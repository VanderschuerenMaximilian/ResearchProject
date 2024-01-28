<script lang="ts">
import Header from "$lib/components/Header.svelte";
</script>

<svelte:head>
	<title>Karate Learn</title>
	<meta name="description" content="The landingpage of Karate Learn" />
</svelte:head>

<div class='font-body w-screen h-screen bg-gray-50 dark:bg-slate-800 text-black dark:text-slate-50'>
  <Header />
  <div class="flex flex-col items-center justify-center gap-6 h-4/5">
    <picture class="rounded-full p-12 dark:bg-gray-600" style="box-shadow: 0px 0px 75px rgba(248, 250, 252, 0.4)">
      <img src="landingpage.png" alt="Karate Learn" class="">
    </picture>
    <div class="flex flex-col items-center gap-10">
      <p class="slogan max-w-lg text-3xl text-center font-title font-medium">
        Where 3D Innovation Meets Martial Arts Mastery
      </p>
      <div><a href="/learn"
        class="bg-red-700 hover:bg-red-800 dark:bg-red-600 dark:hover:bg-red-700 transform transition-colors duration-200 px-6 py-4 rounded-lg text-slate-50
        text-lg font-title shadow-lg">Learn now</a></div>
    </div>
  </div>
</div>

<style>
  .slogan {
    text-shadow: 0px 5px 15px rgba(248, 250, 252, 0.4);
  }
</style>