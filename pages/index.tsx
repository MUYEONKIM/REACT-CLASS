import { useRouter } from "next/router";

export default function Home(): JSX.Element {
  const router = useRouter();
  const onClickMove = (): void => {
    void router.push("/section26/26-01-apollo-cache-state");
  };
  return <button onClick={onClickMove}>페이지 이동하기!!!</button>;
}
