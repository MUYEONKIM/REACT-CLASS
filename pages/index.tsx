import { useRouter } from "next/router";

export default function Home(): JSX.Element {
  const router = useRouter();
  const onClickMove = (): void => {
    void router.push("/section24/24-06-custom-hook-move-to-page");
  };
  return <button onClick={onClickMove}>페이지 이동하기!!!</button>;
}
