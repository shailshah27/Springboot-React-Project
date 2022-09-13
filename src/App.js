import "./App.css";
import NavigationBar from "./components/NavigationBar";
import Footer from "./components/Footer";
import ViewStudents from "./components/ViewStudents";
import { Container } from "react-bootstrap";
import Student from "./components/Student";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MyToast from "./components/MyToast";
import { useState } from "react";

function App() {
  const [alert, setAlert] = useState();
  let showAlert = (message, type) => {
    setAlert({
      message: message,
      type: type
    });
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  };
  return (
    <div className="App">
      <BrowserRouter>
        <NavigationBar />
        <MyToast alert={alert} />
        <Container>
          <Routes>
            <Route
              path="/addStudent"
              element={<Student showAlert={showAlert} />}
            />
            <Route path="/updateStudent/:studentId" element={<Student showAlert={showAlert} />} />
            <Route path="/viewStudent" element={<ViewStudents showAlert={showAlert} />} />
          </Routes>
        </Container>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
