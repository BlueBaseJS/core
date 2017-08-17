import Plugin from './Plugin';
import {addCallback, runCallbacks} from '../Callbacks';

class AddPlugin extends Plugin {
    initialize(){
        addCallback('plugin.add', function add1(num) {
            return num +1;
        })
        addCallback('plugin.add', function add5(num) {
            return num +5;
        })
        addCallback('plugin.add', function add3(num) {
            return num +3;
        })
    }
}

class SubtractPlugin extends Plugin {
    initialize(){
        addCallback('plugin.subtract', function sub1(num) {
            return num -1;
        })
        addCallback('plugin.subtract', function sub2(num) {
            return num -2;
        })
        addCallback('plugin.subtract', function sub3(num) {
            return num -3;
        })
    }
}


export const calback= () => {
let addObj = new AddPlugin();
addObj.initialize();
let subObj = new SubtractPlugin();
subObj.initialize();
console.log(runCallbacks('plugin.add', 2));
console.log(runCallbacks('plugin.subtract', 2));
}
