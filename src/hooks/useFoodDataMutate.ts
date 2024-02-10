import axios, { AxiosPromise } from "axios"
import { FoodData } from "../interface/FoodData"
import { useMutation, useQueryClient } from "react-query"

const API_URL = "http://localhost:8080"

const postData = async(data: FoodData): AxiosPromise<any> => {
    const response = axios.post(API_URL + '/food', data)
    return response
}

export function useFoodDataMutate() {
    const queryClient = useQueryClient()
    // Utiliza o hook useQuery para executar uma consulta de dados
    const mutate = useMutation({
        // Define a função que será chamada para buscar os dados
        mutationFn: postData,
        // Define o número de tentativas de rechamada (retry) em caso de falha
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries(['food-data'])
            //invalidando os gets que tem como chame food-data, pois quando um post é feito, o get anterior fica desatualizado, ou seja, precisa ser feito novamente
        }
    });

// Retorna um objeto que contém os resultados da consulta, com uma modificação para extrair os dados da resposta
return mutate

}