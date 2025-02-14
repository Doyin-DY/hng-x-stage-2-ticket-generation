import React, { useRef } from 'react'
import html2canvas from "html2canvas"
import { ticket } from '../assets/images';

export default function Ticket({ data, onReset }) {
    const ticketRef = useRef(null);

    const handleDownload = async () => {
        if (!ticketRef.current) return;

        try {
            const canvas = await html2canvas(ticketRef.current, { scale: 2 });
            const image = canvas.toDataURL("image/png");

            const link = document.createElement("a");
            link.href = image;
            link.download = "ticket.png";
            link.click();
        } catch (error) {
            console.error("Error capturing ticket:", error);
            alert("Failed to download ticket. Try again.");
        }
    };



    return (
        <div className='place-content-center sm:max-w-full sm:overflow-x-hidden h-screen bg-gradient-to-b from-black/93 to-alpha text-white justify-center'>
            <div className='grid text-center justify-self-center m-8'>
                <h1 className='text-3xl'>Your Ticket is Booked!</h1>
                <p>check your email for a copy or you can <strong>download</strong></p>
            </div>
            <div className='flex place-self-center  w-fit h-fit p-4 border-2 border-double border-img rounded-2xl  shadow-lg'>
                <section ref={ticketRef} className='m-auto border-2 border-double border-img rounded-2xl p-2 w-[17.5rem] h-[23rem] bg-radial from-beta/20 to-beta/0 max-w-full'>
                    <article
                        id='ticket'
                        className=' h-fit bg-center bg-contain bg-no-repeat m-auto grid items-center '
                    >
                        <div className='flex items-center flex-col m-4'>
                            <article className='flex items-center '>
                                <header>
                                    <h3 className='text-xl md:text-2xl font-bold font-cinzel'> Techember Fest "25</h3>
                                </header>
                            </article>
                            <article className='grid items-center'>
                                <p className='text-[8px]'>📍 04 Rumens road, Ikoyi, Lagos.</p>
                                <p className='text-[8px]'>📅 March 15, 2025 | 7:00 PM</p>
                            </article>
                        </div>
                        <img
                            className='w-[6rem] h-[6.5rem] rounded-md flex place-self-center m-2'
                            src={data.image || "https://via.placeholder.com/100"}
                            crossOrigin='anonymous'
                            alt="Uploaded Photo"
                        />
                        <div className=" grid flex-wrap overflow-hidden grid-cols-2 grid-rows-3 mt-4 place-self-center w-fit ">
                            <div className="grid justify-between border border-[#133D44] rounded-tl-lg p-1">
                                <span className="text-ticket text-[8px] ">Full Name</span>
                                <span className="text-[10px]">{data.name}</span>
                            </div>
                            <div className="grid justify-between border border-b border-[#133D44] rounded-tr-lg p-1">
                                <span className="text-ticket text-[8px]">Email</span>
                                <span className="text-[8px]">{data.email}</span>
                            </div>
                            <div className="grid justify-between border border-b border-[#133D44] p-1">
                                <span className="text-ticket text-[8px]">Ticket Type</span>
                                <span className="text-[10px]">{data.selectedTicket?.access || "Not Selected"}</span>
                            </div>
                            <div className="grid justify-between border border-[#133D44] p-1">
                                <span className="text-ticket text-[8px]">Seats</span>
                                <span className="text-[10px]">{data.seats || "1"}</span>
                            </div>
                            <div className='grid justify-between border border-[#133D44] col-span-2 rounded-b-lg p-1'>
                                <span className="text-ticket text-[8px]">Special request?</span>
                                <span className="text-[10px] ">{data.project}</span>
                            </div>
                        </div>
                        <div className='place-self-center m-3 flex justify-center'>

                        </div>
                    </article>
                </section>
            </div>

            <div className='place-self-center m-3 gap-20 flex  '>
                <button
                    className="bg-beta text-white text-[10px] w-[6rem] p-2 rounded-md hover:bg-opacity-80"
                    onClick={handleDownload}
                >
                    Download Ticket
                </button>
                <button
                    onClick={onReset}
                    className="bg-beta text-white text-[10px] w-[6rem] p-2 rounded-md hover:bg-opacity-80"
                >
                    Restart
                </button>


            </div>
        </div>
    )

}
