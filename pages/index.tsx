import { useRouter } from "next/router";

export default function Home(): JSX.Element {
  const router = useRouter();
  const onClickMove = (): void => {
    void router.push("/section30/30-01-login-refreshtoken");
  };
  return <button onClick={onClickMove}>페이지 이동하기!!!</button>;
}
