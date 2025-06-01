import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import GraficoMargenAlimentacion from './GraficoMargenAlimentacion';
import { PDFDownloadLink } from '@react-pdf/renderer';
import ResEconomicosPDF from './ResEconomicosPDF';

function ResultadosEconomicos(props) {

    const nombreCaso = props.nombreCaso;
    const alimentosRacion = props.alimentosRacion;
    const produccionIndividual = props.produccionIndividual;
    const lecheSolidos = props.lecheSolidos;
    const precioLitro = props.precioLitro;
    const precioKgSU = props.precioKgSU;
    const currency = props.currency;
    const codigoMoneda = props.codigoMoneda;
    const decimales = props.decimales;
    const racionCosto = alimentosRacion.reduce((acumulador, alimento) => acumulador + (parseFloat(alimento.kgcons) * parseFloat(alimento.costokgcons)), 0);
    const racionCostoFormato = racionCosto.toFixed(decimales);
    const racionMSCons = props.racionMSCons;
    const [alimentosAporteEM, setAlimentosAporteEM] = useState([]);
    const [alimentosAportePB, setAlimentosAportePB] = useState([]);
    const ingresoLeche = (parseFloat(produccionIndividual) * parseFloat(precioLitro)).toFixed(decimales);

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

    return (
        <div className='seccion'>
            <h2>RESULTADOS ECONÓMICOS DE LA RACIÓN</h2>
            <hr />
            <h3>COSTO DE LA RACIÓN</h3>
            <h5>Costo total y por kgMS consumido</h5>
            <div className='table-responsive'>
                <table className="table table-sm table-hover table-striped">
                    <thead>
                        <tr>
                            <th>Alimento</th>
                            <th>MS Consumida</th>
                            <th>Costo/kgMS consumida</th>
                            <th>Subtotal</th>
                            <th>% sobre costo ración</th>
                        </tr>
                    </thead>
                    <tbody>
                        {alimentosRacion.map((alimento) => (
                            <tr key={alimento.id}>
                                <td>{alimento.nombre}</td>
                                <td>{alimento.kgcons} kgMS</td>
                                <td>{alimento.costokgcons} {codigoMoneda}/kgMS</td>
                                <td>{(parseFloat(alimento.kgcons) * parseFloat(alimento.costokgcons)).toFixed(decimales)} {codigoMoneda}</td>
                                <td>{((parseFloat(alimento.kgcons) * parseFloat(alimento.costokgcons)) / parseFloat(racionCostoFormato) * 100).toFixed(1)} %</td>
                            </tr>)
                        )}
                    </tbody>
                    <tfoot style={{ fontWeight: "bolder", borderTop: "gray solid 2px" }}>
                        <tr>
                            <td>Ración global</td>
                            <td>{racionMSCons} kgMS</td>
                            <td>{(parseFloat(racionCosto) / parseFloat(racionMSCons)).toFixed(decimales)} {codigoMoneda}/kgMS</td>
                            <td>{racionCostoFormato} {codigoMoneda}</td>
                            <td>100%</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
            <hr />
            <h3>COSTO DE LOS NUTRIENTES</h3>
            <h5>Costo por MCalEM y por kgPB consumidos</h5>
            <div className='table-responsive'>
                <table className="table table-sm table-hover table-striped">
                    <thead>
                        <tr>
                            <th>Alimento</th>
                            <th>Costo/MCalEM consumida</th>
                            <th>Costo/kgPB consumida</th>
                        </tr>
                    </thead>
                    <tbody>
                        {alimentosRacion.map((alimento) => (
                            <tr key={alimento.id}>
                                <td>{alimento.nombre}</td>
                                <td>{(parseFloat(alimento.costokgcons) / parseFloat(alimento.ce)).toFixed(decimales)} {codigoMoneda}/MCalEM</td>
                                <td>{(parseFloat(alimento.costokgcons) / parseFloat(alimento.pb) * 100).toFixed(decimales)} {codigoMoneda}/kgPB</td>
                            </tr>)
                        )}
                    </tbody>
                    <tfoot style={{ fontWeight: "bolder", borderTop: "gray solid 2px" }}>
                        <tr>
                            <td>Ración global</td>
                            <td>{((parseFloat(racionCosto) / parseFloat(racionMSCons)) / parseFloat(racionCE)).toFixed(decimales)} {codigoMoneda}/MCalEM</td>
                            <td>{((parseFloat(racionCosto) / parseFloat(racionMSCons)) / parseFloat(racionPB) * 100).toFixed(decimales)} {codigoMoneda}/kgPB</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
            <hr />
            <h3>INGRESOS LECHE</h3>
            <h5>Valor producido diario por vaca</h5>
            <div className='table-responsive'>
                <table className="table table-sm table-hover table-striped">
                    <thead>
                        <tr>
                            <th>Unidades producidas</th>
                            <th>Precio unitario</th>
                            <th>Ingresos leche</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{produccionIndividual} litros diarios/vaca</td>
                            <td>{parseFloat(precioLitro).toFixed(decimales)} {codigoMoneda}/litro</td>
                            <td>{parseFloat(ingresoLeche).toFixed(decimales)} {codigoMoneda} diarios/vaca</td>
                        </tr>

                        <tr>
                            <td>{(parseFloat(produccionIndividual) * parseFloat(lecheSolidos) / 100).toFixed(4)} kgSU diarios/vaca</td>
                            <td>{precioKgSU} {codigoMoneda}/kgSU</td>
                            <td>{ingresoLeche} {codigoMoneda} diarios/vaca</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <hr />
            <h3>MARGEN SOBRE ALIMENTACIÓN</h3>
            <h5>Expresado en dinero, litros y porcentaje del ingreso</h5>
            <GraficoMargenAlimentacion codigoMoneda={codigoMoneda} ingresoLeche={ingresoLeche} racionCostoFormato={racionCostoFormato}
                precioLitro={precioLitro} decimales={decimales}
            />
            <div style={{ backgroundColor: "lightgray" }}>
                <PDFDownloadLink document={<ResEconomicosPDF nombreCaso={nombreCaso} currency={currency}
                    codigoMoneda={codigoMoneda} precioLitro={precioLitro} precioKgSU={precioKgSU} lecheSolidos={lecheSolidos}
                    alimentosRacion={alimentosRacion} racionMSCons={racionMSCons} decimales={decimales}
                    racionCostoFormato={racionCostoFormato} racionCosto={racionCosto} racionCE={racionCE}
                    racionPB={racionPB} produccionIndividual={produccionIndividual} ingresoLeche={ingresoLeche}
                />} fileName="reporteResultadosEconomicos.pdf">
                    {({ blob, url, loading, error }) => {
                        return loading ? (
                            <button disabled>Cargando documento...</button>
                        ) : error ? (
                            <span>Error al generar PDF</span>
                        ) : (
                            <a href={url} download="reporteResultadosEconomicos.pdf">
                                Resultados económicos - Descargar PDF
                            </a>
                        );
                    }}
                </PDFDownloadLink>
            </div>
        </div>
    )
}

export default ResultadosEconomicos