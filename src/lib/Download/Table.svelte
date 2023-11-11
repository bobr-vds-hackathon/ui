<script>
    import {
        DataTable,
        Toolbar,
        ToolbarContent,
        ToolbarSearch,
        Pagination,
    } from "carbon-components-svelte";
    import TableInner from "../Components/TableInner.svelte";
    import {videoId} from "../../store.ts";
    export let status = "wait"; // inProgress or done
    export let data = [];

    let pageSize = 5;
    let page = 1;
    let filteredRowIds = [];
    let statusMessage = "Загрузите и отправьте видео на детекцию";

</script>
<div style="width: 100%; max-height: 100%">
    <DataTable
            expandable
            title ={statusMessage}
            size = "tall"
            headers = {[
                {key:"timestamp", value:"Время детекции"},
                {key:"name", value: "Название видео"},
            ]}
            rows = {data}
            {pageSize}
            {page}
    >
        <svelte:fragment slot="expanded-row" let:row>
            <TableInner src={row.imgSrc} id={row.id} file={row.file}/>
        </svelte:fragment>

        <Toolbar>
            <ToolbarContent>
                <ToolbarSearch
                        persistent
                        value=""
                        shouldFilterRows
                        bind:filteredRowIds
                />
            </ToolbarContent>
        </Toolbar>
    </DataTable>
    <Pagination
            bind:pageSize
            bind:page
            totalItems={filteredRowIds.length}
            pageSizeInputDisabled
    />
</div>
