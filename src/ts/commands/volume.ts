import BaseCommand from './base';

export default class Volume extends BaseCommand {
    private _range: HTMLInputElement;
    private _savedValue: number = 50;
    private _wasMuted: boolean = false;

    init(): void {
        this._onChange = this._onChange.bind(this);
        this._onExternalChange = this._onExternalChange.bind(this);

        this._range = document.createElement('input');
        this._range.setAttribute('type', 'range');
        this._range.setAttribute('min', '0');
        this._range.setAttribute('max', '100');
        this._range.value = `${this._media.muted ? 0 : this._media.volume * 100}`;

        this._container.appendChild(this._range);

        this._range.addEventListener('change', this._onChange);
        this._media.addEventListener('volumechange', this._onExternalChange);
    }

    private _onExternalChange(): void {
        if (this._media.muted) {
            this._wasMuted = true;
        }
        let newValue = this._media.volume * 100;
        if (this._wasMuted && !this._media.muted) {
            newValue = this._savedValue;
            this._wasMuted = false;
        }
        const value = this._media.muted ? 0 : newValue;
        this._range.value = `${value}`;
    }

    private _onChange(): void {
        const value = parseInt(this._range.value, 10);
        this._media.volume = value / 100;
        this._savedValue = value;
    }

    destroy(): void {
        this._range.removeEventListener('change', this._onChange);
        this._media.removeEventListener('volumechange', this._onExternalChange);
    }
}