import * as yup from 'yup'
// yup.문자열().required("안적혀있을 때")
export const schema = yup.object({
  seller: yup.string().typeError("문자열을 입력해주세요").required("작성자를 입력해주세요."),
  name: yup.string().typeError("문자열을 입력해주세요").required("이름을 입력해주세요."),
  detail: yup.string().typeError("문자열을 입력해주세요").required("상세사항을 입력해주세요."),
  price: yup.number().typeError("숫자를 입력해주세요").required("가격을 입력해주세요."),
  email: yup.string().email("이메일 형식에 적합하지 않습니다."),
  password: yup.string().min(4, "비밀번호는 최소 4자리 이상 입력해주세요").max(15, "비밀번호는 최대 15자리 까지 가능합니다.").required("비밀번호는 필수 입력입니다."),
  phone : yup.string().matches(/^\d{3}-\d{3,4}-\d{4}$/, "휴대폰 평식에 알맞지 않습니다.")
})