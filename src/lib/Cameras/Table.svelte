<script>
    import {
        DataTable,
        Toolbar,
        ToolbarContent,
        ToolbarSearch,
        Pagination,
    } from "carbon-components-svelte";
    import TableInner from "../Components/TableInner.svelte";
    export let data = [];

    let pageSize = 5;
    let page = 1;
    let filteredRowIds = [];
    let statusMessage = "Данные с камер";
</script>
<div style="width: 100%; max-height: 100%">
    <DataTable
            expandable
            title ={statusMessage}
            size = "tall"
            headers = {[
                {key:"time", value:"Время"},
                {key:"longitude", value: "Долгота"},
                {key:"latitude", value:"Широта"},
            ]}
            rows = {data}
            {pageSize}
            {page}
    >
        <svelte:fragment slot="expanded-row" let:row>
            <TableInner />
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
