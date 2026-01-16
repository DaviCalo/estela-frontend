import ApiClient from './base/ApiClient.js';

const ApiCategory = {
    getAllCategories: async () => {
        try {
            const response = await ApiClient.get(
                '/categories'
            );

            return response.data.categories;
        } catch (error) {
            console.error('Erro ao pegar todos os jogos:', error);
            return false;
        }
    },
    saveCategory: async (name) => {
        try {
            const params = new URLSearchParams();
            params.append('name', name);


            const response = await ApiClient.post('/category', params, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });

            return response.data;
        } catch (error) {
            console.error('Erro ao salvar categoria:', error);
            throw error;
        }
    },
    updateCategory: async (id, name) => {
        try {
            const response = await ApiClient.put('/category', null, {
                params: {
                    id: id,
                    name: name
                }
            });
            return response.data;
        } catch (error) {
            console.error('Erro ao atualizar categoria:', error);
            throw error;
        }
    },

    deleteCategory: async (id) => {
        try {
            const response = await ApiClient.delete('/category', {
                params: { id: id }
            });
            return response.data;
        } catch (error) {
            console.error('Erro ao deletar categoria:', error);
            throw error;
        }
    }
};

export default ApiCategory;