<script lang="ts">
    import { graphql } from '$houdini'
    export let techniqueName: string
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
</script>

<!-- {JSON.stringify($techniqueQuery.data?.technique)} -->
<div class="flex flex-col items-center gap-2 absolute right-0 mr-4 mt-4 w-fit bg-gray-800 pt-2 pb-4 px-4 rounded-xl">
    <h5 class="text-slate-100 font-title text-xl">{$techniqueQuery.data?.techniqueByName?.name}</h5>
    <picture>
        <img class="h-40 max-w-[240px]" src={$techniqueQuery.data?.techniqueByName?.image} alt="{$techniqueQuery.data?.techniqueByName?.name}" />
    </picture>
    <p class="min-w-52 max-w-64 text-center text-slate-400">{$techniqueQuery.data?.techniqueByName?.description}</p>
</div>