<script lang="ts">
    import Header from "./lib/Header.svelte";
    import "carbon-components-svelte/css/g10.css";
    $: document.documentElement.setAttribute("theme", "g10");
    import {pageIndex, downloadData, camerasData, status} from "./store.ts";
    import DownloadPage from "./lib/Download/DownloadPage.svelte";
    import CamerasPage from "./lib/Cameras/CamerasPage.svelte";

</script>

<Header />
<main style="width: 100%; height:100%;">
    {#if $pageIndex === 0}
        <DownloadPage />
    {:else if $pageIndex === 1}
        <CamerasPage />
    {/if}
</main>


<style>
main {
    position: absolute;
    margin-top: 2vh;
    max-width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
