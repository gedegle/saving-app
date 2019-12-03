import checkIcon from "@iconify/icons-foundation/check";
import {Icon} from "@iconify/react";
import React from "react";
import xIcon from "@iconify/icons-foundation/x";

function IconCoder() {
    this.getClass = function (ifSaved) {
        if(ifSaved == 1)
            return (<Icon icon={checkIcon} color="#00cf95" width="2em" />);
        if(ifSaved == 0)
            return (<Icon icon={xIcon} color="#CF2E00" width="2em" />);
    };
}

export default function IconProxy() {
    var iconCoder = new IconCoder();
    var iconCache = {};

    return {
        getIcon: function (ifSaved) {
            if(!iconCache[ifSaved]) {
                iconCache[ifSaved] = iconCoder.getClass(ifSaved);
            }
            console.log(ifSaved + ": " + iconCache[ifSaved]);
            return iconCache[ifSaved];
        }
    };
}
