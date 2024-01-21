export class DateHelper {
    static getToday(): Date {
        return new Date();
    }

    static parseDateToString(date: string): string {
        const parsedDate = new Date(date);

        // Function to pad a number with leading zeros to ensure it has at least two digits
        const padWithLeadingZeros = (num: number) => {
            return num.toString().padStart(2, '0');
        };

        const day = padWithLeadingZeros(parsedDate.getDate());
        const month = padWithLeadingZeros(parsedDate.getMonth() + 1);
        const year = parsedDate.getFullYear();
        const hours = padWithLeadingZeros(parsedDate.getHours());
        const minutes = padWithLeadingZeros(parsedDate.getMinutes());

        return `${day}.${month}.${year} ${hours}:${minutes}`;
    }
}