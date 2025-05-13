import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import GraficoConsumo from "./GraficoConsumo";
import GraficoEnergia from "./GraficoEnergia";
import GraficoProteina from "./GraficoProteina";
import GraficoForrajeConcentrado from "./GraficoForrajeConcentrado";
import arrowup from "../images/arrowup.png";
import arrowdown from "../images/arrowdown.png";
import { PDFDownloadLink } from '@react-pdf/renderer';
import ResFisicosPDF from "./ResFisicosPDF";

function ResultadosRacion(props) {
    const alimentosRacion = props.alimentosRacion;
    const racionMSCons = props.racionMSCons;
    const racionMVOfrecida = props.racionMVOfrecida;
    const racionMSPorciento = props.racionMSPorciento;
    const racionMSOfrecida = props.racionMSOfrecida;
    const racionAprPorciento = props.racionAprPorciento;
    const pesoVivo = props.pesoVivo;
    const lecheGB = props.lecheGB;
    const lechePB = props.lechePB;
    const lecheSolidos = props.lecheSolidos;
    const produccionIndividual = props.produccionIndividual;
    const sistema = props.sistema;
    const nombreCaso = props.nombreCaso;
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
    const consumoEstimado1 = 0.0265 * props.pesoVivo + 0.186 * produccionIndividual;
    const consumoEstimado2 = 0.0107 * props.pesoVivo / (1 - racionCE / 3.6);
    let reqEMMant;
    if (sistema === "confinamiento") {
        reqEMMant = 0.18796 * ((props.pesoVivo / 1.08) ** 0.67) / (0.503 + 0.35 * racionCE / 4.4);
    };
    if (sistema === "pastoreo") {
        reqEMMant = 0.2032 * ((props.pesoVivo / 1.08) ** 0.67) / (0.503 + 0.35 * racionCE / 4.4);
    }
    const reqEMProd = (0.09 * props.lecheGB + 0.05 * props.lechePB + 0.23) / (0.35 * racionCE / 4.4 + 0.42);
    const reqEMTotal = reqEMMant + produccionIndividual * reqEMProd;
    const reqPBMant = (0.435 * props.pesoVivo + 143) / 1000;
    const reqPBProd = (11.543 * props.lecheGB + 43.609) / 1000;
    const reqPBTotal = reqPBMant + produccionIndividual * reqPBProd;
    const racionMSForraje = alimentosRacion.reduce((acumulador, alimento) => {
        return alimento.clase === "forraje" ? acumulador + parseFloat(alimento.kgcons) : acumulador;
    }, 0);
    const forrajePorciento = (racionMSForraje / racionMSCons * 100).toFixed(0);
    const concentradoPorciento = (100 - parseFloat(forrajePorciento)).toFixed(0);
    const metanoEmitidoKgDia = ((parseFloat(racionEMCons) / 0.82) / (parseFloat(racionCE / 3.6))) * (-10 * parseFloat(racionCE) / 3.6 + 12) / 1329;
    const metanoEmitidoGramosLitro = (metanoEmitidoKgDia * 1000 / parseFloat(produccionIndividual)).toFixed(1);
    const saldoEM = parseFloat(racionEMCons) - parseFloat(reqEMTotal);
    let kgananciaPeso;
    if (saldoEM >= 0) { kgananciaPeso = (0.35 * parseFloat(racionCE) / 4.4 + 0.42) * .95 }
    else { kgananciaPeso = 0.84 };
    const variacionPeso = (parseFloat(saldoEM) * parseFloat(kgananciaPeso) * .95 / 4.54).toFixed(3);
    let mensajeVariacionPeso;
    if (saldoEM >= 0) { mensajeVariacionPeso = "Ganancia diaria de peso estimada" }
    else { mensajeVariacionPeso = "Pérdida diaria de peso estimada" };

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
                                    <td>{reqEMMant.toFixed(1)} MCalEM/día</td>
                                    <td>{reqPBMant.toFixed(2)} kgPB/día</td>
                                </tr>
                                <tr>
                                    <td>Producción</td>
                                    <td>{(produccionIndividual * reqEMProd).toFixed(1)} MCalEM/día</td>
                                    <td>{(produccionIndividual * reqPBProd).toFixed(2)} kgPB/día</td>
                                </tr>
                            </tbody>
                            <tfoot style={{ fontWeight: "bolder", borderTop: "gray solid 2px" }}>
                                <tr>
                                    <td>Requerimiento global</td>
                                    <td>{reqEMTotal.toFixed(1)} MCalEM/día</td>
                                    <td>{reqPBTotal.toFixed(2)} kgPB/día</td>
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
                                        <td>{(alimento.ce * alimento.kgcons).toFixed(1)} MCalEM/día</td>
                                        <td>{(alimento.pb * alimento.kgcons / 100).toFixed(2)} kgPB/día</td>
                                        <td></td>
                                        <td>{alimento.ce} MCalEM/kgMS</td>
                                        <td>{alimento.pb}%</td>
                                    </tr>)
                                )}
                            </tbody>
                            <tfoot style={{ fontWeight: "bolder", borderTop: "gray solid 2px" }}>
                                <tr>
                                    <td>Ración global</td>
                                    <td>{racionEMCons.toFixed(1)} MCalEM/día</td>
                                    <td>{racionPBCons.toFixed(2)} kgPB/día</td>
                                    <td></td>
                                    <td>{(racionCE).toFixed(2)} MCalEM/kgMS</td>
                                    <td>{(racionPB).toFixed(1)}%</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
                <hr />
                <h3>GRÁFICOS BALANCE</h3>
                <div>
                    <GraficoConsumo racionMSCons={racionMSCons} consumoEstimado1={consumoEstimado1} consumoEstimado2={consumoEstimado2}
                        sistema={sistema} />
                    <GraficoForrajeConcentrado forrajePorciento={forrajePorciento} concentradoPorciento={concentradoPorciento} />
                    <GraficoEnergia racionEMCons={racionEMCons} reqEMTotal={reqEMTotal} />
                    <GraficoProteina racionPBCons={racionPBCons} reqPBTotal={reqPBTotal} />
                </div>
                <hr />
                <h3>VARIACIÓN DE PESO</h3>
                <h5>{mensajeVariacionPeso}</h5>
                <div className="resultados resultados2">
                    <div className="containerIcons">
                        <div>
                            <h3 style={{ color: saldoEM < 0 ? 'red' : 'black' }}><b>{variacionPeso} kg/día</b></h3>
                        </div>
                        <div>
                            {saldoEM >= 0 && (<img className="icon" src={arrowup}></img>)}
                            {saldoEM < 0 && (<img className="icon" src={arrowdown}></img>)}
                        </div>
                    </div>
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
                                <td>{(parseFloat(produccionSolidos) / parseFloat(racionMSOfrecida) * 1000).toFixed(0)} kgSU/tonMS (*)</td>
                                <td>{(parseFloat(produccionSolidos) / parseFloat(racionMSCons) * 1000).toFixed(0)} kgSU/tonMS (*)</td>
                            </tr>
                        </tbody>
                    </table>
                    <p>(*) Sólidos útiles (kgSU): Proteína láctea (kgPB) + Grasa Butirosa (kgGB)</p>
                </div>
                <hr />
                <h3>EMISIÓN DE METANO</h3>
                <h5>Metano entérico emitido por día y por litro producido</h5>
                <div className='table-responsive'>
                    <table className="table table-sm table-hover table-striped">
                        <thead>
                            <tr>
                                <th>CH4/vaca día</th>
                                <th>CH4/litro producido</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{(parseFloat(metanoEmitidoKgDia) * 1000).toFixed(0)} gramos CH4/vaca día</td>
                                <td>{metanoEmitidoGramosLitro} gramos CH4/litro producido</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div style={{ backgroundColor: 'lightgray' }}>
                    <PDFDownloadLink document={<ResFisicosPDF nombreCaso={nombreCaso} pesoVivo={pesoVivo}
                        lecheGB={lecheGB} lechePB={lechePB} sistema={sistema} produccionIndividual={produccionIndividual}
                        reqEMMant={reqEMMant} reqEMProd={reqEMProd} reqEMTotal={reqEMTotal} reqPBMant={reqPBMant}
                        reqPBProd={reqPBProd} reqPBTotal={reqPBTotal} alimentosRacion={alimentosRacion}
                        racionEMCons={racionEMCons} racionPBCons={racionPBCons} racionCE={racionCE} racionPB={racionPB}
                        racionMSCons={racionMSCons} racionMVOfrecida={racionMVOfrecida} racionMSPorciento={racionMSPorciento}
                        racionMSOfrecida={racionMSOfrecida} racionAprPorciento={racionAprPorciento}
                    />} fileName="reporteResultadosFisicos.pdf">
                        {({ blob, url, loading, error }) => {
                            return loading ? (
                                <button disabled>Cargando documento...</button>
                            ) : error ? (
                                <span>Error al generar PDF</span>
                            ) : (
                                <a href={url} download="reporteResultadosFisicos.pdf">
                                    Resultados físicos - Descargar PDF
                                </a>
                            );
                        }}
                    </PDFDownloadLink>
                </div>
            </div>
        </div>
    )
}

export default ResultadosRacion