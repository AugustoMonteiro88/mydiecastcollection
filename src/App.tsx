import { child, get, getDatabase, ref, set } from "firebase/database";
import { useEffect } from "react";
import { initializeFirebase } from "./firebase/config";
import logo from "./logo.svg";
import "./App.css";
import {all_vehicles} from "./all_cars.js"
console.log("🚀 ~ all_vehicles:", {all_vehicles})
interface Hotwheels {
	toy_num: string[];
	col_num: string[];
	model: string[];
	series: string[];
	series_num: string[];
	photo_url: string[];
	year: string;
}

function App() {
	initializeFirebase();

	// const test: Hotwheels = {
	// 	toy_num: ["R0916"],
	// 	col_num: ["001"],
	// 	model: ["'67 Shelby GT500"],
	// 	series: ["2010 New Models"],
	// 	series_num: ["1/44"],
	// 	photo_url: [
	// 		"https://static.wikia.nocookie.net/hotwheels/images/b/b5/67_Shelby_GT500_-_2010_NM.jpg/revision/latest?cb=20090913235854",
	// 	],
	// 	year: "2010",
	// };

	const writeUserData = async () => {
		const db = getDatabase();
    try {
      await set(ref(db, "hotwheels"), all_vehicles);
    } catch (error) {
      console.log("🚀 ~ writeUserData ~ error:", error)
      
    }

	};

	const readDatabase = () => {
		const dbRef = ref(getDatabase());

		try {
			get(child(dbRef, `hotwheels`)).then((snapshot) => {
				if (snapshot.exists()) {
					console.log("🚀 ~ get ~ snapshot:")
					console.log(snapshot.val());
				} else {
					console.log("No data available");
				}
			});
		} catch (error) {
			console.log("🚀 ~ readDatabase ~ error:", error);
		}
	};

	const runDBTests = async () => {
		// await writeUserData(test);
		// await readDatabase("001");
	};

	useEffect(() => {
		runDBTests();
	}, []);

	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<p>
					Edit <code>src/App.tsx</code> and save to reload.
				</p>

        <button onClick={writeUserData}>RUN</button>
        <button onClick={readDatabase}>READ</button>
				<a
					className="App-link"
					href="https://reactjs.org"
					target="_blank"
					rel="noopener noreferrer"
				>
					Learn React
				</a>
			</header>
		</div>
	);
}

export default App;
