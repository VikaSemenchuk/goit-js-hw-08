import Player from '@vimeo/player';
import throttle from 'lodash.throttle';
import localStorageService from './localstorage';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const localStorageKey = 'videoplayer-current-time';

player.on('timeupdate', throttle(onSaveStorage, 1000));

function onSaveStorage(event) {
  localStorageService.save(localStorageKey, event.seconds);
}

setCurrentTime();

function setCurrentTime() {
  const saveTime = localStorageService.load(localStorageKey);
  if (saveTime) {
    player.setCurrentTime(saveTime);
  }
}
