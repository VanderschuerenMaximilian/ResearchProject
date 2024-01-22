<script lang="ts">
    import Technique from "$lib/components/Technique.svelte";

    $: techniqueId = "65a52d20b4ae0928e94e889f"
    // $: techniqueId = "65a52d20b4ae0928e94e889d"
</script>

<div class="min-h-screen">
    <Technique techniqueId={techniqueId} />
</div>