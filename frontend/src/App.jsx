import { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import routes from "utils/routes";
import "App.scss";

function App() {
  return (
    <div>
      <BrowserRouter>
        <div className="app-content max-w-2xl mx-auto">
          <Routes>
            {routes.map((route, i) => {
              const key = `route-${i}`;

              return (
                <Route
                  key={key}
                  path={route.path}
                  element={
                    <Suspense fallback={<div>Loading</div>}>
                      <route.component />
                    </Suspense>
                  }
                />
              );
            })}
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
