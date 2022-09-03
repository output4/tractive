export type Commands = 'play' | 'fullscreen' | 'volume' | 'download' | 'timer' | 'progress' | 'mute';
export type CommandsArray = Commands[];

interface ISize {
    height?: number | string;
    width?: number | string;
}

export interface IConfig {
    url: string,
    poster?: string;
    autoplay?: boolean;
    commands?: CommandsArray;
    nativeCommands?: boolean;
    size?: ISize;
    devMode?: boolean;
}

export interface ICommand {
    init: () => void;
    destroy: () => void;
}

export interface IConstructable<T> {
    new(...args: any) : T;
}

export type IAvailableCommands = {
    [key in Commands]: any
}

export interface ITime {
    hours: string | number;
    minutes: string | number;
    seconds: string | number;
}