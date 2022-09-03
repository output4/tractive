import { IConfig, CommandsArray } from './interfaces';
import CommandsController from './commands';

const DEFAULT_COMMANDS: CommandsArray = ['play', 'fullscreen', 'volume'];
const AUTOPLAY: boolean = false;

/**
 * Main class of video player
 */
export default class TractivePlayer {
    private _config: IConfig;
    private _container: HTMLElement; 
    private _mediaContainer: HTMLVideoElement;
    private _commandsController: CommandsController;
    
    constructor(container: HTMLElement, config: IConfig) {
        this._initConfig(config);
        if (!container) {
            throw 'Please set container for video player';
        }
        this._container = container;

        this._init();
    }

    /**
     * Function check and fill config
     * @param config IConfig
     */
    private _initConfig(config: IConfig): void {
        if (!config) {
            throw 'Please define config option';
        }
        this._config = config;
        if (!this._config.hasOwnProperty('autoplay')) {
            this._config.autoplay = AUTOPLAY;
        }
        if (!this._config.hasOwnProperty('commands')) {
            this._config.commands = DEFAULT_COMMANDS;
        }
        if (!this._config.hasOwnProperty('url')) {
            throw 'You must define url property in config';
        }
    }

    /**
     * Main function for init player
     */
    private _init(): void {
        this._mediaContainer = document.createElement('video');
        this._container.appendChild(this._mediaContainer);

        if (this._config.autoplay) {
            this._mediaContainer.setAttribute('autoplay', 'true');
        }
        if (this._config.poster) {
            this._mediaContainer.setAttribute('poster', this._config.poster);
        }

        if (this._config.nativeCommands && this._mediaContainer.canPlayType) {
            this._mediaContainer.setAttribute('controls', 'true');
        } else {
            // init custom commands controller
            this._commandsController = new CommandsController(this._container, this._config);
        }
        // if user set manual size we set it
        if (this._config.size) {
            const { width = 'auto', height = 'auto' } = this._config.size;
            this._mediaContainer.setAttribute('height', `${height}`);
            this._mediaContainer.setAttribute('width', `${width}`);
        } else {
            this._mediaContainer.classList.add('inheritedSize');
        }

        this._mediaContainer.setAttribute('preload', 'metadata');
        this._mediaContainer.setAttribute('src', this._config.url);
        // for development and debugging code
        if (this._config.devMode) {
            // @ts-ignore
            this._container.$player = this;
        }
    }

    changeCommands(commands: CommandsArray): void {
        this._commandsController.destroy();
        this._commandsController = null;
        this._config.commands = commands;

        this._commandsController = new CommandsController(this._container, this._config);
    }

    destroy(): void {
        this._commandsController.destroy();
        this._mediaContainer.parentNode.removeChild(this._mediaContainer);
    }
}