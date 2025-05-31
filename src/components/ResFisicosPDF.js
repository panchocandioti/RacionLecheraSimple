import { React, useEffect, useState } from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import LogoMiLecheria from "../images/Imagotipo AZUL.png";
import LogoSaltoAgro from "../images/LogoSaltoAgro.png";
import LogoUNLFCA from "../images/FCA-UNL-Logo.jpg";
import check_icon from "../images/check_icon.png";
import wrong_icon from "../images/wrong_icon.png";
import caution_icon from "../images/caution_icon.png";

const styles = StyleSheet.create({
  logoHeader: {
    width: '65%',
    margin: 'auto',
    marginTop: '25px',
    marginBottom: '15px',
    textAlign: 'center',
  },
  table: {
    width: '93%',
    margin: '5px 20px 5px',
    border: '1px solid #000',
    fontFamily: 'Helvetica',
    fontSize: '8',
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableCell: {
    flex: 1,
    border: '1px solid #000',
    padding: 2,
    textAlign: 'left',
  },
  tableCell2: {
    flex: 1,
    border: '1px solid #000',
    padding: 2,
    textAlign: 'left',
    fontWeight: 'bold',
    backgroundColor: 'lightgray',
  },
  cellSmall: {
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: '20%', // columna angosta
    padding: 2,
    border: '1px solid #000',
    textAlign: 'left',
  },
  cellSmall2: {
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: '20%', // columna angosta
    padding: 2,
    border: '1px solid #000',
    textAlign: 'left',
    fontWeight: 'bold',
    backgroundColor: 'lightgray',
  },
  cellLarge: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: '30%', // columna que se puede expandir
    padding: 2,
    border: '1px solid #000',
    textAlign: 'left',
  },
  cellLarge2: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: '30%', // columna que se puede expandir
    padding: 2,
    border: '1px solid #000',
    textAlign: 'left',
    fontWeight: 'bold',
    backgroundColor: 'lightgray',
  },
  tableCell3: {
    width: '5%',
    padding: 3,
  },
  title1: {
    textAlign: 'center',
    marginTop: '3px',
    marginBottom: '3px',
    fontWeight: 'bold',
    fontSize: '13',
  },
  title2: {
    textAlign: 'center',
    marginTop: '3px',
    marginBottom: '3px',
    fontWeight: 'bold',
    fontSize: '10',
  },
  title3: {
    textAlign: 'left',
    fontSize: '9',
    marginTop: '10px',
    marginBottom: '2px',
    marginLeft: '5%',
  },
  footer: {
    position: 'absolute',
    bottom: 130,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 10,
  },
  logoFooter: {
    margin: 'auto',
    textAlign: 'center',
  },
  tableLogos: {
    width: '60%',
    margin: 'auto',
    marginBottom: '25px',
  },
  plaintext: {
    textAlign: 'left',
    fontSize: '7.5',
    marginTop: '2px',
    marginBottom: '2px',
    marginLeft: '5%',
  }
});

function ResFisicosPDF(props) {

  const [iconConsumo, setIconConsumo] = useState(null);
  const [iconForrConc, setIconForrConc] = useState(null);
  const [iconEM, setIconEM] = useState(null);
  const [iconPB, setIconPB] = useState(null);
  const nombreCaso = props.nombreCaso;
  const pesoVivo = props.pesoVivo;
  const sistema = props.sistema;
  const produccionIndividual = props.produccionIndividual;
  const lecheGB = props.lecheGB;
  const lechePB = props.lechePB;
  const reqEMMant = props.reqEMMant;
  const reqEMProd = props.reqEMProd;
  const reqEMTotal = props.reqEMTotal;
  const reqPBMant = props.reqPBMant;
  const reqPBProd = props.reqPBProd;
  const reqPBTotal = props.reqPBTotal;
  const alimentosRacion = props.alimentosRacion;
  const racionEMCons = props.racionEMCons;
  const racionPBCons = props.racionPBCons;
  const racionMSCons = props.racionMSCons;
  const racionCE = props.racionCE;
  const racionPB = props.racionPB;
  const racionMVOfrecida = props.racionMVOfrecida;
  const racionMSPorciento = props.racionMSPorciento;
  const racionMSOfrecida = props.racionMSOfrecida;
  const racionAprPorciento = props.racionAprPorciento;
  const consumoEstimado1 = props.consumoEstimado1;
  const consumoEstimado2 = props.consumoEstimado2;
  const forrajePorciento = props.forrajePorciento;
  const concentradoPorciento = props.concentradoPorciento;
  const variacionPeso = props.variacionPeso;
  const mensajeVariacionPeso = props.mensajeVariacionPeso;
  const efConLitrosMSOf = props.efConLitrosMSOf;
  const efConLitrosMSCons = props.efConLitrosMSCons;
  const efConSolidosMSOf = props.efConSolidosMSOf;
  const efConSolidosMSCons = props.efConSolidosMSCons;
  const metanoEmitidoGramosDia = props.metanoEmitidoGramosDia;
  const metanoEmitidoGramosLitro = props.metanoEmitidoGramosLitro;
  const consumoMaximo = Math.max(consumoEstimado1, consumoEstimado2);
  const consumoMinimo = Math.min(consumoEstimado1, consumoEstimado2);

  const fecha = new Date();
  const dia = fecha.getDate();
  const mes = fecha.getMonth() + 1;
  const ano = fecha.getFullYear();
  const fechaString = dia + '/' + mes + '/' + ano;

  useEffect(() => {
    if (parseFloat(racionMSCons) <= parseFloat(consumoMinimo)) { setIconConsumo(check_icon) }
    else if (parseFloat(racionMSCons) > parseFloat(consumoMaximo)) { setIconConsumo(wrong_icon) }
    else { setIconConsumo(caution_icon) };
  }, [racionMSCons, consumoEstimado1, consumoEstimado2]);

  useEffect(() => {
          if (parseFloat(forrajePorciento) >= 50) {setIconForrConc(check_icon)}
          else if (parseFloat(forrajePorciento) < 30) {setIconForrConc(wrong_icon)}
          else {setIconForrConc(caution_icon)};
      }, [forrajePorciento]);

  useEffect(() => {
          if (parseFloat(racionEMCons) >= parseFloat(reqEMTotal)) {setIconEM(check_icon)}
          else {setIconEM(wrong_icon)};
      }, [racionEMCons, reqEMTotal]);

  useEffect(() => {
          if (parseFloat(racionPBCons) >= parseFloat(reqPBTotal)) {setIconPB(check_icon)}
          else {setIconPB(wrong_icon)};
      }, [racionPBCons, reqPBTotal]);

  return (
    <Document>
      <Page size="A4">
        <View style={styles.logoHeader}>
          <Image src={LogoMiLecheria}></Image>
        </View>

        <Text style={styles.title1}>Ración Lechera Simple</Text>
        <Text style={styles.title1}>{nombreCaso}</Text>
        <Text style={styles.title2}>ANÁLISIS FÍSICO DE LA RACIÓN - {fechaString}</Text>

        <Text style={styles.title3}>DATOS INGRESADOS POR EL USUARIO</Text>
        <Text style={styles.title3}>Datos de la vaca lechera</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableCell2}>
              <Text>Peso vivo</Text>
            </View>
            <View style={styles.tableCell2}>
              <Text>Sistema de producción</Text>
            </View>
            <View style={styles.tableCell2}>
              <Text>Producción individual</Text>
            </View>
            <View style={styles.tableCell2}>
              <Text>Grasa butirosa de la leche</Text>
            </View>
            <View style={styles.tableCell2}>
              <Text>Proteína de la leche</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCell}>
              <Text>{new Intl.NumberFormat().format(pesoVivo)} kg</Text>
            </View>
            <View style={styles.tableCell}>
              <Text>{sistema}</Text>
            </View>
            <View style={styles.tableCell}>
              <Text>{new Intl.NumberFormat().format(produccionIndividual)} litros/día</Text>
            </View>
            <View style={styles.tableCell}>
              <Text>{new Intl.NumberFormat().format(lecheGB)}% GB</Text>
            </View>
            <View style={styles.tableCell}>
              <Text>{new Intl.NumberFormat().format(lechePB)}% PB</Text>
            </View>
          </View>
        </View>

        <Text style={styles.title3}>Alimentos incluidos en la ración</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.cellLarge2}><Text>Alimento</Text></View>
            <View style={styles.cellSmall2}><Text>Clasificación</Text></View>
            <View style={styles.cellSmall2}><Text>Materia Seca</Text></View>
            <View style={styles.cellSmall2}><Text>Conc. Energética</Text></View>
            <View style={styles.cellSmall2}><Text>Proteina Bruta</Text></View>
          </View>
          {alimentosRacion.map((alimento) => (
            <View style={styles.tableRow}>
              <View style={styles.cellLarge}><Text>{alimento.nombre}</Text></View>
              <View style={styles.cellSmall}><Text>{alimento.clase}</Text></View>
              <View style={styles.cellSmall}><Text>{new Intl.NumberFormat().format(alimento.ms)}%</Text></View>
              <View style={styles.cellSmall}><Text>{new Intl.NumberFormat().format(alimento.ce)} MCalEM/kgMS</Text></View>
              <View style={styles.cellSmall}><Text>{new Intl.NumberFormat().format(alimento.pb)}%</Text></View>
            </View>)
          )}
        </View>

        <Text style={styles.title3}>Cantidades ofrecidas en la ración</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.cellLarge2}><Text>Alimento</Text></View>
            <View style={styles.cellSmall2}><Text>Ofrecido "Tal Cual"</Text></View>
            <View style={styles.cellSmall2}><Text>Materia Seca</Text></View>
            <View style={styles.cellSmall2}><Text>MS Ofrecida</Text></View>
            <View style={styles.cellSmall2}><Text>Aprovechado</Text></View>
            <View style={styles.cellSmall2}><Text>Consumo MS</Text></View>
          </View>
          {alimentosRacion.map((alimento) => (
            <View style={styles.tableRow} key={alimento.id}>
              <View style={styles.cellLarge}><Text>{alimento.nombre}</Text></View>
              <View style={styles.cellSmall}><Text>{new Intl.NumberFormat().format(alimento.kgtc)} kgTC</Text></View>
              <View style={styles.cellSmall}><Text>{new Intl.NumberFormat().format(alimento.ms)}%</Text></View>
              <View style={styles.cellSmall}><Text>{new Intl.NumberFormat().format(alimento.kgms)} kgMS</Text></View>
              <View style={styles.cellSmall}><Text>{new Intl.NumberFormat().format(alimento.apr)}%</Text></View>
              <View style={styles.cellSmall}><Text>{new Intl.NumberFormat().format(alimento.kgcons)} kgMS</Text></View>
            </View>)
          )}
          <View style={styles.tableRow}>
            <View style={styles.cellLarge2}><Text>Ración global</Text></View>
            <View style={styles.cellSmall2}><Text>{new Intl.NumberFormat().format(racionMVOfrecida)} kgTC</Text></View>
            <View style={styles.cellSmall2}><Text>{new Intl.NumberFormat().format(racionMSPorciento)}%</Text></View>
            <View style={styles.cellSmall2}><Text>{new Intl.NumberFormat().format(racionMSOfrecida)} kgMS</Text></View>
            <View style={styles.cellSmall2}><Text>{new Intl.NumberFormat().format(racionAprPorciento)}%</Text></View>
            <View style={styles.cellSmall2}><Text>{new Intl.NumberFormat().format(racionMSCons)} kgMS</Text></View>
          </View>
        </View>

        <Text style={styles.footer}>Ración Lechera Simple - Desarrolladores: Ing. Agr. EPL Francisco Candioti / Dr. Javier Baudracco</Text>
        <View style={styles.tableLogos}>
          <View style={styles.tableRow}>
            <View style={styles.logoFooter}>
              <Image src={LogoSaltoAgro}></Image>
            </View>
            <View style={styles.logoFooter}>
              <Image src={LogoUNLFCA}></Image>
            </View>
          </View>
        </View>
      </Page>

      <Page size="A4">
        <View style={styles.logoHeader}>
          <Image src={LogoMiLecheria}></Image>
        </View>

        <Text style={styles.title1}>Ración Lechera Simple</Text>
        <Text style={styles.title1}>{nombreCaso}</Text>
        <Text style={styles.title2}>ANÁLISIS FÍSICO DE LA RACIÓN - {fechaString}</Text>

        <Text style={styles.title3}>RESULTADOS</Text>
        <Text style={styles.title3}>Requerimientos - Necesidades nutricionales de la vaca lechera</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableCell2}>
              <Text>Requerimiento</Text>
            </View>
            <View style={styles.tableCell2}>
              <Text>Energía metabólica</Text>
            </View>
            <View style={styles.tableCell2}>
              <Text>Proteína bruta</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCell}>
              <Text>Mantenimiento</Text>
            </View>
            <View style={styles.tableCell}>
              <Text>{new Intl.NumberFormat().format(parseFloat(reqEMMant).toFixed(2))} MCalEM/día</Text>
            </View>
            <View style={styles.tableCell}>
              <Text>{new Intl.NumberFormat().format(parseFloat(reqPBMant).toFixed(2))} kgPB/día</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCell}>
              <Text>Producción</Text>
            </View>
            <View style={styles.tableCell}>
              <Text>{new Intl.NumberFormat().format((parseFloat(reqEMProd) * parseFloat(produccionIndividual)).toFixed(2))} MCalEM/día</Text>
            </View>
            <View style={styles.tableCell}>
              <Text>{new Intl.NumberFormat().format((parseFloat(reqPBProd) * parseFloat(produccionIndividual)).toFixed(2))} kgPB/día</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCell2}>
              <Text>Requerimiento global</Text>
            </View>
            <View style={styles.tableCell2}>
              <Text>{new Intl.NumberFormat().format(parseFloat(reqEMTotal).toFixed(2))} MCalEM/día</Text>
            </View>
            <View style={styles.tableCell2}>
              <Text>{new Intl.NumberFormat().format(parseFloat(reqPBTotal).toFixed(2))} kgPB/día</Text>
            </View>
          </View>
        </View>

        <Text style={styles.title3}>Consumo - Nutrientes aportados por la ración</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.cellLarge2}><Text>Alimento</Text></View>
            <View style={styles.cellSmall2}><Text>Energía Metabólica</Text></View>
            <View style={styles.cellSmall2}><Text>Proteína Bruta</Text></View>
            <View style={styles.cellSmall2}><Text>Concentración EM</Text></View>
            <View style={styles.cellSmall2}><Text>Concentración PB</Text></View>
          </View>
          {alimentosRacion.map((alimento) => (
            <View style={styles.tableRow} key={alimento.id}>
              <View style={styles.cellLarge}><Text>{alimento.nombre}</Text></View>
              <View style={styles.cellSmall}><Text>{new Intl.NumberFormat().format((alimento.ce * alimento.kgcons).toFixed(1))} MCalEM/día</Text></View>
              <View style={styles.cellSmall}><Text>{new Intl.NumberFormat().format((alimento.pb * alimento.kgcons / 100).toFixed(2))} kgPB/día</Text></View>
              <View style={styles.cellSmall}><Text>{new Intl.NumberFormat().format(alimento.ce)} MCalEM/kgMS</Text></View>
              <View style={styles.cellSmall}><Text>{new Intl.NumberFormat().format(alimento.pb)}%</Text></View>
            </View>)
          )}
          <View style={styles.tableRow}>
            <View style={styles.cellLarge2}><Text>Ración global</Text></View>
            <View style={styles.cellSmall2}><Text>{new Intl.NumberFormat().format(racionEMCons.toFixed(1))} MCalEM/día</Text></View>
            <View style={styles.cellSmall2}><Text>{new Intl.NumberFormat().format(racionPBCons.toFixed(2))} kgPB/día</Text></View>
            <View style={styles.cellSmall2}><Text>{new Intl.NumberFormat().format((racionCE).toFixed(2))} MCalEM/kgMS</Text></View>
            <View style={styles.cellSmall2}><Text>{new Intl.NumberFormat().format((racionPB).toFixed(1))}%</Text></View>
          </View>
        </View>

        <Text style={styles.footer}>Ración Lechera Simple - Desarrolladores: Ing. Agr. EPL Francisco Candioti / Dr. Javier Baudracco</Text>
        <View style={styles.tableLogos}>
          <View style={styles.tableRow}>
            <View style={styles.logoFooter}>
              <Image src={LogoSaltoAgro}></Image>
            </View>
            <View style={styles.logoFooter}>
              <Image src={LogoUNLFCA}></Image>
            </View>
          </View>
        </View>
      </Page>

      <Page size="A4">
        <View style={styles.logoHeader}>
          <Image src={LogoMiLecheria}></Image>
        </View>

        <Text style={styles.title1}>Ración Lechera Simple</Text>
        <Text style={styles.title1}>{nombreCaso}</Text>
        <Text style={styles.title2}>ANÁLISIS FÍSICO DE LA RACIÓN - {fechaString}</Text>

        <Text style={styles.title3}>RESUMEN DEL BALANCE</Text>
        <Text style={styles.title3}><View style={styles.tableCell3}><Image src={iconConsumo}></Image></View> Consumo</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableCell2}><Text>Consumo ración</Text></View>
            <View style={styles.tableCell2}><Text>Consumo estimado (1)</Text></View>
            <View style={styles.tableCell2}><Text>Consumo estimado (2)</Text></View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCell}><Text>{new Intl.NumberFormat().format(racionMSCons)} kgMS/día</Text></View>
            <View style={styles.tableCell}><Text>{new Intl.NumberFormat().format(consumoEstimado1.toFixed(1))} kgMS/día</Text></View>
            <View style={styles.tableCell}><Text>{new Intl.NumberFormat().format(consumoEstimado2.toFixed(1))} kgMS/día</Text></View>
          </View>
        </View>
        <Text style={styles.plaintext}>(1) Estimación en base a factores del animal - (2) Estimación en base a factores del animal y de la ración</Text>

        <Text style={styles.title3}><View style={styles.tableCell3}><Image src={iconForrConc}></Image></View> Relación Forraje : Concentrado</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableCell2}><Text>Proporción de forraje en la ración</Text></View>
            <View style={styles.tableCell2}><Text>Proporción de concentrado en la ración</Text></View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCell}><Text>{new Intl.NumberFormat().format(forrajePorciento)}% de la materia seca consumida</Text></View>
            <View style={styles.tableCell}><Text>{new Intl.NumberFormat().format(concentradoPorciento)}% de la materia seca consumida</Text></View>
          </View>
        </View>

        <Text style={styles.title3}><View style={styles.tableCell3}><Image src={iconEM}></Image></View> Balance de Energía Metabólica</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableCell2}><Text>Energía Metabólica consumida</Text></View>
            <View style={styles.tableCell2}><Text>Energía Metabólica requerida</Text></View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCell}><Text>{new Intl.NumberFormat().format(racionEMCons.toFixed(1))} MCalEM/día</Text></View>
            <View style={styles.tableCell}><Text>{new Intl.NumberFormat().format(reqEMTotal.toFixed(1))} MCalEM/día</Text></View>
          </View>
        </View>

        <Text style={styles.title3}><View style={styles.tableCell3}><Image src={iconPB}></Image></View> Balance de Proteína Bruta</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableCell2}><Text>Proteína Bruta consumida</Text></View>
            <View style={styles.tableCell2}><Text>Proteína Bruta requerida</Text></View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCell}><Text>{new Intl.NumberFormat().format(racionPBCons.toFixed(1))} kgPB/día</Text></View>
            <View style={styles.tableCell}><Text>{new Intl.NumberFormat().format(reqPBTotal.toFixed(1))} kgPB/día</Text></View>
          </View>
        </View>

        <Text style={styles.title3}>VARIACIÓN DE PESO</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableCell2}><Text>{mensajeVariacionPeso}</Text></View>
            <View style={styles.tableCell}><Text>{new Intl.NumberFormat().format(variacionPeso)} kgPV/día</Text></View>
          </View>
        </View>

        <Text style={styles.title3}>EFICIENCIA DE CONVERSIÓN</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableCell2}><Text>Conversión sobre materia seca ofrecida</Text></View>
            <View style={styles.tableCell2}><Text>Conversión sobre materia seca consumida</Text></View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCell}><Text>{new Intl.NumberFormat().format(efConLitrosMSOf)} litros/kgMS ofrecida</Text></View>
            <View style={styles.tableCell}><Text>{new Intl.NumberFormat().format(efConLitrosMSCons)} litros/kgMS consumida</Text></View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCell}><Text>{new Intl.NumberFormat().format(efConSolidosMSOf)} kgSU/kgMS ofrecida</Text></View>
            <View style={styles.tableCell}><Text>{new Intl.NumberFormat().format(efConSolidosMSCons)} kgSU/kgMS consumida</Text></View>
          </View>
        </View>
        <Text style={styles.plaintext}>(*) Sólidos útiles (kgSU): Proteína láctea (kgPB) + Grasa Butirosa (kgGB)</Text>

        <Text style={styles.title3}>EMISIÓN DE METANO ENTÉRICO</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableCell2}><Text>Metano entérico emitido por vaca diariamente</Text></View>
            <View style={styles.tableCell2}><Text>Metano entérico emitido por litro producido</Text></View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCell}><Text>{new Intl.NumberFormat().format(metanoEmitidoGramosDia)} gramos CH4/vaca día</Text></View>
            <View style={styles.tableCell}><Text>{new Intl.NumberFormat().format(metanoEmitidoGramosLitro)} gramos CH4/litro producido</Text></View>
          </View>
        </View>

        <Text style={styles.footer}>Ración Lechera Simple - Desarrolladores: Ing. Agr. EPL Francisco Candioti / Dr. Javier Baudracco</Text>
        <View style={styles.tableLogos}>
          <View style={styles.tableRow}>
            <View style={styles.logoFooter}>
              <Image src={LogoSaltoAgro}></Image>
            </View>
            <View style={styles.logoFooter}>
              <Image src={LogoUNLFCA}></Image>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
}

export default ResFisicosPDF;