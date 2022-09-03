import { ITime } from '../interfaces';
import BaseCommand from './base';

export default class Timer extends BaseCommand {
    private _span: HTMLElement;
    private _duration: ITime;

    init(): void {
        this._onTimeUpdate = this._onTimeUpdate.bind(this);
        this._onLoadedData = this._onLoadedData.bind(this);

        this._span = document.createElement('span');
        this._span.classList.add('command', 'time');
        
        this._media.addEventListener('loadedmetadata', this._onLoadedData);
        this._media.addEventListener('timeupdate', this._onTimeUpdate);
        
        this._container.appendChild(this._span);
        this._onLoadedData();
    }

    private _onLoadedData(): void {    
        if (this._media.duration) {
            this._duration = this._toTime(this._media.duration);
            let defaultTime = {hours: '00', minutes: '00', seconds: '00'} as ITime;
            if (this._media.currentTime) {
               defaultTime = this._toTime(this._media.currentTime); 
            }
            this._setTime(defaultTime, this._duration); 
        }
    }

    private _onTimeUpdate(): void {
        const current = this._toTime(this._media.currentTime);
        this._setTime(current, this._duration); 
    }

    private _setTime(current: ITime, duration: ITime): void {
        if (!duration) {
            return;
        }
        let withHours = duration.hours !== '00';
        const currentStr = withHours ? `${current.hours}:` : '' + `${current.minutes}:${current.seconds}`; 
        const durationStr = withHours ? `${duration.hours}:` : '' + `${duration.minutes}:${duration.seconds}`;
        this._span.innerText = `${currentStr} / ${durationStr}`;
    }

    private _toTime(timeInSeconds: number): ITime {
        var sec_num = Math.round(timeInSeconds);
        var hours   = Math.floor(sec_num / 3600);
        var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
        var seconds = sec_num - (hours * 3600) - (minutes * 60);

        const result: ITime = {
            hours,
            minutes,
            seconds
        };
        if (hours < 10) {result.hours = `0${hours}`;}
        if (minutes < 10) {result.minutes = `0${minutes}`;}
        if (seconds < 10) {result.seconds = `0${seconds}`;}
        return result;
    };

    destroy(): void {
        this._media.removeEventListener('timeupdate', this._onTimeUpdate);
        this._media.removeEventListener('loadedmetadata', this._onLoadedData);
    }
}