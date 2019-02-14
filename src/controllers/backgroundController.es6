import BrowserEvents from '../helpers/BrowserEvents.es6';
import timeHandler from '../classes/timeHandler.es6';

export default class backgroundController{

    constructor(driver){
        this.browserEvents = driver;
        this.browserEvents.onMessageUpdated(this);
        this.timeHandler = new timeHandler(driver);
    }

    /**
     * called by message from frontend. search a facebook window and call a timeHandler if find it
     */
    initTimer(){
        this.timeHandler.maxMinutes(()=>{
            let loop = setInterval(() =>{
                this.browserEvents.getTabIdFromUrl("https://www.facebook.com/*", (param) =>{
                    if(!this.timeHandler.isEmpty(param)){
                        this.timeHandler.timeHandler(loop);
                    }else{
                        clearInterval(loop);
                        console.log("reason");
                    }
                })
            }, 1000);
        });
        
    }
}

new backgroundController(new BrowserEvents(chrome));