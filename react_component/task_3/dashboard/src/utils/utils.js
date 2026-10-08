export const getCurrentYear = () => {
    const dateTime = new Date();
    return dateTime.getFullYear();
}

export const getFooterCopy = (isIndex) => {
    if (isIndex) {
        return "Holberton School";
    } else {
        return "Holberton School main dashboard";
    }
}

export const getLatestNotification = () => {
    return "<strong>Urgent requirement</strong> - complete by EOD";
}