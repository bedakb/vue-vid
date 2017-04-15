# VueVid

Simple VueJS 2 Component that make your HTML5 Videos prettier.

DEMO: https://vuevid.herokuapp.com/

## Dependencies

The only dependency VueVid needs is [FontAwesome](http://fontawesome.io/) - make sure you have installed It, otherwise the icons won't be displayed.

## Install

```
$ npm install vue-vid --save
```

Then import It, and declare as component.
```
import VueVid from 'vue-vid'

export default {
  ...
  
  components: {
    VueVid
  }
  
  ...
}

```

## Usage and Options

Usage:

```
<vue-vid :sources="['video.mp4', 'video.ogg', 'video.webm']"></vue-vid>
```

Options/Props:

`sources - {Array, String}` -  If you want to pass video from other service such as Vimeo, or YouTube you can do It like this:
``` 
<vue-vid sources="https://vimeo.com/videoetc"></vue-vid>
```

In case you have your source URL stored into `data` model of your app, just bind the sources attribute:

``` 
<vue-vid :sources="sourceLink"></vue-vid>
```

You can also pass array, If you want support dfferent format of videos

```
<vue-vid :sources="['video.mp4', 'video.ogg', 'video.webm']"></vue-vid>
```

`skip-backward - {Number(negative)} - {default: -10}` - This value would set how much seconds video would go back when user click on skip backward button - It must be negative number.

`skip-forward - {Number(positive)} - {default: 25}` - This value would set how much seconds video would go forward when user click on skip forward button.

`poster - {String}` - You can provide poster for each video, by passing down poster URL.

`auto-play - {Boolean} - {default: false}` - play video automatically.

## Credits

Special thanks to [Wes Bos](https://github.com/wesbos) who made and style this player with Vanilla JS.
