import ApiClient from './base/ApiClient.js';

const ApiSales = {
    getAllSales: async (name, startData, endData) => {
        try {
            const params = {};
            if (name) {
                params.name = name;
            }
            if (startData) {
                params.startDate = startData;
            }
            if (endData) {
                params.endDate = endData;
            }
            const response = await ApiClient.get('/adm/sales', { params });

            return response.data.sales;
        } catch (error) {
            console.error('Erro ao pegar as vendas:', error);
            return false;
        }
    },
    deleteById: async (saleId) => {
        try {
            const response = await ApiClient.delete(`/adm/sale?saleId=${saleId}`);
            return response.data;
        } catch (error) {
            console.error('Erro ao pegar as vendas:', error);
            return false;
        }
    },
};

export default ApiSales;