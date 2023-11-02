import { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import routes from "utils/routes";
import "App.scss";
import Loading from "components/Loading/Loading";

function App() {
  return (
    <div>
      <div className="app-content max-w-2xl mx-auto">
        <BrowserRouter>
          <Routes>
            {routes.map((route, i) => {
              const key = `route-${i}`;

              return (
                <Route
                  key={key}
                  path={route.path}
                  element={
                    <Suspense
                      fallback={
                        <div className="flex justify-center items-center w-full h-screen">
                          <Loading />
                          <p className="ml-2">Loading...</p>
                        </div>
                      }
                    >
                      <div className="flex flex-col relative justify-center items-center md:shadow-md md:my-8 bg-[lightseagreen] rounded-xl">
                        <route.component />
                      </div>
                    </Suspense>
                  }
                />
              );
            })}
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
