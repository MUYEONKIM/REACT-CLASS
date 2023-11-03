import { setupServer } from "msw/node";
import { apis } from "./apis";

// 만든 api들을 실행할 가짜 서버

export const server = setupServer(...apis);
