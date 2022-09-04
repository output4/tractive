import Download from './commands/download';
import Play from './commands/play';
import Fullscreen from './commands/fullscreen';
import Timer from './commands/timer';
import Mute from './commands/mute';
import Progress from './commands/progress';
import Volume from './commands/volume';

import { CommandsArray, IConfig, IAvailableCommands, Commands, ICommand } from './interfaces';

// Put progress bar to top, because it very big plugin
const availableCommandsTop: Partial<IAvailableCommands> = {
    progress: Progress
}

// Left side commands
const availableCommandsLeft: Partial<IAvailableCommands> = {
    play: Play,
    download: Download,
    mute: Mute,
    volume: Volume,
};

// Right side commands
const availableCommandsRight: Partial<IAvailableCommands> = {
    timer: Timer,
    fullscreen: Fullscreen
}

/**
 * Commands controller class
 */
export default class CommandsController {
    private _parent: HTMLElement;
    private _container: HTMLElement;
    private _video: HTMLVideoElement;
    private _commandsEnabled: CommandsArray;
    private _config: IConfig;
    private _initCommands: ICommand[] = [];

    constructor(parent: HTMLElement, config: IConfig) {
        this._parent = parent;
        this._config = config;
        this._commandsEnabled = config.commands;
        this._video = this._parent.querySelector('video');
        if (!this._video) {
            throw 'Video container don\'t initialized';
        }
        this._init();
    }

    /**
     * Initialize and put command to stack
     * @param {IAvailableCommands} commands 
     * @param {HTMLElement} container 
     */
    private _inserCommands(commands: Partial<IAvailableCommands>, container: HTMLElement): void {
        Object.keys(commands).forEach((commandKey: Commands) => {
            if (this._commandsEnabled.indexOf(commandKey) === -1) {
                return;
            }
            const command = commands[commandKey];
            if (command) {
                const cmd = new command(container, this._video, this._config);
                cmd.init();
                this._initCommands.push(cmd);
            }
        });
    }

    /**
     * init all commands and build containers
     */
    private _init(): void {
        const commandsContainer = document.createElement('div');
        commandsContainer.classList.add('commands-layer');
        this._container = commandsContainer;
        this._parent.appendChild(commandsContainer);
        
        const topDiv = document.createElement('div');
        const leftDiv = document.createElement('div');
        const rightDiv = document.createElement('div');

        this._container.appendChild(topDiv);
        this._container.appendChild(leftDiv);
        this._container.appendChild(rightDiv);

        // top commands
        this._inserCommands(availableCommandsTop, topDiv);
        // left side commands
        this._inserCommands(availableCommandsLeft, leftDiv);
        // right side commands
        this._inserCommands(availableCommandsRight, rightDiv);
    }

    // destroy controller method
    destroy(): void {
        this._initCommands.forEach((cmd) => {
            cmd.destroy();
        });
        this._initCommands = [];
        this._container.parentNode.removeChild(this._container);
    }
}