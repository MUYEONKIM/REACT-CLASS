import { useForm } from 'react-hook-form'
import { wrapFormAsyncFunc } from '../../../src/commons/libaries/asyncFunc'
import { yupResolver } from '@hookform/resolvers/yup'
import { schema } from './02-after.validation'
import type{ IFormData } from './02-after.type';

export default function GraphqlMutationPage(): JSX.Element {
    const { register, handleSubmit, formState } = useForm<IFormData>({
      resolver: yupResolver(schema),
      mode: "onChange"
    });

    const onClickSubmit = (data: IFormData): void => {
      console.log(data);
    };


    return ( // 한줄일때는 괄호 빼도됨
        <form onSubmit={wrapFormAsyncFunc(handleSubmit(onClickSubmit))}>
            작성자 : <input type="text" {...register("seller")}/><br/>
            <div style={{ color:"red"}}>{formState.errors.seller?.message}</div>
            품명 : <input type="text" {...register("name")}/><br/>
            <div style={{ color:"red"}}>{formState.errors.name?.message}</div>
            상세사항 : <input type="text" {...register("detail")}/><br/>
            <div style={{ color:"red"}}>{formState.errors.detail?.message}</div>
            가격 : <input type="text" {...register("price")}/><br/>
            <div style={{ color:"red"}}>{formState.errors.price?.message}</div>
            이메일 : <input type="email" {...register("email")}/><br/>
            <div style={{ color:"red"}}>{formState.errors.email?.message}</div>
            비밀번호 : <input type="password" {...register("password")}/><br/>
            <div style={{ color:"red"}}>{formState.errors.password?.message}</div>
            번호 : <input type="text" {...register("phone")}/><br/>
            <div style={{ color:"red"}}>{formState.errors.phone?.message}</div>
            {/* 주소 : <input type="text" {...register("boardAddress.addressDetail")}/><br/> */}
            <button style={{ backgroundColor: formState.isValid ? "yellow" : ""}}>Graphql-API 요청하기</button>
        </form>
    )
}