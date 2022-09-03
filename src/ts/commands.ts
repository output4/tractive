import Download from './commands/download';
import Play from './commands/play';
import Fullscreen from './commands/fullscreen';
import Timer from './commands/timer';
import Mute from './commands/mute';
import Progress from './commands/progress';
import Volume from './commands/volume';

import { CommandsArray, IConfig, IAvailableCommands, Commands, ICommand } from './interfaces';

const availableCommands: IAvailableCommands = {
    progress: Progress,
    play: Play,
    download: Download,
    mute: Mute,
    volume: Volume,
    timer: Timer,
    fullscreen: Fullscreen
};

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

    private _init(): void {
        const commandsContainer = document.createElement('div');
        commandsContainer.classList.add('commands-layer');
        this._container = commandsContainer;
        this._parent.appendChild(commandsContainer);

        Object.keys(availableCommands).forEach((commandKey: Commands) => {
            if (this._commandsEnabled.indexOf(commandKey) === -1) {
                return;
            }
            const command = availableCommands[commandKey];
            if (command) {
                const cmd = new command(this._container, this._video, this._config);
                cmd.init();
                this._initCommands.push(cmd);
            }
        });
    }

    destroy(): void {
        this._initCommands.forEach((cmd) => {
            cmd.destroy();
        });
        this._container.parentNode.removeChild(this._container);
    }
}