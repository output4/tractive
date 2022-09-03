import TractivePlayer from './player';
import { CommandsArray, IConfig } from './interfaces';


/**
 * Simple script for init player
 * This file without logic, just for manipulate with player
 */

// test url for player
const url = 'https://tractive.com/assets/static/videos/ActivityMonitoring_15s_EN.mp4';

document.addEventListener('DOMContentLoaded', () => {
    // Attach player
    const element = document.querySelector('.maindiv .player') as HTMLElement;
    // basic commands
    const commands: CommandsArray = ['play', 'timer', 'mute'];
    commands.forEach((cmd) => {
        const checkbox = document.querySelector(`input#${cmd}`) as HTMLInputElement;
        checkbox.checked = true;
    });
    // simple config
    const config: IConfig = {
        url,
        autoplay: false, // set true for auto playing video after init
        commands,
        size: {
            width: 640
        },
        devMode: false // flag for debugging and develop
    }
    
    let player: TractivePlayer;

    // Run button
    document.querySelector('.init-player').addEventListener('click', () => {
        if (player) {
            return;
        }
        player = new TractivePlayer(element, config);
    });
    // Destroy button
    document.querySelector('.destroy-player').addEventListener('click', () => {
        if (player) {
            player.destroy();
            player = null;
        }
    });

    // Listen checkboxes
    document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
        checkbox.addEventListener('change', function() {
            const name = this.id;
            if (this.checked) {
                config.commands.push(name);
            } else {
                config.commands = config.commands.filter((currentName) => currentName !== name);
            }
            if (player) {
                player.changeCommands(config.commands);
            }
        });
    });
});