import Timer from '../../node_modules/easytimer/src/easytimer.js';
import BrowserEvents from "../helpers/BrowserEvents.es6";

export default class popup{

    constructor(driver){
        this.timer = new Timer();
        this.browserEvents = driver;
        this.browserEvents.onMessageUpdated(this);
        this.initTimer();
    }

    /**
     * Start timer in popup with easyTimer Library
     *
     * link: https://albert-gonzalez.github.io/easytimer.js/
     */
    initTimer(){
        setInterval(() => {
            this.browserEvents.getLocalData(['time'], (result)=> {

                this.timer.stop();
                this.timer.start({
                    precision: 'seconds',
                    startValues: {seconds: parseInt(result.time)}
                });

                $('#chronoExample .values').html(this.timer.getTimeValues().toString());

            });
        }, 100);

        // Listener to can update the timer
        this.timer.addEventListener('secondsUpdated', (e) => {
            $('#chronoExample .values').html(this.timer.getTimeValues().toString());
        });        
    }
}

window.$ = window.jQuery = require('../libs/jquery');
new popup(new BrowserEvents(chrome));