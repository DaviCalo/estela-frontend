export const formatCurrency = (value) => {
    const numberValue = Number(value);

    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(numberValue);
};

export const unformatCurrency = (formattedValue) => {
  if (!formattedValue) return 0;
  const onlyDigits = formattedValue.replace(/\D/g, "");
  return parseFloat(onlyDigits) / 100;
};

export const formatDate = (dateString) => {
    const data = new Date(dateString);
    return data.toLocaleDateString("pt-BR");
};
