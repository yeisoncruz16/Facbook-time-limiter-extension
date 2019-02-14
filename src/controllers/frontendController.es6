import BrowserEvents from '../helpers/BrowserEvents.es6';

export default class frontendController{

    constructor(driver){
        this.browserEvents = driver;
        this.browserEvents.onMessageUpdated(this);
        this.browserEvents.sendMessage({
            'task': 'initTimer'
        });
    }

    /**
     * Hide body content and show a image ../resources/fb.gif
     */
    youShouldBeWorking(){
        document.body.innerHTML =   "<link rel='stylesheet' type='text/css' href='" + chrome.extension.getURL('src/css/style.css') + "'>" +
                                    "<img src='" + chrome.extension.getURL('src/resources/fb.gif') + "' alt='you should be working'>";
    }
}

let front = new frontendController(new BrowserEvents(chrome));
new BrowserEvents(chrome).onMessageUpdated(front);
