export default class BrowserEvents {

    constructor( driver ){
        this.driver = driver;
    }

    /**
     * Add listener to an specific class. that way, content or back can listen the messages
     *
     * @param {Class} instance: class to add listener
     */
    onMessageUpdated(instance) {
        this.driver.runtime.onMessage.addListener((message) => this.handleMessageEvent(message, instance));
    }

    /**
     * It handle messages and invoke the specific method in a class with listener
     *
     * @param {Object} message: info to send message
     * @param {Class} instance
     */
    handleMessageEvent(message, instance){
        let instanceMatch = true;
        if( instance && instance.className && message && message.class)
            instanceMatch = instance.className.toLowerCase() === message.class.toLowerCase();

        if (instance && instanceMatch && typeof instance[message.task] === 'function' )
            instance[message.task](message.data);
    }

    /**
     * Comunicate content and background by message
     * @param {Object} data: Infomation to send message.
     *                      -   task: method name
     *                      -   tabId*: page tab id
     *                      -   data*: additional information
     *
     *                      * optional
     *
     * @param {Function} callback
     */
    sendMessage(data, callback){
        if( data.tabId ){
            this.driver.tabs.sendMessage(data.tabId, data);
        }
        else
            this.driver.runtime.sendMessage(data, callback);
    }

    /**
     * Get all tab id with an specific url
     *
     * @param {String} url: to get tab id
     * @param {Function} callback
     */
    getTabIdFromUrl(url, callback){
        this.queryTabs({
            "url" : url
        }, ( tabInfo ) => {
            callback(tabInfo)
        });
    }

    /**
     * Get data in storage from google chrome navigator.
     *
     * @param {String} name: data in storage.
     * @param {Function} callback
     */
    getLocalData(name, callback){
        this.driver.storage.local.get(name, (result) => {
            if(callback)
                callback(result);
        })
    }

    /**
     * set value in storage from google chrome navigator.
     *
     * @param {String} name: data in storage.
     * @param {Any} value: new value.
     * @param {Function} callback
     */
    setLocalData(name, value, callback){
        this.driver.storage.local.set({[name]: value}, (result) => {
            if(callback)
                callback(result);
        });
    }

    /**
     * Make query in chrome navigator
     * @param {String} queryInfo: query
     * @param {Function} callback
     */
    queryTabs(queryInfo, callback){
        this.driver.tabs.query(queryInfo, callback);
    }
}