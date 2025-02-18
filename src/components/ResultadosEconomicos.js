import React, {useState, useEffect} from 'react'
import 'bootstrap/dist/css/bootstrap.css';

function ResultadosEconomicos(props) {

    const alimentosRacion = props.alimentosRacion;
    const datosVaca = props.datosVaca;
    const precioLitro = props.precioLitro;
    const precioKgSU = props.precioKgSU;
    const codigoMoneda = props.codigoMoneda;
    const decimales = props.decimales;
    const racionCosto = alimentosRacion.reduce((acumulador, alimento) => acumulador + (parseFloat(alimento.kgcons) * parseFloat(alimento.costokgcons)), 0);
    const racionCostoFormato = racionCosto.toFixed(decimales);
    const racionMSCons = props.racionMSCons;
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
                            <th>Costo MS consumida</th>
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
                            <th>Costo EM consumida</th>
                            <th>Costo PB consumida</th>
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


        </div>
    )
}

export default ResultadosEconomicos