
import { ArrowRight,ArrowDownCircleIcon } from "lucide-react";
import Login from "./components/Login";
import GetStartbtn from "./components/getStartbtn";

export default function Home() {
  return (
    <>
      <div className="h-screen w-full grid grid-cols-2 px-24 py-24">
        <div>
          <div className="w-full h-full flex flex-col justify-center">
            <h1 className="text-7xl font-extrabold text-white font-sans">
              Welcome To greate karigalan magic Show
            </h1>
            <p className="text-white mt-3">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla
              molestiae ab cupiditate suscipit aliquid sapiente, obcaecati est
              saepe, doloremque harum laudantium a dolor esse, nam maiores
              impedit. Nesciunt, corrupti accusantium.
            </p>
           <GetStartbtn/>
          </div>
        </div>
        <div className="w-full h-full flex flex-col justify-center items-center">
          <Login/>
        </div>
      </div>
    </>
  );
}
