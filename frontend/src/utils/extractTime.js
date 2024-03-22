export function extractTime(dateString) {
    const date = new Date(dateString);
    const currentDate = new Date();

    const isToday = date.toDateString() === currentDate.toDateString();
    const isYesterday = new Date(date.getTime() + 86400000).toDateString() === currentDate.toDateString(); // Adding milliseconds of a day (86400000) to compare with yesterday

    if (isToday) {
        const hours = padZero(date.getHours());
        const minutes = padZero(date.getMinutes());
        return `${hours}:${minutes}`;
    } else if (isYesterday) {
        const hours = padZero(date.getHours());
        const minutes = padZero(date.getMinutes());
        return `Yesterday ${hours}:${minutes}`;
    } else {
        const month = padZero(date.getMonth() + 1);
        const day = padZero(date.getDate());
        const hours = padZero(date.getHours());
        const minutes = padZero(date.getMinutes());
        return `${month}/${day} ${hours}:${minutes}`;
    }
}

function padZero(number) {
    return number.toString().padStart(2, "0");
}
