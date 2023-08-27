import { useForm } from 'react-hook-form'
import { wrapFormAsyncFunc } from '../../../src/commons/libaries/asyncFunc'
import { yupResolver } from '@hookform/resolvers/yup'
import { schema } from './02-after.validation'
import type{ IFormData } from './02-after.type';
import Input01 from '../../../src/components/commons/buttons/01';
import Button01 from '../../../src/components/commons/inputs/01';

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
            작성자 : <Input01 type="text" register={register("seller")}/><br />
            <div style={{ color:"red"}}>{formState.errors.seller?.message}</div>
            품명 : <Input01 type="text" register={register("name")}/><br />
            <div style={{ color:"red"}}>{formState.errors.name?.message}</div>
            상세사항 : <Input01 type="text" register={register("detail")}/><br />
            <div style={{ color:"red"}}>{formState.errors.detail?.message}</div>
            가격 : <Input01 type="text" register={register("price")}/><br />
            <div style={{ color:"red"}}>{formState.errors.price?.message}</div>
            이메일 : <Input01 type="email" register={register("email")}/><br />
            <div style={{ color:"red"}}>{formState.errors.email?.message}</div>
            비밀번호 : <Input01 type="password" register={register("password")}/><br />
            <div style={{ color:"red"}}>{formState.errors.password?.message}</div>
            번호 : <Input01 type="text" register={register("phone")}/><br />
            <div style={{ color:"red"}}>{formState.errors.phone?.message}</div>
            {/* 주소 : <input type="text" {...register("boardAddress.addressDetail")}/><br/> */}
            <Button01 title="등록하기" isActive={formState.isValid}/>
        </form>
    )
}