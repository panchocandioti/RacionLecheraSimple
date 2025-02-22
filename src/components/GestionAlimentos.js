import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.css'
import trash from '../images/trash.svg'
import edit from '../images/pencil-square.svg'
import sort from '../images/arrow-up-square.svg'
import AlimentosBaseGenerica from './AlimentosBaseGenerica.json';
import GestionRacion from './GestionRacion';

function GestionAlimentos() {
    const alimentosGenericos = AlimentosBaseGenerica[1];
    const [baseGenericaActiva, setBaseGenericaActiva] = useState(true);
    const [alimentosActivos, setAlimentosActivos] = useState(alimentosGenericos);
    const [baseAlimentos, setBaseAlimentos] = useState(["baseAlimentos", alimentosActivos]);
    const [alimentoSeleccionado, setAlimentoSeleccionado] = useState(null); // ID del alimento seleccionado
    const [nuevoNombre, setNuevoNombre] = useState("");
    const [nuevaMS, setNuevaMS] = useState(null);
    const [nuevaCE, setNuevaCE] = useState(null);
    const [nuevaPB, setNuevaPB] = useState(null);
    const [cantidadAlimentos, setCantidadAlimentos] = useState(0);
    const [mostrarAgregarAlimentos, setMostrarAgregarAlimentos] = useState(false);
    const [mostrarEditarAlimentos, setMostrarEditarAlimentos] = useState(false);
    const [clasificacion, setClasificacion] = useState('');
    const [mostrarBaseAlimentos, setMostrarBaseAlimentos] = useState(false);


    const manejarOnClick1 = () => {
        setMostrarBaseAlimentos(!mostrarBaseAlimentos);
    };
    
    // Guardar datos en un archivo JSON
    const descargarJSON = (nombreArchivo = "baseAlimentos.json") => {
        const datosStr = JSON.stringify(baseAlimentos, null, 2);
        const blob = new Blob([datosStr], { type: "application/json" });
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = url;
        link.download = nombreArchivo;
        link.click();
        URL.revokeObjectURL(url);
    };

    // Cargar datos desde un archivo JSON
    const cargarJSON = (event) => {
        const file = event.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const datosCargados = JSON.parse(e.target.result);
                if (datosCargados[0] === "baseAlimentos") {
                    setAlimentosActivos(datosCargados[1]);
                    setBaseGenericaActiva(false);
                } else {
                    alert("ERROR: El archivo seleccionado no es válido.");
                }
            } catch (error) {
                alert("Error al leer el archivo JSON.");
            };
        };
        reader.readAsText(file);
    };

    const manejarCambio = (event) => {
        setClasificacion(event.target.value);
    };

    // Agregar un nuevo alimento
    const agregarAlimento = () => {
        if (!nuevoNombre || !clasificacion || !nuevaMS || !nuevaCE || !nuevaPB) return;
        const nuevoAlimento = {
            id: String(Date.now()),
            nombre: nuevoNombre,
            clase: clasificacion,
            ms: parseFloat(nuevaMS),
            ce: parseFloat(nuevaCE),
            pb: parseFloat(nuevaPB),
        };
        setAlimentosActivos((prevDatos) => [...prevDatos, nuevoAlimento]);
        setNuevoNombre("");
        setClasificacion("");
        setNuevaMS(null);
        setNuevaCE(null);
        setNuevaPB(null);
        setMostrarAgregarAlimentos(false);
    };

    // Editar alimento

    const editarAlimento = (id) => {
        setMostrarEditarAlimentos(true);
        setMostrarAgregarAlimentos(false);
        const selectedId = id;
        const alimento = alimentosActivos.find((p) => p.id === selectedId);
        setAlimentoSeleccionado(alimento);
        setNuevoNombre(alimento ? alimento.nombre : "");
        setClasificacion(alimento ? alimento.clase : "");
        setNuevaMS(alimento ? alimento.ms : null);
        setNuevaCE(alimento ? alimento.ce : null);
        setNuevaPB(alimento ? alimento.pb : null);
        window.location.href = '#cambiosAlimento';
    }

    const modificarAlimento = () => {
        if (!alimentoSeleccionado) return;
        setAlimentosActivos((prevDatos) =>
            prevDatos.map((alimento) =>
                alimento.id === alimentoSeleccionado.id
                    ? { ...alimento, nombre: nuevoNombre, clase: clasificacion, ms: parseFloat(nuevaMS), ce: parseFloat(nuevaCE), pb: parseFloat(nuevaPB) }
                    : alimento
            )
        );
        setAlimentoSeleccionado(null);
        setNuevoNombre("");
        setClasificacion("");
        setNuevaMS(null);
        setNuevaCE(null);
        setNuevaPB(null);
        setMostrarEditarAlimentos(false);
    };

    // Eliminar un alimento
    const eliminarAlimento = (id) => {
        const isConfirmed = window.confirm('¿Vas a eliminar definitivamente este ítem de la base de alimentos? Presiona "Aceptar" para proceder a eliminarlo y continuar.');
        if (isConfirmed) {
            setAlimentosActivos((prevDatos) => prevDatos.filter((alimento) => alimento.id !== id));
            // Si se está editando el alimento eliminado, limpiamos el formulario
            if (alimentoSeleccionado && alimentoSeleccionado.id === id) {
                setAlimentoSeleccionado(null);
                setNuevoNombre("");
                setClasificacion("");
                setNuevaMS(null);
                setNuevaCE(null);
                setNuevaPB(null);
            }
        }
    };

    // Calcular estadísticas (cantidad, suma de edades)
    useEffect(() => {
        setCantidadAlimentos(alimentosActivos.length);
    }, [alimentosActivos]);

    const mostrar1 = () => {
        setMostrarAgregarAlimentos(prev => !prev);
        setMostrarEditarAlimentos(false);
        setAlimentoSeleccionado(null);
        setNuevoNombre("");
        setClasificacion("");
        setNuevaMS(null);
        setNuevaCE(null);
        setNuevaPB(null);
    };

    const ordenarPorPropiedad = (propiedad) => {
        const alimentosOrdenados = [...alimentosActivos].sort((a, b) => {
            if (typeof a[propiedad] === "string") {
                return a[propiedad].localeCompare(b[propiedad]);
            }
            return a[propiedad] - b[propiedad];
        });
        setAlimentosActivos(alimentosOrdenados);
    };

    useEffect(() => {
        setBaseAlimentos(["baseAlimentos", alimentosActivos])
    }, [alimentosActivos]);

    return (
        <div>
            {mostrarBaseAlimentos && (<div className="seccion">
                <h2>BASE DE ALIMENTOS</h2>
                <hr />
                <h5>Guardar/Importar base de alimentos</h5>
                <button onClick={() => descargarJSON("baseAlimentos.json")}>Guardar archivo</button>
                <input type="file" onChange={cargarJSON} />
                <hr />
                <h5 id="cambiosAlimento">Cantidad de alimentos activos: {cantidadAlimentos}</h5>
                {baseGenericaActiva && (
                    <h6 style={{ color: "red" }}>Trabajando con base genérica de alimentos</h6>)}
                {!baseGenericaActiva && (<div>
                    {mostrarEditarAlimentos === false && (<button onClick={() => mostrar1()}>{(mostrarAgregarAlimentos === false) ? "Agregar alimento" : "Ocultar agregar alimento"}</button>)}
                    <hr />
                    {mostrarAgregarAlimentos && (<div>
                        <form>
                            <h5>Agregar alimento</h5>
                            <label>Denominación: </label>
                            <input
                                type="text"
                                value={nuevoNombre}
                                onChange={(e) => setNuevoNombre(e.target.value)}
                                placeholder="Ingresar nombre"
                            />
                            <br />
                            <div>
                                <label>Clasificación: </label>
                                <label>
                                    <input
                                        className="radio"
                                        type="radio"
                                        value="forraje"
                                        checked={clasificacion === 'forraje'}
                                        onChange={manejarCambio}
                                    />
                                    Forraje
                                </label>
                                <label>
                                    <input
                                        className="radio"
                                        type="radio"
                                        value="concentrado"
                                        checked={clasificacion === 'concentrado'}
                                        onChange={manejarCambio}
                                    />
                                    Concentrado
                                </label>
                            </div>
                            <br />
                            <label>Materia Seca (%): </label>
                            <input
                                type="number"
                                value={nuevaMS}
                                onChange={(e) => {
                                    const newValue = e.target.value;
                                    if (newValue >= 0 && newValue <= 100) {
                                        setNuevaMS(newValue);
                                    }
                                }}
                                placeholder="Ingresar MS (%)"
                            />
                            <br />
                            <label>Concentración Energética (MCalEM/kgMS): </label>
                            <input
                                type="number"
                                value={nuevaCE}
                                onChange={(e) => {
                                    const newValue = e.target.value;
                                    if (newValue >= 0 && newValue <= 8) {
                                        setNuevaCE(newValue);
                                    }
                                }}
                                placeholder="Ingresar CE (MCalEM/kgMS)"
                            />
                            <br />
                            <label>Concentración Proteica (%PB): </label>
                            <input
                                type="number"
                                value={nuevaPB}
                                onChange={(e) => {
                                    const newValue = e.target.value;
                                    if (newValue >= 0 && newValue <= 300) {
                                        setNuevaPB(newValue);
                                    }
                                }}
                                placeholder="Ingresar PB (%)"
                            />
                        </form>
                        <br />
                        <button type="button" onClick={agregarAlimento}>
                            Agregar
                        </button>
                        <hr />
                    </div>)}
                    {mostrarEditarAlimentos && (<div>
                        {alimentoSeleccionado && (
                            <div>
                                <h5>Editando: {alimentoSeleccionado.nombre}</h5>
                                <form>
                                    <label>Denominación: </label>
                                    <input
                                        type="text"
                                        value={nuevoNombre}
                                        onChange={(e) => setNuevoNombre(e.target.value)}
                                        placeholder="Modificar nombre"
                                    />
                                    <br />
                                    <div>
                                        <label>Clasificación: </label>
                                        <label>
                                            <input
                                                className="radio"
                                                type="radio"
                                                value="forraje"
                                                checked={clasificacion === 'forraje'}
                                                onChange={manejarCambio}
                                            />
                                            Forraje
                                        </label>
                                        <label>
                                            <input
                                                className="radio"
                                                type="radio"
                                                value="concentrado"
                                                checked={clasificacion === 'concentrado'}
                                                onChange={manejarCambio}
                                            />
                                            Concentrado
                                        </label>
                                    </div>
                                    <br />
                                    <label>Materia seca (%): </label>
                                    <input
                                        type="number"
                                        value={nuevaMS}
                                        onChange={(e) => {
                                            const newValue = e.target.value;
                                            if (newValue >= 0 && newValue <= 100) {
                                                setNuevaMS(newValue);
                                            }
                                        }}
                                        placeholder="Modificar Materia Seca (%)"
                                    />
                                    <br />
                                    <label>Concentración Energética (MCalEM/kgMS): </label>
                                    <input
                                        type="number"
                                        value={nuevaCE}
                                        onChange={(e) => {
                                            const newValue = e.target.value;
                                            if (newValue >= 0 && newValue <= 8) {
                                                setNuevaCE(newValue);
                                            }
                                        }}
                                        placeholder="Modificar CE (MCalEM/kgMS)"
                                    />
                                    <br />
                                    <label>Concentración Proteica (%PB): </label>
                                    <input
                                        type="number"
                                        value={nuevaPB}
                                        onChange={(e) => {
                                            const newValue = e.target.value;
                                            if (newValue >= 0 && newValue <= 300) {
                                                setNuevaPB(newValue);
                                            }
                                        }}
                                        placeholder="Modificar PB (%)"
                                    />
                                </form>
                                <br />
                                <button onClick={modificarAlimento}>Guardar Cambios</button>
                            </div>
                        )}
                        <hr />
                    </div>)}
                </div>)}
                <br />
                <div className='table-responsive'>
                    <table className="table table-sm table-hover table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Alimento <button onClick={() => ordenarPorPropiedad("nombre")}><img src={sort} title="Ordenar por nombre"></img></button></th>
                                <th scope="col">Clasificación <button onClick={() => ordenarPorPropiedad("clase")}><img src={sort} title="Ordenar por clasificación"></img></button></th>
                                <th scope="col">Materia Seca <button onClick={() => ordenarPorPropiedad("ms")}><img src={sort} title="Ordenar por MS"></img></button></th>
                                <th scope="col">Conc. Energética <button onClick={() => ordenarPorPropiedad("ce")}><img src={sort} title="Ordenar por CE"></img></button></th>
                                <th scope="col">Proteina Bruta <button onClick={() => ordenarPorPropiedad("pb")}><img src={sort} title="Ordenar por PB"></img></button></th>
                                {!baseGenericaActiva && (<th scope="col"></th>)}
                                {!baseGenericaActiva && (<th scope="col"></th>)}
                            </tr>
                        </thead>
                        <tbody>
                            {alimentosActivos.map((alimento) => (
                                <tr>
                                    <td>{alimento.nombre}</td>
                                    <td>{alimento.clase}</td>
                                    <td>{alimento.ms}%</td>
                                    <td>{alimento.ce} MCalEM/kgMS</td>
                                    <td>{alimento.pb}%</td>
                                    {!baseGenericaActiva && (<td><button onClick={() => eliminarAlimento(alimento.id)}><img src={trash} title="Eliminar"></img></button></td>)}
                                    {!baseGenericaActiva && (<td><button onClick={() => editarAlimento(alimento.id)}><img src={edit} title="Editar"></img></button></td>)}
                                </tr>)
                            )}
                        </tbody>
                    </table>
                </div>
                
            </div>)}
            <button className="button" onClick={manejarOnClick1}>{mostrarBaseAlimentos === true ? "Ocultar base alimentos" : "Mostrar base alimentos"}</button>
            <GestionRacion baseAlimentos={alimentosActivos} baseGenericaActiva={baseGenericaActiva}/>
        </div>
    );

}

export default GestionAlimentos;