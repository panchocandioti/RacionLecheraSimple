import React from 'react';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import check_icon from "../images/check_icon.png";
import wrong_icon from "../images/wrong_icon.png";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function GraficoEnergia(props) {

    const energiaRacion = props.racionEMCons;
    const energiaRequerida = props.reqEMTotal;
    const balanceEnergia = energiaRacion - energiaRequerida;

    const data = {
        labels: ["Energía Metabólica consumida", "Energia Metabólica requerida"],
        datasets: [{
            label: "MCal EM",
            data: [energiaRacion, energiaRequerida],
            backgroundColor: ["#FFB07C", "#D87C45"],
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
                    <h5>Energía Metabólica</h5>
                </div>
                <div>
                    {balanceEnergia >= 0 && (<img className="icon" src={check_icon}></img>)}
                    {balanceEnergia < 0 && (<img className="icon" src={wrong_icon}></img>)}
                </div>
            </div>
            <div className='grafico'>
                <div style={{ position: "relative", height: "21vh", minWidth: "50vw", maxWidth: "70vw" }}>
                    <Bar data={data} options={options}></Bar>
                </div>
            </div>
        </div>
    )
}

export default GraficoEnergia;