import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import LogoMiLecheria from "../images/Imagotipo AZUL.png";
import LogoSaltoAgro from "../images/LogoSaltoAgro.png";
import LogoUNLFCA from "../images/FCA-UNL-Logo.jpg";
import Check from '../images/check_icon.png';

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

  const fecha = new Date();
  const dia = fecha.getDate();
  const mes = fecha.getMonth() + 1;
  const ano = fecha.getFullYear();
  const fechaString = dia + '/' + mes + '/' + ano;

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
            <View style={styles.tableCell2}><Text>Alimento</Text></View>
            <View style={styles.tableCell2}><Text>Clasificación</Text></View>
            <View style={styles.tableCell2}><Text>Materia Seca</Text></View>
            <View style={styles.tableCell2}><Text>Conc. Energética</Text></View>
            <View style={styles.tableCell2}><Text>Proteina Bruta</Text></View>
          </View>
          {alimentosRacion.map((alimento) => (
            <View style={styles.tableRow}>
              <View style={styles.tableCell}><Text>{alimento.nombre}</Text></View>
              <View style={styles.tableCell}><Text>{alimento.clase}</Text></View>
              <View style={styles.tableCell}><Text>{alimento.ms}%</Text></View>
              <View style={styles.tableCell}><Text>{alimento.ce} MCalEM/kgMS</Text></View>
              <View style={styles.tableCell}><Text>{alimento.pb}%</Text></View>
            </View>)
          )}
        </View>

        <Text style={styles.title3}>Cantidades ofrecidas en la ración</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableCell2}><Text>Alimento</Text></View>
            <View style={styles.tableCell2}><Text>Ofrecido "Tal Cual"</Text></View>
            <View style={styles.tableCell2}><Text>Materia Seca</Text></View>
            <View style={styles.tableCell2}><Text>MS Ofrecida</Text></View>
            <View style={styles.tableCell2}><Text>Aprovechado</Text></View>
            <View style={styles.tableCell2}><Text>Consumo MS</Text></View>
          </View>
          {alimentosRacion.map((alimento) => (
            <View style={styles.tableRow} key={alimento.id}>
              <View style={styles.tableCell}><Text>{alimento.nombre}</Text></View>
              <View style={styles.tableCell}><Text>{alimento.kgtc} kgTC</Text></View>
              <View style={styles.tableCell}><Text>{alimento.ms}%</Text></View>
              <View style={styles.tableCell}><Text>{alimento.kgms} kgMS</Text></View>
              <View style={styles.tableCell}><Text>{alimento.apr}%</Text></View>
              <View style={styles.tableCell}><Text>{alimento.kgcons} kgMS</Text></View>
            </View>)
          )}
          <View style={styles.tableRow}>
            <View style={styles.tableCell2}><Text>Ración global</Text></View>
            <View style={styles.tableCell2}><Text>{racionMVOfrecida} kgTC</Text></View>
            <View style={styles.tableCell2}><Text>{racionMSPorciento}%</Text></View>
            <View style={styles.tableCell2}><Text>{racionMSOfrecida} kgMS</Text></View>
            <View style={styles.tableCell2}><Text>{racionAprPorciento}%</Text></View>
            <View style={styles.tableCell2}><Text>{racionMSCons} kgMS</Text></View>
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
            <View style={styles.tableCell2}><Text>Alimento</Text></View>
            <View style={styles.tableCell2}><Text>Energía Metabólica</Text></View>
            <View style={styles.tableCell2}><Text>Proteína Bruta</Text></View>
            <View style={styles.tableCell2}><Text>Concentración EM</Text></View>
            <View style={styles.tableCell2}><Text>Concentración PB</Text></View>
          </View>
          {alimentosRacion.map((alimento) => (
            <View style={styles.tableRow} key={alimento.id}>
              <View style={styles.tableCell}><Text>{alimento.nombre}</Text></View>
              <View style={styles.tableCell}><Text>{(alimento.ce * alimento.kgcons).toFixed(1)} MCalEM/día</Text></View>
              <View style={styles.tableCell}><Text>{(alimento.pb * alimento.kgcons / 100).toFixed(2)} kgPB/día</Text></View>
              <View style={styles.tableCell}><Text>{alimento.ce} MCalEM/kgMS</Text></View>
              <View style={styles.tableCell}><Text>{alimento.pb}%</Text></View>
            </View>)
          )}
          <View style={styles.tableRow}>
            <View style={styles.tableCell2}><Text>Ración global</Text></View>
            <View style={styles.tableCell2}><Text>{racionEMCons.toFixed(1)} MCalEM/día</Text></View>
            <View style={styles.tableCell2}><Text>{racionPBCons.toFixed(2)} kgPB/día</Text></View>
            <View style={styles.tableCell2}><Text>{(racionCE).toFixed(2)} MCalEM/kgMS</Text></View>
            <View style={styles.tableCell2}><Text>{(racionPB).toFixed(1)}%</Text></View>
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
        <Text style={styles.title3}><View style={styles.tableCell3}><Image src={Check}></Image></View> Consumo</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableCell2}><Text>Consumo ración</Text></View>
            <View style={styles.tableCell2}><Text>Consumo estimado (1)</Text></View>
            <View style={styles.tableCell2}><Text>Consumo estimado (2)</Text></View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCell}><Text>{racionMSCons} kgMS/día</Text></View>
            <View style={styles.tableCell}><Text>{consumoEstimado1.toFixed(1)} kgMS/día</Text></View>
            <View style={styles.tableCell}><Text>{consumoEstimado2.toFixed(1)} kgMS/día</Text></View>
          </View>
        </View>
        <Text style={styles.plaintext}>(1) Estimación en base a factores del animal - (2) Estimación en base a factores del animal y de la ración</Text>

        <Text style={styles.title3}><View style={styles.tableCell3}><Image src={Check}></Image></View> Relación Forraje : Concentrado</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableCell2}><Text>Proporción de forraje en la ración</Text></View>
            <View style={styles.tableCell2}><Text>Proporción de concentrado en la ración</Text></View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCell}><Text>{forrajePorciento}% de la materia seca consumida</Text></View>
            <View style={styles.tableCell}><Text>{concentradoPorciento}% de la materia seca consumida</Text></View>
          </View>
        </View>

        <Text style={styles.title3}><View style={styles.tableCell3}><Image src={Check}></Image></View> Balance de Energía Metabólica</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableCell2}><Text>Energía Metabólica consumida</Text></View>
            <View style={styles.tableCell2}><Text>Energía Metabólica requerida</Text></View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCell}><Text>{racionEMCons.toFixed(1)} MCalEM/día</Text></View>
            <View style={styles.tableCell}><Text>{reqEMTotal.toFixed(1)} MCalEM/día</Text></View>
          </View>
        </View>

        <Text style={styles.title3}><View style={styles.tableCell3}><Image src={Check}></Image></View> Balance de Proteína Bruta</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableCell2}><Text>Proteína Bruta consumida</Text></View>
            <View style={styles.tableCell2}><Text>Proteína Bruta requerida</Text></View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCell}><Text>{racionPBCons.toFixed(1)} kgPB/día</Text></View>
            <View style={styles.tableCell}><Text>{reqPBTotal.toFixed(1)} kgPB/día</Text></View>
          </View>
        </View>

        <Text style={styles.title3}>VARIACIÓN DE PESO <View style={styles.tableCell3}></View></Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableCell2}><Text>{mensajeVariacionPeso}</Text></View>
            <View style={styles.tableCell}><Text>{variacionPeso} kgPV/día</Text></View>
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