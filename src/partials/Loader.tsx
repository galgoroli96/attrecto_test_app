import { Bars } from "react-loader-spinner";

function Loader() {
  return (
    <div className="loaderBox" data-testid="loader">
      <Bars color="#66b821" height={100} width={110} />
    </div>
  );
}

export default Loader;
