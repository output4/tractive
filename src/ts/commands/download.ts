import BaseCommand from './base';

/**
 * Download video command
 */
export default class Download extends BaseCommand {
    private _btn: HTMLElement;

    init(): void {
        this._btn = document.createElement('a');
        this._btn.classList.add('command', 'play', 'fa-solid', 'fa-download');
        this._btn.setAttribute('title', 'Download');
        this._btn.setAttribute('download', 'download');
        this._btn.setAttribute('href', this._config.url);
        this._container.appendChild(this._btn);
    }
}