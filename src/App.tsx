import { useState } from "react";
import AgeForm from "./components/AgeForm";
import ResultDisplay from "./components/ResultsDisplay";
import type { Result } from "./utils/calcResult";

function App() {
  const [result, setResult] = useState<Result>({
    years: null,
    months: null,
    days: null,
  });

  return (
    <>
      <main className="bg-[hsl(0,0%,94%)] min-h-screen m-0 pt-12 pb-16 px-4">
        <div className="bg-white rounded-3xl rounded-br-[100px] p-6 test flex flex-col gap-12 max-w-4xl mx-auto md:p-14 ">
          <div>
            <AgeForm setResult={setResult} />
          </div>
          <div>
            <ResultDisplay {...result} />
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
