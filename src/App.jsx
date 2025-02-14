import { useEffect, useState } from "react";
import Ticket from "./UI/Ticket";
import Form from "./UI/Form";


export default function App() {
  const [info, setInfo] = useState(() => {
    const savedData = localStorage.getItem("ticketFormData");
    return savedData ? JSON.parse(savedData) : {
      image: null,
      view: false,
      name: "John Doe",
      email: "john.doe@gmail.com",
      project: "",
      access: null,
      seats: 1,
      step: 1,
    };
  });

  useEffect(() => {
    localStorage.setItem("ticketFormData", JSON.stringify(info))
  }, [info]);

  function handleInfo([key, value]) {
    setInfo(prev => ({
      ...prev,
      [key]: value,
    }));
  }

  // Handle step-based form submission
  function handleNext(event) {
    event.preventDefault();
    if (info.step === 1 && !info.access) {
      alert("Please select a ticket before proceeding.");
      return;
    }

    if (info.step === 1) {
      setInfo(prev => ({ ...prev, step: 2 }));
    } else {
      setInfo(prev => ({ ...prev, view: true }));
    }
  };

  // 🔄 **Reset Function**
  function handleReset() {
    localStorage.removeItem("ticketFormData"); // Clear saved data
    setInfo({
      image: null,
      view: false,
      name: "John Doe",
      email: "john.doe@gmail.com",
      project: "",
      access: null,
      seats: 1,
      step: 1,
    });
  }


return (
  <>
    {info.view ? (<Ticket data={info} onReset={handleReset} />) : (<Form onInfoChange={handleInfo} onSubmit={handleNext} step={info.step} />)}
  </>
);
}
