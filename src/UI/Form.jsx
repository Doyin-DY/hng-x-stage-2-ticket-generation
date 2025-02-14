import React, { useState } from 'react'
import ImageInput from '../Components/ImageInput'
import Input from '../Components/Input'

export default function Form({ onInfoChange,  step }) {

    const ticketOptions = [
        { id: 1, price: "Free", access: "Regular Access", remaining: 20 },
        { id: 2, price: "$150", access: "VIP Access", remaining: 20 },
        { id: 3, price: "$250", access: "VVIP Access", remaining: 20 },
    ];

    const [selectedTicket, setSelectedTicket] = useState(null);
    const [numTickets, setNumTickets] = useState(1)

    const handleSelect = (ticket) => {
        setSelectedTicket(ticket);
        onInfoChange(["access", ticket.access]);
    }

    function handleCancel() {
        onInfoChange(["image", null]);
        onInfoChange(["name", ""]);
        onInfoChange(["email", ""]);
        onInfoChange(["project", ""]);
        onInfoChange(["access", ""]);
        onInfoChange(["numTickets", 1]); 
        onInfoChange(["step", 1]); 
    }

    const [emailError, setEmailError] = useState(""); 
    
    const validateEmail = (email) => {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailPattern.test(email);
    };
    

    const handleSubmit = (event) => {
        event.preventDefault(); 

    
        if (step === 1) {
            if (!selectedTicket) {
                alert("Please select a ticket type.");
                return;
            }
            onInfoChange(["step", step + 1]); // Move to step 2
        } else {
            const emailValue = event.target.email.value;
            if  (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(emailValue)) {
                setEmailError("Please enter a valid email address.");
                return;
            }

            onInfoChange(["view", true]);
        }
    };


    

    return (
        <div className=' flex place-items-center justify-center max-w-full h-screen bg-gradient-to-b from-black/93 to-alpha '>

            <div className='p-3 place-items-center max-h-fit rounded-xl border md:w-[45%] w-[70%] border-img'>
                <div className='flex place-self-stretch justify-between mb-4'>
                    <h1 className='flex justify-self-start text-white text-2xl '>{step === 1 ? "Ticket Selection" : "Attendee Details"}</h1>
                    <p className='flex text-white text-2xl'>{step === 1 ? "Step 1/2" : "Step 2/2"}</p>
                </div>
                <div className='w-full flex items-center mb-2'>
                    <div className={`flex-1 h-1 rounded-full ${step === 1 ? "bg-img" : "bg-gray-500"}`}></div>
                    <div className={`flex-1 h-1 rounded-full ml-2 ${step === 2 ? "bg-img" : "bg-gray-500"}`}></div>
                </div>
                {step === 1 ? (
                    // Ticket Selection Form
                    <form className='flex  justify-center border-img flex-col  md:w-fit w-[85%] m-auto gap-4 border rounded-2xl p-4'
                        onSubmit={handleSubmit}
                    >
                        <div className='block text-center bg-primary border border-dashed rounded-lg mb-2 md:h-[7rem]'>
                            <div className='md:w-[14rem] w-fit text-white place-self-center m-3'>
                                <h1 className='text-2xl font-bold mb-2'>Techember Fest "25</h1>
                                <p className='text-[8px]'>Join us for an unforgettable experience at Techember Fest "25! Secure your spot now.</p>
                                <p className='text-[8px]'>📍 04 Rumens road, Ikoyi, Lagos. || March 15, 2025 | 7:00PM</p>
                            </div>
                        </div>
                        <hr className='border border-img ' />
                        {/* Ticket Selection */}
                        <label className='text-white text-[10px] -mb-2' htmlFor="ticket-options">Select Ticket Type</label>
                        <div className='bg-[#08343C] p-2 rounded-lg text-white border border-img md:h-[6rem] w-fit place-self-center place-content-center'>
                            <div className='md:flex  md:place-self-center justify-self-center justify-evenly grid-cols-3 gap-2 md:w-fit'>
                                {ticketOptions.map((ticket) => (
                                    <button
                                        key={ticket.id}
                                        type='button'
                                        onClick={() => handleSelect(ticket)}
                                        className={`flex relative md:mb-0 mb-2 justify-start place-items-center  p-1 border-2 md:h-[3.5rem] h-[4.5rem] w-[10rem] md:w-[8rem] cursor-pointer rounded-lg bg-primary border-img  ${selectedTicket?.id === ticket.id ? "border-[#00a8e8] bg-[#08343C] shadow-lg scale-105" : "border-gray-600"}`
                                        }
                                    >
                                        <div className='grid md:place-content-start md:w-fit  mb-2'>
                                            <p className="md:text-[11px] text-gray-300 text-start md:w-[5rem]">{ticket.access}</p>
                                            <p className=" text-start text-xs text-gray-400">{ticket.remaining}/52</p>
                                        </div>
                                        <span className="absolute md:left-21 left-26 md:top-3.5 top-9 bg-img w-[2.3rem] rounded-md">
                                            <span className="text-lg font-medium text-[12px]">{ticket.price}</span>
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <label className='text-[10px] text-white' htmlFor="ticket-number">Number of Tickets</label>
                        <input className='w-full p-2 rounded-lg border bg-transparent border-img text-white text-[10px]' type="number" name="ticket-number" id="ticket-number" min="1" max="5" value={numTickets} onChange={(e) => {
                            setNumTickets(e.target.value);
                            onInfoChange(["seats", e.target.value])
                        }}
                        />
                        <div className='w-full md:flex grid justify-items-center  md:justify-between  bg-transparent border-img text-white text-[10px]'>
                            <button type='button' onClick={handleCancel} className='hover:bg-beta border md:w-[12rem] w-full border-img text-img hover:text-white p-2 md:mb-0 mb-3 rounded-lg cursor-pointer text-[10px]'>Cancel
                            </button>
                            <button type='submit' className='hover:bg-beta border border-img md:w-[12rem] w-full text-img hover:text-white p-2 rounded-lg cursor-pointer text-[10px]'>Next
                            </button>
                        </div>
                    </form>
                ) : (
                    // Attendee Details
                    <form className='flex justify-center border-img  flex-col md:w-[30rem] w-[15rem] m-auto gap-4 border rounded-2xl p-4'
                        onSubmit={handleSubmit}
                    >
                        <ImageInput onChange={(imageURL) => onInfoChange(["image", imageURL])} />
                        <Input
                            label='Full Name'
                            type='text'
                            id='name'
                            name='name'
                            placeholder='John Doe'
                            required
                            onChange={(e) => onInfoChange(["name", e.target.value])}
                        />
                        <Input
                            label='Email Address'
                            type='email'
                            id='email'
                            name='email'
                            placeholder="john.doe@gmail.com"
                            required
                            onChange={(e) => {
                                setEmailError("");
                                onInfoChange(["email", e.target.value])
                            }}
                        />
                        {emailError && <p className="text-red-500 text-xs mt-1">{emailError}</p>}
                        <Input
                            label='About the Project'
                            name="project"
                            id="project"
                            type="text"
                            className='w-full p-2 rounded-lg border border-img bg-transparent text-white text-[10px] h-[5rem]'
                            required
                            onChange={(e) => onInfoChange(["project", e.target.value])}
                        />
                        <div className='w-full md:flex md:justify-between grid justify-center  bg-transparent border-img text-white text-[10px]'>
                            <button type='button' onClick={() => onInfoChange(["step", 1])} className='hover:bg-beta border w-[13rem] border-img text-img hover:text-white md:mb-0 mb-3 p-2 rounded-lg cursor-pointer text-[10px]'>Back
                            </button>
                            <button type='submit' className='hover:bg-beta border border-img w-[13rem]  text-img hover:text-white p-2 rounded-lg cursor-pointer text-[10px]'>Get My Free Ticket
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}
