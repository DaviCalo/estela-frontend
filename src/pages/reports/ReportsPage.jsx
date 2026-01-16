import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import ApiSale from "../../api/ApiSale.js";
import "./ReportsPage.css";

const ReportsPage = () => {
  const [sales, setSales] = useState([]);

  const [filters, setFilters] = useState({
    name: "",
    startDate: "",
    endDate: "",
  });

  const [summary, setSummary] = useState({
    totalRevenue: 0,
    totalSales: 0,
    avgTicket: 0,
  });

  const [chartsData, setChartsData] = useState({
    salesByDate: { series: [], categories: [] },
    salesByHour: { series: [], categories: [] },
    topGamesQty: { series: [], categories: [] },
    basketSize: { series: [], categories: [] },
    topGamesRevenue: { series: [], labels: [] },
    topClients: { series: [], categories: [] },
    priceRange: { series: [], labels: [] },
  });

  const fetchSales = async () => {
    try {
      const data = await ApiSale.getAllSales(
        filters.name,
        filters.startDate,
        filters.endDate
      );

      const salesList = data || [];
      setSales(salesList);
      processData(salesList);
    } catch (error) {
      console.error("Error fetching sales:", error);
    }
  };

 
  const clearFilters = async () => {
    setFilters({ name: "", startDate: "", endDate: "" });
    try {
      const data = await ApiSale.getAllSales("", "", "");
      const salesList = data || [];
      setSales(salesList);
      processData(salesList);
    } catch (error) {
      console.error("Error clearing filters:", error);
    }
  };

  useEffect(() => {
    fetchSales();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const processData = (data) => {
    if (!data) return;

    let totalRev = 0;
    const salesByDateMap = {};
    const gameCountMap = {};
    const gameRevenueMap = {};
    const clientRevenueMap = {};
    const basketSizeMap = {};
    const salesByHourArray = Array(24).fill(0);

    const priceRanges = {
      "Promo (< R$ 20)": 0,
      "Padrão (R$ 20-60)": 0,
      "Premium (> R$ 60)": 0,
    };

    data.forEach((sale) => {
      totalRev += sale.totalPrice;

      const dateObj = new Date(sale.dataSale);
      const dateStr = dateObj.toLocaleDateString("pt-BR");
      const hour = dateObj.getHours();

      salesByDateMap[dateStr] =
        (salesByDateMap[dateStr] || 0) + sale.totalPrice;
      salesByHourArray[hour] += 1;

      const itemCount = sale.listOfGames ? sale.listOfGames.length : 0;
      const basketLabel = itemCount === 1 ? "1 Jogo" : `${itemCount} Jogos`;
      basketSizeMap[basketLabel] = (basketSizeMap[basketLabel] || 0) + 1;

      const clientName = sale.userName || "Desconhecido";
      clientRevenueMap[clientName] =
        (clientRevenueMap[clientName] || 0) + sale.totalPrice;

      if (sale.listOfGames) {
        sale.listOfGames.forEach((game) => {
          gameCountMap[game.name] = (gameCountMap[game.name] || 0) + 1;
          gameRevenueMap[game.name] =
            (gameRevenueMap[game.name] || 0) + game.price;

          if (game.price < 20) {
            priceRanges["Promo (< R$ 20)"]++;
          } else if (game.price >= 20 && game.price <= 60) {
            priceRanges["Padrão (R$ 20-60)"]++;
          } else {
            priceRanges["Premium (> R$ 60)"]++;
          }
        });
      }
    });

    setSummary({
      totalRevenue: totalRev,
      totalSales: data.length,
      avgTicket: data.length > 0 ? totalRev / data.length : 0,
    });

    const sortedDates = Object.keys(salesByDateMap).sort((a, b) => {
      const [dA, mA, yA] = a.split("/");
      const [dB, mB, yB] = b.split("/");
      return new Date(`${yA}-${mA}-${dA}`) - new Date(`${yB}-${mB}-${dB}`);
    });

    const topGamesArr = Object.entries(gameCountMap)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5);
    const topRevenueArr = Object.entries(gameRevenueMap)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5);
    const topClientsArr = Object.entries(clientRevenueMap)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5);

    setChartsData({
      salesByDate: {
        categories: sortedDates,
        series: [
          {
            name: "Faturamento (R$)",
            data: sortedDates.map((d) => salesByDateMap[d].toFixed(2)),
          },
        ],
      },
      salesByHour: {
        categories: Array.from({ length: 24 }, (_, i) => `${i}h`),
        series: [{ name: "Vendas Realizadas", data: salesByHourArray }],
      },
      basketSize: {
        categories: Object.keys(basketSizeMap),
        series: [{ name: "Ocorrências", data: Object.values(basketSizeMap) }],
      },
      topGamesQty: {
        categories: topGamesArr.map(([name]) => name),
        series: [
          {
            name: "Unidades Vendidas",
            data: topGamesArr.map(([, qty]) => qty),
          },
        ],
      },
      topGamesRevenue: {
        labels: topRevenueArr.map(([name]) => name),
        series: topRevenueArr.map(([, total]) => parseFloat(total.toFixed(2))),
      },
      topClients: {
        categories: topClientsArr.map(([name]) => name),
        series: [
          {
            name: "Total Gasto (R$)",
            data: topClientsArr.map(([, total]) => total.toFixed(2)),
          },
        ],
      },
      priceRange: {
        labels: Object.keys(priceRanges),
        series: Object.values(priceRanges),
      },
    });
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const commonOptions = {
    chart: { foreColor: "#9ca3af", background: "transparent" },
    grid: { borderColor: "#404040" },
    tooltip: { theme: "dark" },
  };

  const areaChartOptions = {
    ...commonOptions,
    chart: { type: "area", toolbar: { show: false } },
    xaxis: { categories: chartsData.salesByDate.categories },
    colors: ["#818cf8"],
    stroke: { curve: "smooth" },
    fill: {
      type: "gradient",
      gradient: { shadeIntensity: 1, opacityFrom: 0.7, opacityTo: 0.3 },
    },
  };

  const hourChartOptions = {
    ...commonOptions,
    chart: { type: "bar", toolbar: { show: false } },
    xaxis: { categories: chartsData.salesByHour.categories },
    colors: ["#6366f1"],
    plotOptions: { bar: { borderRadius: 2, columnWidth: "60%" } },
    dataLabels: { enabled: false },
  };

  const basketChartOptions = {
    ...commonOptions,
    chart: { type: "bar", toolbar: { show: false } },
    xaxis: { categories: chartsData.basketSize.categories },
    colors: ["#10b981"],
    plotOptions: { bar: { borderRadius: 4, horizontal: true } },
    dataLabels: { enabled: true },
  };

  const barChartOptions = {
    ...commonOptions,
    chart: { type: "bar", toolbar: { show: false } },
    xaxis: { categories: chartsData.topGamesQty.categories },
    colors: ["#34d399"],
    plotOptions: { bar: { borderRadius: 4, horizontal: true } },
    dataLabels: { enabled: true },
  };

  const columnChartOptions = {
    ...commonOptions,
    chart: { type: "bar", toolbar: { show: false } },
    xaxis: { categories: chartsData.topClients.categories },
    colors: ["#f87171"],
    plotOptions: {
      bar: { borderRadius: 4, horizontal: false, columnWidth: "50%" },
    },
    dataLabels: { enabled: false },
  };

  const pieChartOptions = {
    ...commonOptions,
    labels: chartsData.topGamesRevenue.labels,
    colors: ["#60a5fa", "#f472b6", "#a78bfa", "#fbbf24", "#34d399"],
    legend: { position: "bottom" },
  };

  const polarOptions = {
    ...commonOptions,
    labels: chartsData.priceRange.labels,
    colors: ["#fbbf24", "#a78bfa", "#ef4444"],
    legend: { position: "bottom" },
    stroke: { colors: ["#374151"] },
    plotOptions: { polarArea: { rings: { strokeWidth: 0 } } },
  };

  // Verifica se há algum filtro ativo para exibir o botão de limpar
  const hasActiveFilters = filters.name || filters.startDate || filters.endDate;

  return (
    <div className="reports-container-pages">
      <div className="header-gamepage">
        <h1 className="title-page">Relatórios</h1>
      </div>

      <div className="reports-filters-container">
        <div className="reports-filter-group">
          <label>Nome do Cliente</label>
          <input
            type="text"
            name="name"
            className="reports-filter-input"
            placeholder="Ex: João Silva"
            value={filters.name}
            onChange={handleFilterChange}
          />
        </div>
        <div className="reports-filter-group">
          <label>Data Início</label>
          <input
            type="date"
            name="startDate"
            className="reports-filter-input"
            value={filters.startDate}
            onChange={handleFilterChange}
          />
        </div>
        <div className="reports-filter-group">
          <label>Data Fim</label>
          <input
            type="date"
            name="endDate"
            className="reports-filter-input"
            value={filters.endDate}
            onChange={handleFilterChange}
          />
        </div>

        <button className="reports-filter-btn" onClick={fetchSales}>
          Filtrar Dados
        </button>

        {hasActiveFilters && (
          <button className="reports-clear-btn" onClick={clearFilters}>
            Limpar Filtros
          </button>
        )}
      </div>

      <div className="reports-summary-grid">
        <div className="reports-summary-card">
          <span className="reports-summary-label">Faturamento Total</span>
          <span className="reports-summary-value highlight">
            {formatCurrency(summary.totalRevenue)}
          </span>
        </div>
        <div className="reports-summary-card">
          <span className="reports-summary-label">Vendas Realizadas</span>
          <span className="reports-summary-value">{summary.totalSales}</span>
        </div>
        <div className="reports-summary-card">
          <span className="reports-summary-label">Ticket Médio</span>
          <span className="reports-summary-value">
            {formatCurrency(summary.avgTicket)}
          </span>
        </div>
      </div>

      <div className="reports-charts-grid">
        <div className="reports-chart-card" style={{ gridColumn: "span 2" }}>
          <h3 className="reports-chart-title">Faturamento Diário (Timeline)</h3>
          <Chart
            options={areaChartOptions}
            series={chartsData.salesByDate.series}
            type="area"
            height={350}
          />
        </div>

        <div className="reports-chart-card" style={{ gridColumn: "span 2" }}>
          <h3 className="reports-chart-title">
            Volume de Vendas por Hora do Dia
          </h3>
          <Chart
            options={hourChartOptions}
            series={chartsData.salesByHour.series}
            type="bar"
            height={300}
          />
        </div>

        <div className="reports-chart-card">
          <h3 className="reports-chart-title">Top 5 Jogos - Unidades</h3>
          <Chart
            options={barChartOptions}
            series={chartsData.topGamesQty.series}
            type="bar"
            height={300}
          />
        </div>

        <div className="reports-chart-card">
          <h3 className="reports-chart-title">
            Itens por Venda (Tamanho da Cesta)
          </h3>
          <Chart
            options={basketChartOptions}
            series={chartsData.basketSize.series}
            type="bar"
            height={300}
          />
        </div>

        <div className="reports-chart-card">
          <h3 className="reports-chart-title">Top 5 Clientes - Valor Gasto</h3>
          <Chart
            options={columnChartOptions}
            series={chartsData.topClients.series}
            type="bar"
            height={300}
          />
        </div>

        <div className="reports-chart-card">
          <h3 className="reports-chart-title">Receita por Jogo (Top 5)</h3>
          <Chart
            options={pieChartOptions}
            series={chartsData.topGamesRevenue.series}
            type="donut"
            height={300}
          />
        </div>

        <div className="reports-chart-card">
          <h3 className="reports-chart-title">
            Distribuição por Faixa de Preço
          </h3>
          <Chart
            options={polarOptions}
            series={chartsData.priceRange.series}
            type="polarArea"
            height={300}
          />
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;
