import React, { useState } from 'react'
import { Chart as ChartJS, ArcElement, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Legend);

function GraficoMargenAlimentacion(props) {

    const codigoMoneda = props.codigoMoneda;
    const decimales = props.decimales;
    const precioLitro = props.precioLitro;
    const ingresoLeche = props.ingresoLeche;
    const racionCosto = props.racionCostoFormato;
    const racionMargen = (parseFloat(ingresoLeche) - parseFloat(racionCosto)).toFixed(decimales);
    const racionCostoLitros = (parseFloat(racionCosto) / parseFloat(precioLitro)).toFixed(1);
    const racionMargenLitros = (parseFloat(racionMargen) / parseFloat(precioLitro)).toFixed(1);
    const racionCostoPorciento = (parseFloat(racionCosto) / parseFloat(ingresoLeche) * 100).toFixed(1);
    const racionMargenPorciento = (parseFloat(racionMargen) / parseFloat(ingresoLeche) * 100).toFixed(1);
    const [unidad, setUnidad] = useState(codigoMoneda);
    const [margenSobreAlimentacion, setMargenSobreAlimentacion] = useState(racionMargen);
    const [costoAlimentacion, setCostoAlimentacion] = useState(racionCosto);


    const handleClickMoneda = () => {
        setUnidad(codigoMoneda);
        setMargenSobreAlimentacion(racionMargen);
        setCostoAlimentacion(racionCosto);
    };

    const handleClickLitros = () => {
        setUnidad("Litros");
        setMargenSobreAlimentacion(racionMargenLitros);
        setCostoAlimentacion(racionCostoLitros);
    };

    const handleClickPorcentaje = () => {
        setUnidad("%");
        setMargenSobreAlimentacion(racionMargenPorciento);
        setCostoAlimentacion(racionCostoPorciento);
    };

    const data = {
        labels: ["Margen sobre alimentación", "Costo de alimentación"],
        datasets: [{
            label: unidad,
            data: [margenSobreAlimentacion, costoAlimentacion],
            backgroundColor: ["blue", "red"],
            borderColor: ["darkblue", "darkred"],
            borderWidth: [3, 3]
        }]
    }

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                position: "bottom",
                labels: {
                    boxWidth: 12,
                    padding: 12,
                    font: {
                        size: 12
                    },
                },
            },

        },
    }

    return (
        <div className='resultados'>
            <div className='grafico'>
                <div style={{ position: "relative", minHeight: "340px", width: "75vw" }}>
                    <Pie data={data} options={options}></Pie>
                </div>
            </div>
            <div>
                <button onClick={handleClickMoneda}>VER EN {codigoMoneda}</button>
                <button onClick={handleClickLitros}>VER EN LITROS</button>
                <button onClick={handleClickPorcentaje}>VER EN PORCENTAJE</button>
            </div>
        </div>
    )
}


export default GraficoMargenAlimentacion