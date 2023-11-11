<script>
    import {
        Button,
        FileUploaderButton,
        FileUploaderItem,
        Modal
    } from "carbon-components-svelte";
    import Table from "./Table.svelte";
    import {downloadData, error, filename, idName, status, videoId} from "../../store.ts";
    import {sendVideo, socket} from "../../api.js"

    const maxFileNumber = 1;
    const acceptedFileTypes=[
        ".mp4",
        ".avi"
    ];

    let fileUploader;
    let files = [];
    let loadedFiles = [];
    let open = false;
    let tries = 0;
    const waitForVideoId = (onSuccess) => {
        setTimeout(() => {
            if($videoId === "" && tries < 10){
                waitForVideoId()
                tries += 1
            } else if(tries >= 10){
                $status = "wait"
            } else {
                onSuccess();
            }
        }, 1000)
    }


    const onUpload = () => {
        if(files.length > maxFileNumber) {
            open = true;
            files = [];
            return;
        }
        loadedFiles = [...files];
        files = [];
    }

    const onSend = () => {
        if($status === "inProgress") return
        $status = "inProgress"
        socket.send(JSON.stringify(
            {
                command: "video"
            }
        ))
        const data = new FormData();
        data.append('video', loadedFiles[0], loadedFiles[0].name);
        $filename = loadedFiles[0].name
        waitForVideoId(() => {
            data.append('id', $videoId)
            console.log($videoId)
            sendVideo(data, () => {
                $status = "wait"
                idName.set($videoId, $filename)
            }, () => {
                $status = "wait"
                $error = true
            })
        })
        loadedFiles = []
        //TODO: await answer and stop awaiting if cansel
    }

</script>

<Modal bind:open passiveModal modalHeading="Слишком много файлов">
    <p>
        Максимум можно загрузить {maxFileNumber} файл за раз.<br/> Выберите файлы заново.
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
