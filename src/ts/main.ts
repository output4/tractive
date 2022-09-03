import TractivePlayer from './player';
import { CommandsArray, IConfig } from './interfaces';

// test url for player
//const url = 'https://tractive.com/assets/static/videos/ActivityMonitoring_15s_EN.mp4';
const url = 'ActivityMonitoring_15s_EN.mp4';

document.addEventListener('DOMContentLoaded', () => {
    // Attach player
    const element = document.querySelector('.maindiv .player') as HTMLElement;
    const commands: CommandsArray = ['play', 'timer', 'mute'];
    commands.forEach((cmd) => {
        const checkbox = document.querySelector(`input#${cmd}`) as HTMLInputElement;
        checkbox.checked = true;
    });
    const config: IConfig = {
        url,
        autoplay: false,
        commands,
        size: {
            width: 640
        },
        devMode: true
    }
    
    let player: TractivePlayer;

    document.querySelector('.init-player').addEventListener('click', () => {
        if (player) {
            return;
        }
        player = new TractivePlayer(element, config);
    });
    document.querySelector('.destroy-player').addEventListener('click', () => {
        if (player) {
            player.destroy();
            player = null;
        }
    });

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