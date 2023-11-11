// @ts-ignore
import {camerasData, downloadData, error, idData, idName, videoId} from "./store.ts";
import {convertDateFormat} from "./util.js";

const socket = new WebSocket("ws://bobr.frieren.argraur.dev/ws")
socket.addEventListener('open', (e) => {
    //console.log("Connecte to WebSocket")
})
socket.addEventListener('message', (event) => {
    const message = JSON.parse(event.data)
    const keys = Object.keys(message);
    if(keys.includes("status") && keys.status === "bad_request"){
        error.set(true)
    }
    if(keys.length === 2 && keys.includes("status") && keys.includes("data")) {
        if(message.status === "stream_ok"){
            videoId.set(message.data)
        }
        videoId.set(message.data)
    } else if(keys.length === 4
        && keys.includes("id")
        && keys.includes("file")
        && keys.includes("timestamp")
        && keys.includes("base64Image")) {
        if(typeof idName.get(message.id) !== "undefined") {
            // @ts-ignore
            const data = JSON.parse(localStorage.getItem("downloadData") || "[]")
            const newData = [...data, {
                id: message.id + "" + message.file,
                timestamp: convertDateFormat(message.timestamp),
                file: message.file,
                imgSrc: "data:image/jpeg;base64," + message.base64Image,
                name: idName.get(message.id),
                videoId: message.id
            }]
            downloadData.set(newData)
        } else {
            // @ts-ignore
            const data = JSON.parse(localStorage.getItem("camerasData") || "[]")
            const newData = [...data, {
                lat: idData.get(message.id).lat,
                long: idData.get(message.id).long,
                timestamp: convertDateFormat(message.timestamp),
                file: message.file,
                imgSrc: "data:image/jpeg;base64," + message.base64Image,
                videoId: message.id
            }]
            camerasData.set(newData)
        }
    }
})



export {socket};

// @ts-ignore
export const sendVideo = async (data, onSuccess, onError) => {
    const response = await fetch(`https://bobr.frieren.argraur.dev/video/submit`,
        {
            method:'POST',
            mode: 'no-cors',
            body: data
    }).catch((err) => {
            onError()
        }
    )

    if(response?.ok || response?.status === 0){
        onSuccess()
    } else {
        onError()
    }
}

// @ts-ignore
export const sendCorrection = async (data, onSuccess, onError) => {
    //console.log(data)
    const response = await fetch(`https://bobr.frieren.argraur.dev/correct`,
        {
            headers: {
                'Content-Type': 'application/json'
            },
            method:'POST',
            mode: 'no-cors',
            body: data
        }).catch((err) => {
            onError()
        }
    )

    if(response?.ok || response?.status === 0){
        onSuccess()
    } else {
        onError()
    }
}
