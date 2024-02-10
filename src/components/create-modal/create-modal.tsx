import { useEffect, useState } from "react"
import { useFoodData } from "../../hooks/useFoodData"
import { useFoodDataMutate } from "../../hooks/useFoodDataMutate"
import { FoodData } from "../../interface/FoodData"
import './modal.css'

interface InputProps {
    label: string,
    value: string | number,
    updateValue(value: any): void

}

interface ModalProps {
    closeModal(): void
}

const Input = ({label, value,updateValue}: InputProps) => {
    return (
        <>
            <label>{label}</label>
            <input value={value} onChange={event => updateValue(event.target.value)}></input>
            {/* - O valor do input é controlado pela propriedade 'value', que é definida como 'value'.
                - Quando o valor do input é alterado, a função 'updateValue' é chamada através do evento 'onChange'. */}
        </>
    )
}

export function CreateModal({closeModal}: ModalProps) {
    // o react entende que toda vez que chamamos a funcao set ele precisa renderizar novamente, atualizando os valores
    const [title, setTitle] = useState("") 
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState("")
    const { mutate, isSuccess, isLoading }= useFoodDataMutate();

    const submit = () => {
        const foodData: FoodData = {
            title,
            price,
            image
        }

        mutate(foodData)
    }

    
    useEffect(() => {
        if(!isSuccess) return 
        closeModal();
    }, [isSuccess])


    return (
        <div className="modal-overlay">
            <div className="modal-body">
                <h2> Cadastre um novo item no cardapio </h2>
                <form className="input-container">
                    <Input label="title" value={title} updateValue={setTitle}/>
                    <Input label="price" value={price} updateValue={setPrice}/>
                    <Input label="image" value={image} updateValue={setImage}/>
                </form>
                <button onClick={submit} className="btn-secondary"> 
                    {isLoading ? 'postando...' : 'postar'}
                </button>
            </div>
        </div>
    )
}