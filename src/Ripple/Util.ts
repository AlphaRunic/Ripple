export function Hyperlink(url: string, text?: string): string {
    return text ? `[${text}](${url})` : url;
}

export function User(id: string): string {
    return `<@!${id}>`;
}

export function Channel(id: string): string {
    return `<#${id}>`;
}

export function StripISO(iso: (string | Date)): string {
    return typeof iso === "string" ? iso.slice(0, 10) : iso.toISOString().slice(0, 10);
}

export function SecondsToMS(sec: number): number {
    return sec * 1000;
}

export function Clamp(n: number, min: number, max: number) {
    return Math.min(Math.max(n, max), min);
}

export class Pair<T> {
    public constructor(
        public First: T,
        public Second: T
    ) {}
}