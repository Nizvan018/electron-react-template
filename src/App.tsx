import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AddUser from "./pages/AddUser";

const App = () => {
    return (
        <Router>
            <div className="flex flex-col">
                <Navbar />

                <main className="flex justify-center px-4 w-full">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/addUser" element={<AddUser />} />
                    </Routes>
                </main>
            </div>
        </Router>
    )
}

export default App;
