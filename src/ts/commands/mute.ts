import BaseCommand from './base';

/**
 * Command for mute / unmute sound
 */
export default class Mute extends BaseCommand {
    private _btn: HTMLElement;

    init(): void {
        this._toggle = this._toggle.bind(this);
        this._toggleClasses = this._toggleClasses.bind(this);

        this._btn = document.createElement('span');
        this._btn.classList.add('command', 'mute', 'fa-solid', 'fa-volume-high');
        this._btn.setAttribute('title', 'Toggle sound')

        this._btn.addEventListener('click', this._toggle);
        this._media.addEventListener('volumechange', this._toggleClasses);

        this._container.appendChild(this._btn);
        this._toggleClasses();
    }

    /**
     * toggle classes on the button
     */
    private _toggleClasses(): void {
        this._btn.classList.add(this._media.muted || this._media.volume === 0 ? 'fa-volume-off' : 'fa-volume-high');
        this._btn.classList.remove(this._media.muted || this._media.volume === 0 ? 'fa-volume-high' : 'fa-volume-off');
    }

    /**
     * switching the mode on the media container
     */
    private _toggle(): void {
        this._media.muted = !this._media.muted;
    }

    destroy(): void {
        this._btn.removeEventListener('click', this._toggle);
        this._media.removeEventListener('volumechange', this._toggleClasses);
    }
}