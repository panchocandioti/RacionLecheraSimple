import React, { useState, useEffect } from 'react';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import check_icon from "../images/check_icon.png";
import wrong_icon from "../images/wrong_icon.png";
import caution_icon from "../images/caution_icon.png";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function GraficoConsumo(props) {

    const consumo = props.racionMSCons;
    const consumo1 = props.consumoEstimado1;
    const consumo2 = props.consumoEstimado2;
    const consumoMaximo = Math.max(consumo1, consumo2);
    const consumoMinimo = Math.min(consumo1, consumo2);
    const [icon, setIcon] = useState(null);

    useEffect(() => {
        if (consumo <= consumoMinimo) setIcon(1);
        if (consumo > consumoMaximo) setIcon(-1);
        if (consumo > consumoMinimo && consumo <= consumoMaximo) setIcon(0);
    }, [consumo, consumo1, consumo2]);

    const data = {
        labels: ["Consumo declarado ración", "Estimación de consumo (1)", "Estimación de consumo (2)"],
        datasets: [{
            label: "kg MS",
            data: [consumo, consumo1, consumo2],
            backgroundColor: ["lightgreen", "green", "darkgreen"],
            borderColor: "gray",
            borderWidth: 1,
        }]
    }

    const options = {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                callbacks: {
                    label: (tooltipItem) => {
                        const value = Number(tooltipItem.raw); // Asegura que es un número
                        return `${tooltipItem.dataset.label}: ${value.toFixed(1)}`;
                    }
                }
            }
        },
    }

    return (
        <div className='resultados'>
            <div className='containerIcons'>
                <div>
                    <h5>Consumo de Materia Seca</h5>
                </div>
                <div>
                    {icon === 1 && (<img className="icon" src={check_icon}></img>)}
                    {icon === -1 && (<img className="icon" src={wrong_icon}></img>)}
                    {icon === 0 && (<img className="icon" src={caution_icon}></img>)}
                </div>
            </div>
            <div className='grafico'>
                <div style={{ position: "relative", height: "25vh", minWidth: "50vw", maxWidth: "70vw" }}>
                    <Bar data={data} options={options}></Bar>
                </div>
            </div>
        </div>
    )
}

export default GraficoConsumo;