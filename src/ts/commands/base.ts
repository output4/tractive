import { ICommand, IConfig } from '../interfaces';

export default class BaseCommand implements ICommand {
    _container: HTMLElement;
    _config: IConfig;
    _media: HTMLMediaElement;

    constructor(container: HTMLElement ,media: HTMLVideoElement, config: IConfig) {
        this._container = container;
        this._config = config;
        this._media = media;
    }


    init(): void {

    }

    destroy(): void {
        
    }
}