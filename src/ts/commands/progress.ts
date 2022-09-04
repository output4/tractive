import BaseCommand from './base';

/**
 * Progress bar for player
 */
export default class Progress extends BaseCommand {
    private _span: HTMLElement;
    private _duration: number;
    
    init(): void {
        this._progress = this._progress.bind(this);
        this._toTime = this._toTime.bind(this);
        this._updateDuration = this._updateDuration.bind(this);

        this._span = document.createElement('span');
        this._span.classList.add('command', 'progress');

        this._container.prepend(this._span);

        this._media.addEventListener('loadedmetadata', this._updateDuration);
        this._media.addEventListener('timeupdate', this._progress);
        this._span.addEventListener('click', this._toTime);
        this._progress();
    }

    /**
     * When metadata loaded, we need get the duration of video
     */
    private _updateDuration(): void {
        this._duration = Math.round(this._media.duration);
    }

    /**
     * When video playing, we fixing progress and drawing progress bar
     */
    private _progress(): void {
        if (!this._duration) {
            this._updateDuration();
            if (!this._duration) {
                return;
            }
        }
        const currentTime = Math.round(this._media.currentTime);
        const pers = Math.round(currentTime / (this._duration / 100));
        this._span.style.background = `linear-gradient(to right, var(--progress-fillColor) ${pers}%, var(--progress-bgColor) ${pers}%)`;
    }

    /**
     * Listen click on progress bar and move to selected time
     * @param {MouseEvent} e
     */
    private _toTime(e: MouseEvent): void {
        if (!this._duration) {
            this._updateDuration();
        }
        // @ts-ignore
        const rect = e.target.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const pers = Math.round(x / (rect.width / 100)) / 100;
        const time = Math.round(this._duration * pers);
        this._media.currentTime = time;
    }    

    destroy(): void {
        this._media.removeEventListener('loadedmetadata', this._updateDuration);
        this._media.removeEventListener('timeupdate', this._progress);
        this._span.removeEventListener('click', this._toTime)
    }
}