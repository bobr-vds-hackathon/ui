<script>
    import {Button, Checkbox, Form} from "carbon-components-svelte";

    export let src = "http://placekitten.com/g/600/300";
</script>

<div class="container">
    <img {src} alt="Не удалось загрузить изображение"/>

    <Form style="max-width: 30%">
        <Checkbox id="checkbox-1" labelText="Произошло ложное срабатывание системы"/>
        <Button type="submit" style="margin-top: 2vh">Отправить</Button>
    </Form>
</div>

<style>
    .container {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin: 1vh 1vw;
    }
    img {
        width: 60%;
        height: auto;
        border: solid #1a1a1a;
        margin-right: 2vw;
    }
</style>
