import { Types } from './types';

function Type(name) {
    this.name = name;
}
function TypeFactory() {
    this.createType = function(name) {
        return new Type(name);
    };
}
function Subtype(tname, icon, typeName) {
    this.tname = tname;
    this.icon = icon;
    this.typeName = typeName;
}
function SubtypeFactory () {
    this.createSub = function (tname, icon, typeName) {
        return new Subtype(tname, icon, typeName);
    }
}

function TypesFactory(){
    var types = [];
    var subtypes = [];
    this.typeFactory = new TypeFactory();
    this.subtypeFactory = new SubtypeFactory();

    Types.forEach((x)=>{
        types.push(this.typeFactory.createType(x.name));
        x.types.forEach((y)=>{
            subtypes.push(this.subtypeFactory.createSub(y.tname, y.icon, x.name));
        })
    });

    this.getTypes = function () {
        return types;
    }
    this.getSubtypes = function () {
        return subtypes;
    }
}

export default TypesFactory;

