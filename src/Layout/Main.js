import React from "react";
import { Outlet } from "react-router-dom";
// import Header from "../Pages/Shared/Header/Header";

function Main() {
	return (
		<React.Fragment>
			{/* <Header /> */}
			<Outlet />
		</React.Fragment>
	);
}

export default Main;
