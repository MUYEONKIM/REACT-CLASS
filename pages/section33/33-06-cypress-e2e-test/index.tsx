import { useRouter } from "next/router";

export default function CypressE2ETestPage(): JSX.Element {
    const router = useRouter();

    const onClickMovedPage = (): void => {
        void router.push("/section33/33-06-cypress-e2e-test-moved");
    };
    return <button onClick={onClickMovedPage}>철수랑 놀러가기</button>;
}
