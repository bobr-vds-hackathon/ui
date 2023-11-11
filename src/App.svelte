<script lang="ts">
    import Header from "./lib/Header.svelte";
    import "carbon-components-svelte/css/g10.css";
    $: document.documentElement.setAttribute("theme", "g10");
    import {pageIndex} from "./store.ts";
    import DownloadPage from "./lib/Download/DownloadPage.svelte";
    import CamerasPage from "./lib/Cameras/CamerasPage.svelte";
    import {error} from "./store.ts";
    import {Modal} from "carbon-components-svelte";

</script>

<Header />
<Modal bind:open={$error} passiveModal modalHeading="Слишком много файлов">
    <p>
        Произошла ошибка, действие не было выполнено
    </p>
</Modal>
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
