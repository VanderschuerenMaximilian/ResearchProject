<script lang="ts">
    import { graphql } from '$houdini'

    /* @type { import('./$houdini').MyComponentQueryVariables } */
    export const _TechniqueVariables =  ({ props }) => {
        console.log(props)
        return { id: props.id }
    }
    const techniqueQuery = graphql(`
        query Technique {
            technique(id: "65a52d20b4ae0928e94e889f") {
                __typename
                id
                name
                description
                image
            }
        }
    `)
</script>