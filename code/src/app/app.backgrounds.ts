import {environment} from '../environments/environment';


const backgroundsUrl = environment.CDNRoot + '/assets/backgrounds/';

const backgroundsList = {
  homepage: [
    {
      quotation: 'Celui qui mange vite va vite à sa tombe',
      url: backgroundsUrl + 'home/home-background-1.jpg'
    },
    {
      quotation: 'Celui qui mange vite va vite à sa tombe',
      url: backgroundsUrl + 'home/home-background-2.jpg'
    },
    {
      quotation: 'J\'ai faim',
      url: backgroundsUrl + 'home/home-background-3.jpg'
    }
  ],
  all: Array.from(new Array(2), (x, i) => backgroundsUrl + `all/all-background-${i + 1}.jpg`),
};

export const backgrounds = {
  homepage: backgroundsList.homepage[Math.floor(Math.random() * backgroundsList.homepage.length)],
  all: backgroundsList.all[Math.floor(Math.random() * backgroundsList.all.length)],
};
