export class NumberFunctions {

    public static padLeft(nr, n, str) {
        return Array(n - String(nr).length + 1).join(str) + nr;
    }

    public static dateToStr(date: Date) {
        return date.getFullYear() + '-' +
            NumberFunctions.padLeft((date.getMonth() + 1), 2, '0') + '-' +
            NumberFunctions.padLeft(date.getDate(), 2, '0');
    }
}
