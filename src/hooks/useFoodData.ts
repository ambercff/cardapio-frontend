import axios, { AxiosPromise } from "axios"
import { FoodData } from "../interface/FoodData"
import { useQuery } from "react-query"

const API_URL = "http://localhost:8080"

const fetchData = async(): AxiosPromise<FoodData[]> => {
    const response = axios.get(API_URL + '/food')
    return response
}

export function useFoodData() {
    // Utiliza o hook useQuery para executar uma consulta de dados
    const query = useQuery({
        // Define a função que será chamada para buscar os dados
        queryFn: fetchData,
        // Define uma chave única para identificar esta consulta (pode ser usado para invalidação de cache)
        queryKey: ['food-data'],
        // Define o número de tentativas de rechamada (retry) em caso de falha
        retry: 2
    });

// Retorna um objeto que contém os resultados da consulta, com uma modificação para extrair os dados da resposta
return {
    // Copia todas as propriedades do objeto 'query'
    ...query,
    // Substitui a propriedade 'data' pelo valor de 'query.data.data', usando o operador opcional de acesso seguro '?.' para evitar erros se 'query.data' for nulo ou indefinido
    data: query.data?.data
}

}