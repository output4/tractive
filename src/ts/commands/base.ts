import { ICommand, IConfig } from '../interfaces';

/**
 * Base command class
 */
export default class BaseCommand implements ICommand {
    _container: HTMLElement;
    _config: IConfig;
    _media: HTMLMediaElement;

    constructor(container: HTMLElement ,media: HTMLVideoElement, config: IConfig) {
        this._container = container;
        this._config = config;
        this._media = media;
    }

    /**
     * Method called when command attached to panel
     */
    init(): void {

    }

    /**
     * Method for destroy command and remove linsteners
     */
    destroy(): void {
        
    }
}