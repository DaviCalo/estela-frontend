import React, { useState, useEffect } from "react";
import SaleTable from "../../components/saleTable/SaleTable.jsx";
import SaleTableRow from "../../components/saleTable/SaleTableRow.jsx";
import ApiSale from "../../api/ApiSale.js";
import "./SalePage.css";

const SalePage = () => {
  const [sales, setSales] = useState([]);

  const tableHeaders = [
    "NOME DO COMPRADOR",
    "VALOR VENDIDO",
    "DATA DA COMPRA",
    "JOGOS VENDIDOS",
    "TOTAL DE ITENS",
  ];

  useEffect(() => {
    fetchSales();
  }, []);

  const fetchSales = async () => {
    try {
      const data = await ApiSale.getAllSales();
      setSales(data || []);
    } catch (error) {
      console.error("Error fetching sales:", error);
    }
  };

  const handleDelete = async (saleData) => {
    try {
      await ApiSale.deleteById(saleData.saleId);
      fetchSales();
    } catch (error) {
      console.error("Error deleting sale:", error);
    }
  };

  return (
    <div className="container-pages">
      <div className="header-gamepage">
        <h1 className="title-page">Vendas Realizadas</h1>
      </div>

      <div className="sale-page-container">
        <SaleTable headers={tableHeaders}>
          {sales?.length > 0 ? (
            sales.map((saleItem) => (
              <SaleTableRow
                key={saleItem.saleId || saleItem.id}
                data={saleItem}
                onDelete={handleDelete}
              />
            ))
          ) : (
            <tr>
              <td
                colSpan="6"
                style={{
                  textAlign: "center",
                  padding: "20px",
                  color: "#C7C1E8",
                }}
              >
                Nenhuma venda registrada.
              </td>
            </tr>
          )}
        </SaleTable>
      </div>
    </div>
  );
};

export default SalePage;
