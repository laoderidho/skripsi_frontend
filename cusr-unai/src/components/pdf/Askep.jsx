import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image} from '@react-pdf/renderer';
import axios from 'axios';
import LogoUnai from './LogoUnai.png'

const styles = StyleSheet.create({
  body: {
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  title: {
    fontSize: 24,
    textAlign: 'center'
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: 'justify',
  },
  additionalText: {
    paddingTop: 17,
    fontSize: 14,
    textAlign: 'center',
  },
  judulAskep: {
    paddingTop: 17,
    fontSize: 20,
    textAlign: 'center',
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 15,
    width: 10,
    height: 10
  },
  div: {
    flexDirection: 'row', // Arrange items horizontally
    justifyContent: 'space-between', // Distribute items along the main axis
    padding: 10,
  },
  column: {
    width: '45%', // Adjust width to leave some space for margins
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000'
  },
  row: {
    flexDirection: 'row', // Arrange items horizontally
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10, // Adjust as needed for spacing between rows
    height: '20%'
    
  },
  container: {
    flex: 1,
    width: '100%',
  },
  
  
});

const Askep = () => (
  <Document>
    <Page style={styles.body}>

      <Image style={styles.image} src={LogoUnai} />

      <Text style={styles.title}>
        {/* Judul */}
        KLINIK UNIVERSITAS ADVENT INDONESIA
        <br/>
        <Text style={styles.additionalText}>Jl. Kolonel Masturi No. 288 Parompong-Bandung Barat</Text>
        <br />
        <Text style={styles.judulAskep}>CATATAN ASUHAN KEPERAWATAN (ASKEP)</Text>
        <br/>
        <View style={styles.div}>

            {/* Tanggal/Jam */}
            <View style={styles.row}>
              <View style={styles.column}>
                <Text style={styles.text}>Tanggal/Jam</Text>
              </View>
            </View>
            {/* Dx Keperawatan */}
            <View style={styles.column}>
              <Text style={styles.text}>Dx Keperawatan</Text>
            </View>
            {/* Intervensi */}
            <View style={styles.column}>
              <Text style={styles.text}>Intervensi</Text>
            </View>
            {/* Implemenetasi */}
            <View style={styles.column}>
              <Text style={styles.text}>Implementasi</Text>
            </View>
            {/* Luaran */}
            <View style={styles.column}>
              <Text style={styles.text}>Luaran</Text>
            </View>
             {/* Evaluasi */}
             <View style={styles.column}>
              <Text style={styles.text}>Evaluasi</Text>
            </View>
            <br/>
            <View style={styles.container}>
              <View style={styles.row}>
                <View style={styles.column}>
                  <Text style={styles.text}>Tanggal/Jam</Text>
                </View>
              </View>
              <View style={styles.row}>
                <View style={styles.column}>
                  <Text style={styles.text}>Dx Keperawatan</Text>
                </View>
              </View>
              <View style={styles.row}>
                <View style={styles.column}>
                  <Text style={styles.text}>Intervensi</Text>
                </View>
              </View>
              <View style={styles.row}>
                <View style={styles.column}>
                  <Text style={styles.text}>Implementasi</Text>
                </View>
              </View>
              <View style={styles.row}>
                <View style={styles.column}>
                  <Text style={styles.text}>Luaran</Text>
                </View>
              </View>
              <View style={styles.row}>
                <View style={styles.column}>
                  <Text style={styles.text}>Evaluasi</Text>
                </View>
              </View>
            </View>
          </View>
      </Text>

     

      
    </Page>
  </Document>
);

export default Askep;