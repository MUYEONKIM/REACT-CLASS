import { server } from "./src/commons/mocks/index"

// 모든 jest 쓸 때마다 사용하는 것
beforeAll(() => server.listen());
afterAll(() => server.close());