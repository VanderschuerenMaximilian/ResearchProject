<script lang="ts">
import type { PageData } from "$houdini"
export let data: PageData
$: ({ Techniquee } = data)
$: technique = $Techniquee.data.technique
</script>

<div>
    {#if $Techniquee.fetching}
        <p>Fetching</p>
    {:else if $Techniquee.error}
        <p>Error</p>
    {:else if $Techniquee.data}
        {technique.name}
    {/if}
</div>