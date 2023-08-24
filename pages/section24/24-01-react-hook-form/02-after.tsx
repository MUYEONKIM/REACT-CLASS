import { useForm } from 'react-hook-form'
import { wrapFormAsyncFunc } from '../../../src/commons/libaries/asyncFunc'

interface IFormData {
  seller : string
  name : string
  detail : string
  price : number
  boardAddress : {
    addressDetail : string
  }
}

export default function GraphqlMutationPage(): JSX.Element {
    const { register, handleSubmit } = useForm<IFormData>();

    const onClickSubmit = (data: IFormData): void => {
      console.log(data);
    };


    return ( // 한줄일때는 괄호 빼도됨
        <form onSubmit={wrapFormAsyncFunc(handleSubmit(onClickSubmit))}>
            작성자 : <input type="text" {...register("seller")}/><br/>
            품명 : <input type="text" {...register("name")}/><br/>
            상세사항 : <input type="text" {...register("detail")}/><br/>
            가격 : <input type="text" {...register("price")}/><br/>
            주소 : <input type="text" {...register("boardAddress.addressDetail")}/><br/>
            <button>Graphql-API 요청하기</button>
        </form>
    )
}