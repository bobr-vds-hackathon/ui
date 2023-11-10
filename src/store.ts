import { writable} from "svelte/store";
export const pageIndex = writable(0)

export const camerasData = writable(JSON.parse(localStorage.getItem("camerasData") || "[]"))
camerasData.subscribe(val => {
    localStorage.setItem("camerasData", JSON.stringify(val))
})

export const downloadData = writable(JSON.parse(localStorage.getItem("downloadData") || "[]"))
downloadData.subscribe(val => {
    localStorage.setItem("downloadData", JSON.stringify(val))
})

export const status = writable(localStorage.getItem("downloadStatus") || "wait")
status.subscribe(val => {
    localStorage.setItem("downloadStatus", val)
});

export const sessionId = writable(localStorage.getItem("sessionId") || "")

sessionId.subscribe(val => {
    let object = {
        value: val,
        timestamp: new Date().getTime()
    }
    localStorage.setItem("sessionId", JSON.stringify(object))
})



