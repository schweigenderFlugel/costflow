"use client";

import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import { ProductCalculation } from "./table-calculation";

// Registrar una fuente elegante
Font.register({
  family: "Roboto",
  fonts: [
    { src: "https://fonts.gstatic.com/s/roboto/v29/KFOmCnqEu92Fr1Mu4mxP.ttf" },
  ],
});

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 11,
    fontFamily: "Roboto",
    color: "#2c3e50",
    lineHeight: 1.4,
  },
  header: {
    marginBottom: 25,
    textAlign: "center",
    borderBottom: "2px solid #2c3e50",
    paddingBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2c3e50",
  },
  subtitle: {
    fontSize: 12,
    color: "#7f8c8d",
    marginTop: 4,
  },
  table: {
    marginVertical: 20,
    borderWidth: 1,
    borderColor: "#dcdcdc",
    borderRadius: 4,
    overflow: "hidden",
  },
  row: {
    flexDirection: "row",
  },
  headerRow: {
    backgroundColor: "#f4f6f8",
  },
  cellHeader: {
    flex: 1,
    padding: 8,
    fontSize: 11,
    fontWeight: "bold",
    borderRightWidth: 1,
    borderRightColor: "#dcdcdc",
    textAlign: "center",
    color: "#34495e",
  },
  cell: {
    flex: 1,
    padding: 8,
    fontSize: 11,
    borderRightWidth: 1,
    borderRightColor: "#f0f0f0",
    textAlign: "center",
  },
  totalSection: {
    marginTop: 20,
    padding: 10,
    borderTop: "2px solid #2c3e50",
    alignItems: "flex-end",
  },
  totalText: {
    fontSize: 12,
    marginBottom: 4,
  },
  totalBold: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#2c3e50",
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 40,
    right: 40,
    textAlign: "center",
    fontSize: 9,
    color: "#95a5a6",
    borderTop: "1px solid #ecf0f1",
    paddingTop: 8,
  },
});

// ✅ Formateo moneda (ARS)
const formatCurrency = (value: number) =>
  new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 2,
  }).format(value);

interface BudgetPDFProps {
  products: ProductCalculation[];
  ivaRate?: number;
}

const BudgetPDF = ({ products, ivaRate = 0.21 }: BudgetPDFProps) => {
  const subtotal = products.reduce(
    (acc, p) => acc + p.unitValue * p.quantity,
    0
  );
  const iva = subtotal * ivaRate;
  const total = subtotal + iva;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Cotzia</Text>
          <Text style={styles.subtitle}>
            Presupuesto generado automáticamente
          </Text>
        </View>

        {/* Tabla */}
        <View style={styles.table}>
          <View style={[styles.row, styles.headerRow]}>
            <Text style={styles.cellHeader}>Artículo</Text>
            <Text style={styles.cellHeader}>Cantidad</Text>
            <Text style={styles.cellHeader}>Subtotal</Text>
          </View>

          {products.map((p, index) => (
            <View
              style={[
                styles.row,
                { backgroundColor: index % 2 === 0 ? "#fff" : "#fafafa" },
              ]}
              key={p.id}
            >
              <Text style={styles.cell}>{p.name}</Text>
              <Text style={styles.cell}>{p.quantity}</Text>
              <Text style={styles.cell}>
                {formatCurrency(p.unitValue * p.quantity)}
              </Text>
            </View>
          ))}
        </View>

        {/* Totales */}
        <View style={styles.totalSection}>
          <Text style={styles.totalText}>
            Subtotal: {formatCurrency(subtotal)}
          </Text>
          <Text style={styles.totalText}>
            IVA ({ivaRate * 100}%): {formatCurrency(iva)}
          </Text>
          <Text style={styles.totalBold}>Total: {formatCurrency(total)}</Text>
        </View>

        {/* Footer */}
        <Text style={styles.footer}>
          Cotzia • Herramienta de cálculo y presupuestos • Argentina
        </Text>
      </Page>
    </Document>
  );
};

export default BudgetPDF;
