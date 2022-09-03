import BaseCommand from './base';

/**
 * Command for toggle fullscreen player mode
 */
export default class Fullscreen extends BaseCommand {
    private _btn: HTMLElement;
    private _status: boolean = false;

    init(): void {
        this._run = this._run.bind(this);
        
        this._btn = document.createElement('span');
        this._btn.classList.add('command', 'fullscreen', 'fa-solid', 'fa-expand');
        this._btn.setAttribute('title', 'Toggle fullscreen');
        
        this._btn.addEventListener('click', this._run);
        this._container.appendChild(this._btn);
    }

    /**
     * Run fullscreen if we can
     */
    private _run(): void {
        if (document.fullscreenElement) {
            document.exitFullscreen();
            // @ts-ignore
        } else if (document.webkitFullscreenElement) {
            // @ts-ignore
            document.webkitExitFullscreen();
            // @ts-ignore
        } else if (this._media.webkitRequestFullscreen) {
            // @ts-ignore
            this._media.webkitRequestFullscreen();
        } else {
            this._media.requestFullscreen();
        }
    }

    destroy(): void {
        this._btn.removeEventListener('click', this._run);
    }
}