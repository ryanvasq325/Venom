const table = new DataTable('#tabela-empresa', {
    responsive: true,
    processing: true,
    serverSide: true,
    ajax: async (data, callback) => {
        const filter = {
            term: data?.search?.value,    //Termo da pesquisa
            limit: data?.length,    //Limite de registros  a ser selecionado do banco
            offset: data?.start,  //A pesquisa inicia no registro Ex: 5,10
            orderType: data?.order[0]?.dir, //Tipo de ordenção
            column: data?.order[0]?.column,   //Coluna a ser filtrada
        }
    try{
        const response = await window.electronAPI.searchCompanies(filter);
        callback({
            draw: response?.draw ?? data?.draw ?? 0, //Número de requisição para o servidor (usado para controle de concorrência)
            recordsTotal: response?.recordsTotal ?? 0, //Total de registros sem filtro
            recordsFiltered: response?.recordsFiltered ?? 0, //Total de registros com filtro
            data: response?.data ?? [], //Dados da página atual
        });
    }catch(error){
        console.error('Restrição: ${error.message}');
        callback({
            draw: 0,
            recordsTotal: 0,
            recordsFiltered: 0,
            data: []
        })
    }
    },
    columns: [
        { data: 'id' , title: 'Código'},
        { data: 'name' , title: 'Nome Fantasia'},
        { data: 'cnpj' , title: 'CNPJ'},
    ]
});