import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const onClickMove = () => {
    router.push("/section05/05-01-static-routing");
  };
  return <button onClick={onClickMove}>페이지 이동하기!!!</button>;
}
