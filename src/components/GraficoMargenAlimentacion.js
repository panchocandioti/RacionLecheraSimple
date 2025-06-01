import React, { useState, useEffect } from 'react'
import { Chart as ChartJS, ArcElement, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Legend);

function GraficoMargenAlimentacion(props) {

    const codigoMoneda = props.codigoMoneda;
    const decimales = props.decimales;
    const [decimales2, setDecimales2] = useState(decimales);
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
        setUnidad((codigoMoneda + "/vaca día"));
        setDecimales2(decimales);
    };

    const handleClickLitros = () => {
        setUnidad("litros/vaca día");
        setDecimales2(1);
    };

    const handleClickPorcentaje = () => {
        setUnidad("% sobre ingresos leche");
        setDecimales2(1);
    };

    useEffect(() => {
        if (unidad === (codigoMoneda + "/vaca día")) {
            setMargenSobreAlimentacion(racionMargen);
            setCostoAlimentacion(racionCosto);
        }
        if (unidad === "litros/vaca día") {
            setMargenSobreAlimentacion(racionMargenLitros);
            setCostoAlimentacion(racionCostoLitros);
        }
        if (unidad === "% sobre ingresos leche") {
            setMargenSobreAlimentacion(racionMargenPorciento);
            setCostoAlimentacion(racionCostoPorciento);
        }
    }, [unidad, decimales, precioLitro, ingresoLeche, racionCosto]);

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
        <div>
            <div className='table-responsive'>
                <table className="table table-sm table-hover table-striped">
                    <thead>
                        <tr>
                            <th>Ingresos leche</th>
                            <th>Costo de alimentación</th>
                            <th>Margen sobre alimentación</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{(parseFloat(costoAlimentacion) + parseFloat(margenSobreAlimentacion)).toFixed(decimales2)} {unidad}</td>
                            <td>{costoAlimentacion} {unidad}</td>
                            <td>{margenSobreAlimentacion} {unidad}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
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
        </div>
    )
}


export default GraficoMargenAlimentacion