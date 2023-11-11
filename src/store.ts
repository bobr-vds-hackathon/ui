import {readable, writable} from "svelte/store";
export const pageIndex = writable(0)

export const camerasData = writable(JSON.parse(localStorage.getItem("camerasData") || "[]"))
camerasData.subscribe(val => {
    localStorage.setItem("camerasData", JSON.stringify(val))
})

localStorage.setItem("downloadData", "[]")
export const downloadData = writable(JSON.parse(localStorage.getItem("downloadData") || "[]"))
downloadData.subscribe(val => {
    localStorage.setItem("downloadData", JSON.stringify(val))
})

export const status = writable(localStorage.getItem("downloadStatus") || "wait")
status.subscribe(val => {
    localStorage.setItem("downloadStatus", val)
});

export const videoId = writable("")

export const filename = writable("")

// @ts-ignore
export const idName = new Map()
