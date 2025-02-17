import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import check_icon from "../images/check_icon.png";
import wrong_icon from "../images/wrong_icon.png";
import caution_icon from "../images/caution_icon.png";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function GraficoForrajeConcentrado(props) {

    const forraje = props.forrajePorciento;
    const concentrado = props.concentradoPorciento;
    const [icon, setIcon] = useState(null);

    useEffect(() => {
        if (forraje >= 50) setIcon(1);
        if (forraje < 30) setIcon(-1);
        if (forraje >= 30 && forraje < 50) setIcon(0);
    }, [forraje]);

    const data = {
        labels: [""], // Un solo grupo de barras
        datasets: [
            {
                label: "Forraje (%)",
                data: [forraje],
                backgroundColor: "#D2B48C",
                borderColor: "gray",
                borderWidth: 1,
            },
            {
                label: "Concentrado (%)",
                data: [concentrado],
                backgroundColor: "beige",
                borderColor: "gray",
                borderWidth: 1,
            }
        ]
    };

    const options = {
        indexAxis: 'y', // Hace que el gráfico sea horizontal
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top', // Ubicación de la leyenda
            },
            tooltip: {
                mode: 'index',
                intersect: false,
            },
        },
        scales: {
            x: {
                stacked: true, // Apila las barras en el eje X
            },
            y: {
                stacked: true, // Apila las barras en el eje Y
            },
        },
    };

    return (
        <div className='resultados'>
            <div className='containerIcons'>
                <div>
                    <h5>Forraje : Concentrado</h5>
                </div>
                <div>
                    {icon === 1 && (<img className="icon" src={check_icon}></img>)}
                    {icon === -1 && (<img className="icon" src={wrong_icon}></img>)}
                    {icon === 0 && (<img className="icon" src={caution_icon}></img>)}
                </div>
            </div>
            <div className='grafico'>
                <div style={{ position: "relative", height: "18vh", minWidth: "50vw", maxWidth: "70vw" }}>
                    <Bar data={data} options={options}></Bar>
                </div>
            </div>
        </div>
    )
}

export default GraficoForrajeConcentrado;