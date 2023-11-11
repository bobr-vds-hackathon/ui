<script>
    import {Button, Form, NumberInput, PasswordInput, TextInput} from "carbon-components-svelte";
    import Table from "./Table.svelte";
    import {writable} from "svelte/store";
    import {camerasData, idData, videoId} from "../../store.ts";
    import {socket} from "../../api.js";

    let login = "", password = "", url="";
    let long = 0, lat = 0;
    let step = 0.000000001;

    let formData = {}

    $: {
        formData = {
            login: login,
            password: password,
            url: url,
            lat: lat,
            long: long
        }
    }

    const onSubmitForm = (e) => {
        e.preventDefault();
        idData.set($videoId, formData)
        const dataString = JSON.stringify(formData);
        const body = {
            command: "stream",
            args: {
                "stream": dataString
            }
        }
        const jsonBody = JSON.stringify(body)
        socket.send(jsonBody)
    }
</script>
<div class="container">
    <div class="form-container">
        <label style="font-size: 3vh; margin-bottom: 2vh">Добавить камеру</label>
        <Form on:submit={onSubmitForm}>
            <TextInput bind:value={url} labelText="Camera url" size="xl" required={true}/>
            <TextInput bind:value={login} labelText="Login" size="xl"/>
            <PasswordInput bind:value={password} labelText="Password" size="xl"/>
            <NumberInput bind:value={lat}
                label="Широта"
                size="xl"
                required={true}
                hideSteppers
                step={step}
            />
            <NumberInput bind:value={long}
                label="Долгота"
                size="xl"
                required={true}
                hideSteppers
                step={step}
            />
            <Button type = "submit" style="margin-top: 1vh"> Отправить </Button>
        </Form>
    </div>

    <div class="table-container">
        <Table data={$camerasData}/>
    </div>
</div>

<style>
    .table-container {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        min-width: 70%;
    }
    .form-container {
        width:30%;
        display: flex;
        flex-direction: column;
        justify-items: flex-start;
        align-items: center;
        margin-right: 3%;
    }
    .container {
        width: 90%;
        max-width: 90%;
        height: 80%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        justify-items: center;
    }
</style>

