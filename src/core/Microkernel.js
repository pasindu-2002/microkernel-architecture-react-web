class Microkernel {

    constructor(){
        this.component = {};
        this.event = {};
    }

    registerComponent(name, component){
        if(!this.component[name]){
            this.component[name] = name;
            component.init();
        }
    }

    unloadComponent(name){
        if(this.component[name]){
            this.component[name].destroy();
            delete this.component[name];
        }
    }

    subscribe(event, callback){
        if(!this.event[event]){
            this.event[event] = [];
        }

        this.event[event].push(callback);
    }

    publish(event, data){
        if(this.event[event]){
            this.event[event].forEach(callback => callback(data));
        }
    }

}

export default Microkernel;