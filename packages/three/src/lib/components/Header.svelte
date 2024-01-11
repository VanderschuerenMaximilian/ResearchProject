<script lang="ts">
    import logo from '$lib/images/icon.png'
    import { Moon, Sun } from 'lucide-svelte'
    import { darkmode } from '$lib/composables/darkmode'

    function toggleDarkMode() {
        document.body.classList.toggle('dark')
        $darkmode = !$darkmode
    }
</script>

<header class="py-4 px-16 flex justify-between">
    <a href="/" class="focus:ring-offset-2 dark:focus:ring-offset-slate-900 rounded-md focus:outline-none focus:ring-red-700 focus:ring-2 dark:focus:ring-red-600">
        <div class="flex gap-3 max-w-36 items-center">
            <div class="block relative w-full h-12">
                <picture>
                    <source srcset={logo} type="image/png" class="" />
                    <img src={logo} alt="Logo" class="absolute h-full top-0 block"/>
                </picture>
            </div>
            <span class="text-xl font-bold">Karate Learn</span>
        </div>
    </a>
    <ul class="flex gap-12 items-center">
        <li><a href="/train" class="relative text-lg w-fit block 
            after:block after:content-[''] after:absolute after:h-[3px] after:bg-red-700 after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center
            focus:outline-none focus:ring-offset-2 dark:focus:ring-offset-slate-900 focus:ring-2 focus:ring-red-700 dark:ring-red-600 rounded-lg">
            Train</a></li>
        <li><a href="/learn" class="relative text-lg w-fit block 
            after:block after:content-[''] after:absolute after:h-[3px] after:bg-red-700 after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-center
            focus:outline-none focus:ring-offset-2 dark:focus:ring-offset-slate-900 focus:ring-2 focus:ring-red-700 dark:ring-red-600 rounded-lg">
            Learn</a></li>
        <button 
            on:click={toggleDarkMode}
            title="Darkmode toggle"
            class="w-16 h-8 rounded-full p-1 bg-gray-200 dark:bg-gray-400 relative transition-colors duration-500 ease-in focus:outline-none focus:ring-2 focus:ring-red-700 dark:focus:ring-red-600 focus:border-transparent">
            <div class="relative 
            ml-0
            mr-8 
            dark:ml-8
            dark:mr-0 
            pointer-events-none 
            transition-all 
            duration-500 
            ease-out
            rounded-full
            p-1">
                {#if $darkmode}
                <Moon class="w-4 h-4 text-black dark:text-slate-50 transform transition-colors duration-300"/>
                {:else}
                <Sun class="w-4 h-4 text-black dark:text-slate-50 transform transition-colors duration-300"/>
                {/if}
            </div>
        </button>
    </ul>
</header>