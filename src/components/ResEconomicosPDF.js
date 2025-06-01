import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import LogoMiLecheria from "../images/Imagotipo AZUL.png";
import LogoSaltoAgro from "../images/LogoSaltoAgro.png";
import LogoUNLFCA from "../images/FCA-UNL-Logo.jpg";

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

function ResEconomicosPDF(props) {

  const nombreCaso = props.nombreCaso;
  const currency = props.currency;
  const codigoMoneda = props.codigoMoneda;
  const precioLitro = props.precioLitro;
  const precioKgSU = props.precioKgSU;
  const lecheSolidos = props.lecheSolidos;
  const alimentosRacion = props.alimentosRacion;
  const racionMSCons = props.racionMSCons;
  const decimales = props.decimales;
  const racionCostoFormato = props.racionCostoFormato;
  const racionCosto = props.racionCosto;
  const racionCE = props.racionCE;
  const racionPB = props.racionPB;
  const produccionIndividual = props.produccionIndividual;
  const ingresoLeche = props.ingresoLeche;

  const racionMargen = (parseFloat(ingresoLeche) - parseFloat(racionCosto)).toFixed(decimales);
  const racionCostoLitros = (parseFloat(racionCosto) / parseFloat(precioLitro)).toFixed(1);
  const racionMargenLitros = (parseFloat(racionMargen) / parseFloat(precioLitro)).toFixed(1);
  const racionCostoPorciento = (parseFloat(racionCosto) / parseFloat(ingresoLeche) * 100).toFixed(1);
  const racionMargenPorciento = (parseFloat(racionMargen) / parseFloat(ingresoLeche) * 100).toFixed(1);

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
        <Text style={styles.title2}>ANÁLISIS ECONÓMICO DE LA RACIÓN - {fechaString}</Text>

        <Text style={styles.title3}>DATOS INGRESADOS POR EL USUARIO</Text>
        <Text style={styles.title3}>Moneda de trabajo seleccionada: {currency} ({codigoMoneda})</Text>
        <Text style={styles.title3}>Valuación de la leche</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableCell2}>
              <Text>Precio por litro</Text>
            </View>
            <View style={styles.tableCell2}>
              <Text>Contenido de sólidos útiles (*)</Text>
            </View>
            <View style={styles.tableCell2}>
              <Text>Precio por kilogramo de sólidos útiles</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCell}>
              <Text>{new Intl.NumberFormat().format(precioLitro)} {codigoMoneda}/litro</Text>
            </View>
            <View style={styles.tableCell}>
              <Text>{new Intl.NumberFormat().format(lecheSolidos)}%</Text>
            </View>
            <View style={styles.tableCell}>
              <Text>{new Intl.NumberFormat().format(precioKgSU)} {codigoMoneda}/kgSU</Text>
            </View>
          </View>
        </View>
        <Text style={styles.plaintext}>(*) Sólidos útiles (kgSU): Proteína láctea (kgPB) + Grasa Butirosa (kgGB)</Text>

        <Text style={styles.title3}>Valuación de los alimentos</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.cellLarge2}>
              <Text>Alimento</Text>
            </View>
            <View style={styles.cellLarge2}>
              <Text>Costo/kgTC Ofrecido</Text>
            </View>
            <View style={styles.cellSmall2}>
              <Text>% Materia seca</Text>
            </View>
            <View style={styles.cellLarge2}>
              <Text>Costo/kgMS Ofrecido</Text>
            </View>
            <View style={styles.cellSmall2}>
              <Text>Aprovechado</Text>
            </View>
            <View style={styles.cellLarge2}>
              <Text>Costo/kgMS Consumido</Text>
            </View>
          </View>
          {alimentosRacion.map((alimento) => (
            <View style={styles.tableRow}>
              <View style={styles.cellLarge}><Text>{alimento.nombre}</Text></View>
              <View style={styles.cellLarge}><Text>{new Intl.NumberFormat().format(alimento.costokgtc)} {codigoMoneda}/kgTC</Text></View>
              <View style={styles.cellSmall}><Text>{new Intl.NumberFormat().format(alimento.ms)}%</Text></View>
              <View style={styles.cellLarge}><Text>{new Intl.NumberFormat().format(alimento.costokgms)} {codigoMoneda}/kgMS</Text></View>
              <View style={styles.cellSmall}><Text>{new Intl.NumberFormat().format(alimento.apr)}%</Text></View>
              <View style={styles.cellLarge}><Text>{new Intl.NumberFormat().format(alimento.costokgcons)} {codigoMoneda}/kgMS</Text></View>
            </View>)
          )}
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
        <Text style={styles.title2}>ANÁLISIS ECONÓMICO DE LA RACIÓN - {fechaString}</Text>

        <Text style={styles.title3}>RESULTADOS</Text>
        <Text style={styles.title3}>Costo de la ración</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.cellLarge2}>
              <Text>Alimento</Text>
            </View>
            <View style={styles.cellSmall2}>
              <Text>MS Consumida</Text>
            </View>
            <View style={styles.cellSmall2}>
              <Text>Costo/kgMS Consumida</Text>
            </View>
            <View style={styles.cellSmall2}>
              <Text>Subtotal</Text>
            </View>
            <View style={styles.cellSmall2}>
              <Text>% sobre costo ración</Text>
            </View>
          </View>
          {alimentosRacion.map((alimento) => (
            <View style={styles.tableRow}>
              <View style={styles.cellLarge}><Text>{alimento.nombre}</Text></View>
              <View style={styles.cellSmall}><Text>{new Intl.NumberFormat().format(alimento.kgcons)} kgMS</Text></View>
              <View style={styles.cellSmall}><Text>{new Intl.NumberFormat().format(alimento.costokgcons)} {codigoMoneda}/kgMS</Text></View>
              <View style={styles.cellSmall}><Text>{new Intl.NumberFormat().format((parseFloat(alimento.kgcons) * parseFloat(alimento.costokgcons)).toFixed(decimales))} {codigoMoneda}</Text></View>
              <View style={styles.cellSmall}><Text>{new Intl.NumberFormat().format(((parseFloat(alimento.kgcons) * parseFloat(alimento.costokgcons)) / parseFloat(racionCostoFormato) * 100).toFixed(1))}%</Text></View>
            </View>)
          )}
          <View style={styles.tableRow}>
            <View style={styles.cellLarge2}>
              <Text>Ración global</Text>
            </View>
            <View style={styles.cellSmall2}>
              <Text>{new Intl.NumberFormat().format(racionMSCons)} kgMS</Text>
            </View>
            <View style={styles.cellSmall2}>
              <Text>{new Intl.NumberFormat().format((parseFloat(racionCosto) / parseFloat(racionMSCons)).toFixed(decimales))} {codigoMoneda}/kgMS</Text>
            </View>
            <View style={styles.cellSmall2}>
              <Text>{new Intl.NumberFormat().format(racionCostoFormato)} {codigoMoneda}</Text>
            </View>
            <View style={styles.cellSmall2}>
              <Text>100%</Text>
            </View>
          </View>
        </View>

        <Text style={styles.title3}>Costo de los nutrientes</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableCell2}>
              <Text>Alimento</Text>
            </View>
            <View style={styles.tableCell2}>
              <Text>Costo/MCalEM Consumida</Text>
            </View>
            <View style={styles.tableCell2}>
              <Text>Costo/kgPB Consumida</Text>
            </View>
          </View>
          {alimentosRacion.map((alimento) => (
            <View style={styles.tableRow}>
              <View style={styles.tableCell}><Text>{alimento.nombre}</Text></View>
              <View style={styles.tableCell}><Text>{new Intl.NumberFormat().format((parseFloat(alimento.costokgcons) / parseFloat(alimento.ce)).toFixed(decimales))} {codigoMoneda}/MCalEM</Text></View>
              <View style={styles.tableCell}><Text>{new Intl.NumberFormat().format((parseFloat(alimento.costokgcons) / parseFloat(alimento.pb) * 100).toFixed(decimales))} {codigoMoneda}/kgPB</Text></View>
            </View>)
          )}
          <View style={styles.tableRow}>
            <View style={styles.tableCell2}>
              <Text>Ración global</Text>
            </View>
            <View style={styles.tableCell2}>
              <Text>{new Intl.NumberFormat().format(((parseFloat(racionCosto) / parseFloat(racionMSCons)) / parseFloat(racionCE)).toFixed(decimales))} {codigoMoneda}/MCalEM</Text>
            </View>
            <View style={styles.tableCell2}>
              <Text>{new Intl.NumberFormat().format(((parseFloat(racionCosto) / parseFloat(racionMSCons)) / parseFloat(racionPB) * 100).toFixed(decimales))} {codigoMoneda}/kgPB</Text>
            </View>
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
        <Text style={styles.title2}>ANÁLISIS ECONÓMICO DE LA RACIÓN - {fechaString}</Text>

        <Text style={styles.title3}>INGRESOS POR LECHE</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableCell2}>
              <Text>Unidades producidas</Text>
            </View>
            <View style={styles.tableCell2}>
              <Text>Precio unitario</Text>
            </View>
            <View style={styles.tableCell2}>
              <Text>Ingresos por leche</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCell}>
              <Text>{new Intl.NumberFormat().format(produccionIndividual)} litros diarios/vaca</Text>
            </View>
            <View style={styles.tableCell}>
              <Text>{new Intl.NumberFormat().format(parseFloat(precioLitro).toFixed(decimales))} {codigoMoneda}/litro</Text>
            </View>
            <View style={styles.tableCell}>
              <Text>{new Intl.NumberFormat().format(parseFloat(ingresoLeche).toFixed(decimales))} {codigoMoneda} diarios/vaca</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCell}>
              <Text>{new Intl.NumberFormat().format((parseFloat(produccionIndividual) * parseFloat(lecheSolidos) / 100).toFixed(4))} kgSU diarios/vaca</Text>
            </View>
            <View style={styles.tableCell}>
              <Text>{new Intl.NumberFormat().format(precioKgSU)} {codigoMoneda}/kgSU</Text>
            </View>
            <View style={styles.tableCell}>
              <Text>{new Intl.NumberFormat().format(ingresoLeche)} {codigoMoneda} diarios/vaca</Text>
            </View>
          </View>
        </View>

        <Text style={styles.title3}>MARGEN SOBRE ALIMENTACIÓN</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableCell2}>
              <Text>Ingresos por leche</Text>
            </View>
            <View style={styles.tableCell2}>
              <Text>Costo de alimentación</Text>
            </View>
            <View style={styles.tableCell2}>
              <Text>Margen sobre alimentación</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCell}>
              <Text>{new Intl.NumberFormat().format(ingresoLeche)} {codigoMoneda} diarios/vaca</Text>
            </View>
            <View style={styles.tableCell}>
              <Text>{new Intl.NumberFormat().format(racionCostoFormato)} {codigoMoneda} diarios/vaca</Text>
            </View>
            <View style={styles.tableCell}>
              <Text>{new Intl.NumberFormat().format(racionMargen)} {codigoMoneda} diarios/vaca</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCell}>
              <Text>{new Intl.NumberFormat().format(produccionIndividual)} litros diarios/vaca</Text>
            </View>
            <View style={styles.tableCell}>
              <Text>{new Intl.NumberFormat().format(racionCostoLitros)} litros diarios/vaca</Text>
            </View>
            <View style={styles.tableCell}>
              <Text>{new Intl.NumberFormat().format(racionMargenLitros)} litros diarios/vaca</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCell}>
              <Text>100% sobre ingresos leche</Text>
            </View>
            <View style={styles.tableCell}>
              <Text>{new Intl.NumberFormat().format(racionCostoPorciento)}% sobre ingresos leche</Text>
            </View>
            <View style={styles.tableCell}>
              <Text>{new Intl.NumberFormat().format(racionMargenPorciento)}% sobre ingresos leche</Text>
            </View>
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
  )
}

export default ResEconomicosPDF