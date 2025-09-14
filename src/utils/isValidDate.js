export function validateDate(data) {
    const date = new Date(data);

    return !isNaN(date.getTime());
}