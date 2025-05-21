import React, { useRef, useEffect } from 'react'
import html2canvas from "html2canvas"
import JsBarcode from 'jsbarcode';


export default function Ticket({ data, onReset }) {
    const ticketRef = useRef(null);

    const handleDownload = async () => {
        if (!ticketRef.current) return;

        try {
            const canvas = await html2canvas(ticketRef.current, {
                scale: 2,
                useCORS: true,
                backgroundColor: '#ffffff',
            });

            const image = canvas.toDataURL('image/png');
            const link = document.createElement('a');
            link.href = image;
            link.download = 'ticket.png';
            link.click();
        } catch (error) {
            console.error('Error capturing ticket:', error);
            alert('Failed to download ticket. Try again.');
        }
    };

    const barcodeRef = useRef(null);

    useEffect(() => {
        if (barcodeRef.current && data?.email) {
            JsBarcode(barcodeRef.current, `TICKET-${data.email}`, {
                format: "CODE128",
                lineColor: "#000",
                displayValue: true,
                width: 0.4,
                height: 35,
                margin: 0,
                fontSize: 10,
                margin: 1,
                textMargin: 1,
            });
        }
    }, [data]);


    return (
        <div className='place-content-center max-w-full overflow-x-hidden h-screen bg-gradient-to-b from-black/93 to-alpha text-white'>
            <div className='grid text-center justify-self-center m-8'>
                <h1 className='text-3xl'>Your Ticket is Booked!</h1>
                <p>check your email for a copy or you can <strong>download</strong></p>
            </div>

            {/* Ticket layout */}
            <div className='flex m-auto justify-self-center place-self-center w-fit h-fit p-4 border-2 border-double border-img rounded-xl bg-[#041E23] shadow-lg' ref={ticketRef}>
                <section className='m-auto border-2 border-double border-img rounded-2xl p-2  w-[17.5rem] h-[23.5rem] bg-[#041E23] '>
                    <article
                        id='ticket'
                        className=' h-fit bg-center bg-contain bg-no-repeat m-auto grid items-center '
                    >
                        <div className='flex items-center flex-col m-2'>
                            <article className='flex items-center'>
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
                            className='w-[6rem] h-[6.5rem] rounded-md flex place-self-center m-1.5'
                            src={data.image || "https://via.placeholder.com/100"}
                            crossOrigin='anonymous'
                            alt="Uploaded Photo"
                        />
                        <div className=" grid flex-wrap overflow-hidden grid-cols-2 grid-rows-3 my-[4px] place-self-center w-fit ">
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
                        <div className='place-self-center my-1 flex justify-center'>
                            <svg ref={barcodeRef} />
                        </div>
                    </article>
                </section>
            </div>

            <div className='place-self-center m-3 gap-20 flex  '>
                <button
                    className="bg-beta text-white text-[10px] w-[6rem] p-2 rounded-md hover:bg-beta/20"
                    onClick={handleDownload}
                >
                    Download Ticket
                </button>
                <button
                    onClick={onReset}
                    className="bg-beta text-white text-[10px] w-[6rem] p-2 rounded-md hover:bg-beta/20"
                >
                    Restart
                </button>


            </div>
        </div>
    )

}
