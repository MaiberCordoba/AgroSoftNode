// components/ReportePdfUsuarios.tsx
import { Document, Page, View, Text, StyleSheet } from '@react-pdf/renderer';
import { PdfReportes } from '@/components/ui/Reportes';

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Helvetica'
  },
  table: { 
    display: "table", 
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0
  },
  tableRow: { 
    margin: "auto", 
    flexDirection: "row" 
  },
  tableColHeader: {
    width: "50%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    backgroundColor: '#f0f0f0',
    padding: 5
  },
  tableCol: {
    width: "50%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 5
  },
  tableCellHeader: {
    margin: "auto",
    fontSize: 12,
    fontWeight: 'bold'
  },
  tableCell: {
    margin: "auto",
    fontSize: 10
  }
});

export const ReportePdfUsuarios = ({ data }: { data: any }) => (
  <Document>
    <Page style={{ padding: '40 30' }}>
      <PdfReportes 
        title="reporte de usuarios registrados" 
        
      />
      
      <View style={styles.table}>
        {/* Encabezados */}
        <View style={styles.tableRow}>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>MÉTRICA</Text>
          </View>
          <View style={styles.tableColHeader}>
            <Text style={styles.tableCellHeader}>VALOR</Text>
          </View>
        </View>
        
        {/* Datos */}
        <View style={styles.tableRow}>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>Total usuarios</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>{data.total_usuarios}</Text>
          </View>
        </View>
        
        <View style={styles.tableRow}>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>Usuarios activos</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>{data.usuarios_activos}</Text>
          </View>
        </View>
        
        <View style={styles.tableRow}>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>Usuarios inactivos</Text>
          </View>
          <View style={styles.tableCol}>
            <Text style={styles.tableCell}>{data.usuarios_inactivos}</Text>
          </View>
        </View>
      </View>
    </Page>
  </Document>
);