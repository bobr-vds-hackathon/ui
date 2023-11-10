<script>
    import {
        Button,
        FileUploaderButton,
        FileUploaderItem,
        Modal
    } from "carbon-components-svelte";
    import Table from "./Table.svelte";
    import {downloadData, status} from "../../store.ts";

    const maxFileNumber = 5;
    const acceptedFileTypes=[
        ".mp4",
        ".avi"
    ];

    let fileUploader;
    let files = [];
    let loadedFiles = [];
    let open = false;

    const onUpload = () => {
        if(loadedFiles.length + files.length > maxFileNumber) {
            open = true;
            files = [];
            console.log(open)
            return;
        }
        loadedFiles = [...loadedFiles, ...files];
        files = [];
        console.log(loadedFiles)
    }

    const onSend = () => {
        if($status === "inProgress") return
        //TODO: send files throw webSocket
        loadedFiles = []
        $status = "inProgress"
        //simulate working shit
        //TODO: await answer and stop awaiting if cansel
        $downloadData = []
        setTimeout(() => {
            $downloadData = [ ...$downloadData,
                {id: "a", time: "19.12.2020 13:50", longitude: "14.2323", latitude: "14.2323"},
                {id: "b", time: "18.11.2021 13:50", longitude: "15.2323", latitude: "15.2323"},
                {id: "c", time: "17.10.2022 13:50", longitude: "16.2323", latitude: "16.2323"},
            ]
        }, 2000)
        setTimeout(() => {
            $status = "done";
            $downloadData = [ ...$downloadData,
                {id: "d", time: "19.12.2020 13:50", longitude: "14.2323", latitude: "14.2323"},
                {id: "e", time: "18.11.2021 13:50", longitude: "15.2323", latitude: "15.2323"},
                {id: "f", time: "17.10.2022 13:50", longitude: "16.2323", latitude: "16.2323"},
                {id: "g", time: "17.10.2022 13:50", longitude: "16.2323", latitude: "16.2323"},
            ]
        }, 4000)
    }

</script>

<Modal bind:open passiveModal modalHeading="Слишком много файлов">
    <p>
        Максимум можно загрузить 5 файлов за раз.<br/> Выберите файлы заново.
    </p>
</Modal>

<div class="container">
    <div class="uploader-container">
        <div class="button-container">
            <Button style="margin-bottom: 5%; min-height: 40%"
                on:click = {onSend}
                disabled = {$status === "inProgress"}
            > Отправить </Button>
            <FileUploaderButton
                bind:this={fileUploader}
                accept = {acceptedFileTypes}
                multiple
                labelText="Загрузить файл"
                status="complete"
                size="field"
                on:change = {onUpload}
                disabled={$status === "inProgress"}
                bind:files
            />
        </div>
        {#each loadedFiles as file}
            <FileUploaderItem name={file.name} size="field" style="min-width: 100%; max-width: 100%"/>
        {/each}
    </div>

    <div class="table-container">
        <Table status={$status} data={$downloadData}/>
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
    .button-container {
        /*height: 10%;*/
        max-width: 80%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin-bottom: 10%;
    }
    .uploader-container {
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
        /*background: #646cff;*/
    }
</style>
