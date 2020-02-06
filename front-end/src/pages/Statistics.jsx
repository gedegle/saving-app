import React from "react";
import { Polar } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";
import SideBar from "../SideBar";
import axios from "axios";

const Types =[
    {
        name: "Maistas",
        types: ["Maisto produktai", "Greitas maistas", "Užkandžiai", "Saldumynai", "Gaivieji gėrimai"]
    },
    {
        name: "Buities prekės",
        types: ["Apyvokos prekės", "Baldai", "Dekoro prekės"]
    },
    {
        name: "Drabužiai",
        types: ["Viršutiniai rūbai",
                "Avalynė",
                "Aksesuarai",
                "Lauko rūbai",
                "Kiti drabužiai"]
    },
    {
        name: "Elektronika",
        types: ["Žaidimų įranga",
               "Video ir audio",
               "Telefoninė įranga",
               "Kompiuterinė įranga"]
    },
    {
        name: "Transportas",
        types: ["Viešasis trans.",
               "Nuosavas trans.",
               "Kitas transportas"],
    },
    {
        name: "Pramogos",
        types: ["Pramogos"]
    },
    {
        name: "Mokesčiai",
        types: ['Mokesčiai']
    },
    {
        name: "Kita",
        types: ["Kita"]
    }
];

class ChartsPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataPolar: {
                datasets: [
                    {
                        data: [0, 0, 0, 0, 0, 0, 0, 0],
                        backgroundColor: [],
                        label: "Statistika"
                    }
                ],
                labels: ["Maistas", "Buities prekės", "Drabužiai", "Elektronika", "Transportas", "Pramogos", "Mokesčiai", "Kita"]
            },
            url: 'http://localhost:8000/api/posts-all'
        }
    }
    componentDidMount() {
        if(!sessionStorage.getItem("userData")) this.setState({redirect: true});
        else{
            let tempArr = [];
            axios.get(this.state.url)
                .then(res =>{
                    res.data.data.forEach((x)=>{
                        if(x.plan_id == JSON.parse(sessionStorage.getItem("thisPlanId"))) tempArr.push(x);
                    });
                    this.setState({
                        posts: tempArr
                    });

                    this.getSums(tempArr);
                })
                .catch(error => {
                    console.log(error.response)
                });
        }
    }
    getSums(x) {
        let sums = [];
        let sumTypes = [];
        let newResult = [];

        let result = x.reduce((c, v) => {
            c[v.type] = v.sum + (c[v.type] || 0) ;
            return c;
        }, {});

        let tempValues = Object.values(result);

        let tempKeys = Object.keys(result);

        tempKeys.forEach((i)=>{
        Types.forEach((items)=>{
            items.types.forEach((name)=>{
                if(i.toString() === name) sumTypes.push(items.name);
            });
        });
        });

        for(let i=0; i<sumTypes.length; i++){
            newResult[i] = {};
            newResult[i]["name"] = sumTypes[i];
            newResult[i]["sum"] = tempValues[i];
           // console.log(sumTypes[i])
        }

        newResult = newResult.reduce((c, v) => {
            c[v.name] = v.sum + (c[v.name] || 0) ;
            return c;
        }, {});


        sums = Object.values(newResult);
        sumTypes =Object.keys(newResult);

        this.setState({
            dataPolar: {
                datasets: [
                    {
                        data: sums,
                        backgroundColor: [
                            "rgba(242,10,158,0.5)",
                            "rgba(109,245,235,0.5)",
                            "rgb(192, 133, 222, 0.5)",
                            "rgba(72,0,255,0.5)",
                            "rgba(128,248,250,0.5)",
                            "rgb(137, 86, 247, 0.5)",
                            "rgba(242,152,240,0.5)",
                            "rgb(86, 83, 250, 0.5)"
                        ],
                        label: "Statistika"
                    }
                ],
                labels: sumTypes
            }
        })

    }
    render() {
        return (
            <div className={"statistics-page-wrapper"}>
                <SideBar activePlans={JSON.parse(sessionStorage.getItem("activePlans"))}/>
                {this.state.posts ? <MDBContainer>
                    <h3 className="mt-5">Jūsų išlaidų statistika</h3>
                    <Polar data={this.state.dataPolar} options={{ responsive: true }} />
                </MDBContainer> : '' }
            </div>
        );
    }
}

export default ChartsPage;
