import { IConfig, CommandsArray } from './interfaces';
import CommandsController from './commands';

const DEFAULT_COMMANDS: CommandsArray = ['play', 'fullscreen', 'volume'];
const AUTOPLAY: boolean = false;

/**
 * Main class of video player
 * @example:
 * const player = new TractivePlayer(container, config);
 * @description
 * See full api in README.md
 */
export default class TractivePlayer {
    private _config: IConfig;
    private _container: HTMLElement; 
    private _mediaContainer: HTMLVideoElement;
    private _commandsController: CommandsController;
    
    constructor(container: HTMLElement, config: IConfig) {
        this._resize = this._resize.bind(this);
        this._handleError = this._handleError.bind(this);

        this._initConfig(config);
        if (!container) {
            throw 'Please set container for video player';
        }
        this._container = container;
        this._init();
    }

    /**
     * Function check and fill config
     * @param {IConfig} config
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
        this._mediaContainer.addEventListener('loadeddata', this._resize);
        this._mediaContainer.addEventListener('error', this._handleError);
        
        /**
         * if user set option autoplay: true, 
         * but it works only after init class manually(after user had click)
         */
        if (this._config.autoplay) {
            this._mediaContainer.setAttribute('autoplay', 'true');
        }
        // preview image
        if (this._config.poster) {
            this._mediaContainer.setAttribute('poster', this._config.poster);
        }
        // we can use native player commands
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

    // Listener for setting the correct player size after loading metadata
    private _resize(): void {
        const size = this._mediaContainer.getBoundingClientRect();
        this._container.style.height = `${size.height}px`;
    }

    /**
     * Errors listener
     * @param {ErrorEvent} e 
     */
    private _handleError(e: ErrorEvent): void {
        this._container.innerText = 'Something went wrong!';
        throw Error;
    }

    /**
     * Method for refresh commands panel
     * @param {CommandsArray} commands 
     * @public
     */
    changeCommands(commands: CommandsArray): void {
        this._commandsController.destroy();
        this._commandsController = null;
        this._config.commands = commands;

        this._commandsController = new CommandsController(this._container, this._config);
    }

    /**
     * Method for destroy instance of player
     */
    destroy(): void {
        if (this._commandsController) {
            this._commandsController.destroy();
        }
        this._mediaContainer.removeEventListener('loadedmetadata', this._resize);
        this._mediaContainer.removeEventListener('error', this._handleError);
        this._mediaContainer.parentNode.removeChild(this._mediaContainer);
    }
}