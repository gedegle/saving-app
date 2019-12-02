import meatOnBone from "@iconify/icons-emojione-monotone/meat-on-bone";
import fastFoodSharp from "@iconify/icons-ion/fast-food-sharp";
import foodAppleOutline from "@iconify/icons-mdi/food-apple-outline";
import foodCroissant from "@iconify/icons-mdi/food-croissant";
import sodacupIcon from "@iconify/icons-whh/sodacup";
import silverwareClean from "@iconify/icons-mdi/silverware-clean";
import furniture15 from "@iconify/icons-maki/furniture-15";
import flowerpotIcon from "@iconify/icons-whh/flowerpot";
import womansClothes from "@iconify/icons-emojione-monotone/womans-clothes";
import highHeeledShoe from "@iconify/icons-emojione-monotone/high-heeled-shoe";
import sunglassesIcon from "@iconify/icons-emojione-monotone/sunglasses";
import mittenIcon from "@iconify/icons-fa-solid/mitten";
import socksIcon from "@iconify/icons-fa-solid/socks";
import gaming15 from "@iconify/icons-maki/gaming-15";
import photoVideo from "@iconify/icons-fa-solid/photo-video";
import cellphoneWireless from "@iconify/icons-mdi/cellphone-wireless";
import pcIcon from "@iconify/icons-raphael/pc";
import busAlt from "@iconify/icons-fa-solid/bus-alt";
import carIcon from "@iconify/icons-fa-solid/car";
import motorbikeIcon from "@iconify/icons-mdi/motorbike";

const Types =[
    {
        name: "food",
        types: [
            {
                tname: "Maisto produktai",
                icon: meatOnBone
            },
            {
                tname: "Greitas maistas",
                icon:  fastFoodSharp
            },
            {
                tname: "Užkandžiai",
                icon: foodAppleOutline
            },
            {
                tname: "Saldumynai",
                icon: foodCroissant
            },
            {
                tname: "Gaivieji gėrimai",
                icon: sodacupIcon
            }
        ],
    },
    {
        name: "housing",
        types: [
            {
                tname: "Apyvokos prekės",
                icon: silverwareClean
            },
            {
                tname: "Baldai",
                icon: furniture15
            },
            {
                tname: "Dekoro prekės",
                icon: flowerpotIcon
            }
        ],
    },
    {
        name: "clothes",
        types: [
            {
                tname: "Viršutiniai rūbai",
                icon: womansClothes
            },
            {
                tname: "Avalynė",
                icon: highHeeledShoe
            },
            {
                tname: "Aksesuarai",
                icon: sunglassesIcon
            },
            {
                tname: "Lauko rūbai",
                icon: mittenIcon
            },
            {
                tname: "Kita",
                icon: socksIcon
            }
        ],
    },
    {
        name: "electronics",
        types: [
            {
                tname: "Žaidimų įranga",
                icon: gaming15
            },
            {
                tname: "Video ir audio",
                icon: photoVideo
            },
            {
                tname: "Telefoninė įranga",
                icon: cellphoneWireless
            },
            {
                tname: "Kompiuterinė įranga",
                icon: pcIcon
            }
        ],
    },
    {
        name: "transport",
        types: [
            {
                tname: "Viešasis trans.",
                icon: busAlt
            },
            {
                tname: "Nuosavas trans.",
                icon: carIcon
            },
            {
                tname: "Kita",
                icon: motorbikeIcon
            }
        ],
    }
];

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

