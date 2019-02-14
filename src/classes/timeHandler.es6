import BrowserEvents from '../helpers/BrowserEvents.es6';

export default class timeHandler{

    constructor(driver){
        this.browserEvents = driver;
        this.browserEvents.onMessageUpdated(this);
    }

    timeHandler(loop){
        this.browserEvents.getLocalData(['time', 'maxTimeMinutes'], (result)=> {
            if((result.maxTimeMinutes * 60) <= result.time){
                clearInterval(loop);
                this.workingNow();
            }else{
                if(typeof result.time === "undefined"){
                    this.browserEvents.setLocalData('time', 1);
                }else{
                    this.browserEvents.setLocalData('time', result.time + 1);
                }
            }
        });
    }

    workingNow(){
        this.browserEvents.getTabIdFromUrl("https://www.facebook.com/*", (result) =>{
            // $.each(result, (pageInfo) =>{
            for(let pageInfo of result){
                this.browserEvents.sendMessage({
                    'task': 'youShouldBeWorking',
                    'tabId': pageInfo.id
                })
            }
        });
    }

    maxMinutes(callback){
        this.browserEvents.getLocalData(['maxTimeMinutes'], (result)=> {
            if(typeof result.maxTimeMinutes === "undefined"){
                this.browserEvents.setLocalData('maxTimeMinutes', 1,callback);
            }else{
                callback();
            }
        });
    }

    isEmpty(array){
        return array.length === 0 || typeof array === 'undefined'
    }

}
1
