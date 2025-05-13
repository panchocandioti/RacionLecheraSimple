import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import LogoMiLecheria from "../images/Imagotipo AZUL.png";
import LogoSaltoAgro from "../images/LogoSaltoAgro.png";
import LogoUNLFCA from "../images/FCA-UNL-Logo.jpg";

function ResEconomicosPDF() {
  return (
    <Document>
          <Page size="A4">
            <Text style={{ margin: 20, fontSize: 12 }}>
              RESULTADOS ECONÓMICOS - PRUEBA
            </Text>
          </Page>
        </Document>
  )
}

export default ResEconomicosPDF