<script lang="ts">
    import { onMount } from 'svelte'
    import { graphql } from '$houdini'
    import { X } from 'lucide-svelte'
    export let techniqueName: string
    export let horizontalPos: string
    export let verticalPos: string
    /* @type { import('./$houdini').MyComponentQueryVariables } */
    export const _getTechniqueByNameVariables =  (event) => {
        return {
            techniqueName: event.props.techniqueName
        }
    }
    const techniqueQuery = graphql(`
        query getTechniqueByName($techniqueName: String!) @load {
            techniqueByName(name: $techniqueName) {
                __typename
                id
                name
                description
                image
            }
        }
    `)

    onMount(() => {
        techniqueName = ''
    })
</script>

<!-- {JSON.stringify($techniqueQuery.data?.technique)} -->
{#if $techniqueQuery.data?.techniqueByName}
<div class={`flex flex-col items-center gap-2 absolute ${horizontalPos} ${verticalPos} w-fit bg-gray-800 pt-2 pb-4 px-4 rounded-xl`}>
    <button class="absolute top-1 right-1 rounded-full p-1 hover:bg-gray-700 transform transition-colors" 
    on:click={()=>{techniqueName = ''}}
    ><X class="text-white"/></button>
    <h5 class="text-slate-100 font-title text-xl">{$techniqueQuery.data?.techniqueByName?.name}</h5>
    <picture>
        <img class="h-40 max-w-[240px]" src={$techniqueQuery.data?.techniqueByName?.image} alt="{$techniqueQuery.data?.techniqueByName?.name}" />
    </picture>
    <p class="min-w-52 max-w-64 text-center text-slate-400">{$techniqueQuery.data?.techniqueByName?.description}</p>
</div>
{/if}