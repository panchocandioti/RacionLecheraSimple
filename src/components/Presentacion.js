import React, { useState, useRef, useEffect } from 'react';
import ImagotipoNegro from "../images/Imagotipo NEGRO.png";
import LogoSaltoAgro from "../images/LogoSaltoAgro.png";
import LogoUNLFCA from "../images/logo-UNL-FCA.png";
import GestionAlimentos from './GestionAlimentos';
import BotonReset from './BotonReset';

function Presentacion() {

    const [mostrarInstrucciones, setMostrarInstrucciones] = useState(true);
    const [comenzar, setComenzar] = useState(false);
    const [mostrarGeneralidades, setMostrarGeneralidades] = useState(false);
    const [mostrarResultados, setMostrarResultados] = useState(false);
    const [mostrarSecuencia, setMostrarSecuencia] = useState(false);
    const [mostrarTerminos, setMostrarTerminos] = useState(false);
    const [mostrarRegistro, setMostrarRegistro] = useState(false);

    const instruccionesRef = useRef(null);

    useEffect(() => {
        // Esperar un pequeño tiempo para asegurarnos de que el DOM está listo
        setTimeout(() => {
            if (instruccionesRef.current) {
                const elementPosition = instruccionesRef.current.getBoundingClientRect().top + window.scrollY;
                window.scrollTo({ top: elementPosition - 220, behavior: "smooth" });
            }
        }, 200); // Puedes ajustar este tiempo si es necesario
    }, []);

    useEffect(() => {

    })

    const manejarOnClick1 = () => {
        setMostrarInstrucciones(!mostrarInstrucciones);
    };

    const manejarOnclick2 = () => {
        setMostrarInstrucciones(false);
        setComenzar(true);
    };

    const manejarOnClick3 = () => {
        setMostrarGeneralidades(!mostrarGeneralidades);
    };

    const manejarOnClick4 = () => {
        setMostrarResultados(!mostrarResultados);
    };

    const manejarOnClick5 = () => {
        setMostrarSecuencia(!mostrarSecuencia);
    };

    const manejarOnClick6 = () => {
        setMostrarTerminos(!mostrarTerminos);
    };

    const manejarOnClick7 = () => {
        setMostrarRegistro(!mostrarRegistro);
    };

    return (
        <div>
            <header className="App-header">
                <a href="https://milecheria.ar" target="_blank" rel="noreferrer"><img src={ImagotipoNegro} id="MiLecheria" alt='LogoMiLecheria.ar'></img></a>
                <h1> RACIÓN LECHERA <b><i>Simple</i></b></h1>
            </header>
            <div>
                {mostrarInstrucciones && (<div className="seccion">
                    <h2>Instrucciones:</h2>
                    <div id="instrucciones" ref={instruccionesRef}>
                        <button onClick={manejarOnClick3} className='mostrar'>
                            {mostrarGeneralidades === true ? "Generalidades y objetivos ˄ " : "Generalidades y objetivos ˅ "}
                        </button>
                        {mostrarGeneralidades && (<div className='contenido-instrucciones'>
                            <p><b>Objetivo de esta aplicación</b></p>
                            <p><b>Formular raciones lecheras en forma sencilla y ágil, permitiendo su evaluación en términos físicos y económicos</b></p>
                            <p>La aplicación puede utilizarse para:</p>
                            <ul>
                                <li>Evaluar resultados físicos y económicos de una ración real</li>
                                <li>Proponer soluciones a problemas eventuales de la ración</li>
                                <li>Estimar resultados de raciones superadoras en términos físicos y económicos</li>
                                <li>Optimizar el uso de los alimentos disponibles</li>
                                <li>Decidir la incorporación de nuevos alimentos</li>
                                <li>Uso didáctico en general</li>
                            </ul>
                            <p>El usuario deberá ingresar parámetros relativamente simples, divididos en tres pasos:</p>
                            <ol>
                                <li>Datos de la vaca lechera (vaca promedio del rodeo)</li>
                                <li>Alimentos ofrecidos (selección de los alimentos y sus cantidades)</li>
                                <li>Datos económicos de la ración (precio de la leche y costos de los alimentos)</li>
                            </ol>
                            <p>Los valores ingresados podrán cambiarse en cualquier momento.</p>
                            <p>La calidad de la información ingresada por el usuario es su entera responsabilidad y condiciona la calidad de los resultados obtenidos.</p>
                            <hr></hr>
                            <p><b>Fuentes bibliográficas:</b></p>
                            <p>Cálculo de requerimientos energéticos y proteicos del ganado bovino lechero (2. ed.). Castillo, A. R., Melo, O. E., & Boetto, G. C. (1998).</p>
                            <p>Prediction of herbage dry matter intake for dairy cows grazing ryegrass-based pastures. J. Baudracco, N. López-Villalobos, C.W. Holmes and K.A. MacDonald(2010).</p>
                            <p>Nutrient Requirements of Dairy Cattle: 5th Revised Edition. National Research Council (1978).</p>
                            <p>Nutrient Requirements of Dairy Cattle: 6th Revised Edition. National Research Council (1989).</p>
                            <p>Nutrient Requirements of Dairy Cattle: 7th Revised Edition. National Research Council (2001).</p>
                            <p>Nutrient Requirements of Dairy Cattle: 8th Revised Edition. National Academies of Sciences, Engineering, and Medicine (2021).</p>
                        </div>)}
                        <br></br>
                        <button onClick={manejarOnClick4} className='mostrar'>
                            {mostrarResultados === true ? "Resultados que se obtienen ˄ " : "Resultados que se obtienen ˅ "}
                        </button>
                        {mostrarResultados && (<div className='contenido-instrucciones'>
                            <p>Resultados físicos:</p>
                            <ul>
                                <li>Resumen de requerimientos nutricionales</li>
                                <li>Resumen de nutrientes aportados por la ración</li>
                                <li>Gráfico de evaluación de consumo</li>
                                <li>Gráfico de relación forraje : concentrado</li>
                                <li>Gráfico de balance de energía metabólica</li>
                                <li>Gráfico de balance de proteína bruta</li>
                                <li>Estimación de la variación de peso vivo</li>
                                <li>Cálculos de eficiencia de conversión</li>
                                <li>Cálculos de emisión de metano entérico</li>
                            </ul>
                            <p>Resultados económicos:</p>
                            <ul>
                                <li>Costo de la ración y del kilogramo de materia seca consumido</li>
                                <li>Costo por unidad de energía metabólica y proteína bruta</li>
                                <li>Ingresos por venta de leche</li>
                                <li>Costo y margen de alimentación</li>
                                <li>Gráfico de costo y margen de alimentación</li>
                            </ul>
                            <p>Los resultados, físicos y económicos, podrán visualizarse expresados en distintas unidades,
                                para facilitar el análisis (por litro, por kilogramos de sólidos, en dinero, en litros de leche, como porcentaje del ingreso por leche, etc.), según su naturaleza.</p>
                            <p>Para las expresiones en dinero el usuario podrá seleccionar la moneda y el formato decimal a utilizar.</p>
                            <p>Se podrán descargar reportes en PDF con los resultados físicos y económicos respectivamente.</p>
                            <p>La aplicación permite guardar y recuperar los datos de las distintas raciones generadas (archivos JSON).</p>
                            <p>La aplicación provee una base genérica de alimentos. El usuario puede generar su propia base de alimentos en base a ésta, para luego agregar, quitar y modificar alimentos según su criterio.</p>
                        </div>)}
                        <br></br>
                        <button onClick={manejarOnClick5} className='mostrar'>
                            {mostrarSecuencia === true ? "Secuencia de trabajo sugerida ˄ " : "Secuencia de trabajo sugerida ˅ "}
                        </button>
                        {mostrarSecuencia && (<div className='contenido-instrucciones'>
                            <ol>
                                <li>Diagnóstico (situación inicial)</li>
                                <li>Generación de archivo JSON y reporte PDF inicial</li>
                                <li>Detección de puntos críticos</li>
                                <li>¿Qué pasaría si...? (pruebas)</li>
                                <li>Selección de alternativa exitosa</li>
                                <li>Análisis de los resultados y ajustes</li>
                                <li>Generación de archivo JSON y reporte PDF final</li>
                            </ol>
                        </div>)}
                        <br></br>
                        <button onClick={manejarOnClick6} className='mostrar'>
                            {mostrarTerminos === true ? "Términos de uso ˄ " : "Términos de uso ˅ "}
                        </button>
                        {mostrarTerminos && (<div className='contenido-instrucciones'>
                            <p>Debido a la gran cantidad de variables involucradas en la selección de datos de entrada, la interpretación de resultados y las aplicaciones de esta herramienta en general, el usuario asume toda la responsabilidad por su uso.</p>
                            <p>El uso de esta aplicación es libre, gratuito e irrestricto para productores lecheros y estudiantes.</p>
                            <p>Su utilización para cualquier fin por parte de investigadores, desarrolladores, profesionales agropecuarios y cualquier otro usuario no especificado aquí, debe hacerse citando la fuente y respetando los derechos de autor.</p>
                        </div>)}
                        <br></br>
                        <button onClick={manejarOnClick7} className='mostrar'>
                            {mostrarRegistro === true ? "REGISTRARSE (opcional) ˄ " : "REGISTRARSE (opcional) ˅ "}
                        </button>
                        {mostrarRegistro && (<div className='contenido-instrucciones'>
                            <p>Regístrese para recibir notificaciones de actualizaciones y novedades de <a href="https://milecheria.ar" target="_blank" rel="noreferrer"><b>MiLecheria.ar</b></a> haciendo click en el enlace de abajo. El formulario de registro se abrirá en otra ventana. Luego de registrarse regrese a esta ventana para continuar. <a href='https://forms.gle/Q12JUazDxuxbRSP7A' target="_blank" rel="noopener noreferrer">Ir al formulario de registro.</a></p>

                        </div>)}
                    </div>
                </div>)}
                <div>
                    {comenzar === true && (<button className="button" onClick={manejarOnClick1}>
                        {mostrarInstrucciones === true ? "Ocultar instrucciones" : "Mostrar instrucciones"}
                    </button>)}
                    {comenzar === false && (<button className="comenzar" onClick={manejarOnclick2}>
                        Aceptar términos y <b>comenzar</b>
                    </button>)}
                </div>
                {comenzar && (<div>
                    <GestionAlimentos />
                    <BotonReset />
                </div>)}
                <footer className='footer'>
                    <div>
                        <p>Convenio Marco de Cooperación Técnico-Científica:</p>
                        <p><b>Universidad Nacional del Litoral - SALTO AGRO S.S.</b></p>
                        <hr></hr>
                        <p>Desarrolladores:</p>
                        <div className='containerLogos'>
                            <div className='desarrolladores'>
                                <p><b><a href='https://www.linkedin.com/in/francisco-candioti-0b167834/' target="_blank" rel="noopener noreferrer">Ing. Agr. EPL Francisco Candioti</a></b></p>
                            </div>
                            <div className='desarrolladores'>
                                <p><b><a href='https://ar.linkedin.com/in/javier-baudracco-b97aab15' target="_blank" rel="noopener noreferrer">Dr. Javier Baudracco</a></b></p>
                            </div>
                        </div>
                    </div>
                    <div className='containerLogos'>
                        <div className='logos'>
                            <img src={LogoSaltoAgro} className='logo' alt='LogoSalto'></img>
                        </div>
                        <div className='logos'>
                            <img src={LogoUNLFCA} className='logo' alt='LogoUNLFCA'></img>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    )
}

export default Presentacion