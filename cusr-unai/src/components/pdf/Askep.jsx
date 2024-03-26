import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import axios from 'axios';

const styles = StyleSheet.create({
  text:{
    margin: 12,
    fontSize: 24,
    textAlign: 'justify',
  }
});

const Askep = () => (
  <Document>
    <Page size="A4">
        <Text style={styles.text}>Askep</Text>
    </Page>
  </Document>
);

export default Askep;