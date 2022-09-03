import BaseCommand from './base';

export default class Play extends BaseCommand {
    private _btn: HTMLElement;

    init(): void {
        this._run = this._run.bind(this);
        this._onPlay = this._onPlay.bind(this);
        this._onPause = this._onPause.bind(this);

        this._btn = document.createElement('span');
        this._btn.classList.add('command', 'play', 'fa-solid', 'fa-play');
        this._btn.setAttribute('title', 'Play video');
        this._container.appendChild(this._btn);

        this._btn.addEventListener('click', this._run);
        this._media.addEventListener('play', this._onPlay);
        this._media.addEventListener('pause', this._onPause);
        this._media.addEventListener('click', this._run);
        if (this._media.paused) {
            this._onPause();
        } else {
            this._onPlay();
        }
    }

    private _onPlay(): void {
        this._btn.classList.remove('fa-play');
        this._btn.classList.add('fa-pause');
    }

    private _onPause(): void {
        this._btn.classList.remove('fa-pause');
        this._btn.classList.add('fa-play');
    }

    private _run(): void {
        if (this._media.paused) {
            this._media.play();
        } else {
            this._media.pause();
        }
    }

    destroy(): void {
        this._btn.removeEventListener('click', this._run);
        this._media.removeEventListener('play', this._onPlay);
        this._media.removeEventListener('pause', this._onPause);
        this._media.removeEventListener('click', this._run);
    }
}