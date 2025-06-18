//trang chủ
import Header from "./components/Header/Header";
import AppRoutes from "./AppRoutes";
import Loading from "./components/Loading/Loading";
import { useLoading } from "./hooks/useLoading";
import { loadingInterceptors } from "./interceptors/loadingInterceptors";
import { useEffect } from "react";
function App() {
    const {startLoading, stopLoading} = useLoading();
    useEffect(() => {
        loadingInterceptors({startLoading, stopLoading});
    }, [startLoading, stopLoading]);
  return <>
    <Loading />
    <Header />
    <AppRoutes />
  </>;
}

export default App;
