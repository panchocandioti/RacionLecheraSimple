import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import GraficoConsumo from "./GraficoConsumo";
import GraficoEnergia from "./GraficoEnergia";
import GraficoProteina from "./GraficoProteina";
import GraficoForrajeConcentrado from "./GraficoForrajeConcentrado";

function ResultadosRacion(props) {
    const alimentosRacion = props.alimentosRacion;
    const racionMSCons = props.racionMSCons;
    const racionMSOfrecida = props.racionMSOfrecida;
    const lecheSolidos = props.lecheSolidos;
    const produccionIndividual = props.produccionIndividual;
    const produccionSolidos = (parseFloat(produccionIndividual) * parseFloat(lecheSolidos) / 100).toFixed(4);
    const [alimentosAporteEM, setAlimentosAporteEM] = useState([]);
    const [alimentosAportePB, setAlimentosAportePB] = useState([]);


    useEffect(() => {
        const alimentoEM = alimentosRacion.map((alimento) => (parseFloat(alimento.ce) * parseFloat(alimento.kgcons)));
        const alimentoPB = alimentosRacion.map((alimento) => (parseFloat(alimento.pb) * parseFloat(alimento.kgcons) / 100));
        setAlimentosAporteEM(alimentoEM)
        setAlimentosAportePB(alimentoPB);
    }, [alimentosRacion]);

    const racionEMCons = alimentosAporteEM.reduce((acumulador, valor) => acumulador + parseFloat(valor), 0);
    const racionPBCons = alimentosAportePB.reduce((acumulador, valor) => acumulador + parseFloat(valor), 0);
    const racionCE = racionEMCons / racionMSCons;
    const racionPB = racionPBCons / racionMSCons * 100;
    const consumoEstimado1 = 0.026 * props.pesoVivo + 0.186 * produccionIndividual;
    const consumoEstimado2 = (0.0107 * props.pesoVivo / (1 - racionCE / 3.6)) ** ((-racionCE + 1.8) / 40 + 0.99);
    const reqEMMant = 0.2032 * ((props.pesoVivo / 1.08) ** 0.67) / (0.503 + 0.35 * racionCE / 4.4);
    const reqEMProd = (0.09 * props.lecheGB + 0.05 * props.lechePB + 0.23) / (0.35 * racionCE / 4.4 + 0.42);
    const reqEMTotal = reqEMMant + produccionIndividual * reqEMProd;
    const reqPBMant = (0.435 * props.pesoVivo + 143) / 1000;
    const reqPBProd = (11.543 * props.lecheGB + 43.609) / 1000;
    const reqPBTotal = reqPBMant + produccionIndividual * reqPBProd;
    const racionMSForraje = alimentosRacion.reduce((acumulador, alimento) => {
        return alimento.clase === "forraje" ? acumulador + parseFloat(alimento.kgcons) : acumulador;
    }, 0);
    const forrajePorciento = (racionMSForraje / racionMSCons * 100).toFixed(0);
    const concentradoPorciento = ((racionMSCons - racionMSForraje) / racionMSCons * 100).toFixed(0);

    return (
        <div>
            <div className="seccion">
                <h2>RESULTADOS FÍSICOS DE LA RACIÓN</h2>
                <hr />
                <div>
                    <h3>REQUERIMIENTOS</h3>
                    <h5>Necesidades nutricionales de la vaca lechera</h5>
                    <div className='table-responsive'>
                        <table className="table table-sm table-hover table-striped">
                            <thead>
                                <tr>
                                    <th>Requerimiento</th>
                                    <th>Energía Metabólica</th>
                                    <th>Proteína Bruta</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Mantenimiento</td>
                                    <td>{reqEMMant.toFixed(1)} MCalEM</td>
                                    <td>{reqPBMant.toFixed(2)} kgPB</td>
                                </tr>
                                <tr>
                                    <td>Producción</td>
                                    <td>{(produccionIndividual * reqEMProd).toFixed(1)} MCalEM</td>
                                    <td>{(produccionIndividual * reqPBProd).toFixed(2)} kgPB</td>
                                </tr>
                            </tbody>
                            <tfoot style={{ fontWeight: "bolder", borderTop: "gray solid 2px" }}>
                                <tr>
                                    <td>Requerimiento global</td>
                                    <td>{reqEMTotal.toFixed(1)} MCalEM</td>
                                    <td>{reqPBTotal.toFixed(2)} kgPB</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
                <hr />
                <div>
                    <h3>CONSUMO</h3>
                    <h5>Nutrientes aportados por la ración</h5>
                    <div className='table-responsive'>
                        <table className="table table-sm table-hover table-striped">
                            <thead>
                                <tr>
                                    <th>Alimento</th>
                                    <th>Energía Metabólica</th>
                                    <th>Proteína Bruta</th>
                                    <th></th>
                                    <th>Concentración EM</th>
                                    <th>Concentración PB</th>
                                </tr>
                            </thead>
                            <tbody>
                                {alimentosRacion.map((alimento) => (
                                    <tr key={alimento.id}>
                                        <td>{alimento.nombre}</td>
                                        <td>{(alimento.ce * alimento.kgcons).toFixed(1)} MCalEM</td>
                                        <td>{(alimento.pb * alimento.kgcons / 100).toFixed(2)} kgPB</td>
                                        <td></td>
                                        <td>{alimento.ce} MCalEM/kgMS</td>
                                        <td>{alimento.pb}%</td>
                                    </tr>)
                                )}
                            </tbody>
                            <tfoot style={{ fontWeight: "bolder", borderTop: "gray solid 2px" }}>
                                <tr>
                                    <td>Ración global</td>
                                    <td>{racionEMCons.toFixed(1)} MCalEM</td>
                                    <td>{racionPBCons.toFixed(2)} kgPB</td>
                                    <td></td>
                                    <td>{(racionCE).toFixed(2)} MCalEM/kgMS</td>
                                    <td>{(racionPB).toFixed(1)}%</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                    <hr />
                    <h3>EFICIENCIA DE CONVERSIÓN</h3>
                    <h5>Conversión de materia seca ofrecida y consumida</h5>
                    <div className='table-responsive'>
                        <table className="table table-sm table-hover table-striped">
                            <thead>
                                <tr>
                                    <th>Materia seca ofrecida</th>
                                    <th>Materia seca consumida</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{(parseFloat(produccionIndividual) / parseFloat(racionMSOfrecida)).toFixed(2)} litros/kgMS</td>
                                    <td>{(parseFloat(produccionIndividual) / parseFloat(racionMSCons)).toFixed(2)} litros/kgMS</td>
                                </tr>
                                <tr>
                                    <td>{(parseFloat(produccionSolidos)/parseFloat(racionMSOfrecida)*1000).toFixed(0)} kgSU/tonMS</td>
                                    <td>{(parseFloat(produccionSolidos)/parseFloat(racionMSCons)*1000).toFixed(0)} kgSU/tonMS</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <hr />
                <h3>GRÁFICOS BALANCE</h3>
                <div>
                    <GraficoConsumo racionMSCons={racionMSCons} consumoEstimado1={consumoEstimado1} consumoEstimado2={consumoEstimado2} />
                    <GraficoForrajeConcentrado forrajePorciento={forrajePorciento} concentradoPorciento={concentradoPorciento} />
                    <GraficoEnergia racionEMCons={racionEMCons} reqEMTotal={reqEMTotal} />
                    <GraficoProteina racionPBCons={racionPBCons} reqPBTotal={reqPBTotal} />
                </div>
            </div>
        </div>
    )
}

export default ResultadosRacion