<script>
    import {ContentSwitcher, Switch} from "carbon-components-svelte";
    import {pageIndex} from "../store.ts";
</script>

<div class="gap">
</div>
<header>
    <div></div>
    <ContentSwitcher style="height: 100%; width:50%" on:change = {event => pageIndex.set(event.detail)}>
        <Switch text="Загрузить видео" style="font-size: 2.5vh"/>
        <Switch text="Подключить камеры" style="font-size: 2.5vh"/>
<!--        <Switch text="Найденные нарушения" style="font-size: 2.5vh"/>-->
    </ContentSwitcher>
</header>


<style>
    .gap {
        height: 2vh;
    }
    header {
        position: absolute;
        z-index: 100;
        margin-bottom: 2vh;

        width: 98vw;
        height: 10vh;
        min-height: 10vh;

        background: #e8eaed;
        border: solid 0.4vh #2b2b2b;
        border-radius: 10px;

        display: flex;
        justify-content: space-between;
        flex-direction: row;
        vertical-align: middle;
        align-items: center;
    }
</style>
