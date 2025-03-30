import React, { useState, useEffect, useRef } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import trash from '../images/trash.svg';
import floppy from '../images/floppy.svg';
import folder from '../images/folder2-open.svg';
import ResultadosRacion from "./ResultadosRacion";
import MensajeError from "./MensajeError";
import divisas from './Divisas'
import ResultadosEconomicos from "./ResultadosEconomicos";
import vaquita from "../images/vaquita.png";
import pasto from "../images/pasto.png";
import resfisicos from "../images/resfisicos.png";
import datosecon from "../images/datoseconomicos.png";
import resecon from "../images/reseconomicos.png";

function GestionRacion(props) {
    const [nombreCaso, setNombreCaso] = useState("");
    const [pesoVivo, setPesoVivo] = useState("");
    const [produccionIndividual, setProduccionIndividual] = useState("");
    const [lecheGB, setLecheGB] = useState("");
    const [lechePB, setLechePB] = useState("");
    const [datosVaca, setDatosVaca] = useState([]);
    const baseAlimentos = props.baseAlimentos;
    const baseGenericaActiva = props.baseGenericaActiva;
    const mostrarBaseAlimentos = props.mostrarBaseAlimentos;
    const [alimentoSeleccionado, setAlimentoSeleccionado] = useState("");
    const [alimentosRacion, setAlimentosRacion] = useState([]);
    const [datosSesion, setDatosSesion] = useState([]);
    const [carga, setCarga] = useState(false);
    const [mostrarResultados, setMostrarResultados] = useState(false);
    const [mostrarIndEcon, setMostrarIndEcon] = useState(false);
    const [currency, setCurrency] = useState("Peso argentino");
    const [codigoMoneda, setCodigoMoneda] = useState("ARS");
    const datosMoneda = divisas.map(item => item.currency);
    const [precioLitro, setPrecioLitro] = useState(0);
    const [precioKgSU, setPrecioKgSU] = useState(0);
    const [decimales, setDecimales] = useState(2);
    const [mostrarResEcon, setMostrarResEcon] = useState(false);
    const [sistema, setSistema] = useState('');
    const [archivoActivo, setArchivoActivo] = useState("Ningún archivo seleccionado");

    let decimales2 = 0;
    if (decimales > 1) { decimales2 = decimales - 1 } else { decimales2 = 0 };

    // Guardar datos en un archivo JSON
    const descargarJSON = (nombreArchivo = "datosRacion.json") => {
        const datosStr = JSON.stringify(datosSesion, null, 2);
        const blob = new Blob([datosStr], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = nombreArchivo;
        link.click();
        URL.revokeObjectURL(url);
    };

    const fileInputRef = useRef(null);

    const manejarClickBoton = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click(); // Simula el clic en el input
        }
    };

    // Cargar datos desde un archivo JSON
    const cargarJSON = (event) => {
        const file = event.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const datosCargados = JSON.parse(e.target.result);
                if (datosCargados[0] === "datosRacion") {
                    setDatosSesion(datosCargados);
                    setNombreCaso(datosCargados[1])
                    setDatosVaca(datosCargados[2][0]);
                    setCurrency(datosCargados[3])
                    setCodigoMoneda(datosCargados[4])
                    setPrecioLitro(datosCargados[5])
                    setAlimentosRacion(datosCargados[6]);
                    setCarga(prev => !prev);
                    setArchivoActivo(file.name);
                } else {
                    alert("ERROR: El archivo seleccionado no es válido.");
                }
            } catch (error) {
                alert("Error al leer el archivo JSON.");
            };
        };
        reader.readAsText(file);
    };

    useEffect(() => {
        if (!pesoVivo) return;
        const nuevaVaca = {
            id: String(Date.now()),
            pv: pesoVivo,
            sist: sistema,
            pi: produccionIndividual,
            gb: lecheGB,
            pb: lechePB,
        };
        setDatosVaca([nuevaVaca]);
    }, [pesoVivo, sistema, produccionIndividual, lecheGB, lechePB]);

    useEffect(() => {
        const nuevosDatos = ["datosRacion", nombreCaso, datosVaca, currency, codigoMoneda, precioLitro, alimentosRacion];
        setDatosSesion(nuevosDatos);
    }, [nombreCaso, datosVaca, currency, codigoMoneda, precioLitro, alimentosRacion]);

    useEffect(() => {
        setPesoVivo(datosVaca.pv);
        setSistema(datosVaca.sist);
        setProduccionIndividual(datosVaca.pi);
        setLecheGB(datosVaca.gb);
        setLechePB(datosVaca.pb);
    }, [carga]);

    const handleNombreCasoChange = (e) => {
        setNombreCaso(e.target.value);
    };

    const handleSelectChange = (event) => {
        const selectedId = event.target.value;
        const alimento = baseAlimentos.find((p) => p.id === selectedId);
        setAlimentoSeleccionado(alimento);
    };

    useEffect(() => {
        if (!alimentoSeleccionado) return;
        if (alimentosRacion.some((a) => a.id === alimentoSeleccionado.id)) return;
        const nuevoAlimento = {
            ...alimentoSeleccionado,
            kgtc: 0, kgms: 0, apr: 0, kgcons: 0, costokgtc: 0, costokgms: 0, costokgcons: 0
        }; // Se agregan las nuevas propiedades inicializadas en 0
        setAlimentosRacion((prev) => [...prev, nuevoAlimento]);
        setAlimentoSeleccionado(null);
    }, [alimentoSeleccionado]);

    const actualizarKgTC = (id, valor) => {
        setAlimentosRacion((prev) =>
            prev.map((alimento) =>
                alimento.id === id ? { ...alimento, kgtc: parseFloat(valor) || "", kgms: (parseFloat(valor) * alimento.ms / 100).toFixed(1), kgcons: (parseFloat(valor) * alimento.ms * alimento.apr / 10000).toFixed(1) } : alimento
            )
        );
    };

    const actualizarKgMS = (id, valor) => {
        setAlimentosRacion((prev) =>
            prev.map((alimento) =>
                alimento.id === id ? { ...alimento, kgms: parseFloat(valor) || "", kgtc: ((parseFloat(valor) / alimento.ms) * 100).toFixed(1), kgcons: (parseFloat(valor) * alimento.apr / 100).toFixed(1) } : alimento
            )
        );
    };

    const actualizarApr = (id, valor) => {
        setAlimentosRacion((prev) =>
            prev.map((alimento) =>
                alimento.id === id ? { ...alimento, apr: parseFloat(valor) || "", kgcons: ((parseFloat(valor) * alimento.kgms) / 100).toFixed(1) } : alimento
            )
        );
    };

    const actualizarCostoKgTC = (id, valor) => {
        const valorNormalizado = valor.replace(",", "."); // Reemplaza comas por puntos
        const numero = valorNormalizado === "" ? "" : parseFloat(valorNormalizado); // Permitir que el input quede vacío sin poner NaN
        setAlimentosRacion((prev) =>
            prev.map((alimento) =>
                alimento.id === id
                    ? {
                        ...alimento,
                        costokgtc: numero,
                        costokgms: numero === "" ? "" : (numero / alimento.ms * 100).toFixed(decimales),
                        costokgcons: numero === "" ? "" : ((numero / alimento.ms) / alimento.apr * 10000).toFixed(decimales),
                    }
                    : alimento
            )
        );
    };

    const actualizarCostoKgMS = (id, valor) => {
        const valorNormalizado = valor.replace(",", "."); // Reemplaza comas por puntos
        const numero = valorNormalizado === "" ? "" : parseFloat(valorNormalizado); // Permitir que el input quede vacío sin poner NaN
        setAlimentosRacion((prev) =>
            prev.map((alimento) =>
                alimento.id === id
                    ? {
                        ...alimento,
                        costokgms: numero,
                        costokgtc: numero === "" ? "" : (numero * alimento.ms / 100).toFixed(decimales),
                        costokgcons: numero === "" ? "" : (numero / alimento.apr * 100).toFixed(decimales),
                    }
                    : alimento
            )
        );
    };

    const eliminarAlimento = (id) => {
        setAlimentosRacion((prev) => prev.filter((alimento) => alimento.id !== id));
    };



    //Indicadores de la ración y otros
    const racionMVOfrecida = alimentosRacion.reduce((acumulador, alimento) => acumulador + parseFloat(alimento.kgtc), 0).toFixed(1);
    const racionMSOfrecida = alimentosRacion.reduce((acumulador, alimento) => acumulador + parseFloat(alimento.kgms), 0).toFixed(1);
    const racionMSCons = alimentosRacion.reduce((acumulador, alimento) => acumulador + parseFloat(alimento.kgcons), 0).toFixed(1);
    const racionMSPorciento = (racionMSOfrecida / racionMVOfrecida * 100).toFixed(1);
    const racionAprPorciento = (racionMSCons / racionMSOfrecida * 100).toFixed(1);
    const lecheSolidos = (parseFloat(lecheGB) + parseFloat(lechePB)).toFixed(2);

    let validacionVaca = false;
    let validacionAlimentos = false;

    if ((pesoVivo >= 330 && pesoVivo <= 830) && (sistema === "pastoreo" || sistema === "confinamiento") && (produccionIndividual >= 0 && produccionIndividual <= 70) && (lecheGB >= 0 && lecheGB <= 6)
        && (lechePB >= 0 && lechePB <= 5)) validacionVaca = true;

    if (racionMSCons > 0) validacionAlimentos = true;

    const handleClick1 = () => {
        if (!validacionVaca || !validacionAlimentos) return;
        setMostrarResultados(true);
    };

    const handleClick2 = () => {
        setMostrarIndEcon(true);
    };

    const handleClick3 = () => {
        setMostrarResEcon(true);
    };

    const handleSelect1Change = (event) => {
        const selectedCurrency = event.target.value;
        setCurrency(selectedCurrency);
    };

    useEffect(() => {
        const elementoEncontrado = divisas.find(elemento => elemento.currency === currency);
        setCodigoMoneda(prevstate => elementoEncontrado.code);
    }, [currency]);

    const actualizarPrecioLitro = (e) => {
        const precioLitro = parseFloat(e.target.value);
        setPrecioLitro(precioLitro);
        setPrecioKgSU((precioLitro / lecheSolidos * 100).toFixed(decimales2));
    };

    useEffect(() => {
        setPrecioKgSU((precioLitro / lecheSolidos * 100).toFixed(decimales2));
    }, [lecheGB, lechePB, decimales]);

    let validacionPrecioLeche = false;

    if (precioLitro >= 0) validacionPrecioLeche = true;

    const validacionPreciosAlimentos = alimentosRacion.every(alimento => {
        const costokgcons = parseFloat(alimento.costokgcons);
        return (!isNaN(costokgcons) && costokgcons >= 0);
    });

    useEffect(() => {
        const actualizarPrecios = alimentosRacion.map(alimento => ({
            ...alimento,
            costokgtc: parseFloat(alimento.costokgtc).toFixed(decimales),
            costokgms: parseFloat(alimento.costokgms).toFixed(decimales),
            costokgcons: parseFloat(alimento.costokgcons).toFixed(decimales),
        }));
        setAlimentosRacion(actualizarPrecios);
        setPrecioLitro(parseFloat(precioLitro).toFixed(decimales))
    }, [decimales]);

    const manejarCambio = (event) => {
        setSistema(event.target.value);
    };

    //Navegación

    const vacaRef = useRef(null);
    const handleVacaScroll = () => {
        if (vacaRef.current) {
            const elementPosition = vacaRef.current.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({ top: elementPosition - 160, behavior: "smooth" });
        }
    };

    const alimentosRef = useRef(null);
    const handleAlimentosScroll = () => {
        if (alimentosRef.current) {
            const elementPosition = alimentosRef.current.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({ top: elementPosition - 160, behavior: "smooth" });
        }
    };

    const resFisicosRef = useRef(null);
    const handleResFisicosScroll = () => {
        if (resFisicosRef.current) {
            const elementPosition = resFisicosRef.current.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({ top: elementPosition - 160, behavior: "smooth" });
        }
    };

    const datosEconRef = useRef(null);
    const handleDatosEconScroll = () => {
        if (datosEconRef.current) {
            const elementPosition = datosEconRef.current.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({ top: elementPosition - 160, behavior: "smooth" });
        }
    };

    const resEconRef = useRef(null);
    const handleResEconScroll = () => {
        if (resEconRef.current) {
            const elementPosition = resEconRef.current.getBoundingClientRect().top + window.scrollY;
            window.scrollTo({ top: elementPosition - 160, behavior: "smooth" });
        }
    };

    return (
        <div>
            {!mostrarBaseAlimentos && (<div>
                <nav id="barra-navegacion">
                    <button className="botonNavegacion" onClick={() => descargarJSON("datosRacion.json")}>
                        <img src={floppy} title="Guardar ración" alt="Guardar ración" />
                    </button>
                    <button className="botonNavegacion" onClick={manejarClickBoton}>
                        <img src={folder} title="Importar ración" alt="Importar ración" />
                    </button>
                    <button className="botonNavegacion" onClick={handleVacaScroll}>
                        <img src={vaquita} title="Datos vaca lechera" alt="Datos vaca lechera" />
                    </button>
                    <button className="botonNavegacion" onClick={handleAlimentosScroll}>
                        <img src={pasto} alt="Alimentos ofrecidos" title="Alimentos ofrecidos"></img>
                    </button>
                    {mostrarResultados && (<button className="botonNavegacion" onClick={handleResFisicosScroll}>
                        <img src={resfisicos} alt="Resultados físicos" title="Resultados físicos"></img>
                    </button>)}
                    {mostrarIndEcon && (<button className="botonNavegacion" onClick={handleDatosEconScroll}>
                        <img src={datosecon} alt="Datos económicos" title="Datos económicos"></img>
                    </button>)}
                    {mostrarResEcon && (<button className="botonNavegacion" onClick={handleResEconScroll}>
                        <img src={resecon} alt="Resultados económicos" title="Resultados económicos"></img>
                    </button>)}
                </nav>
                <div className="seccion">
                    <h2>RACIÓN LECHERA</h2>
                    <input type="file"
                        ref={fileInputRef}
                        onChange={cargarJSON}
                        style={{ display: "none" }} />
                    <p>Archivo activo: {archivoActivo}</p>
                    <hr />
                    <div>
                        <h3>NOMBRE DE LA SIMULACIÓN</h3>
                        <form>
                            <label id="nombreCaso">Denominación del caso (opcional): </label>
                            <input type='text' value={nombreCaso} onChange={handleNombreCasoChange} placeholder='Ingresar nombre' />
                        </form>
                    </div>
                    <hr />
                    <div ref={vacaRef}>
                        <form>
                            <h3>VACA LECHERA</h3>
                            <h5>Definición del animal</h5>
                            <label>Peso vivo (kg/vaca):</label>
                            <input
                                type="number"
                                value={pesoVivo}
                                onChange={(e) => setPesoVivo(parseFloat(e.target.value.replace(",", ".")))}
                                placeholder="Ingresar kgPV"
                                min="330"
                                max="830"
                            />
                            <br />
                            <div>
                                <label>
                                    <input
                                        className="radio"
                                        type="radio"
                                        value="pastoreo"
                                        checked={sistema === 'pastoreo'}
                                        onChange={manejarCambio}
                                    />
                                    En pastoreo
                                </label>
                                <label>
                                    <input
                                        className="radio"
                                        type="radio"
                                        value="confinamiento"
                                        checked={sistema === 'confinamiento'}
                                        onChange={manejarCambio}
                                    />
                                    En confinamiento
                                </label>
                            </div>
                            <br />
                            <label>Producción de leche (litros/vaca día):</label>
                            <input
                                type="number"
                                value={produccionIndividual}
                                onChange={(e) => setProduccionIndividual(parseFloat(e.target.value.replace(",", ".")))}
                                placeholder="Ingresar litros/vaca día"
                            />
                            <br />
                            <label>Grasa Butirosa de la leche (GB%): </label>
                            <input
                                type="number"
                                value={lecheGB}
                                onChange={(e) => setLecheGB(parseFloat(e.target.value.replace(",", ".")))}
                                placeholder="Ingresar GB (%)"
                            />
                            <br />
                            <label>Proteína de la leche (PB%):</label>
                            <input
                                type="number"
                                value={lechePB}
                                onChange={(e) => setLechePB(parseFloat(e.target.value.replace(",", ".")))}
                                placeholder="Ingresar PB (%)"
                            />
                        </form>
                        <br />
                        {(!validacionVaca) && (<div>
                            <MensajeError />
                        </div>)}
                    </div>
                    <hr />
                    <div>
                        <div ref={alimentosRef}>
                            <h3>ALIMENTOS OFRECIDOS</h3>
                            {baseGenericaActiva && (
                                <h6 style={{ color: "red" }}>Trabajando con base genérica de alimentos</h6>)}
                            <h5>Ingredientes de la ración</h5>
                            <select
                                value={alimentoSeleccionado ? alimentoSeleccionado.id : ""}
                                onChange={handleSelectChange}
                                id="select-alimentos"
                            >
                                <option value="" disabled>Seleccionar</option>
                                {baseAlimentos.map((alimento) => (
                                    <option key={alimento.id} value={alimento.id}>
                                        {alimento.nombre}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className='table-responsive'>
                            <table className="table table-sm table-hover table-striped">
                                <thead>
                                    <tr>
                                        <th>Alimento</th>
                                        <th>Ofrecido <i>Tal Cual</i></th>
                                        <th>Materia Seca</th>
                                        <th>MS Ofrecida</th>
                                        <th>Aprovechado</th>
                                        <th>Consumo MS</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {alimentosRacion.map((alimento) => (
                                        <tr key={alimento.id}>
                                            <td>{alimento.nombre}</td>
                                            <td>
                                                <input
                                                    id="input-tabla"
                                                    type="number"
                                                    value={alimento.kgtc}
                                                    onChange={(e) => actualizarKgTC(alimento.id, parseFloat(e.target.value.replace(",", ".")))}
                                                /> kgTC
                                            </td>
                                            <td>{alimento.ms}%</td>
                                            <td>
                                                <input
                                                    id="input-tabla"
                                                    type="number"
                                                    value={alimento.kgms}
                                                    onChange={(e) => actualizarKgMS(alimento.id, parseFloat(e.target.value.replace(",", ".")))}
                                                /> kgMS
                                            </td>
                                            <td>
                                                <input
                                                    id="input-tabla"
                                                    type="number"
                                                    value={alimento.apr}
                                                    onChange={(e) => actualizarApr(alimento.id, parseFloat(e.target.value.replace(",", ".")))}
                                                /> %
                                            </td>
                                            <td>{(alimento.kgcons)} kgMS</td>
                                            <td>
                                                <button onClick={() => eliminarAlimento(alimento.id)}>
                                                    <img src={trash} title="Eliminar" alt="Eliminar" />
                                                </button>
                                            </td>
                                        </tr>)
                                    )}
                                </tbody>
                                <tfoot style={{ fontWeight: "bolder", borderTop: "gray solid 2px" }}>
                                    <tr>
                                        <td>Ración global</td>
                                        <td>{racionMVOfrecida} kgTC</td>
                                        <td>{(racionMVOfrecida > 0 && alimentosRacion.length > 1) && ((racionMSPorciento) + "%")}</td>
                                        <td>{racionMSOfrecida} kgMS</td>
                                        <td>{(racionMSOfrecida > 0 && alimentosRacion.length > 1) && ((racionAprPorciento) + "%")}</td>
                                        <td>{racionMSCons} kgMS</td>
                                        <td></td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                        {!validacionAlimentos && (<div>
                            <MensajeError />
                        </div>)}
                    </div>
                </div>
                {!mostrarResultados && validacionVaca && validacionAlimentos && (<button onClick={handleClick1}>VER RESULTADOS FÍSICOS</button>)}
                {mostrarResultados && validacionVaca && validacionAlimentos && (<div ref={resFisicosRef}>
                    <ResultadosRacion pesoVivo={pesoVivo} produccionIndividual={produccionIndividual}
                        lecheGB={lecheGB} lechePB={lechePB} alimentosRacion={alimentosRacion} racionMSCons={racionMSCons}
                        lecheSolidos={lecheSolidos} racionMSOfrecida={racionMSOfrecida} sistema={sistema}
                    />
                    {!mostrarIndEcon && (<button onClick={handleClick2}>CÁLCULOS ECONÓMICOS</button>)}
                </div>)}
                {mostrarResultados && validacionVaca && validacionAlimentos && mostrarIndEcon && (<div className="seccion" ref={datosEconRef}>
                    <h2>DATOS ECONÓMICOS DE LA RACIÓN</h2>
                    <hr />
                    <h3>FORMATO DE MONEDA</h3>
                    <div className='seccionFormulario'>
                        <div id="monedas-container">
                            <div className='monedas'>
                                <label htmlFor="opcionesDropdown1">Seleccionar moneda: </label>
                                <select id="opcionesDropdown1" value={currency} onChange={handleSelect1Change}>
                                    <option value="currency" style={{ display: "none" }}>Selecciona una opción</option>
                                    {datosMoneda.map((opcion, index) => (
                                        <option
                                            key={opcion.id} // Utiliza el índice como clave única
                                            value={opcion.id}
                                            style={{ fontWeight: opcion.negrita ? 'bold' : 'normal' }}
                                        >
                                            {opcion}
                                        </option>
                                    ))}
                                </select>
                                <h6>Código de moneda: {codigoMoneda}</h6>
                            </div>
                        </div>
                        <div className="monedas-container">
                            <label>Posiciones decimales: </label>
                            <input
                                type="number"
                                value={decimales}
                                onInput={(e) => {
                                    e.target.value = e.target.value.replace(/\./g, ""); // Elimina el punto decimal
                                }}
                                onChange={(e) => setDecimales(parseFloat(e.target.value))}
                                placeholder="Ingresar cantidad de decimales"
                                min="0"
                                id="input-decimales"
                            />
                        </div>
                    </div>
                    <hr />
                    <h3>VALUACIÓN LECHE</h3>
                    <h5>Precio unitario de la leche</h5>
                    <div className='table-responsive'>
                        <table className="table table-sm table-hover table-striped">
                            <thead>
                                <tr>
                                    <th>Precio por litro</th>
                                    <th>Contenido de sólidos útiles (*)</th>
                                    <th>Precio por kg de SU</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <input
                                            id="input-tabla"
                                            type="number"
                                            value={precioLitro}
                                            onChange={actualizarPrecioLitro}
                                        /> {codigoMoneda}/litro
                                    </td>
                                    <td>{lecheSolidos}%</td>
                                    <td>
                                        {precioKgSU} {codigoMoneda}/kgSU
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <p>(*) Sólidos útiles (SU%): Proteína láctea (PB%) + Grasa Butirosa (GB%)</p>
                        {(!validacionPrecioLeche) && (<div>
                            <MensajeError />
                        </div>)}
                    </div>
                    <hr />
                    <h3>VALUACIÓN ALIMENTOS</h3>
                    <h5>Costo unitario de los ingredientes</h5>
                    <div className='table-responsive'>
                        <table className="table table-sm table-hover table-striped">
                            <thead>
                                <tr>
                                    <th>Alimento</th>
                                    <th>Ofrecido <i>Tal Cual</i></th>
                                    <th>Materia Seca</th>
                                    <th>MS Ofrecida</th>
                                    <th>Aprovechado</th>
                                    <th>MS Consumida</th>
                                </tr>
                            </thead>
                            <tbody>
                                {alimentosRacion.map((alimento) => (
                                    <tr key={alimento.id}>
                                        <td>{alimento.nombre}</td>
                                        <td>
                                            <input
                                                id="input-tabla"
                                                type="number"
                                                value={alimento.costokgtc}
                                                onChange={(e) => actualizarCostoKgTC(alimento.id, e.target.value)}
                                                min="0"
                                            /> {codigoMoneda}/kgTC
                                        </td>
                                        <td>{alimento.ms}%</td>
                                        <td>
                                            <input
                                                id="input-tabla"
                                                type="number"
                                                value={alimento.costokgms}
                                                onChange={(e) => actualizarCostoKgMS(alimento.id, e.target.value)}
                                                min="0"
                                            /> {codigoMoneda}/kgMS
                                        </td>
                                        <td>
                                            {alimento.apr} %
                                        </td>
                                        <td>{(alimento.costokgcons)} {codigoMoneda}/kgMS</td>
                                    </tr>)
                                )}
                            </tbody>
                        </table>
                        {(!validacionPreciosAlimentos) && (<div>
                            <MensajeError />
                        </div>)}
                    </div>
                </div>)}
                {(mostrarIndEcon && validacionPrecioLeche && validacionPreciosAlimentos && !mostrarResEcon) && (
                    <button onClick={handleClick3}>VER RESULTADOS ECONÓMICOS</button>)}
                {(mostrarResultados && validacionVaca && validacionAlimentos && mostrarIndEcon && validacionPrecioLeche && validacionPreciosAlimentos && mostrarResEcon) && (<div ref={resEconRef}>
                    <ResultadosEconomicos alimentosRacion={alimentosRacion} precioLitro={precioLitro}
                        precioKgSU={precioKgSU} codigoMoneda={codigoMoneda} decimales={decimales} racionMSCons={racionMSCons}
                        produccionIndividual={produccionIndividual} lecheSolidos={lecheSolidos}
                    />
                </div>)}
                <hr></hr>
            </div>)}
        </div>
    );
}

export default GestionRacion;