<script>
    import {Button, Checkbox, Form} from "carbon-components-svelte";
    import {sendCorrection} from "../../api.js";

    export let src = "http://placekitten.com/g/600/300";
    export let id;
    export let file;
    let checked = false;
    let buttonText = "Отправить"
</script>

<div class="container">
    <img {src} alt="Не удалось загрузить изображение"/>

    <Form style="max-width: 30%" on:submit={(e) => {
        e.preventDefault()
        if(!checked) return;
        const data = {
            id: id,
            file: file
        }
        sendCorrection(JSON.stringify(data), () => {buttonText="Спасибо"}, () => {})
    }}>
        <Checkbox id="checkbox-1" labelText="Произошло ложное срабатывание системы" bind:checked/>
        <Button type="submit" style="margin-top: 2vh">{buttonText}</Button>
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
