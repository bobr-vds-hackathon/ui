// @ts-ignore
export function convertDateFormat(input) {
    // Extract the date and time parts
    const datePart = input.substring(0, 8);
    const timePart = input.substring(9);

    // Format the date
    const year = datePart.substring(0, 4);
    const month = datePart.substring(4, 6);
    const day = datePart.substring(6, 8);

    // Format the time
    const hour = timePart.substring(0, 2);
    const minute = timePart.substring(2, 4);
    const second = timePart.substring(4, 6);

    // Combine into the final format
    return `${year}.${month}.${day} ${hour}:${minute}:${second}`;
}
