import BrowserEvents from "../helpers/BrowserEvents.es6";

export default class options{

    constructor(driver){
        this.browserEvents = driver;
        this.browserEvents.onMessageUpdated(this);
        this.options();
    }

    /**
     * set actions in options page
     */
    options(){
        $( document ).ready(() => {
            this.browserEvents.getLocalData(['time', 'maxTimeMinutes'], (result)=> {

                $('#MaxTime').attr("placeholder", "Actual max time: " + result.maxTimeMinutes + " min");

                $('#restartTime').click(() => {
                    this.confirmation("Are you sure to restart time?",this.browserEvents.setLocalData('time', 0));
                });
                $('#changeMaxTime').click(() => {
                    this.changeLimitTime();
                });
            });
        });
    }

    /**
     * Logic to change limit time
     */
    changeLimitTime(){
        let timeText = $('#MaxTime').val();
        if(timeText > 0){
            this.confirmation("Are you sure to change time?", () => {
                this.browserEvents.setLocalData('maxTimeMinutes', timeText);
                this.browserEvents.setLocalData('time', 0);
                $('#MaxTime').val('');
            });
        }else{
            alert("Invalid time");
            $('#MaxTime').val('');
        }
    }

    /**
     * Display confirm message and execute callback
     *
     * @param {String} message: to display in confirm message
     * @param {Function} callback
     */
    confirmation(message, callback){
        if (confirm(message))
            callback();
    }
}

window.$ = window.jQuery = require('../libs/jquery');
new options(new BrowserEvents(chrome));
