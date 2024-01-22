<script lang="ts">
    import { graphql } from '$houdini'
    export let techniqueId: string
    /* @type { import('./$houdini').MyComponentQueryVariables } */
    export const _TechniqueVariables =  (event) => {
        return {
            techniqueId: event.props.techniqueId
        }
    }
    const techniqueQuery = graphql(`
        query Technique($techniqueId: ID!) @load {
            technique(id: $techniqueId) {
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
<div class="w-fit bg-red-400 p-2">
    <img src={$techniqueQuery.data?.technique?.image} alt="{$techniqueQuery.data?.technique?.name}" />
</div>